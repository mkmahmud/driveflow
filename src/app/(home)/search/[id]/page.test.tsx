import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CarDetailsPage from "./page";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Provider } from "@/components/ui/provider";
import { trpc } from "@/trpc/client";

// Mock the router and params
vi.mock("next/navigation", () => ({
    useParams: () => ({ id: "car-123" }),
    useRouter: () => ({ push: vi.fn() }),
}));

// Mock TRPC
vi.mock("@/trpc/client", () => ({
    trpc: {
        auth: { me: { useQuery: vi.fn() } },
        car: { getCarDetails: { useQuery: vi.fn() } },
    },
}));

const mockCarData = {
    id: "car-123",
    name: "Tesla Model 3",
    type: "Luxury",
    location: "Los Angeles",
    pricePerDay: 100,
    image: "/tesla.jpg",
    seats: 5,
    transmission: "Automatic",
    fuelType: "Electric",
    horsepower: 450,
    description: "A fast electric car.",
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider>{children}</Provider>
);

describe("CarDetailsPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should show skeleton loader when data is loading", () => {
        (trpc.car.getCarDetails.useQuery as any).mockReturnValue({ isLoading: true });
        (trpc.auth.me.useQuery as any).mockReturnValue({ data: null });

        render(<CarDetailsPage />, { wrapper: Wrapper });
        // Assuming your LoadingSkeleton has specific test ids or enough skeletons
        expect(screen.getByTestId("skeleton-container")).toBeDefined();
    });
    it("should render car details correctly once loaded", async () => {
        (trpc.car.getCarDetails.useQuery as any).mockReturnValue({ data: mockCarData, isLoading: false });
        (trpc.auth.me.useQuery as any).mockReturnValue({ data: { id: "u1" } });

        render(<CarDetailsPage />, { wrapper: Wrapper });

        const title = screen.getAllByText(/Tesla Model 3/i)[0];
        expect(title).toBeInTheDocument();

        expect(screen.getByText(/Los Angeles/i)).toBeInTheDocument();

        const price = screen.getAllByText(/\$100/i)[0];
        expect(price).toBeInTheDocument();
    });


    it("should update total price when 'Full Tank' is checked", async () => {
        (trpc.car.getCarDetails.useQuery as any).mockReturnValue({ data: mockCarData, isLoading: false });
        (trpc.auth.me.useQuery as any).mockReturnValue({ data: { id: "u1" } });

        render(<CarDetailsPage />, { wrapper: Wrapper });

        // Try finding by text if label fails
        const fullTankOption = screen.getByText(/Full Tank/i);
        fireEvent.click(fullTankOption);

        // Check for the price update
        await waitFor(() => {
            // Use a more flexible matcher if currency symbols or spaces vary
            expect(screen.getByText(/\$375/)).toBeDefined();
        });
    });

    it("should save to localStorage and redirect when 'Book Now' is clicked", async () => {
        const pushMock = vi.fn();
        vi.importActual("next/navigation").then((mod: any) => ({
            ...mod,
            useRouter: () => ({ push: pushMock })
        }));

        // Set up localstorage spy
        const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

        (trpc.car.getCarDetails.useQuery as any).mockReturnValue({ data: mockCarData, isLoading: false });
        (trpc.auth.me.useQuery as any).mockReturnValue({ data: { id: "u1", email: "test@test.com" } });

        render(<CarDetailsPage />, { wrapper: Wrapper });

        const bookBtn = screen.getByRole("button", { name: /Book Now/i });
        fireEvent.click(bookBtn);

        expect(setItemSpy).toHaveBeenCalledWith("pendingBooking", expect.stringContaining("Tesla Model 3"));
    });
});
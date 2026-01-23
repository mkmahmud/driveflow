import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import PaymentDashboard from "./page";
import { Provider } from "@/components/ui/provider";
import { trpc } from "@/trpc/client";

// Mock tRPC
vi.mock("@/trpc/client", () => ({
    trpc: {
        payment: {
            getMyPayments: {
                useQuery: vi.fn(),
            },
        },
    },
}));

// Create a spy for the default export of html2canvas
const html2canvasSpy = vi.fn().mockResolvedValue({
    toDataURL: () => "data:image/png;base64,mock",
    width: 100,
    height: 100,
});

// Mock PDF libraries
vi.mock("html2canvas", () => ({
    default: html2canvasSpy,
}));

vi.mock("jspdf", () => ({
    // Use a regular function here so 'new' works
    jsPDF: vi.fn().mockImplementation(function () {
        return {
            internal: {
                pageSize: { getWidth: () => 210 }
            },
            addImage: vi.fn(),
            save: vi.fn(),
        };
    }),
}));

const mockData = [
    {
        id: "PAY-123",
        amount: 150.0,
        status: "Completed",
        updatedAt: new Date().toISOString(),
        booking: {
            car: { name: "Tesla Model 3" },
        },
    },
];

describe("PaymentDashboard", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (trpc.payment.getMyPayments.useQuery as any).mockReturnValue({
            data: mockData,
            isLoading: false,
        });
    });

    it("renders the payment history table with data", () => {
        render(
            <Provider>
                <PaymentDashboard />
            </Provider>
        );
        expect(screen.getByText("PAY-123")).toBeInTheDocument();
    });

    it("opens the invoice dialog when clicking the 'Invoice' button", async () => {
        render(
            <Provider>
                <PaymentDashboard />
            </Provider>
        );

        const invoiceBtn = screen.getByRole("button", { name: /invoice/i });

        // Wrap interactions that trigger state updates in act if needed, 
        // though fireEvent usually handles this.
        await act(async () => {
            fireEvent.click(invoiceBtn);
        });

        // Use findByText with a regex to ignore icon nesting issues
        const dialogTitle = await screen.findByText(/Payment Invoice/i);
        expect(dialogTitle).toBeInTheDocument();

        // Check if the mock data rendered inside the dialog
        expect(await screen.findByText("Tesla Model 3")).toBeInTheDocument();
    });

    it("calls the download function when 'Download PDF' is clicked", async () => {
        render(
            <Provider>
                <PaymentDashboard />
            </Provider>
        );

        // 1. Open Modal
        fireEvent.click(screen.getByRole("button", { name: /invoice/i }));

        // 2. Wait for Download button to appear in the portal
        const downloadBtn = await screen.findByRole("button", { name: /download pdf/i });

        // 3. Click Download
        await act(async () => {
            fireEvent.click(downloadBtn); 
        });

        // 4. Verify our spy was called
        await waitFor(() => {
            expect(html2canvasSpy).toHaveBeenCalled();
        });
    });
});
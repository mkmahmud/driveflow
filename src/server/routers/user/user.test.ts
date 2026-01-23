import { describe, it, expect, vi, beforeEach } from "vitest";
import { db } from "@/server/db";
import bcrypt from "bcryptjs";
import { appRouter } from "@/server";

// Mock the database
vi.mock("@/server/db", () => ({
    db: {
        user: {
            findUnique: vi.fn(),
            update: vi.fn(),
        },
    },
}));

// Mock Bcrypt
vi.mock("bcryptjs", () => ({
    default: {
        compare: vi.fn(),
        hash: vi.fn(),
    },
}));




describe("user.changePassword", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should successfully update password with valid credentials", async () => {
        // Setup Mock Data
        const mockUser = { id: "user-123", password: "old_hashed_password" };
        (db.user.findUnique as any).mockResolvedValue(mockUser);
        (bcrypt.compare as any).mockResolvedValue(true);
        (bcrypt.hash as any).mockResolvedValue("new_hashed_password");

        // Create caller with correctly shaped context
        const caller = appRouter.createCaller({
            userId: "user-123",
            db
        });

        const result = await caller.user.changePassword({
            currentPassword: "correct_password",
            newPassword: "new_secure_password123",
        });

        expect(result.success).toBe(true);
        expect(db.user.update).toHaveBeenCalledWith({
            where: { id: "user-123" },
            data: { password: "new_hashed_password" },
        });
    });

    it("should throw error if current password comparison fails", async () => {
        (db.user.findUnique as any).mockResolvedValue({ id: "user-123", password: "hash" });
        (bcrypt.compare as any).mockResolvedValue(false); // Simulate wrong password

        const caller = appRouter.createCaller({ userId: "user-123", db });

        await expect(
            caller.user.changePassword({
                currentPassword: "wrong_password",
                newPassword: "new_password123",
            })
        ).rejects.toThrow(/incorrect/);
    });
});
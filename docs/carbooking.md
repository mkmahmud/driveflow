# 📅 Car Booking Module Documentation

This document outlines the technical implementation of the reservation system, availability logic, and booking lifecycle in DriveFlow.

---

## 1. Overview
The Booking module facilitates the transition from car discovery to a secured reservation. It manages complex date-range logic to ensure vehicles are never double-booked and maintains a robust relationship between users, cars, and financial transactions.

---

## 2. Technical Stack
- **Database Logic**: `Prisma Transactions` (Atomic booking creation)
- **Validation**: `Zod` (Date range and ID verification)
- **State Management**: `tRPC` (Server-side procedures and cache invalidation)
- **Date Utilities**: `date-fns` (Overlap checks and duration formatting)

---

## 3. Core Functionality

### A. Availability Logic (Conflict Prevention)
The most critical feature of the booking system is preventing overlapping reservations.
1. **Overlap Detection**: Before confirming a booking, the server queries the `Booking` model to check if the requested `startDate` and `endDate` intersect with any existing "CONFIRMED" or "PENDING" bookings for that specific `carId`.
2. **Prisma Query**: Utilizes the `NOT` and `OR` operators to filter out unavailable slots:
   - Check if `new_start` is before `existing_end`.
   - Check if `new_end` is after `existing_start`.

### B. Atomic Booking Creation
To ensure data integrity, the system uses **Prisma Transactions ($transaction)**.
- When a user clicks "Book Now," the system simultaneously:
    1. Creates a `Booking` record.
    2. Initializes a `Payment` record linked to that booking.
    3. Blocks those dates for the vehicle.
- If any step fails (e.g., payment initialization error), the entire operation rolls back.

---

## 4. Implementation Logic

### Booking Lifecycle States
Bookings move through a controlled state machine to ensure tracking:
* **PENDING**: The user has initiated the process but hasn't completed payment.
* **CONFIRMED**: Payment was successful; the vehicle is officially reserved.
* **CANCELLED**: The user aborted the process or payment failed.
* **COMPLETED**: The rental period has successfully concluded.



### Real-time Pricing Sync
The booking form dynamically calculates the total price by:
- Fetching the `pricePerDay` from the Car record.
- Calculating the date difference via `differenceInDays(endDate, startDate)`.
- Adding service fees and optional insurance modifiers before sending the final total to the payment gateway.

---

## 5. Security & Performance
- **Authorization**: All booking procedures are protected by middleware to ensure only authenticated users can reserve vehicles.
- **Race Condition Protection**: Server-side validation re-verifies availability at the exact moment of database insertion, protecting against two users booking the same car at the same millisecond.
- **Optimistic UI**: Upon successful booking, tRPC invalidates the `getMyBookings` query to immediately show the new reservation in the user dashboard.

---

## 6. Setup Requirements
The following relationship structure is required in your `schema.prisma`:

```prisma
model Booking {
  id         String   @id @default(cuid())
  userId     String
  carId      String
  startDate  DateTime
  endDate    DateTime
  totalPrice Int
  status     String   @default("PENDING")
  user       User     @relation(fields: [userId], references: [id])
  car        Car      @relation(fields: [carId], references: [id])
  payment    Payment?
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
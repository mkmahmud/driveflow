# 🏎️ Car Module Documentation

This document details the technical implementation of the car discovery, filtering, and detailed retrieval system within DriveFlow.

---

## 1. Overview
The Car module is designed for high-performance discovery. It leverages **Prisma’s powerful query engine** to provide real-time filtering on the server side, ensuring that the client only receives data that matches their specific search criteria.

---

## 2. Technical Stack
- **ORM**: `Prisma` (Complex relational filtering)
- **Validation**: `Zod` (Input sanitization and schema-based validation)
- **API**: `tRPC` (Type-safe API procedures)
- **UI Components**: `Chakra UI v3` (Modern, accessible interface)
- **Calculations**: `date-fns` (Precise rental duration logic)

---

## 3. Core Functionality

### A. Dynamic Search & Filtering
The `getAllCars` procedure implements a "Required + Optional" logic pattern to ensure users find the right vehicle:

1.  **Required Filters**: Users must provide a `location`, `startDate`, and `endDate`.
2.  **Optional Refinements**: 
    * **Price Range**: Implemented via Prisma `gte` (greater than or equal) and `lte` (less than or equal) operators.
    * **Vehicle Types**: Uses the Prisma `in` operator to match categories (e.g., SUV, Sedan, Luxury).
3.  **Optimization**: All filtering is performed at the database level rather than on the client, minimizing network payload.

### B. Detailed Retrieval
The `getCarDetails` procedure retrieves a specific vehicle record using a unique identifier.
* **Input Validation**: Uses `z.string()` to ensure the `carId` is valid before querying the database.
* **Data Integrity**: Returns a complete car object including metadata like horsepower, transmission type, and fuel specifications.

---

## 4. Implementation Logic

### Reactive UI Integration
The frontend is tightly coupled with the tRPC state:
* **State Sync**: Filter states (price, type) are passed as inputs to the tRPC query.
* **Auto-Refetch**: When a user adjusts a filter, tRPC automatically detects the change and triggers a background fetch, providing a seamless "real-time" feel without page reloads.

### Dynamic Booking Calculations
The module includes a sophisticated pricing engine on the details page:
* **Duration Logic**: Calculates the number of days between pickup and return.
* **Financial Breakdown**: Dynamically aggregates the base price, optional extras (e.g., Full Tank, Child Seat), and fixed service fees.

---

## 5. Security & Performance
* **Sanitization**: All search inputs are parsed through Zod schemas to prevent malicious query injections.
* **Perceived Performance**: Implements **Chakra UI Skeletons** during loading states to maintain layout stability.
* **Type Safety**: Shares the same end-to-end type safety established in the Authentication module, ensuring the frontend never requests a field that doesn't exist in the database.

---

## 6. Setup Requirements
To support the Car module, the following model structure is required in `schema.prisma`:

```prisma
model Car {
  id           String   @id @default(cuid())
  name         String
  type         String   
  location     String
  pricePerDay  Int
  image        String
  seats        Int
  transmission String
  fuelType     String
  horsepower   Int
  description  String?
  createdAt    DateTime @default(now())
}
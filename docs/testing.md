# 🧪 Quality Assurance & Testing Documentation

This document details the testing strategy, framework configuration, and implementation patterns used to ensure the reliability of the DriveFlow platform.

---

## 1. Overview
DriveFlow utilizes a modern testing stack designed for speed and type safety. We prioritize **Integration Testing** for our tRPC backend and **Component Testing** for our React frontend to ensure that the "user journey"—from searching to downloading an invoice—is seamless.

---

## 2. Technical Stack
- **Test Runner**: `Vitest` (Blazing fast Vite-native runner)
- **DOM Testing**: `React Testing Library` (User-centric component testing)
- **Mocking Library**: `Vitest Spies & Mocks`
- **Environment**: `jsdom` (Simulating browser APIs in Node.js)

---

## 3. Core Testing Strategies

### A. Testing Asynchronous UI (Portals & Dialogs)
Since DriveFlow uses **Chakra UI v3**, many components (like Invoices) are rendered in Portals outside the main DOM tree.
- **The `findBy` Pattern**: We use `await screen.findByRole(...)` to handle the asynchronous entry animations of Dialogs.
- **Flexible Matchers**: We use Regex (e.g., `/download pdf/i`) to ensure tests don't break due to minor text changes or nested icons inside buttons.

### B. Mocking Third-Party Libraries
For complex browser features that don't exist in `jsdom` (like PDF generation), we use sophisticated mocks:
- **Constructor Mocking**: To handle `new jsPDF()`, we use regular function mocks instead of arrow functions to satisfy JavaScript's constructor requirements.
- **Dynamic Import Mocking**: We mock `html2canvas` and `jspdf` globally to prevent actual document rendering during test runs, which significantly increases test speed.



---

## 4. Implementation Examples

### Component Interaction Test
This snippet demonstrates how we test the Invoice download flow, ensuring we handle the state updates correctly:

```tsx
it("calls the download function when 'Download PDF' is clicked", async () => {
  render(<PaymentDashboard />);
  
  // Open the dialog
  const invoiceBtn = screen.getByRole("button", { name: /invoice/i });
  fireEvent.click(invoiceBtn);

  // Find the button inside the portal
  const downloadBtn = await screen.findByRole("button", { name: /download pdf/i });
  
  // Wrap in act to handle React state transitions
  await act(async () => {
    fireEvent.click(downloadBtn);
  });

  expect(html2canvasSpy).toHaveBeenCalled();
});
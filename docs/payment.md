# 💳 Payment & Invoicing Documentation

This document outlines the financial infrastructure of DriveFlow, including Stripe integration, transaction security, and the automated invoicing system.

---

## 1. Overview
The Payment module is responsible for processing rental fees and maintaining a transparent record of all financial transactions.It converts "Pending" bookings into "Confirmed" reservations upon successful payment and provides users with professional, downloadable tax invoices.

---

## 2. Technical Stack
    - ** Gateway **: `Stripe`(Payment processing)
        - ** PDF Generation **: `jspdf` & `html2canvas`(Client - side document rendering)
            - ** API **: `tRPC`(Handling transaction history and status updates)
                - ** Dynamic Imports **: React `lazy` and dynamic `import()` for heavy PDF libraries.

---

## 3. Core Functionality

### A.Stripe Integration Workflow
DriveFlow utilizes Stripe to handle sensitive payment information securely, ensuring the platform remains PCI - compliant.
1. ** Checkout Session **: When a booking is initiated, the server creates a Stripe Checkout Session with the`totalPrice` and`bookingId`.
2. ** Redirection **: The user is redirected to Stripe’s hosted payment page.
3. ** Webhook / Callback **: Upon success, Stripe redirects the user back to DriveFlow.The system then updates the `Booking` status to `CONFIRMED` and the `Payment` status to`PAID`.

### B.Client - Side Invoicing
To minimize server load and storage costs, invoices are generated directly in the user's browser.
1. ** Visual Template **: A hidden or modal - based React component renders the invoice layout using Tailwind CSS.
2. ** DOM to Image **: `html2canvas` captures the rendered HTML of the invoice.
3. ** Image to PDF **: `jsPDF` creates an A4 document and embeds the image as a high - definition PDF layer.



---

## 4. Implementation Logic

### Dynamic PDF Library Loading
To maintain a high "Lighthouse" performance score, the heavy PDF generation libraries are not included in the main bundle.They are loaded only when the user clicks the "Download" button:

```typescript
// Example of dynamic loading used in our component
const handleDownload = async () => {
  const [jsPDF, html2canvas] = await Promise.all([
    import("jspdf"),
    import("html2canvas")
  ]);
  // Document generation logic follows...
};
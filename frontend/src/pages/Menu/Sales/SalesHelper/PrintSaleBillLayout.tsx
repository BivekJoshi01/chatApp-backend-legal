interface BillData {
  cartItems: any[];
  subTotal: number;
  tax: number;
  vatPercent: number;
  isVATChecked: boolean;
  discountAmount: number;
  discountPercent: number;
  discountValue: number;
  isDISCOUNTChecked: boolean;
  grandTotal: number;
}

export const PrintSaleBillLayout = ({
  billData,
  logoBase64,
  customerName
}: {
  billData: BillData;
  logoBase64: string;
  customerName:string
}) => {
  return `
    <html>
      <head>
        <title>Print Bill</title>
        <style>
          body {
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            padding: 40px;
            color: #1f2937;
            font-size: 14px;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .company-info {
            text-align: right;
          }
          .company-info h1 {
            margin: 0;
            font-size: 20px;
            font-weight: bold;
          }
          .company-info p {
            margin: 2px 0;
          }
          .divider {
            border-top: 1px solid #ccc;
            margin: 20px 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }
          th, td {
            border: 1px solid #d1d5db;
            padding: 8px;
          }
          th {
            background-color: #f3f4f6;
            font-weight: bold;
            text-align: left;
          }
          td:last-child, th:last-child {
            text-align: center;
          }
          .totals {
            margin-top: 30px;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .totals-row {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 4px;
          }
          .totals-row:last-child {
            font-weight: bold;
            color: #111827;
            border-bottom: none;
          }
          .center {
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="${logoBase64}" width="120" height="90" alt="Company Logo" />
          <div class="company-info">
            <h1>Universal Stationery Suppliers</h1>
            <p>Balambu 12, Kathmandu, Nepal</p>
            <p>Email: universal@stationery.com</p>
            <p>Phone: +977-01-5555555</p>
            <p>www.universalstationery.com.np</p>
          </div>
        </div>

        <div class="divider"></div>

        <div class="info" style="display: flex; justify-content: space-between;">
          <p><strong>Bill No:</strong> Q-2025-001</p>
          <p><strong>Date:</strong> 2025-02-02</p>
        </div>

          <div class="info" style="display: flex; justify-content: space-between;">
          <p>Bill To : <strong>${customerName}</strong></p>
          <p><strong>CustomerID: </strong> ATGHV65</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Unit</th>
              <th>Qty</th>
              <th>Rate (Rs)</th>
              <th>Total (Rs)</th>
            </tr>
          </thead>
          <tbody>
            ${billData.cartItems
      .map(
        (item, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${item.productName}</td>
                <td>${item.unit}</td>
                <td>${item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${item.totalPrice.toFixed(2)}</td>
              </tr>
            `
      )
      .join("")}
          </tbody>
        </table>

        <div class="totals">
          <div class="totals-row">
            <span>Sub Total</span>
            <span>Rs. ${billData.subTotal.toFixed(2)}</span>
          </div>

      <div class="totals-row">
          <span>VAT (${billData.isVATChecked ? billData.vatPercent : 0}%)</span>
          <span>Rs. ${billData.tax.toFixed(2)}</span>
      </div>

          ${billData.isDISCOUNTChecked
      ? `<div class="totals-row">
                  <span>Discount (${billData.discountAmount > 0
        ? `Amt`
        : `${billData.discountPercent}%`
      })</span>
                  <span>Rs. ${billData.discountValue.toFixed(2)}</span>
                </div>`
      : ""
    }
          <div class="totals-row">
            <span>Grand Total</span>
            <span>Rs. ${billData.grandTotal.toFixed(2)}</span>
          </div>
        <div class="center">By: <b>Sanjeev Shrestha</b></div>
        <div class="center">Thanks for shopping with us!</div>
        <div class="center">
          We hope our stationery adds a spark to your creativity.
        </div>
        </div>
      </body>
    </html>
  `;
};

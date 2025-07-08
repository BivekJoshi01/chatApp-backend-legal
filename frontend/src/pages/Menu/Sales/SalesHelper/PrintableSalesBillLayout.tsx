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

export const PrintableSalesBillLayout = ({
  billData,
  logoBase64,
  customerName,
}: {
  billData: BillData;
  logoBase64: string;
  customerName:string;
}) => {
  return `
    <html>
      <head>
        <title>Receipt</title>
        <style>
          body {
            font-family: monospace;
            font-size: 12px;
            width: 58mm;
            padding: 0;
            margin: 0;
          }
          .center {
            text-align: center;
          }
          img {
            max-width: 80px;
            margin-bottom: 4px;
          }
          .divider {
            border-top: 1px dashed #000;
            margin: 4px 0;
          }
          .items td {
            padding: 2px 0;
          }
          .totals {
            margin-top: 8px;
          }
          .totals-row {
            display: flex;
            justify-content: space-between;
            margin: 2px 0;
          }
        </style>
      </head>
      <body>
        <div class="center">
          <img src="${logoBase64}" alt="Logo" />
          <div><strong>Universal Stationery</strong></div>
          <div>Balambu 12, Kathmandu</div>
          <div>+977-01-5555555</div>
          <div>www.universalstationery.com.np</div>
        </div>

        <div class="divider"></div>

        <div>
          <div>Bill No: Q-2025-001</div>
          <div>Date: ${new Date().toLocaleDateString()}</div>
        </div>
        <div>
          <div>Bill To: <b>${customerName}</b></div>
        </div>

        <div class="divider"></div>

        <table class="items" width="100%">
          <tbody>
            ${billData.cartItems
      .map(
        (item, index) => `
              <tr>
                <td colspan="3">${index + 1}. ${item.productName}</td>
              </tr>
              <tr>
                <td>${item.quantity} x ${item.price.toFixed(2)}</td>
                <td align="right">${item.unit}</td>
                <td align="right">${item.totalPrice.toFixed(2)}</td>
              </tr>
            `
      )
      .join("")}
          </tbody>
        </table>

        <div class="divider"></div>

        <div class="totals">
          <div class="totals-row">
            <span>Sub Total:</span>
            <span>Rs. ${billData.subTotal.toFixed(2)}</span>
          </div>

          ${billData.isVATChecked
      ? `<div class="totals-row">
                  <span>VAT (${billData.vatPercent}%):</span>
                  <span>Rs. ${billData.tax.toFixed(2)}</span>
                </div>`
      : ""
    }

          ${billData.isDISCOUNTChecked
      ? `<div class="totals-row">
                  <span>Discount:</span>
                  <span>Rs. ${billData.discountValue.toFixed(2)}</span>
                </div>`
      : ""
    }

          <div class="totals-row" style="font-weight: bold;">
            <span>Grand Total:</span>
            <span>Rs. ${billData.grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <div class="divider"></div>
        <div class="center">By: <b>Sanjeev Shrestha</b></div>
        <div class="center">Thanks for shopping with us!</div>
        <div class="center">**Customer Copy**</div>
      </body>
    </html>
  `;
};

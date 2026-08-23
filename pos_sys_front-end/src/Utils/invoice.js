import { settingsService } from '../services/settingsService.js'
import { formatCurrency } from './currency.js'

const KHR_RATE = 4000

export function printInvoice(order, cashier = '') {
  const settings = settingsService.get()

  const lines = order.items
    .map(
      (item) => `
        <tr>
          <td>${item.name}</td>
          <td class="center">${item.quantity}</td>
          <td class="right">${formatCurrency(item.price)}</td>
          <td class="right">${formatCurrency(item.price * item.quantity)}</td>
        </tr>`,
    )
    .join('')

  const khr = Math.round(Number(order.total) * KHR_RATE)
  const khrFormatted = '\u17DB' + new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(khr)

  const qrData = encodeURIComponent(settings.phone || settings.storeName)

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Receipt ${order.id}</title>
    <style>
      @page { size: 80mm auto; margin: 0; }
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; }
      body {
        font-family: -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        width: 80mm; margin: 0 auto; color: #2b2b2b; font-size: 12px;
        background: #fff; line-height: 1.35;
      }
      .logo { text-align: center; padding-bottom: 10px; }
      .logo svg { margin-bottom: 6px; }
      .store-name { font-size: 19px; font-weight: 800; letter-spacing: 0.5px; color: #1f7a4d; }
      .store-line { font-size: 11px; color: #5f7268; margin-top: 2px; }
      .divider { border: 0; border-top: 1px dashed #a9cfb9; margin: 8px 0; }
      .details { width: 100%; font-size: 11px; color: #5f7268; }
      .details td { padding: 1px 0; }
      .right { text-align: right; }
      .items { width: 100%; border-collapse: collapse; margin-top: 4px; }
      .items th {
        border-bottom: 1px solid #1f7a4d; color: #1f7a4d; font-size: 11px;
        letter-spacing: 0.5px; padding: 4px 0; text-align: left; text-transform: uppercase;
      }
      .items td { padding: 5px 0; border-bottom: 1px dotted #c6ddcf; vertical-align: top; }
      .items small { display: block; color: #7a9384; font-size: 10px; }
      .center { text-align: center; }
      .totals { width: 100%; margin-top: 6px; }
      .totals td { padding: 2px 0; }
      .grand { font-size: 15px; font-weight: 800; color: #1f7a4d; }
      .grand-amount { font-size: 17px; font-weight: 800; }
      .grand .right, .grand-amount { color: #1f7a4d; }
      .qr { text-align: center; margin-top: 12px; padding-top: 10px; }
      .qr img { width: 130px; height: 130px; }
      .qr-label {
        font-size: 12px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;
        color: #1f7a4d; margin-top: 6px;
      }
      .footer { text-align: center; font-size: 12px; color: #5f7268; padding-top: 10px; }
      @media print {
        body { width: auto; }
      }
    </style>
  </head>
  <body>
    <div class="logo">
      <svg width="86" height="86" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="cupBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#2f9a63"/>
            <stop offset="1" stop-color="#1c5c3a"/>
          </linearGradient>
        </defs>
        <circle cx="48" cy="48" r="48" fill="url(#cupBg)"/>
        <circle cx="48" cy="48" r="43" fill="none" stroke="#e0efe6" stroke-width="1.2" opacity="0.7"/>
        <path d="M33 25 q-3 -6 0 -11" fill="none" stroke="#e0efe6" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M41 25 q-3 -6 0 -11" fill="none" stroke="#e0efe6" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M49 25 q-3 -6 0 -11" fill="none" stroke="#e0efe6" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M29 42 h24 v15 a8 8 0 0 1 -8 8 h-8 a8 8 0 0 1 -8 -8 z" fill="#e0efe6"/>
        <path d="M53 46 h4 a6 6 0 0 1 0 12 h-4" fill="none" stroke="#e0efe6" stroke-width="4.5" stroke-linecap="round"/>
        <ellipse cx="41" cy="68" rx="24" ry="6" fill="#bcddc8"/>
      </svg>
      <div class="store-name">${settings.storeName}</div>
      <div class="store-line">${settings.address}</div>
      <div class="store-line">Tel: ${settings.phone}</div>
    </div>
    <hr class="divider" />
    <table class="details">
      <tr><td>DATE: ${new Date(order.createdAt).toLocaleString()}</td><td class="right">CASHIER: ${cashier || 'Staff'}</td></tr>
      <tr><td>INVOICE: ${order.id}</td><td class="right">PAYMENT: ${order.paymentMethod}</td></tr>
    </table>
    <hr class="divider" />
    <table class="items">
      <thead>
        <tr><th>Item</th><th class="center">Qty</th><th class="right">Price</th><th class="right">Total</th></tr>
      </thead>
      <tbody>${lines}</tbody>
    </table>
    <table class="totals">
      <tr class="grand">
        <td>Grand Total (USD)</td>
        <td class="right grand-amount">${formatCurrency(order.total)}</td>
      </tr>
      <tr class="grand">
        <td>Grand Total (KHR)</td>
        <td class="right grand-amount">${khrFormatted}</td>
      </tr>
    </table>
    <div class="qr">
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${qrData}" alt="Scan to pay" />
      <div class="qr-label">Scan to Pay</div>
    </div>
    <hr class="divider" />
    <div class="footer">${settings.receiptFooter}</div>
    <script>window.onload = function () { window.print(); }</script>
  </body>
</html>`

  const win = window.open('', '_blank', 'width=420,height=600')
  if (!win) {
    alert('Please allow pop-ups to print the invoice.')
    return
  }
  win.document.write(html)
  win.document.close()
}

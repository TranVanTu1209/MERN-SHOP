export const addPayPalScript = (pCId) => {
  document.body.insertAdjacentHTML(
    "beforeend",
    `<script src="https://www.paypal.com/sdk/js?client-id=${pCId}" async></script>`
  );
};

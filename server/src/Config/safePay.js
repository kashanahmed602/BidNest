const SafePay = require('@sfpy/node-core');

const safePay = SafePay(process.env.SAFEPAY_SECRET_KEY, {
    authType: "secret",
    host: "https://sandbox.api.getsafepay.com",
});

module.exports = safePay;
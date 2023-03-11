// API URL entry points
export const BASEURL = "http://13.58.121.111:8080";
export const ENDPOINTS = {
    PAYMENTS: "/payments",
    USERS: "/users",
};
export const PAYMENT_LABEL = {
    sender: "SENDER",
    receiver: "RECEIVER",
    amount: "AMOUNT",
    currency: "CURRENCY",
};
// PaymentCreation.js
export const PAYMENT_FILTER_LABEL = [
    { value: "id", label: "ID", isFixed: true },
    { value: "date", label: "Date", isFixed: true },
    { value: "sender", label: "Sender", isFixed: true },
    { value: "receiver", label: "Receiver", isFixed: true },
    { value: "amount", label: "Amount", isFixed: true },
    { value: "currency", label: "Currency", isFixed: true },
    { value: "memo", label: "Memo", isFixed: true },
];

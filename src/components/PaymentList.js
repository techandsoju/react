import React, { useState } from 'react'
import { useSelector } from 'react-redux';
const paymentLabels =
{
    sender: "SENDER",
    receiver: "RECEIVER",
    amount: "AMOUNT",
    currency: "CURRENCY"
};

const DISPLAY_LIMIT = 25;

function PaymentList() {

    const paymentsObj = useSelector(
        (state) => state.payments
    )

    const payments = paymentsObj.values;
    let filterPayments = [];
    const filter = paymentsObj.filter;

    console.log(filter)

    filterPayments = payments.filter((payment) => {
        return (
            payment?.id?.toString().includes(filter) ||
            payment?.date?.includes(filter) ||
            payment?.sender?.id?.toString().includes(filter) ||
            payment?.sender?.name?.toLowerCase().includes(filter) ||
            payment?.receiver?.id?.toString().includes(filter) ||
            payment?.receiver?.name?.toLowerCase().includes(filter) ||
            payment?.amount?.toString().includes(filter) ||
            payment?.currency?.toString().toLowerCase().includes(filter) ||
            payment?.memo?.toString().toLowerCase().includes(filter)
        ) ?? true
    })
    return (
        <>
            <div className="drop-shadow-md">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>{paymentLabels.sender}</th>
                            <th>{paymentLabels.receiver}</th>
                            <th>{paymentLabels.amount}</th>
                            <th>{paymentLabels.currency}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (filter ? filterPayments : payments)?.map((payment, displayCount) => (

                                displayCount < DISPLAY_LIMIT ?
                                    <tr key={payment.id}>
                                        <th className="w-0"></th>
                                        <td className="h-10 w-96">{payment.sender?.name}</td>
                                        <td className="h-10 w-96">{payment.receiver?.name}</td>
                                        <td className="h-10 w-48">{payment?.amount}</td>
                                        <td className="h-10 w-48">{payment?.currency}</td>
                                    </tr>
                                    : null
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default PaymentList;
import React, { useMemo, useEffect } from "react";

import PaymentSearch from "./PaymentSearch";
import PaymentFilters from "./PaymentFilters";

import { BASEURL, ENDPOINTS } from "../../constants";

import PaymentList from "./PaymentList";

export default function Payments() {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [paymentList, setPaymentList] = React.useState([]);
    const [selectedFilters, setSelectedFilters] = React.useState([]);

    useEffect(() => {
        async function fetchPayments() {
            const response = await fetch(`${BASEURL}${ENDPOINTS.PAYMENTS}`);
            const { data: payment } = await response.json();
            setPaymentList([payment, ...paymentList]);
        }

        const intervalId = setInterval(() => fetchPayments(), 5000);

        return () => clearInterval(intervalId);
    }, [paymentList]);

    const selectedFiltersValues = useMemo(
        () => selectedFilters?.map((filter) => filter.value),
        [selectedFilters]
    );

    let filteredPaymentList = [];

    if (selectedFiltersValues.length > 0) {
        filteredPaymentList = paymentList.filter((el) => {
            let match = false;
            selectedFiltersValues.forEach((category) => {
                switch (category) {
                    case "id":
                        if (el.id.toLowerCase().includes(searchQuery)) {
                            match = true;
                        }
                        break;
                    case "date":
                        if (el.date.includes(searchQuery)) {
                            match = true;
                        }
                        break;
                    case "sender":
                        if (
                            el.sender.id
                                .toString()
                                .toLowerCase()
                                .includes(searchQuery) ||
                            el.sender.name.toLowerCase().includes(searchQuery)
                        ) {
                            match = true;
                        }
                        break;
                    case "receiver":
                        if (
                            el.receiver?.id
                                .toString()
                                .toLowerCase()
                                .includes(searchQuery) ||
                            el.receiver?.name
                                ?.toLowerCase()
                                .includes(searchQuery)
                        ) {
                            match = true;
                        }
                        break;
                    case "amount":
                        if (el.amount?.toLowerCase().includes(searchQuery)) {
                            match = true;
                        }
                        break;
                    case "currency":
                        if (el.currency.toLowerCase().includes(searchQuery)) {
                            match = true;
                        }
                        break;
                    case "memo":
                        if (el.memo.toLowerCase().includes(searchQuery)) {
                            match = true;
                        }
                        break;
                    default:
                        break;
                }
            });
            return match;
        });
    } else {
        filteredPaymentList = paymentList.filter(
            (el) =>
                el.amount.toLowerCase().includes(searchQuery) ||
                el.currency.toLowerCase().includes(searchQuery) ||
                el.id.toLowerCase().includes(searchQuery) ||
                el.memo.toLowerCase().includes(searchQuery) ||
                el.receiver.id.toString().toLowerCase().includes(searchQuery) ||
                el.receiver.name.toLowerCase().includes(searchQuery) ||
                el.sender.id.toString().toLowerCase().includes(searchQuery) ||
                el.sender.name.toLowerCase().includes(searchQuery)
        );
    }

    return (
        <div>
            <PaymentSearch
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            />
            <PaymentFilters
                value={selectedFilters}
                onChange={(newFilters) => setSelectedFilters(newFilters)}
            />
            <PaymentList items={filteredPaymentList} />
        </div>
    );
}

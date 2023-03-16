import React, { useMemo } from "react";

import PaymentSearch from "./PaymentSearch";
import PaymentFilters from "./PaymentFilters";

import { BASEURL, ENDPOINTS } from "../../constants";

import { FixedSizeList as List } from "react-window";

const ListItem = ({ data, index, style }) => {
    return <li style={style}>{data[index].currency}</li>;
};

const PaymentList = React.memo(({ items }) => (
    <List
        outerElementType="div"
        innerElementType="ul"
        itemData={items}
        height={150}
        itemCount={items.length}
        itemSize={35}
        width={300}
    >
        {ListItem}
    </List>
));

export default function Payments() {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [paymentList, setPaymentList] = React.useState([]);
    const [filters, setFilters] = React.useState([]);

    React.useEffect(() => {
        async function fetchPayments() {
            const response = await fetch(`${BASEURL}${ENDPOINTS.PAYMENTS}`);
            const { data: payment } = await response.json();
            setPaymentList([payment, ...paymentList]);
        }

        const intervalId = setInterval(() => fetchPayments(), 5000);

        return () => clearInterval(intervalId);
    }, [paymentList]);

    const filteredPaymentList = useMemo(
        () =>
            paymentList.filter(
                (el) =>
                    el.amount
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    el.currency
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    el.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    el.memo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    el.receiver.id
                        .toString()
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    el.receiver.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    el.sender.id
                        .toString()
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    el.sender.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
            ),
        [paymentList, searchQuery]
    );

    return (
        <div>
            <PaymentSearch
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <PaymentFilters />
            <PaymentList items={filteredPaymentList} />
        </div>
    );
}

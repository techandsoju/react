import { useSelector } from "react-redux";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import "../styles.css";
import { PAYMENT_LABEL } from "../constants";

const DISPLAY_LIMIT = 25;
const NUM_OF_COLUMN = 4;

function PaymentList() {
    // Get payment and filter data from redux PaymentsSlice.js
    const paymentsObj = useSelector((state) => state.payments);
    const filterCategories = paymentsObj.filterCategories;

    const payments = paymentsObj.values;
    let filterPayments = [];
    const filter = paymentsObj.filter;

    console.log(filter);
    if (filter.length > 0 && filterCategories.length > 0) {
        /**
         * TODO's Get Filter payments by selected filterCategories
         * Not fully working, still figuring this out
         */
        console.log(`filterCategory: ${filterCategories}`);
        filterPayments = payments.filter(
            ({ id, date, sender, receiver, amount, currency, memo }) => {
                let match = false;
                filterCategories.forEach((category) => {
                    switch (category) {
                        case "id":
                            if (id?.toString().includes(filter) ?? true) {
                                match = true;
                            }
                            break;
                        case "date":
                            if (date?.includes(filter) ?? true) {
                                match = true;
                            }
                            break;
                        case "sender":
                            if (
                                (sender?.id?.toString().includes(filter) ||
                                    sender?.name
                                        ?.toLowerCase()
                                        .includes(filter)) ??
                                true
                            ) {
                                match = true;
                            }
                            break;
                        case "receiver":
                            if (
                                (receiver?.id?.toString().includes(filter) ||
                                    receiver?.name
                                        ?.toLowerCase()
                                        .includes(filter)) ??
                                true
                            ) {
                                match = true;
                            }
                            break;
                        case "amount":
                            if (amount?.toString().includes(filter)) {
                                match = true;
                            }
                            break;
                        case "currency":
                            if (
                                currency
                                    ?.toString()
                                    .toLowerCase()
                                    .includes(filter) ??
                                true
                            ) {
                                match = true;
                            }
                            break;
                        case "memo":
                            if (
                                memo
                                    ?.toString()
                                    .toLowerCase()
                                    .includes(filter) ??
                                true
                            ) {
                                match = true;
                            }
                            break;
                        default:
                            break;
                    }
                });
                return match;
            }
        );
    } else if (filter.length > 0) {
        filterPayments = payments.filter(
            ({ id, date, sender, receiver, amount, currency, memo }) => {
                return (
                    (id?.toString().includes(filter) ||
                        date?.includes(filter) ||
                        sender?.id?.toString().includes(filter) ||
                        sender?.name?.toLowerCase().includes(filter) ||
                        receiver?.id?.toString().includes(filter) ||
                        receiver?.name?.toLowerCase().includes(filter) ||
                        amount?.toString().includes(filter) ||
                        currency?.toString().toLowerCase().includes(filter) ||
                        memo?.toString().toLowerCase().includes(filter)) ??
                    true
                );
            }
        );
    }

    const CellHeader = ({ columnIndex, rowIndex, style }) => (
        <div className="GridItemEven" style={style}>
            <b>
                {rowIndex === 0 && columnIndex === 0
                    ? PAYMENT_LABEL.sender
                    : columnIndex === 1
                    ? PAYMENT_LABEL.receiver
                    : columnIndex === 2
                    ? PAYMENT_LABEL.amount
                    : columnIndex === 3
                    ? PAYMENT_LABEL.currency
                    : null}
            </b>
        </div>
    );

    const Cell = ({ columnIndex, rowIndex, style }) => (
        <div
            className={rowIndex % 2 === 0 ? "GridItemOdd" : "GridItemEven"}
            style={style}
        >
            {columnIndex === 0
                ? (filter ? filterPayments : payments)[rowIndex].sender?.name
                : columnIndex === 1
                ? (filter ? filterPayments : payments)[rowIndex].receiver?.name
                : columnIndex === 2
                ? (filter ? filterPayments : payments)[rowIndex].amount
                : columnIndex === 3
                ? (filter ? filterPayments : payments)[rowIndex].currency
                : null}
        </div>
    );

    return (
        <>
            <AutoSizer>
                {({ height, width }) => (
                    <>
                        <Grid
                            className="Grid"
                            columnCount={NUM_OF_COLUMN}
                            columnWidth={width / NUM_OF_COLUMN - 1}
                            height={37}
                            rowCount={1}
                            rowHeight={35}
                            width={width - 2}
                        >
                            {CellHeader}
                        </Grid>
                        <Grid
                            className="Grid"
                            columnCount={NUM_OF_COLUMN}
                            columnWidth={width / NUM_OF_COLUMN - 1}
                            height={877}
                            rowCount={DISPLAY_LIMIT}
                            rowHeight={35}
                            width={width - 2}
                        >
                            {Cell}
                        </Grid>
                    </>
                )}
            </AutoSizer>
        </>
    );
}

export default PaymentList;

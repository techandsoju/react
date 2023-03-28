import { TR, TD } from "./PaymentList";

export default function PaymentListItem({ data, index }) {
    return (
        <TR>
            <TD>{data[index].id}</TD>
            <TD>{data[index].sender.name}</TD>
            <TD>{data[index].receiver.name}</TD>
            <TD>{data[index].currency}</TD>
            <TD>{data[index].amount}</TD>
            <TD>{data[index].memo}</TD>
        </TR>
    );
}

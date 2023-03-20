export default function PaymentListItem({ data, index }) {
    return (
        <li style={{ padding: 12 }}>
            {data[index].currency}
            {data[index].amount}
            {data[index].id}
            {data[index].memo}
            {data[index].receiver.name}
            {data[index].sender.name}
            {data[index].currency}
        </li>
    );
}

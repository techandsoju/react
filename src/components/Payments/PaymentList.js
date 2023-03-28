import { memo, forwardRef } from "react";
import { FixedSizeList as List } from "react-window";

import PaymentListItem from "./PaymentListItem";

const TH = ({ children }) => (
    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
        {children}
    </th>
);

export const TR = ({ children }) => (
    <tr className="h-[40px] m-0">{children}</tr>
);

export const TD = ({ children }) => (
    <td className="border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 m-0">
        {children}
    </td>
);

const Inner = forwardRef(function Inner({ children, ...rest }, ref) {
    return (
        <div>
            <table className="table-fixed text-sm">
                <thead>
                    <TR>
                        <TH>Id</TH>
                        <TH>Sender</TH>
                        <TH>Receiver</TH>
                        <TH>Currency</TH>
                        <TH>Amount</TH>
                        <TH>Memo</TH>
                    </TR>
                </thead>
                <tbody
                    {...rest}
                    ref={ref}
                    className="bg-white dark:bg-slate-800"
                >
                    {children}
                </tbody>
            </table>
        </div>
    );
});

function PaymentList({ items }) {
    return (
        <List
            innerElementType={Inner}
            itemData={items}
            height={600}
            itemCount={items.length}
            itemSize={40}
            width={700}
        >
            {PaymentListItem}
        </List>
    );
}

export default memo(PaymentList);

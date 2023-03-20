import { memo } from "react";
import { FixedSizeList as List } from "react-window";

import PaymentListItem from "./PaymentListItem";

function PaymentList({ items }) {
    return (
        <List
            outerElementType="div"
            innerElementType="ul"
            itemData={items}
            height={600}
            itemCount={items.length}
            itemSize={35}
            width={600}
        >
            {PaymentListItem}
        </List>
    );
}

export default memo(PaymentList);

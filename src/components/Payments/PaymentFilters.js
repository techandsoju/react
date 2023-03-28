import Select from "react-select";

import { PAYMENT_FILTER_LABEL } from "../../constants";

export default function PaymentFilters({ value, onChange }) {
    return (
        <Select
            closeMenuOnSelect={false}
            defaultValue={PAYMENT_FILTER_LABEL}
            isMulti
            name="paymentFilter"
            value={value}
            onChange={onChange}
            options={PAYMENT_FILTER_LABEL}
            className="basic-multi-select"
            classNamePrefix="select"
        />
    );
}

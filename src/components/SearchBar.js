import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
    setFilter,
    setFilterCategories,
} from "../features/payments/paymentsSlice";
import { PAYMENT_FILTER_LABEL } from "../constants";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

function SearchBar() {
    const dispatch = useDispatch();

    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSelectChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
        console.log(
            `set categories filter: ${selectedOptions.map(
                (option) => option.value
            )}`
        );
        dispatch(
            setFilterCategories(selectedOptions.map((option) => option.value))
        );
    };

    return (
        <>
            <div className="items-center m-3 ">
                <label htmlFor="simple-search" className="sr-only">
                    Search
                </label>
                <div className="relative w-full">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="simple-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search: Payment ID, Date, Sender, Receiver, Amount, Currency..."
                        onChange={(event) =>
                            dispatch(
                                setFilter(event.target.value.toLowerCase())
                            )
                        }
                    />
                </div>
            </div>
            <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={PAYMENT_FILTER_LABEL}
                isMulti
                name="paymentFilter"
                value={selectedOptions}
                onChange={handleSelectChange}
                options={PAYMENT_FILTER_LABEL}
                className="basic-multi-select"
                classNamePrefix="select"
            />
        </>
    );
}

export default SearchBar;

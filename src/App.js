import { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import { BASEURL, ENDPOINTS } from "./constants";
import PaymentList from "./components/PaymentList";
import SearchBar from "./components/SearchBar";
import PaymentCreation from "./components/PaymentCreation";
import { addPayments } from "./features/payments/paymentsSlice";
import { BASEURL, ENDPOINTS } from "./constants";

function App() {
    const [validUsers, setValidUsers] = useState([]);

    // Redux
    const dispatch = useDispatch();

    // Get payments api endpoint
    const updateState = useCallback(async () => {
        const response = await fetch(`${BASEURL}${ENDPOINTS.PAYMENTS}`);
        const data = await response.json();

        dispatch(addPayments(data?.data));
    }, []);

    // Polling a payment transaction data every second.
    useEffect(() => {
        const interval = setInterval(updateState, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    // Get users api endpoint
    const getVaildUsersState = useCallback(async () => {
        const response = await fetch(`${BASEURL}${ENDPOINTS.USERS}`);
        const data = await response.json();
        setValidUsers(data?.data);
    }, []);

    useEffect(() => {
        getVaildUsersState();
    }, []);

    return (
        <>
            <div className="flex flex-col w-full lg:flex-row bg-base-300 bg-gradient-to-tr from-gray-400 via-gray-400 to-gray-600">
                <div className="grid flex-grow h-screen place-items-center">
                    <PaymentCreation users={validUsers} />
                </div>
                <div className="flex-grow h-screen p-5">
                    <SearchBar />
                    <PaymentList />
                </div>
            </div>
        </>
    );
}

export default App;

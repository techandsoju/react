import { useCallback, useState, useEffect } from "react";
import { BASEURL, ENDPOINTS } from "./constants";

import PaymentCreation from "./components/PaymentCreation";
import Payments from "./components/Payments/Payments";

function App() {
    const [validUsers, setValidUsers] = useState([]);

    // Get users api endpoint
    const getVaildUsersState = useCallback(async () => {
        const response = await fetch(`${BASEURL}${ENDPOINTS.USERS}`);
        const data = await response.json();
        setValidUsers(data?.data);
    }, []);

    useEffect(() => {
        getVaildUsersState();
    }, [getVaildUsersState]);

    return (
        <>
            <div className="flex flex-row justify-between px-16 w-full lg:flex-row bg-base-300 bg-gradient-to-tr from-gray-400 via-gray-400 to-gray-600 h-screen">
                <div className="grid place-items-center">
                    <PaymentCreation users={validUsers} />
                </div>
                <div>
                    <Payments />
                </div>
            </div>
        </>
    );
}

export default App;

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
            <div className="flex flex-col w-full lg:flex-row bg-base-300 bg-gradient-to-tr from-gray-400 via-gray-400 to-gray-600">
                <div className="grid flex-grow h-screen place-items-center">
                    <PaymentCreation users={validUsers} />
                </div>
                <Payments />
            </div>
        </>
    );
}

export default App;

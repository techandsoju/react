import { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import PaymentList from './components/PaymentList';
import SearchBar from './components/SearchBar';
import PaymentCreation from './components/PaymentCreation'
import { addPayments } from './features/payments/paymentsSlice';

function App() {

  const BASEURL = "http://localhost:8080"
  const ENDPOINTS = {
    PAYMENTS: "/payments",
    USERS: "/users"
  };

  const [validUsers, setValidUsers] = useState([]);

  // Redux  
  const dispatch = useDispatch()

  // Get payments api endpoint
  const updateState = useCallback(async () => {
    const response = await fetch(`${BASEURL}${ENDPOINTS.PAYMENTS}`);
    const data = await response.json();

    dispatch(addPayments(data?.data));
   
  }, []);

  // Get users api endpoint
  const getVaildUsersState = useCallback(async () => {
    const response = await fetch(`${BASEURL}${ENDPOINTS.USERS}`);
    const data = await response.json();
    console.log("getusers")
    setValidUsers(data?.data)
  }, []);

  useEffect(() => {
    getVaildUsersState()
  },[]);


  useEffect(() => {
    const interval = setInterval(updateState, 1000);

    return () => {
      console.log(`clearing interval`);
      clearInterval(interval);
    };

  }, [updateState]);

  return (
    <>

      <div className="flex flex-col w-full lg:flex-row bg-base-300 bg-gradient-to-tr from-gray-400 via-gray-400 to-gray-600">
        <div className="grid flex-grow h-screen place-items-center">
          <PaymentCreation users={validUsers}/>
        </div>
        <div className="grid flex-grow h-screen p-5">
          <SearchBar />
          <PaymentList/></div>
      </div>
    </>
  );
}

export default App;
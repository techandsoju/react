import React, { useCallback, useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addPayments } from '../features/payments/paymentsSlice';
import Seedrandom from 'seedrandom';

function PaymentCreation(props) {

    const CURRENCYLABELS = ["BTC", "GBP", "EUR", "JPY", "USD"]

    const [paymentStatus, setPaymentStatus] = useState({});
    const [isPaymentInProgress, setIsPaymentInProgress] = useState(false);
    const [selectedUser, setSelectedUser] = useState("");

    // Redux  
    const dispatch = useDispatch()

    let filteredSelectedUsers = {
        "sender": props.users, "receiver": props.users.filter((user) => {
            return user != props.users[0]
        })
    };

    const [usersData, setUserData] = useState([]);
    
    const postData = useRef({});

    // Got this code from the server to generate seed random for payment ID, 
    // the same tool to use for generating random payment Id from the server GET /payments endpoint
    // Seed a PRNG to use to generate all of our random data.  We seed it from the seconds
    // since the epoch, so that if multiple requests are made within the same clock second,
    // they'll get the same data.  Once we have this PRNG, it's very important that all random
    // data be generated from it.  We then regenerate our date object to be based on seconds
    // so that it stays consistent amongst requests within the same second.
    const nowMS = new Date();
    const epochSeconds = Math.round(nowMS.getTime());
    const prng = new Seedrandom(epochSeconds + "MY_SEED");
    const now = new Date(epochSeconds * 1000);

    // Handle submit from form
    const handleSubmit = (event) => {

        event.preventDefault();

        const paymentId = (Math.round(prng.quick() * 1e16)).toString();
        const paymentDate = now.toISOString();

        const senderSelectedId = parseInt(event.target.sender_user_list.value);
        const senderSelectedIndex = event.target.sender_user_list.selectedIndex;
        const senderSelectedText = event.target.sender_user_list[senderSelectedIndex].text;

        const receiverSelectedId = parseInt(event.target.receiver_user_list.value);
        const receiverSelectedIndex = event.target.receiver_user_list.selectedIndex;
        const receiverSelectedText = event.target.receiver_user_list[receiverSelectedIndex].text;

        const amountValue = event.target.amount.value.toString();
        const currencyValue = event.target.currency.value.toString();
        const memoValue = event.target.memo.value.toString();

        const newPaymentPostData = {
            "id": paymentId,
            "date": paymentDate,
            "sender": {
                "id": senderSelectedId,
                "name": senderSelectedText
            },
            "receiver": {
                "id": receiverSelectedId,
                "name": receiverSelectedText
            },
            "amount": amountValue,
            "currency": currencyValue,
            "memo": memoValue
        }

        postData.current = newPaymentPostData;
    };


    const [avatarInitials1, setAvatarInitials1] = useState("");
    const [avatarInitials2, setAvatarInitials2] = useState("");




    const handleSelectedValue = (event) => {
        console.log(event.target);
        console.log("eventLabel=target name=" + event.target.name + " | value=" + event.target.value + " | text=" + event.target[event.target.selectedIndex].text);

        if (event.target.name == "sender_user_list") {
        
            console.log(event);

            const [firstName1, lastName1] = event.target[event.target.selectedIndex].text.split(" ");
            console.log("firstName="+firstName1,"lastName="+lastName1);
    
            setAvatarInitials1(`${firstName1[0]}${lastName1[0]}`);

            setUserData({
                sender: props.users, receiver: props.users.filter((user) => {
                    console.log("user.id=" + user.id);
                    return (user.id != event.target.value)
                })
            })
        } else if (event.target.name == "receiver_user_list") {
    
            const [firstName2, lastName2] = event.target[event.target.selectedIndex].text.split(" ");
            console.log("firstName="+firstName2,"lastName="+lastName2);

            setAvatarInitials2(`${firstName2[0]}${lastName2[0]}`);
            console.log("event.target.value="+event.target.value);

            setUserData({
                sender: props.users.filter((user) => {
                    return (user.id != event.target.value)
                }), receiver: props.users
            });
        }
    }


    // let postData = { "id": "189821008333268712", "date": "2020-10-07T20:59:37.000Z", "sender": { "id": 100, "name": "Alison Espino" }, "receiver": { "id": 101, "name": "Ariya Hankins" }, "amount": "123.45", "currency": "USD", "memo": "hamburgers and orange juice" };
    const makePayment = useCallback(async () => {

        console.log("OUT THE KNOW")
        console.log(JSON.stringify(postData.current))
        try {
            setIsPaymentInProgress(true);
            console.log("IN THE KNOW")
            console.log(postData.current)
            const res = await fetch("http://localhost:8080/payments", {
                method: "POST",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postData.current),
            });

            // Setting status code and message and invoke function base on different response status code.
            switch (res.status) {
                case 201:
                    // Add to the current payment list
                    dispatch(addPayments(postData.current));
                    setIsPaymentInProgress(false);
                    setPaymentStatus({ statusCode: 201, message: "Your payment was successful!" })
                    console.log("Payment was successful!")
                    break;
                case 400:
                    setIsPaymentInProgress(false);
                    setPaymentStatus({ statusCode: 400, message: "Invalid Input, Please try again." })
                    console.log("Invalid input: " + res.statusText)
                    break;
                case 409:
                    setIsPaymentInProgress(false);
                    setPaymentStatus({ statusCode: 409, message: "You have just made the same payment!" })
                    console.log("Payment id was already used: " + res.statusText)
                    break;
                case 500:
                    setIsPaymentInProgress(false);
                    setPaymentStatus({ statusCode: 500, message: "Genernal internal server error." })
                    console.log("Genernal internal server error: " + res.statusText)
                    break;
                case 503:
                    console.log("Flaky server; please try again: " + res.statusText)

                    // Retry making a payment fetch again.
                    makePayment(postData.current);
                    break;
                default:
                    break;
            }
        } catch (err) {
            console.log(err.message)
        }
    }, []);

    return (
        <>
            <div>
                <div className="w-max bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="avatar indicator placeholder">
                        {
                            // Conditional layout: if payment is in progress for the sender
                            isPaymentInProgress ? <span className="indicator-item badge badge-secondary">sending…</span> :
                                paymentStatus.statusCode == 201 ? <span className="indicator-item badge badge-success">success!</span> : ""
                        }
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                            <span className="text-xl">{avatarInitials1}</span>
                        </div>
                    </div>
                    <ul className="steps">
                        <li className="step step-primary">Make Payment</li>
                        {
                            // Conditional layout: if payment is in progress or successful
                            isPaymentInProgress || paymentStatus.statusCode == 201 ? <li className="step step-primary">In Progress</li> :
                                <li className="step">In Progress</li>
                        }
                        {
                            // Conditional layout: if payment is successful
                            paymentStatus.statusCode == 201 ? <li className="step step-primary">Amount Received</li> :
                                <li className="step">Amount Received</li>
                        }
                    </ul>
                    <div className="avatar indicator placeholder">
                        {
                            // Conditional layout: if payment is in progress or successful for the receiver
                            isPaymentInProgress ? <span className="indicator-item badge badge-secondary">receiving…</span> :
                                paymentStatus.statusCode == 201 ? <span className="indicator-item badge badge-success">success!</span> : ""
                        }
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                            <span className="text-xl">{avatarInitials2}</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Sender</span>
                            </label>
                            <select name="sender_user_list" className="select select-bordered" onChange={handleSelectedValue}>
                                <option disabled defaultValue>Select Valid Sender</option>
                                {
                                    // Populate user labels in the dropdown menu box dynamically for sender.
                                    (usersData.sender ?? filteredSelectedUsers.sender).map((user) => {
                                        return (<option label={user.name} value={user.id} key={user.id}>{user.name}</option>);
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Receiver</span>
                            </label>
                            <select name="receiver_user_list" className="select select-bordered" onChange={handleSelectedValue}>
                                <option disabled defaultValue>Select Valid Receiver</option>
                                {
                                    // Populate user labels in the dropdown menu box dynamically for receiver. 
                                    (usersData.receiver ?? filteredSelectedUsers.receiver).map((user) => {
                                        return (<option value={user.id} key={user.id}>{user.name}</option>);
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Amount</span>
                            </label>
                            <input name="amount" type="number" placeholder="Amount to send" className="input input-bordered w-full" required />
                            <label className="label">
                            </label>
                        </div>
                        <div className="form-control w-full mb-6">
                            <label className="label">
                                <span className="label-text">Currency</span>
                            </label>
                            <select name="currency" className="select select-bordered">
                                <option disabled defaultValue>Select Currency</option>
                                {
                                    // Populate currency labels in the dropdown menu box dynamically.
                                    CURRENCYLABELS.map((currencyLabel) => {
                                        return (<option value={currencyLabel} key={currencyLabel}>{currencyLabel}</option>)
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Memo (Optional)</span>
                            </label>
                            <input name="memo" type="text" placeholder="Memo" className="input input-bordered w-full" />
                            <label className="label">
                            </label>
                        </div>
                        {
                            // Conditional Layout: display loading button when fetching/sending payment is in progress 
                            isPaymentInProgress ? <button type="submit" className="btn btn-block loading">Payment In Progress</button> :
                                <button type="submit" onClick={makePayment} className="btn btn-block">Make Payment</button>
                        }
                    </form>

                </div>
                {
                    // Conditional Layout: display status messages in an alert bubble base on making payment status code
                    paymentStatus.statusCode == 201 ? <div className="alert bg-green-300 shadow-lg mt-5">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{paymentStatus.message}</span>
                        </div>
                    </div> :

                        paymentStatus.statusCode == 409 || paymentStatus.statusCode == 500 || paymentStatus.statusCode == 400 ?
                            <div className="alert bg-red-300 shadow-lg mt-5">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{paymentStatus.message}</span>
                                </div>
                            </div> : ""
                }

            </div>
        </>
    );
};

export default PaymentCreation
import React, { useCallback, useState, useEffect, useRef } from 'react'
import { useGetUsersQuery } from '../features/users/usersAPISlice';

function PaymentDropDown(props) {

    const { data } = useGetUsersQuery()
    console.log("data:")
    console.log(data?.data)

    const usersList = data?.data;


    const initFilteredSelectedUsers = {
        "sender": usersList, "receiver": usersList?.filter((user) => {
            return user !== usersList[0]
        })
    };


    const [filteredSelectedUsers, setFilteredSelectedUsers] = useState([]);

    console.log('filteredSelectedUsers')
    console.log(filteredSelectedUsers.length);

    const handleSelectedValue = (event) => {
        console.log("eventLabel=target name=" + event.target.name + " | value=" + event.target.value);

        if (event.target.name == "sender_user_list") {

            setFilteredSelectedUsers({
                sender: usersList, receiver: usersList?.filter((user) => {
                    console.log("user.id=" + user.id);
                    return (user.id != event.target.value)
                })
            });
        } else if (event.target.name == "receiver_user_list") {
            setFilteredSelectedUsers({
                sender: usersList?.filter((user) => {
                    return (user.id != event.target.value)
                }), receiver: usersList
            });
        }

        console.log("filtered=" + JSON.stringify(filteredSelectedUsers.receiver));
    }


    return (
        <>
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Sender</span>
                </label>
                <select name="sender_user_list" className="select select-bordered" onChange={handleSelectedValue}>
                    <option disabled defaultValue>Select Valid Sender</option>
                    {
                        // Populate user labels in the dropdown menu box dynamically for sender.
                        filteredSelectedUsers.sender?.map((user) => {
                            return (<option value={user.id} key={user.id}>{user.name}</option>);
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
                        filteredSelectedUsers.receiver?.map((user) => {
                            return (<option value={user.id} key={user.id}>{user.name}</option>);
                        })
                    }
                </select>
            </div>
        </>
    )
}

export default PaymentDropDown

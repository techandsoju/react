import React from 'react'
import React, { useCallback, useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

function useUsers(value) {
    useEffect(() => {
        const storeFilteredUsers = useSelector(
            (state) => state.users.values
        )
        // console.log(storeFilteredUsers);
        value.user = storeFilteredUsers;
    },[value]);

    return value;
}

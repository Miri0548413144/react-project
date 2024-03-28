import axios from "axios";
import * as Actions from '../../store/action'
import { useEffect, useState } from 'react';
export default function getShoppingList(data) {
    return dispatch => {
        if (!data)
            dispatch({ type: Actions.GET_TO_SHOPPING, payload: [] });
        else
            axios.get(`http://localhost:8080/api/bay/${data?.Id}`)
                .then(x => {
                    dispatch({ type: Actions.GET_TO_SHOPPING, payload: x.data })
                })
                .catch(err => console.log(err))
    }
} 
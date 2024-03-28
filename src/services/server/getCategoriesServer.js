import axios from "axios";
import * as Actions from '../../store/action'
import { useEffect, useState } from 'react';
export default function getCategory() {
    return dispatch => {
        axios.get("http://localhost:8080/api/category")
            .then(x => {
                dispatch({ type: Actions.GET_CATEGORIES, payload:x.data})
            })
            .catch(err => console.log(err))
    }
} 
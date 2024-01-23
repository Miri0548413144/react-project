import axios from "axios";
import * as Actions from '../../store/action'
import { useEffect, useState } from 'react';
export default function getRecipes() {
    return dispatch => {
        axios.get("http://localhost:8080/api/recipe")
            .then(x => {
                dispatch({ type: Actions.GET_RECIPES, payload:x.data})
            })
            .catch(err => console.log(err))
    }

} 
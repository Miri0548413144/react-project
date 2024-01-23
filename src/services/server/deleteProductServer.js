import axios from "axios";
import * as Actions from '../../store/action'
export default function deleteProduct(data) {
    return dispatch => {
        axios.post(`http://localhost:8080/api/bay/delete/${data.Id}`)
            .then(x => {
                dispatch({ type: Actions.DELETE_PRODUCT, payload: data })
            })
            .catch(err => console.log("err",err))
    }
}
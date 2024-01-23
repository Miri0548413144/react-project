import axios from "axios";
import * as Actions from '../../store/action'
import swal from 'sweetalert'
export default function loginUser(data) {
    return dispatch => {
        axios.post("http://localhost:8080/api/user/login", data)
       
            .then(x => {
                dispatch({ type: Actions.SET_USER, payload: x.data });
                swal("ברוך הבא",x.data.Name,"success")
            })
            .catch(err =>swal("החיבור נכשל","נסה שוב","error") )
             
    }
}
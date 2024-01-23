import axios from "axios";
import * as Actions from '../../store/action'
import Swal from "sweetalert2";
export default function addNewCategory(data,navigate) {
    return dispatch => {
    axios.post("http://localhost:8080/api/category", data)
        .then(x => {
            dispatch({ type: Actions.ADD_CATEGORY, payload: x.data })
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "הקטגוריה נוספה בהצלחה",
                showConfirmButton: false,
                timer: 1500
              });
              navigate('/addRecipes');
        })
        .catch(err => {
            console.log("err", err)
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "קטגוריה קיימת כבר",
                showConfirmButton: false,
                timer: 1500
              });
              
              
        })
        }
}
import axios from "axios";
import * as Actions from '../../store/action'
import Swal from "sweetalert2";
export default function addNewRecipe(data,navigate) {
    return dispatch => {
    axios.post("http://localhost:8080/api/recipe", data)
        .then(x => {
            dispatch({ type: Actions.ADD_RECIPE, payload: x.data })
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "המתכון נוסף! תודה לך😀",
                showConfirmButton: false,
                timer: 1500
              });
              
            navigate('/recipes');
        })
        .catch(err => 
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "ההוספה נכשלה, נסה שוב",
            showConfirmButton: false,
            timer: 1500
          })
          ) 
        }
}
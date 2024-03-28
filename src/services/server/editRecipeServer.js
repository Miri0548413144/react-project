import axios from "axios";
import * as Actions from '../../store/action'
import Swal from "sweetalert2";
export default function editRecipe(data,navigate) {
    return dispatch => {
        axios.post("http://localhost:8080/api/recipe/edit", data)
            .then(x => {
                dispatch({ type: Actions.EDIT_RECIPE, payload: x.data })
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "המתכון שודרג! תודה לך",
                    showConfirmButton: false,
                    timer: 1500
                  });
                navigate('/recipes');

            })
            .catch(err => Swal.fire({
                position: "top-end",
                icon: "error",
                title: " מצטערים, ארעה שגיאה בעת שדרוג המתכון, נסו שוב!",
                showConfirmButton: false,
                timer: 1500
              }))}
    }

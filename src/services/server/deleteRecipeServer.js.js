import axios from "axios";
import * as Actions from '../../store/action'
import Swal from "sweetalert2";
export default function deleteRecipe(data,navigate) {
    return dispatch => {
        axios.post(`http://localhost:8080/api/recipe/delete/${data.Id}`)
            .then(x => { 
                dispatch({ type: Actions.DELETE_RECIPE, payload: data })
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "המתכון נמחק",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  
                navigate('/recipes')
            })
            .catch(err => Swal.fire({
                position: "top-end",
                icon: "error",
                title: "מצטערים, ארעה שגיאה בהליך המחיקה, נסה שוב!",
                showConfirmButton: false,
                timer: 1500
              })
              )
    }
}
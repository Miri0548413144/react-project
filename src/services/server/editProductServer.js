import axios from "axios";
import * as Actions from '../../store/action'
import { date } from "yup";
import deleteProduct from "./deleteProductServer";
import Swal from "sweetalert2";
export default function editProduct(product, count,user) {
    return dispatch => {
        if (product.Count + count==0)
            dispatch(deleteProduct(product));
        else{axios.post("http://localhost:8080/api/bay/", { Name: product.Name, UserId: user.Id, Count: count })
            .then(x => {
                dispatch({ type: Actions.EDIT_TO_SHOPPING, payload: x.data })
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "המוצר נוסף לרשימת הקניות שלכם",
                    showConfirmButton: false,
                    timer: 1500
                  });
            })
            .catch(err => Swal.fire({
                position: "top-end",
                icon: "error",
                title: " מצטערים, ארעה שגיאה בעת הוספה לרשימת הקניות, נסו שוב!",
                showConfirmButton: false,
                timer: 1500
              }))}
    }
}
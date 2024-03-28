import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import getShoppingList from "../../services/server/getShoppingListServer";
import deleteProduct from "../../services/server/deleteProductServer";
import editProduct from "../../services/server/editProductServer";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from "@mui/material";



export default function ViewList() {
    const user = useSelector(state => state?.user);
    const shopping=useSelector(state=>state?.toShopping);
    const dispatch=useDispatch();
    useEffect(() => {
        if(!shopping.length)
            dispatch(getShoppingList(user));
    }, [])

    
    return (<div className="buy">
    
 
 <h3>רשימת הקניות שלי</h3>
        <table className="soppingList">
            <tbody>
                {shopping?.map((product) => (
                    <tr key={product.Id}>
                        <td className="cont2">
                            <IconButton onClick={() => dispatch(editProduct(product, -1, user))}>
                                <RemoveIcon />
                            </IconButton>
                            <IconButton onClick={() => dispatch(editProduct(product, 1, user))}>
                                <AddIcon />
                            </IconButton>
                            <IconButton onClick={() => dispatch(deleteProduct(product))}>
                                <RemoveShoppingCartIcon />
                            </IconButton>
                        </td>
                        <td>{product?.Name}</td>
                        <td>{product?.Count}</td>

                    </tr>
                ))}
            </tbody>
        </table>
    </div>)
}

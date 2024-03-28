import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import deleteRecipe from "../../services/server/deleteRecipeServer.js";
import editProduct from "../../services/server/editProductServer.js";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, IconButton } from '@mui/material';
import { AddShoppingCart } from "@mui/icons-material";


export default function RecipeDetailes() {
    const { state } = useLocation()
    const user = useSelector(state => state?.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return <div className="myRecipe ">
        <Card className="cardDetailes" sx={{ maxWidth: 345 }} >
            <CardActionArea>
                    <CardMedia className="line"
                        component="img"
                        height="140"
                        image={state.Img}
                    />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {state?.Name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <h4> דרגת קושי :{state?.Difficulty}</h4>
                        <h4> משך זמן : {state?.Duration}</h4>
                        <div>
                            {state.Ingrident.map((i) => (
                                <div >
                                    <h4>  {i?.Name}: {i?.Count} {i?.Type}
                                        <IconButton onClick={() => dispatch(editProduct(i, 1, user))}>
                                            <AddShoppingCart />
                                        </IconButton>
                                    </h4>
                                </div>
                            ))}
                        </div>

                        <div>
                            <h5 >: אופן ההכנה </h5>
                            {state?.Instructions?.map((i) => (
                                <p> {i}</p>
                            ))}
                           
                        </div>

                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <button className="my-button" onClick={x => window.print()}>להדפסה</button>
                {user.Id == state?.UserId && (
                    <>
                        < button className="my-button" onClick={() => { navigate("/editRecipes", { state: state }) }}>לעריכת מתכון</button>
                        < button className="my-button" onClick={() => { dispatch(deleteRecipe(state, navigate)) }}>להסרת המתכון </button>
                    </>)}
            </CardActions>
        </Card>
    </div>

}
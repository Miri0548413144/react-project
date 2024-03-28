import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

export default function MyRecipes(){
    const user=useSelector(state=>state.user)
    const recipes=useSelector(state=>state.recipes)
    const navig = useNavigate();
    return(
        <div className="recipes">{recipes?.map((recipe)=>(
            (user&&recipe.UserId==user.Id)?
            <p key={recipe.Id} id="cards">
                <Card sx={{ maxWidth: 345 }} className="card">
                        <CardActionArea>
                            <CardMedia className="line"
                                component="img"
                                height="140"
                                image={recipe.Img}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {recipe?.Name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {recipe?.Description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            < button className="my-button" onClick={x => navig("/recipeDetailes", { state: recipe })}>פרטי מתכון</button>
                        </CardActions>
                    </Card>
            </p> :null
        ))}
        </div>
    )
}
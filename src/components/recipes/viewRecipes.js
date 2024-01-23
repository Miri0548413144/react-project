import axios from "axios";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import recipeDetailes from "./recipeDetailes";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, FormControl, Input, InputLabel, Stack } from '@mui/material';
import { MenuItem, useSelect } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function ViewRecipes() {
    const categories = useSelector(state => state.categories)
    const reciepes = useSelector(state => state.recipes)
    const [filteredReciepes, setFilteredReciepes] = useState([])
    const [category, setCategory] = useState('')
    const [time, setTime] = useState()
    const [difficulty, setDifficulty] = useState('')
    const navig = useNavigate();
    useEffect(() => {
        setFilteredReciepes(reciepes.filter(r => (!category || r.CategoryId == category) && (!time || r.Duration <= time) && (!difficulty || r.Difficulty <= difficulty)))
    }, [category, time, difficulty])

    const handleChangeLevel = (event) => {
        setDifficulty(event.target.value);
    };
    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };
    return <div>
        <div className="filter">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">קטגוריה</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={category}
                    onChange={handleChangeCategory}
                    label="קטגוריה">
                    <MenuItem value="">
                        <em>ללא סינון</em>
                    </MenuItem>
                    {categories?.map((categoryM) => (
                        <MenuItem key={categoryM.Id} value={categoryM.Id}>
                            <p> {categoryM?.Name}</p>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-input-standard-label"> זמן הכנה</InputLabel>
                <Input onChange={(e) => setTime(e.target.value)} type="number" />
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">רמת קושי</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={difficulty}
                    onChange={handleChangeLevel}
                    label="רמת קושי">
                    <MenuItem value="">
                        <em>ללא סינון</em>
                    </MenuItem>
                    <MenuItem value={1}>קל</MenuItem>
                    <MenuItem value={2}>בינוני</MenuItem>
                    <MenuItem value={3}>קשה</MenuItem>
                </Select>
            </FormControl>
        </div>
        <div className="recipes">
            {filteredReciepes?.map((reciepe) => (
                <p key={reciepe.Id} id="cards" >
                    <Card sx={{ maxWidth: 345 }} className="card">
                        <CardActionArea>
                            <CardMedia className="line"
                                component="img"
                                height="140"
                                image={reciepe.Img}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {reciepe?.Name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {reciepe?.Description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            < button className="my-button" onClick={x => navig("/recipeDetailes", { state: reciepe })}>פרטי מתכון</button>
                        </CardActions>
                    </Card>
                </p>
            ))}
        </div></div>
}
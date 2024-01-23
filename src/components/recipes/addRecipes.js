import { useForm, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import addNewRecipe from "../../services/server/addRecipesServer"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import editRecipe from "../../services/server/editRecipeServer"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, FormControl, IconButton, Input, InputLabel, Stack } from '@mui/material';
import { MenuItem, useSelect } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteIcon from '@mui/icons-material/Delete';

const schema = yup
  .object({
    Name: yup.string().required("שדה חובה"),
    CategoryId: yup.number().positive().integer().required("שדה חובה"),
    Img: yup.string().required("שדה חובה"),
    Duration: yup.string().required("שדה חובה"),
    Difficulty: yup.number().positive().integer().required("שדה חובה"),
    Description: yup.string().required("שדה חובה"),
    Ingrident: yup.array().of(
      yup.object().shape({
        Name: yup.string().required("שדה חובה"),
        Count: yup.string().required("שדה חובה"),
        Type: yup.string().required("שדה חובה"),
      })
    ),
    Instructions: yup.array().of(yup.string().required("שדה חובה")),
  })
  .required("שדה חובה")


export default function AddRecipes() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const categories = useSelector(state => state.categories)
  const user1 = useSelector(state => state.user);
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }, control
  } = useForm({
    resolver: yupResolver(schema),
    values: state
  })
  const onSubmit = (data) => {
    data["UserId"] = user1.Id;
    if (state) {
      dispatch(editRecipe(data, navigate))
    }
    else {
      dispatch(addNewRecipe(data, navigate))
    }
  }

  const { fields: fieldsIngrident, append: appendIngrident, remove: removeIngrident, } = useFieldArray({
    control,
    name: "Ingrident",
  });
  const { fields: fieldsInstructions, append: appendInstructions, remove: removevInstructions, } = useFieldArray({
    control,
    name: "Instructions",
  });



  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
          <InputLabel id="demo-simple-input-standard-label"> שם </InputLabel>
          <Input {...register("Name")} />
          <p>{errors.Name?.message}</p>
        </FormControl>
        <br />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 185 }}>
          <InputLabel id="demo-simple-select-standard-label">קטגוריה</InputLabel>
          <Select
            {...register("CategoryId")}
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="קטגוריה">
            <MenuItem value="">
              <em>ללא סינון </em>
            </MenuItem>
            {categories?.map((category) => (
              <MenuItem key={category.Id} value={category.Id}>
                <p> {category?.Name}</p>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
          <InputLabel id="demo-simple-input-standard-label"> כתובת URL של תמונה</InputLabel>
          <Input {...register("Img")} />
          <p>{errors.Img?.message}</p>
        </FormControl>
        <br />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
          <InputLabel id="demo-simple-input-standard-label"> זמן הכנה</InputLabel>
          <Input {...register("Duration")} type="number" />
          <p>{errors.Duration?.message}</p>
        </FormControl>
        <br />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 185 }}>
          <InputLabel id="demo-simple-select-standard-label">רמת קושי</InputLabel>
          <Select {...register("Difficulty")}
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="רמת קושי">
            <MenuItem value="">
              <em>ללא סינון</em>
            </MenuItem>
            <MenuItem value={1}>קל</MenuItem>
            <MenuItem value={2}>בינוני</MenuItem>
            <MenuItem value={3}>קשה</MenuItem>
          </Select>
        </FormControl>
        <br />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
          <InputLabel id="demo-simple-input-standard-label"> תאור </InputLabel>
          <Input {...register("Description")} />
          <p>{errors.Description?.message}</p>
        </FormControl>
        <br />

        {fieldsIngrident?.map((field, index) => (
          <>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
              <InputLabel id="demo-simple-input-standard-label">  כמות</InputLabel>
              <Input {...register(`Ingrident.${index}.Count`)} type="number" />
              <p>{errors.Ingrident?.[index]?.b?.message}</p>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
              <InputLabel id="demo-simple-input-standard-label"> כלי מדידה</InputLabel>
              <Input {...register(`Ingrident.${index}.Type`)} />
              <p>{errors.Ingrident?.[index]?.c?.message}</p>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
              <InputLabel id="demo-simple-input-standard-label">מוצר </InputLabel>
              <Input {...register(`Ingrident.${index}.Name`)} />
              <p>{errors.Ingrident?.[index]?.a?.message}</p>
            </FormControl>
            <IconButton onClick={() => removeIngrident(index)}>
              <DeleteForeverIcon />
            </IconButton>
            <br />


          </>
        ))}

        <br />
        {fieldsInstructions?.map((field, index) => (
          <>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
              <InputLabel id="demo-simple-input-standard-label"> הוראות </InputLabel>
              <Input {...register(`Instructions.${index}`)} />
              <p>{errors.Instructions?.[index]?.a?.message}</p>
            </FormControl>

            <IconButton onClick={() => removevInstructions(index)}>
              <DeleteForeverIcon />
            </IconButton>


            <br />
          </>
        ))}
        <button className="my-button" onClick={() => appendInstructions("")}> הוסף הוראה</button>
        <button className="my-button" onClick={() => appendIngrident({})}> הוסף מוצר</button>
        <button className="my-button" onClick={() => navigate("/categories")}> הוסף קטגוריה </button>
        <br />
        <Input className="my-button" type="submit" />
      </form>
      </div >
      )
}
import axios from "axios"
import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux";
import addNewCategory from "../../services/server/addCategoryServer";
import { FormControl, Input, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
const schema = yup
    .object({
        Name: yup.string().required("שדה חובה")
    })
    .required()


export default function Catgories() {
    const categories = useSelector(state => state.categories)
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors }, control
    } = useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit = (data) => {
        dispatch(addNewCategory(data,navigate))
    }
    return <>
        <div className="categories login">
            <div>
                {categories?.map((category) => (
                    <p key={category.Id}> {category?.Name}</p>))
                }
            </div>
            <div className="cont1">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
                        <InputLabel id="demo-simple-input-standard-label"> הוסף קטגוריה </InputLabel>
                        <Input {...register("Name")}  />
                        <p>{errors.Name?.message}</p>
                    </FormControl>
                    <br/>
                    <input type="submit" className="my-button" />
                </form>
            </div>
        </div>
    </>
}
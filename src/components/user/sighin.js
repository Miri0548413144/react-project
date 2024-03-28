import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import addNewUser from "../../services/server/userServerSighin"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { FormControl, Input, InputLabel } from "@mui/material"

const schema = yup
  .object({
    Username: yup.string().required(),
    Password: yup.string().required(),
    Name: yup.string().required(),
    Phone: yup.number().positive().integer().required(),
    Email: yup.string().email(),
    Tz: yup.number().positive().integer()
  })
  .required()


export default function Sighin() {
  const navig = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data) => {
    dispatch(addNewUser(data))
    navig("/homePage");
  }


  return (
    <div class="background-img login">
    <form onSubmit={handleSubmit(onSubmit)}>
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
        <InputLabel id="demo-simple-input-standard-label"> שם משתמש </InputLabel>
        <Input {...register("Username")} />
        <p>{errors.Username?.message}</p>
      </FormControl>
      <br/>
       <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
        <InputLabel id="demo-simple-input-standard-label"> סיסמא</InputLabel>
        <Input {...register("Password")} />
        <p>{errors.Password?.message}</p>
      </FormControl>
      <br/>
       <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
        <InputLabel id="demo-simple-input-standard-label"> שם  </InputLabel>
        <Input {...register("Name")} />
        <p>{errors.Name?.message}</p>
      </FormControl>
      <br/>
       <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
        <InputLabel id="demo-simple-input-standard-label"> פלאפון מספר </InputLabel>
        <Input {...register("Phone")} />
        <p>{errors.Phone?.message}</p>
      </FormControl>
      <br/>
       <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
        <InputLabel id="demo-simple-input-standard-label"> כתובת מייל </InputLabel>
        <Input {...register("Email")} />
        <p>{errors.Email?.message}</p>
      </FormControl>
      <br/>
       <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
        <InputLabel id="demo-simple-input-standard-label"> מ.ז.  </InputLabel>
        <Input {...register("Tz")} />
        <p>{errors.Tz?.message}</p>
      </FormControl>
      <br/>
      <input className="my-button" type="submit" />
      <br/>
      <Link to="/login" >יש לך כבר חשבון? הכנס עכשיו</Link>
    </form>
    </div>
  )
}
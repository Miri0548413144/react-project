import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import loginUser from "../../services/server/userServerLogin"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { FormControl, Input, InputLabel } from "@mui/material"

const schema = yup
  .object({
    Username: yup.string().required(),
    Password: yup.string().required(),
  })
  .required()


export default function Login() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data) => {
    dispatch(loginUser(data))
    
  }

  return (
    <div class="background-img login">
    <form onSubmit={handleSubmit(onSubmit)}>
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
        <InputLabel id="demo-simple-input-standard-label" >שם משתמש  </InputLabel>
        <Input {...register("Username")} />
        <p>{errors.Username?.message}</p>
      </FormControl>
      <br/>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
        <InputLabel id="demo-simple-input-standard-label"> סיסמא </InputLabel>
        <Input {...register("Password")}type="password" />
        <p>{errors.Password?.message}</p>
      </FormControl>
      <br/>
      <input className="my-button"type="submit" />
      <br/>
      <Link to="/sighin" >עדיין אין לך חשבון? התחבר עכשיו</Link>
    </form>
    </div>
  )

}
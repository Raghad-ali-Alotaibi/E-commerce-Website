import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"

import { AppDispatch } from "@/tookit/store"
import { registerUser } from "@/tookit/slices/UserSlice"
import { useNavigate } from "react-router-dom"
import { FormData } from "@/types"


export const Register = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await dispatch(registerUser(data))
      toast.success(response.payload.message)
      navigate("/login")
    } catch (error: any) {
      toast.error(error.message || "Registration failed")
    }
  }
  return (
    <div className="register">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form__field">
          <label htmlFor="firstName">First Name :</label>
          <input
            type="text"
            {...register("firstName", {
              required: "First Name is required",
              minLength: { value: 4, message: "First Name must be more than 4 characters" }
            })}
          />
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>

        <div className="form__field">
          <label htmlFor="lastName">last Name :</label>
          <input
            type="text"
            {...register("lastName", {
              required: "last Name is required",
              maxLength: { value: 30, message: "Last Name must be less than 30 characters" }
            })}
          />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>

        <div className="form__field">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "invalid email address"
              }
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div className="form__field">
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Password must be at least 8 characters" },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                message:
                  "Password must contain at least one lowercase letter, one uppercase letter, and one digit"
              }
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div className="form__field">
          <label htmlFor="mobile">Mobile :</label>
          <input
            type="text"
            {...register("mobile", {
              required: "Mobile is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Mobile number must be 10 digits"
              }
            })}
          />
          {errors.mobile && <p>{errors.mobile.message}</p>}
        </div>
        <button className="button__register" type="submit">
          Register
        </button>
      </form>
    </div>
  )
}

import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { AppDispatch } from "@/tookit/store"
import { registerUser } from "@/tookit/slices/UserSlice"
import { FormData } from "@/types"
import PageTitle from "@/components/PageTitle"

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
    } catch (error) {
      toast.error("Registration failed")
    }
  }
  return (
    <div className="register">
      <PageTitle title="Register" />
      <div className="register__container">
        <p className="title__register">Register</p>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form__field">
            <input
              type="text"
              placeholder="Enter your first name"
              {...register("firstName", {
                required: "First Name is required",
                minLength: { value: 4, message: "First Name must be more than 4 characters" }
              })}
            />
            {errors.firstName && <p>{errors.firstName.message}</p>}
          </div>

          <div className="form__field">
            <input
              type="text"
              placeholder="Enter your last name"
              {...register("lastName", {
                required: "last Name is required",
                maxLength: { value: 30, message: "Last Name must be less than 30 characters" }
              })}
            />
            {errors.lastName && <p>{errors.lastName.message}</p>}
          </div>

          <div className="form__field">
            <input
              type="email"
              placeholder="Enter your email"
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
            <label htmlFor="password"></label>
            <input
              type="password"
              placeholder="Enter your password"
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
            <label htmlFor="mobile"></label>
            <input
              type="text"
              placeholder="Enter your mobile "
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
          <button type="submit" className="button__register">
            Register
          </button>
        </form>
        <p className="register__already">
          Already have an account?
          <Link className="login__link" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

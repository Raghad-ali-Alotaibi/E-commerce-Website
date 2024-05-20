import { useForm, SubmitHandler } from "react-hook-form"
import { useDispatch } from "react-redux"

import { AppDispatch } from "@/tookit/store"
import { loginUser } from "@/tookit/slices/UserSlice"
import { LoginFormData } from "@/types"
import PageTitle from "@/components/PageTitle"
import { toastError, toastSuccess } from "@/components/Notifications "

export const Login = () => {
  const dispatch: AppDispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>()

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const response = await dispatch(loginUser(data))
      toastSuccess(response.payload.message + "  logged in")
    } catch (error) {
      toastError("Login failed")
    }
  }
  return (
    <div className="login">
      <PageTitle title="Login" />
      <div className="login__container">
        <p className="title__login">Login</p>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form__field">
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "invalid email address"
                }
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <div className="form__field">
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
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <button className="button__login" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

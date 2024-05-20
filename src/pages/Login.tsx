import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"

import { AppDispatch } from "@/tookit/store"
import { loginUser } from "@/tookit/slices/UserSlice"
import { LoginFormData } from "@/types"
import PageTitle from "@/components/PageTitle"

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
      toast.success(response.payload.message)
    } catch (error) {
      toast.error("Login failed")
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
          <button className="button__login" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

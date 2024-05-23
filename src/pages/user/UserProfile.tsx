import { SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import { useDispatch } from "react-redux"

import UserSidebar from "@/components/UserSidebar"
import useUserState from "@/hooks/useUserState"
import { UpdateFormData } from "@/types"
import { AppDispatch } from "@/tookit/store"
import { toastError } from "@/components/Notifications "
import { UpdateUser } from "@/tookit/slices/UserSlice"

export const UserProfile = () => {
  const { userData } = useUserState()
  const dispatch: AppDispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateFormData>()

  const [isFormOpen, setIsFormOpen] = useState(false)

  const onSubmit: SubmitHandler<UpdateFormData> = async (data) => {
    if (!userData?.userId) {
      toastError("user data is not available")
      return
    }
    try {
      const response = await dispatch(
        UpdateUser({ updateUserData: data, userId: userData?.userId })
      )
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <UserSidebar />
      <div className="main__container" >
        {userData && (
          <>
            <p className="">First Name: {userData.firstName}</p>
            <p className="">Last Name: {userData.lastName}</p>
            <p className="">Email: {userData.email}</p>
            <button
              onClick={() => {
                setIsFormOpen(!isFormOpen)
              }}
            >
              {isFormOpen ? "Close " : "Edit"}
            </button>

            {isFormOpen && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form__field">
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    {...register("firstName", {
                      required: "First Name is required",
                      minLength: {
                        value: 4,
                        message: "First Name must be more than 4 characters"
                      }
                    })}
                  />
                  {errors.firstName && <span>{errors.firstName.message}</span>}
                </div>

                <div className="form__field">
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    {...register("lastName", {
                      required: "last Name is required",
                      maxLength: {
                        value: 30,
                        message: "Last Name must be less than 30 characters"
                      }
                    })}
                  />
                  {errors.lastName && <span>{errors.lastName.message}</span>}
                </div>
                <button type="submit" className="button__register">
                  Update
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  )
}

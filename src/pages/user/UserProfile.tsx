import { SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import { useDispatch } from "react-redux"

import UserSidebar from "@/components/UserSidebar"
import useUserState from "@/hooks/useUserState"
import { UpdateUserFormData } from "@/types"
import { AppDispatch } from "@/tookit/store"
import { toastError } from "@/components/Notifications "
import { UpdateUser } from "@/tookit/slices/UserSlice"

export const UserProfile = () => {
  const { userData } = useUserState()
  const dispatch: AppDispatch = useDispatch()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UpdateUserFormData>()

  const [isFormOpen, setIsFormOpen] = useState(false)

  const onSubmit: SubmitHandler<UpdateUserFormData> = async (data) => {
    if (!userData?.userId) {
      toastError("user data is not available")
      return
    }
    try {
      const response = await dispatch(
        UpdateUser({ updateUserData: data, userId: userData?.userId })
      )
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="wrap">
      <UserSidebar />
      <div className="dashboard__container">
        {userData && (
          <div className="dashboard__content">
            <p>First Name: {userData.firstName}</p>
            <p>Last Name: {userData.lastName}</p>
            <button className="btn__close"
              onClick={() => {
                setIsFormOpen(!isFormOpen)
              }}
            >
              {isFormOpen ? "Close " : "Edit"}
            </button>
            <div>
              {isFormOpen && (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
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

                  <div>
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
                  <button type="submit" className="btn">
                    Update
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
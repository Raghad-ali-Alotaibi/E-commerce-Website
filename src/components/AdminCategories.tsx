import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { AppDispatch, RootState } from "@/tookit/store"
import { CreateCategories, fetchCategories } from "@/tookit/slices/CategorySlice"
import SingelCategory from "./SingelCategory"
import AdminSidebar from "@/components/AdminSidebar"
import { SubmitHandler, useForm } from "react-hook-form"
import { CreateFormData } from "@/types"

const AdminCategories = () => {
  const { categories, isLoading, error } = useSelector((state: RootState) => state.categoryR)

  const dispatch: AppDispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateFormData>()

  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategories())
    }
    fetchData()
  }, [])
// need fix
  const onSubmit: SubmitHandler<CreateFormData> = async (data) => {
    try {
      const response = await dispatch(CreateCategories(data))
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {isLoading && <p>Loading</p>}
      {error && <p>error{error}</p>}
      <AdminSidebar />
      <p>create categories</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form__field">
          <input
            type="text"
            {...register("categoryName", {
              required: "Category Name is required",
              maxLength: {
                value: 30,
                message: "Last Name must be less than 30 characters"
              }
            })}
          />
          {errors.categoryName && <span>{errors.categoryName.message}</span>}
        </div>

        <div className="form__field">
          <input
            type="text"
            {...register("categoryDescription", {
              required: "Description is required",
              maxLength: {
                value: 30,
                message: "Last Name must be less than 30 characters"
              }
            })}
          />
          {errors.categoryDescription && <span>{errors.categoryDescription.message}</span>}
        </div>
        <button type="submit" className="button__register">
          create
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <SingelCategory key={category.categoryId} category={category} />
          ))}
        </tbody>
      </table>
    </>
  )
}
export default AdminCategories

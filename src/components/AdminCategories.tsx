import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Table } from "flowbite-react"

import { AppDispatch, RootState } from "@/tookit/store"
import { CreateCategories, fetchCategories } from "@/tookit/slices/CategorySlice"
import AdminSidebar from "@/components/AdminSidebar"
import { SubmitHandler, useForm } from "react-hook-form"
import { CreateFormData } from "@/types"
import SingleCategory from "./SingelCategory"

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
    <div className="container">
      {isLoading && <p>Loading</p>}
      {error && <p>error{error}</p>}
        <AdminSidebar />
      <div className="content">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="form-title">Create Category</h2>
          <div className="input-container">
            <input
              type="text"
              className="input-field"
              {...register("categoryName", {
                required: "Category Name is required",
                maxLength: {
                  value: 30,
                  message: "Category Name must be less than 30 characters"
                }
              })}
              placeholder="Category Name"
            />
            {errors.categoryName && (
              <span className="error-message">{errors.categoryName.message}</span>
            )}
          </div>

          <div className="input-container">
            <input
              type="text"
              className="input-field"
              {...register("categoryDescription", {
                required: "Description is required",
                maxLength: {
                  value: 30,
                  message: "Description must be less than 30 characters"
                }
              })}
              placeholder="Category Description"
            />
            {errors.categoryDescription && (
              <span className="error-message">{errors.categoryDescription.message}</span>
            )}
          </div>
          <button type="submit" className="submit">
            Create
          </button>
        </form>

        <Table>
          <Table.Head>
            <Table.HeadCell className="table-head-cell">Name</Table.HeadCell>
            <Table.HeadCell className="table-head-cell">Description</Table.HeadCell>
            <Table.HeadCell className="table-head-cell">Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {categories.map((category) => (
              <SingleCategory key={category.categoryId} category={category} />
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}
export default AdminCategories
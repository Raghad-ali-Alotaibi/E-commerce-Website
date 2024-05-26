import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Table } from "flowbite-react"

import { AppDispatch } from "@/tookit/store"
import {
  CreateCategory,
  UpdateCategory,
  deleteCategory,
  fetchCategories
} from "@/tookit/slices/CategorySlice"
import AdminSidebar from "@/components/AdminSidebar"
import { SubmitHandler, useForm } from "react-hook-form"
import { Category, CreateFormData } from "@/types"
import { MdDeleteForever, MdEditSquare } from "react-icons/md"
import useCategoriesState from "@/hooks/useCategoriesState"

export const AdminCategories = () => {
  const { categories, isLoading, error } = useCategoriesState()

  const dispatch: AppDispatch = useDispatch()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<CreateFormData>()

  const [isEdit, setIsEdit] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategories())
    }
    fetchData()
  }, [])

  // need fix
  const onSubmit: SubmitHandler<CreateFormData> = async (data) => {
    try {
      if (isEdit) {
        if (selectedCategoryId !== null) {
          await dispatch(
            UpdateCategory({ updateCategoryData: data, categoryId: selectedCategoryId })
          )
          setIsEdit(false)
        } else {
          console.error("selectedCategoryId is null")
        }
      } else {
        await dispatch(CreateCategory(data))
      }
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async (category: Category) => {
    setIsEdit(true)
    setValue("categoryName", category.categoryName)
    setSelectedCategoryId(category.categoryId)
    setValue("categoryDescription", category.categoryDescription)
  }

  const handleDelete = async (categoryId: number) => {
    try {
      const response = await dispatch(deleteCategory(categoryId))
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
          <h2 className="form-title">{isEdit ? "Edit Category" : "Create Category"}</h2>
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

          <button type="submit">{isEdit ? "Update" : "Create"}</button>
        </form>

        <Table>
          <Table.Head>
            <Table.HeadCell className="table-head-cell">Name</Table.HeadCell>
            <Table.HeadCell className="table-head-cell">Description</Table.HeadCell>
            <Table.HeadCell className="table-head-cell">Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {categories.map((category) => (
              <Table.Row className="table-row" key={category.categoryId}>
                <Table.Cell className="table-cell">{category.categoryName}</Table.Cell>
                <Table.Cell className="table-cell">{category.categoryDescription}</Table.Cell>
                <Table.Cell className="table-cell">
                  <div className="button__container">
                    <button className="button__edit" onClick={() => handleEdit(category)}>
                      <MdEditSquare size={13} />
                    </button>
                    <button
                      className="button__delete"
                      onClick={() => handleDelete(category.categoryId)}
                    >
                      <MdDeleteForever size={13} />
                    </button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}
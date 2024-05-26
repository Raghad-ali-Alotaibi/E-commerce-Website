import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Table } from "flowbite-react"

import { AppDispatch } from "@/tookit/store"
import { CreateCategory, UpdateCategory, fetchCategories } from "@/tookit/slices/CategorySlice"
import AdminSidebar from "@/components/AdminSidebar"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { CreateFormData, CreateProductFormData, Product } from "@/types"
import { MdDeleteForever, MdEditSquare } from "react-icons/md"
import useCategoriesState from "@/hooks/useCategoriesState"
import useProductState from "@/hooks/useProductState"
import { CreateProduct, deleteProduct, fetchProducts } from "@/tookit/slices/ProductSlice"
import { toastError } from "./Notifications "

export const AdminProducts = () => {
  const { categories, isLoading, error } = useCategoriesState()
  const { products } = useProductState()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(4)
  const [sortBy, setSortBy] = useState("price")
  const [searchKeyword, setSearchKeyword] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const dispatch: AppDispatch = useDispatch()
  const [isEdit, setIsEdit] = useState(false)
  const [imgrPreview, setImgrPreview] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors }
  } = useForm<CreateProductFormData>()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategories())
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts({ pageNumber, pageSize, sortBy, selectedCategories }))
    }
    fetchData()
  }, [pageNumber, sortBy, selectedCategories])

  // need fix
  // const onSubmit: SubmitHandler<CreateProductFormData> = async (data) => {
  //   try {
  //     if (isEdit) {
  //       if (selectedCategoryId !== null) {
  //         await dispatch(
  //           UpdateCategory({ updateCategoryData: data, categoryId: selectedCategoryId })
  //         )
  //         setIsEdit(false)
  //       } else {
  //         console.error("selectedCategoryId is null")
  //       }
  //     } else {
  //       await dispatch(CreateCategory(data))
  //     }
  //     reset()
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  const onSubmit: SubmitHandler<CreateProductFormData> = async (data) => {
    try {
      let imageUrl = ""
      if (data.productImage && data.productImage.length > 0) {
        const file = data.productImage[0]
        imageUrl = await uploadImageToCloudinary(file)
      }
      const productData = {
        ...data,
        image: imageUrl
      }
      const response = await dispatch(CreateProduct(productData))
    } catch (error) {
      console.log(error)
      toastError("product creation failed")
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImgrPreview(URL.createObjectURL(file))
    }
  }

  const handleEdit = async (product: Product) => {
    setIsEdit(true)
    setValue("productName", product.productName)
    setValue("productDescription", product.productDescription)
    setValue("productPrice", product.productPrice)
    setValue("productQuantityInStock", product.productQuantityInStock)
    setValue("categories", product.categories.map((category) => category.categoryId))
    setImgrPreview(product.productImage)
  }

  const handleDelete = async (productId: number) => {
    try {
      const response = await dispatch(deleteProduct(productId))
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="wrap">
      {isLoading && <p>Loading</p>}
      {error && <p>error{error}</p>}
      <AdminSidebar />
      <div className="content">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="form-title">{isEdit ? "Edit Product" : "Create Product"}</h2>
          <div className="input-container">
            <input
              type="text"
              className="input-field"
              {...register("productName", {
                required: "Product Name is required",
                maxLength: {
                  value: 30,
                  message: "Product Name must be less than 30 characters"
                }
              })}
              placeholder="Product Name"
            />
            {errors.productName && (
              <span className="error-message">{errors.productName.message}</span>
            )}
          </div>

          <div className="input-container">
            <input
              type="text"
              className="input-field"
              {...register("productDescription", {
                required: "Description is required",
                maxLength: {
                  value: 30,
                  message: "Description must be less than 30 characters"
                }
              })}
              placeholder="Product Description"
            />
            {errors.productDescription && (
              <span className="error-message">{errors.productDescription.message}</span>
            )}
          </div>

          <div className="input-container">
            <input
              type="number"
              step="0.01"
              className="input-field"
              {...register("productPrice")}
              placeholder="Product Price"
            />
            {errors.productPrice && (
              <span className="error-message">{errors.productPrice.message}</span>
            )}
          </div>

          <div className="input-container">
            <input
              type="number"
              step="0.01"
              className="input-field"
              {...register("productQuantityInStock")}
              placeholder="Product Quantity In Stock"
            />
            {errors.productQuantityInStock && (
              <span className="error-message">{errors.productQuantityInStock.message}</span>
            )}
          </div>

          <div className="input-container">
            <input
              type="file"
              accept="image/*"
              className="input-field"
              {...register("productImage")}
              placeholder="Product Image"
              onChange={handleImageChange}
            />
          </div>

          <div className="input-container">
            <Controller
              name="categories"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  onChange={(e) => {
                    const selectedOptions = Array.from(e.target.selectedOptions)
                    const selectedValues = selectedOptions.map((option) => option.value)
                    field.onChange(selectedValues)
                  }}
                >
                  {categories.map((category) => (
                    <option key={category.categoryId} value={category.categoryId}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          <button type="submit">{isEdit ? "Update" : "Create"}</button>
        </form>

        <Table>
          <Table.Head>
            <Table.HeadCell className="table-head-cell">Image</Table.HeadCell>
            <Table.HeadCell className="table-head-cell">Name</Table.HeadCell>
            <Table.HeadCell className="table-head-cell">Categories</Table.HeadCell>
            <Table.HeadCell className="table-head-cell">Description</Table.HeadCell>
            <Table.HeadCell className="table-head-cell">Price</Table.HeadCell>
            <Table.HeadCell className="table-head-cell">Quantity</Table.HeadCell>
            <Table.HeadCell className="table-head-cell">Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {products.map((product) => (
              <Table.Row className="table-row" key={product.productId}>
                <Table.Cell className="table-cell">
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="cartitem__img"
                  />
                </Table.Cell>
                <Table.Cell className="table-cell">{product.productName}</Table.Cell>
                <Table.Cell className="table-cell">
                  {/* {product.categories.map((category) => category.categoryName).join(", ")} */}
                </Table.Cell>
                <Table.Cell className="table-cell">{product.productDescription}</Table.Cell>
                <Table.Cell className="table-cell">{product.productPrice}</Table.Cell>
                <Table.Cell className="table-cell">{product.productQuantityInStock}</Table.Cell>
                <Table.Cell className="table-cell">
                  <div className="button__container">
                    <button className="button__edit" onClick={() => handleEdit(product)}>
                      <MdEditSquare size={13} />
                    </button>
                    <button
                      className="button__delete"
                      onClick={() => handleDelete(product.productId)}
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

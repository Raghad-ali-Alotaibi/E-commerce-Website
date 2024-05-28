import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Table } from "flowbite-react"

import { AppDispatch } from "@/tookit/store"
import AdminSidebar from "@/components/AdminSidebar"
import { SubmitHandler, useForm } from "react-hook-form"
import { CreateProductForBackend } from "@/types"
import { MdDeleteForever, MdEditSquare } from "react-icons/md"
import useCategoriesState from "@/hooks/useCategoriesState"
import useProductState from "@/hooks/useProductState"
import {
  CreateProduct,
  UpdateProduct,
  deleteProduct,
  fetchProducts
} from "@/tookit/slices/ProductSlice"
import { toastError } from "./Notifications "

export const AdminProducts = () => {
  const { categories, isLoading, error } = useCategoriesState()
  const { products } = useProductState()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [sortBy, setSortBy] = useState("price")
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [isEdit, setIsEdit] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)

  const dispatch: AppDispatch = useDispatch()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<CreateProductForBackend>()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts({ pageNumber, pageSize, sortBy, selectedCategories }))
    }
    fetchData()
  }, [pageNumber, sortBy, selectedCategories])

  const onSubmit: SubmitHandler<CreateProductForBackend> = async (data) => {
    try {
      if (selectedProductId) {
        await dispatch(UpdateProduct({ updateProductData: data, productId: selectedProductId }))
        setIsEdit(false)
      } else {
        // Handle product creation
        await dispatch(CreateProduct(data))
      }
      reset()
    } catch (error) {
      toastError("Product operation failed")
    }
  }

  const handleEdit = async (product: CreateProductForBackend) => {
    setIsEdit(true)
    setValue("productName", product.productName)
    setValue("productDescription", product.productDescription)
    setValue("productPrice", product.productPrice)
    setValue("productQuantityInStock", product.productQuantityInStock)
    setValue("categoryId", product.categoryId)
  }

  const handleDelete = async (productId: number) => {
    try {
      await dispatch(deleteProduct(productId))
    } catch (error) {
      toastError("product Delete failed")
    }
  }

  const truncateDescription = (productDescription: string | undefined, maxLength = 50) => {
    if (!productDescription || productDescription.length <= maxLength) {
      return productDescription || "" // Return empty string if productDescription is undefined
    } else {
      return `${productDescription.slice(0, maxLength)}...`
    }
  }

  return (
    <div className="wrap">
      {isLoading && <p>Loading</p>}
      {error && <p>error{error}</p>}
      <AdminSidebar />
      <div className="dashboardAdmin__container">
        <div className="form-container__products">
          <form onSubmit={handleSubmit(onSubmit)}>
            <p>{isEdit ? "Edit Product" : "Create Product"}</p>
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
                placeholder="Product name"
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
                placeholder="Product description"
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
                placeholder="Product price"
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
                placeholder="Product quantity"
              />
              {errors.productQuantityInStock && (
                <span className="error-message">{errors.productQuantityInStock.message}</span>
              )}
            </div>

            <div className="input-container">
              <input
                type="text"
                className="input-field"
                {...register("productImage")}
                placeholder="Product Image URL"
              />
            </div>

            <div className="input-container">
              <input
                type="number"
                className="input-field"
                {...register("categoryId")}
                placeholder="category Id"
              />
              {errors.categoryId && (
                <span className="error-message">{errors.categoryId.message}</span>
              )}
            </div>
            <button type="submit">{isEdit ? "Update" : "Create"}</button>
          </form>
        </div>

        <Table className="table__products">
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
                  {(() => {
                    const category = categories.find(
                      (category) => category.categoryId === product.categoryId
                    )
                    return category ? category.categoryName : "Unknown"
                  })()}
                </Table.Cell>
                <Table.Cell className="table-cell">
                  {truncateDescription(product.productDescription)}
                </Table.Cell>
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

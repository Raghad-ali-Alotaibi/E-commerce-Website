import { deleteCategories } from "@/tookit/slices/CategorySlice"
import { AppDispatch } from "@/tookit/store"
import { Category } from "@/types"
import { useDispatch } from "react-redux"

const SingelCategory = (props: { category: Category }) => {
  const { category } = props

  const dispatch: AppDispatch = useDispatch()

  const handleDelete = async (id: number) => {
    dispatch(deleteCategories(id))
    try {
      const response = await dispatch(deleteCategories(id))
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <tr>
    <td className="product__name">{category.categoryName}</td>
    <td className="product__description">{category.categoryDescription}</td>
    <td>
      <button>Edit</button>
      <button onClick={() => handleDelete(category.categoryId)}>Delete</button>
    </td>
  </tr>
  )
}

export default SingelCategory

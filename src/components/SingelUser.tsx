import { deleteCategories } from "@/tookit/slices/CategorySlice"
import { AppDispatch } from "@/tookit/store"
import { User } from "@/types"
import { useDispatch } from "react-redux"

const SingelUser = (props: { user: User }) => {
  const { user } = props

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
    <td className="product__name">{user.firstName}</td>
    <td className="product__description">{user.lastName}</td>
    <td className="product__description">{user.email}</td>
    <td className="product__description">{user.isBanned ? "Yse" :"No"}</td>
    <td className="product__description">{user.isBanned ? "Yse" :"No"}</td>

    <td>
      <button onClick={() => handleDelete(user.userId)}>Delete</button>
    </td>
  </tr>
  )
}

export default SingelUser

import { Table } from "flowbite-react"
import { useDispatch } from "react-redux"
import { MdEditSquare, MdDeleteForever } from "react-icons/md";
import { deleteCategories } from "@/tookit/slices/CategorySlice"
import { AppDispatch } from "@/tookit/store"
import { Category } from "@/types"

const SingleCategory = (props: { category: Category }) => {
  const { category } = props
  const dispatch: AppDispatch = useDispatch()

  const handleDelete = async (id: number) => {
    try {
      const response = await dispatch(deleteCategories(id))
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Table.Row className="table-row">
      <Table.Cell className="table-cell">{category.categoryName}</Table.Cell>
      <Table.Cell className="table-cell">{category.categoryDescription}</Table.Cell>
      <Table.Cell className="table-cell">
        <div className="button__container">
          <button className="button__edit"><MdEditSquare size={13} /></button>
          <button className="button__delete" onClick={() => handleDelete(category.categoryId)}><MdDeleteForever size={13} /></button>
        </div>
      </Table.Cell>
    </Table.Row>
  )
}

export default SingleCategory

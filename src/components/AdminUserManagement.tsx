import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Table } from "flowbite-react"
import { MdDeleteForever } from "react-icons/md"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

import AdminSidebar from "@/components/AdminSidebar"
import useUserState from "@/hooks/useUserState"
import { deleteUser, fetchUsers } from "@/tookit/slices/UserSlice"
import { AppDispatch } from "@/tookit/store"

export const AdminUserManagement = () => {
  const { users, isLoading, error } = useUserState()

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUsers())
    }
    fetchData()
  }, [])

  const handleDelete = async (userId: number) => {
    dispatch(deleteUser(userId))
    try {
      const response = await dispatch(deleteUser(userId))
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="wrap">
      {isLoading && (
        <div className="loading-spinner-container">
          <div className="loading-spinner">
            <FontAwesomeIcon icon={faSpinner} spin style={{ color: "#889785", fontSize: "3em" }} />
            <span>Loading...</span>
          </div>
        </div>
      )}
      {error && <p>error{error}</p>}
      <AdminSidebar />
      <div className="dashboard__container">
        <div className="dashboard__content">
          <h2>List all users</h2>
          <Table className="table">
            <Table.Head>
              <Table.HeadCell className="table-head-cell">First Name</Table.HeadCell>
              <Table.HeadCell className="table-head-cell">Last Name</Table.HeadCell>
              <Table.HeadCell className="table-head-cell">Email</Table.HeadCell>
              <Table.HeadCell className="table-head-cell">Is Banned</Table.HeadCell>
              <Table.HeadCell className="table-head-cell">Is Admin</Table.HeadCell>
              <Table.HeadCell className="table-head-cell">Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {users.map((user) => (
                <Table.Row className="table-row" key={user.userId}>
                  <Table.Cell className="table-cell">{user.firstName}</Table.Cell>
                  <Table.Cell className="table-cell">{user.lastName}</Table.Cell>
                  <Table.Cell className="table-cell">{user.email}</Table.Cell>
                  <Table.Cell className="table-cell">{user.isBanned ? "Yse" : "No"}</Table.Cell>
                  <Table.Cell className="table-cell">{user.isAdmin ? "Yse" : "No"}</Table.Cell>
                  <Table.Cell className="table-cell">
                    <div className="buttonDelete__container">
                      <button className="button__delete" onClick={() => handleDelete(user.userId)}>
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
    </div>
  )
}

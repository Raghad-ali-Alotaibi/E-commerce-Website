import AdminSidebar from "@/components/AdminSidebar"
import useUserState from "@/hooks/useUserState"
import { fetchUsers } from "@/tookit/slices/UserSlice"
import { AppDispatch } from "@/tookit/store"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import SingelUser from "./SingelUser"

export const AdminUserManagement  = () => {
  const { users, isLoading, error } = useUserState()

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUsers())
    }
    fetchData()
  }, [])

  return (
    <>
    {isLoading && <p>Loading</p>}
    {error && <p>error{error}</p>}
    <AdminSidebar />
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Is Admin</th>
          <th>Is Banned</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <SingelUser key={user.userId} user={user} />
        ))}
      </tbody>
    </table>
  </>
  )
}



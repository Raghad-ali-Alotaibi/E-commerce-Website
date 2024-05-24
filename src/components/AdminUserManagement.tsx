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
    <div className="container">
    {isLoading && <p>Loading</p>}
    {error && <p>error{error}</p>}
    <AdminSidebar />
    <div className="content">
    </div>
  </div>
  )
}



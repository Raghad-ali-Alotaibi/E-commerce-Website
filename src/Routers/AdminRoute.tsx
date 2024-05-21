import { Outlet } from "react-router-dom"

import { Login } from "@/pages/Login"
import useUserState from "@/hooks/useUserState"

const AdminRoute = () => {
  const { isLoggedIn, userData } = useUserState()

  return isLoggedIn && userData?.isAdmin ? <Outlet /> : <Login />
}

export default AdminRoute

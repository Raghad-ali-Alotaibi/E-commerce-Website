import { Outlet } from "react-router-dom"

import { Login } from "@/pages/Login"
import useUserState from "@/hooks/useUserState"

const UserRoute = () => {
  const { isLoggedIn } = useUserState()
  return isLoggedIn ? <Outlet /> : <Login />
}

export default UserRoute

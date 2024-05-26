import { useSelector } from "react-redux"

import { RootState } from "@/tookit/store"

const useUserState = () => {
  const {users, isLoading, error ,isLoggedIn ,userData } = useSelector(
    (state: RootState) => state.userR
  )
  return {users,isLoading, error ,isLoggedIn ,userData}
}

export default useUserState
import { RootState } from "@/tookit/store"
import { useSelector } from "react-redux"

const useUserState = () => {
  const { isLoading, error ,isLoggedIn ,userData } = useSelector(
    (state: RootState) => state.userR
  )
  return {isLoading, error ,isLoggedIn ,userData}
}

export default useUserState
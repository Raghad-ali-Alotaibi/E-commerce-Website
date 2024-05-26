import { useSelector } from "react-redux"

import { RootState } from "@/tookit/store"

const useOrderState = () => {
  const { orders, order, isLoading, error } = useSelector((state: RootState) => state.orderR)
  return { orders, order, isLoading, error }
}

export default useOrderState

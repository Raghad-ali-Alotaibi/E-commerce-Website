import { useSelector } from "react-redux"

import { RootState } from "@/tookit/store"


const useCartState = () => {
  const { cartItems } = useSelector((state: RootState) => state.CartR)
  return { cartItems }
}

export default useCartState

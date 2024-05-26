import { useSelector } from "react-redux"

import { RootState } from "@/tookit/store"

const useProductState = () => {
  const { products, isLoading, error, totalPages, product } = useSelector(
    (state: RootState) => state.ProductR
  )
  return { products, isLoading, error, totalPages, product}
}

export default useProductState
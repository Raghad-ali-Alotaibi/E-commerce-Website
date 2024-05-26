import { useSelector } from "react-redux"

import { RootState } from "@/tookit/store"

const useCategoriesState = () => {
  const { categories, isLoading, error, category } = useSelector(
    (state: RootState) => state.categoryR
  )
  return { categories, isLoading, error, category }
}

export default useCategoriesState

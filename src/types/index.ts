export type Product = {
  productId: number
  productName: string
  productSlug: string
  productDescription: string
  productPrice: number
  productImage: string
  productQuantityInStock: number
  categoryId: number
  categories: Category[]
}

export type ProductState = {
  products: Product[]
  product: Product | null
  totalPages: number
  error: null | string
  isLoading: boolean
}

export type User = {
  firstName: string
  lastName: string
  email: string
  mobile: string
  password: string
  isAdmin?: string
  isBanned?: string
}

export type UserState = {
  error: null | string
  isLoading: boolean
}

export type FormData = {
  firstName: string
  lastName: string
  email: string
  password: string
  mobile: string
}

export type LoginFormData = {
  email: string
  password: string
}

export type Category = {
  categoryId: number
  categoryName: string
  categorySlug: string
  categoryDescription: string
  products: Product[]
}

export type CategoryStates = {
  categories: Category[]
  category: Category | null
  error: string | null
  isLoading: boolean
}
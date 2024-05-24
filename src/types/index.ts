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
  userId: number 
  firstName: string
  lastName: string
  email: string
  mobile: string
  password: string
  isAdmin?: string
  isBanned?: string
}

export type UserState = {
  users: User[]
  error: null | string
  isLoading: boolean
  isLoggedIn: boolean
  userData: User | null
  token: null | string
}

export type RegisterFormData = {
  firstName: string
  lastName: string
  email: string
  password: string
  mobile: string
}

export type UpdateFormData = {
  firstName: string
  lastName: string
}

export type LoginFormData = {
  email: string
  password: string
}

// for Local Storage
export type LoginData = {
  isLoggedIn: boolean
  userData: User | null
  token: string
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

export type CreateFormData = {
  categoryName: string
  categoryDescription: string
}
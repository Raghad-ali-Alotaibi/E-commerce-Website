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

export type CreateProductForBackend = {
  productId: number
  productName: string
  productDescription: string
  productPrice: number
  productImage: string
  productQuantityInStock: number
  categoryId: number
  categories: Category[]
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
  userId: number
  firstName: string
  lastName: string
  email: string
  password: string
  mobile: string
}

export type UpdateUserFormData = {
  userId: number
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
export type UpdateFormData = {
  categoryId: number
  categoryName: string
  categoryDescription: string
}
export type CreateFormData = {
  categoryName: string
  categoryDescription: string
}

export type CartItem = Product & { orderQuantity: number }

export type CartState = {
  cartItems: CartItem[]
}

export type Order = {
  orderId: number
  orderDate: string
  orderStatus: string
  user: User
  orderProducts: OrderProduct[]
}
export type OrderProduct = {
  quantity: number
  product: Product
}
export type OrderStates = {
  orders: Order[]
  order: Order | null
  error: string | null
  isLoading: boolean
}

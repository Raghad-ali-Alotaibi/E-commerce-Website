export type Category = {
  categoryId: number
  categoryName: string
  categorySlug: string
  categoryDescription: string
  products: Product[]
}

export type Product = {
  productId: number
  productName: string
  productSlug: string
  productDescription: string
  productPrice: number
  productImage: string
  productQuantityInStock: number
  categoryId: number
  category: Category[]
}

export type ProductState = {
  products: Product[]
  product: Product | null
  totalPages:number
  error: null | string
  isLoading: boolean
}

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

import PageTitle from "@/components/PageTitle"
import { fetchProductBySlug } from "@/tookit/slices/ProductSlice"
import { AppDispatch } from "@/tookit/store"
import { Horizontal } from "@/components/Horizontal"
import useProductState from "@/hooks/useProductState"
import { Product } from "@/types"
import { addToCart } from "@/tookit/slices/CartSlice"

export const ProductDetails = () => {
  const { productSlug } = useParams<{ productSlug: string }>()

  const { product, isLoading, error } = useProductState()

  const dispatch: AppDispatch = useDispatch()

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
  }

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProductBySlug(productSlug))
    }
    fetchData()
  }, [])

  const formatPrice = (amount: number) => {
    return amount.toLocaleString("en-us", {
      style: "currency",
      currency: "USD"
    })
  }

  return (
    <article className="details">
      <PageTitle title="Product" />
      {isLoading && <p>Loading</p>}
      {error && <p>error{error}</p>}
      {product && (
        <div className="product__details">
          <div className="product__left">
            <img
              src={product.productImage}
              alt={product.productName}
              className="product-details__img"
            />
          </div>
          <div className="product__right">
            <h3 className="product-details__name">{product.productName}</h3>
            <p className="product-details__price">{formatPrice(product.productPrice)}</p>
            <Horizontal />
            <p className="product-details__description">{product.productDescription}</p>
            <Horizontal />
            <div className="product-details__quantity">
              In stock: {product.productQuantityInStock}
            </div>
            <Horizontal />
            <div>
              <button className="product-details__cart" onClick={() => handleAddToCart(product)}>
                Add to cart<i className="fa-solid fa-cart-shopping" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}

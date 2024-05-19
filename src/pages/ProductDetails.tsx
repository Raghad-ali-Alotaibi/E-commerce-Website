import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import PageTitle from "@/components/PageTitle"
import { fetchProductBySlug } from "@/tookit/slices/ProductSlice"
import { AppDispatch, RootState } from "@/tookit/store"
import QuantitySelectorButton from "@/components/QuantitySelectorButton"
import { Horizontal } from "@/components/Horizontal"

export const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>()
  const { product, isLoading, error } = useSelector((state: RootState) => state.ProductR)

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProductBySlug(productId))
    }
    fetchData()
  }, [])

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
            <p className="product-details__price">
              {product.productPrice.toLocaleString("en-us", {
                style: "currency",
                currency: "USD"
              })}
            </p>
            <Horizontal />
            <p className="product-details__description">{product.productDescription}</p>
            <Horizontal />
            <QuantitySelectorButton />
            <Horizontal />
            <div>
              <button className="product-details__cart">Add to cart</button>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}

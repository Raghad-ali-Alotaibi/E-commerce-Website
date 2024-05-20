import { Link } from "react-router-dom"

import { Product } from "@/types"

const SingleProduct = (props: { product: Product }) => {
  const { product } = props

  return (
    <div className="product__card">
      <div className="product__images">
        <img src={product.productImage} alt={product.productName} className="product__img" />
      </div>
      <div className="product__content">
        <h2 className="product__name">{product.productName}</h2>
        <p className="product__price">
          {product.productPrice.toLocaleString("en-us", {
            style: "currency",
            currency: "USD"
          })}
        </p>
        <p>Quantity: {product.productQuantityInStock}</p>
        <div className="button-container">
          <button className="product__button">
            Add to cart<i className="fa-solid fa-cart-shopping" aria-hidden="true"></i>
          </button>
          <Link to={`/products/slug/${product.productSlug}`}>
            <button className="product__button">
              Show details <i className="fa-solid fa-ellipsis" aria-hidden="true"></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct

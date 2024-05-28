import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { Product } from "@/types"
import { AppDispatch } from "@/tookit/store"
import { useDispatch } from "react-redux"
import { addToCart } from "@/tookit/slices/CartSlice"

const SingleProduct = (props: { product: Product }) => {
  const { product } = props
  const dispatch: AppDispatch = useDispatch()

  const handleAddToCart =(product: Product)=>{
    dispatch(addToCart(product))
  }
  const formatPrice = (amount: number ) => {
    return amount.toLocaleString("en-us", {
      style: "currency",
      currency: "USD"
    })
  }

  return (
    <div className="product__card">
      <div className="product__images">
        <img src={product.productImage} alt={product.productName} className="product__img" />
      </div>
      <div className="product__content">
        <h2 className="product__name">{product.productName}</h2>
        <p className="product__price">
          {formatPrice(product.productPrice)}
        </p>
        <p>Quantity: {product.productQuantityInStock}</p>
        <div className="button-container">
          <button className="product__button" onClick={()=>
            handleAddToCart(product)}>
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

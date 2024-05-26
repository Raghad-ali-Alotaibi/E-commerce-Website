import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { MdDeleteForever } from "react-icons/md"

import { AppDispatch } from "@/tookit/store"
import useCartState from "@/hooks/useCartState"
import {
  DecrementQuantity,
  IncrementQuantity,
  removeAllFromCart,
  removeFromCart
} from "@/tookit/slices/CartSlice"
import { Horizontal } from "@/components/Horizontal"

export const Cart = () => {
  const { cartItems } = useCartState()
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const handleRemoveAll = () => {
    dispatch(removeAllFromCart())
  }
  const handleRemove = (productId: number) => {
    if (productId) {
      dispatch(removeFromCart(productId))
    }
  }
  const formatPrice = (amount: number ) => {
    return amount.toLocaleString("en-us", {
      style: "currency",
      currency: "USD"
    })
  }

  const cartTotal = () => {
    let total = 0
    cartItems &&
      cartItems.map((cartItem) => (total += cartItem.productPrice * cartItem.orderQuantity))
    return formatPrice(total)
  }
  const handleIncrement = (productId: number) => {
    if (productId) {
      dispatch(IncrementQuantity(productId))
    }
  }

  const handleDecrement = (productId: number) => {
    if (productId) {
      dispatch(DecrementQuantity(productId))
    }
  }

  return (
    <div className="cart">
      {cartItems && cartItems.length > 0 ? (
        <>
          <div className="cart__heading">
            <h2 className="cart__title">Shopping Cart</h2>
          </div>
          <div className="titles">
            <div className="cart__titleleft">Product</div>
            <div className="cart__titlelecenter">Price</div>
            <div className="cart__titlelecenter">Quantity</div>
            <div className="cart__titleright">Delete</div>
          </div>
          <Horizontal />

          <div className="card__content">
              {cartItems.map((cartItem) => (
                <div className="card__items" key={cartItem.productId}>
                  <div className="card__left">
                    <img
                      src={cartItem.productImage}
                      alt={cartItem.productName}
                      className="cartitem__img"
                    />
                    <p className="cartitem__name">{cartItem.productName}</p>
                  </div>
                    <p className="card__center">{formatPrice(cartItem.productPrice)}</p>
                    <div className="card__right">
                    <p>In stock: {cartItem.productQuantityInStock}</p>
                    <div className="quantity">
                      <button
                        className="button__quantity"
                        onClick={() => {
                          handleDecrement(cartItem.productId)
                        }}
                      >
                        -
                      </button>
                      <span>{cartItem.orderQuantity}</span>
                      <button
                        className="button__quantity"
                        onClick={() => {
                          handleIncrement(cartItem.productId)
                        }}
                        disabled={cartItem.productQuantityInStock == cartItem.orderQuantity}
                      >
                        +
                      </button>
                    </div>
                    </div>
                    <div className="buttonDelete__container cart__titleright">
                    <button
                      className="button__delete"
                      onClick={() => handleRemove(cartItem.productId)}
                    >
                      <MdDeleteForever size={13} />
                    </button>
                    </div>
                  </div>
              ))}
            </div>
            <Horizontal />
            <div className="card__end">
              <div>
              <button className="Remove__all" onClick={handleRemoveAll}>
                Clear
              </button>
              </div>
              <div className="total__container">
                <div className="total">
                  <span className="total__color">Total:</span>
                  <span className="total__color">{cartTotal()}</span>
                </div>
                <button className="ckeckout">Ckeckout</button>
                <button
              onClick={() => {
                navigate("/")
              }}
            >
              <i className="fa-solid fa-arrow-left"></i>  Shop more
            </button>
              </div>
            </div>
        </>
      ) : (
        <div className="cart__empty">
          <p className="not-found__info">Your cart is empty</p>
          <div>
            <button
              className="not-found__button"
              onClick={() => {
                navigate("/")
              }}
            >
              Start Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
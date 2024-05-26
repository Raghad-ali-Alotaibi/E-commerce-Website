import { CiShoppingCart } from "react-icons/ci"

const CartCount = ({value}:{value:number}) => {
  return (
    <div className="cart__container">
      <div className="cart__icon">
        <CiShoppingCart />
        <span className="cart__total">{value}</span>
      </div>
    </div>
  )
}
export default CartCount
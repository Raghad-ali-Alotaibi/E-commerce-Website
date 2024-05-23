import { Link } from "react-router-dom";
// import { useCart } from "";

import { CiShoppingCart } from "react-icons/ci";

const CartCount = () => {
//   const { cartTotalQty } = useCart();
  
  return (
    <div className="cart__container">
      <Link to="/cart" className="cart__link">
        <div className="cart__icon">
          <CiShoppingCart />
        </div>
        {/* {cartTotalQty > 0 && <span className="cart__total">{cartTotalQty}</span>} */}
      </Link>
    </div>
  );
};

export default CartCount;

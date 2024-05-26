import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"

import UserMenu from "../UserMenu"
import { AppDispatch } from "@/tookit/store"
import useUserState from "@/hooks/useUserState"
import { logout } from "@/tookit/slices/UserSlice"
import CartCount from "../CartCount"
import useCartState from "@/hooks/useCartState"

const Navbar = () => {
  const dispatch: AppDispatch = useDispatch()

  const { isLoggedIn, userData } = useUserState()
  const { cartItems } = useCartState()

  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <nav>
      <div className="nav">
        <div className="nav__container">
          <div className="nav__content">
            <Link to="/">
              <img className="logo" src="./images/logo.png" alt="logo" />
            </Link>
            {isLoggedIn && (
              <>
                {isLoggedIn && (
                  <>
                    {!userData.isAdmin && ( // Check if user is not an admin
                        <div className="nav__cart">
                          <Link to="/cart" className="cart__link">
                            <CartCount
                              value={cartItems && cartItems.length > 0 ? cartItems.length : 0}
                            />
                          </Link>
                        </div>
                    )}
                    <div className="nav__active">
                      <div className="dashboard">
                        <Link to={`/dashboard/${userData && userData.isAdmin ? "admin" : "user"}`}>
                          {userData && userData.isAdmin ? "Admin" : "User"} Dashboard
                        </Link>
                      </div>
                      <div className="logout-link">
                        <Link to="/" onClick={handleLogout}>
                          Logout
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
            {!isLoggedIn && (
              <>
                <div className="nav__active">
                  <div>
                    <UserMenu />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
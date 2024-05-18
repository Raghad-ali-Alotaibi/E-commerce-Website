import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav>
      <div className="nav">
        <div className="nav__container">
          <div className="nav__content">
            <Link to="/">
              <img className="logo" src="./images/logo.png" alt="logo" />
            </Link>
            <div className="nav__search">Search</div>
            <div className="nav__active">
              <div> Shopping Cart</div>
              <div>UserMenu</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

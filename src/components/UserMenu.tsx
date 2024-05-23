import { useCallback, useState } from "react"
import { AiFillCaretDown } from "react-icons/ai"
import { RxAvatar } from "react-icons/rx"
import { Link } from "react-router-dom"

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  return (
    <div className="menu__container">
      <div className="menu-toggle__open" onClick={toggleOpen}>
        <div className="avatar-container">
          <RxAvatar size={25} />
        </div>
        <div className="caret-icon-container">
          <AiFillCaretDown size={25} />
        </div>
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          <div>
            <Link to="/register">Register</Link>
          </div>
          <div>
            <Link to="/login">Login</Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu

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
        <RxAvatar />
        <AiFillCaretDown />
      </div>
      {isOpen && (
        <div className="open">
          <div>
            <Link to="/register">Register</Link>
          </div>
          <div>
            <Link to="/Login">Login</Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu

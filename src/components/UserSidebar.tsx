import { Link } from "react-router-dom"

import useUserState from "@/hooks/useUserState"

const UserSidebar = () => {
  const { userData } = useUserState()

  return (
    <aside className="sidebar-container">
      <div>
        <h2>Your Profile</h2>
        <p>{userData?.firstName}</p> {/* need fix  */}
        <p>{userData?.email}</p> {/* need fix  */}
      </div>
      <ul>
        <li>
          <Link to="/dashboard/user/profile">Profile</Link>
        </li>
        <li>
          <Link to="/dashboard/user/orders">Orders</Link>
        </li>
      </ul>
    </aside>
  )
}

export default UserSidebar

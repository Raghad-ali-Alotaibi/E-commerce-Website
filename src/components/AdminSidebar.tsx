import { Link } from "react-router-dom"

import useUserState from "@/hooks/useUserState"

const AdminSidebar = () => {
  const { userData } = useUserState()

  return (
    <aside>
      <div>
        <h2>Your Profile</h2>
        <p>{userData?.firstName}</p>
        <p>{userData?.email}</p>
      </div>
      <ul>
        <li>
          <Link to="/dashboard/admin/categories">Categories</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/products">Products</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/users">Users</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/orders">Orders</Link>
        </li>
      </ul>
    </aside>
  )
}

export default AdminSidebar
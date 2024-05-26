import React from "react"
import { Link } from "react-router-dom"
import { HiUser, HiShoppingBag, HiChartPie } from "react-icons/hi"
import { MdProductionQuantityLimits } from "react-icons/md"
import { BiSolidCategoryAlt } from "react-icons/bi"

// Define the type for the 'to' prop
interface SidebarItemProps {
  to: string
  icon: React.ReactNode
  children: React.ReactNode
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, children }) => {
  return (
    <Link to={to} className="sidebar-item">
      <span className="sidebar-icon">{icon}</span>
      <span className="sidebar-text">{children}</span>
    </Link>
  )
}

const AdminSidebar = () => {
  return (
    <aside className="sidebar-container">
      <div className="sidebar">
        <SidebarItem to="/dashboard/admin" icon={<HiChartPie size={25} />}>
          Dashboard
        </SidebarItem>
      </div>

      <div className="sidebar">
        <SidebarItem to="/dashboard/admin/categories" icon={<BiSolidCategoryAlt size={25} />}>
          Categories
        </SidebarItem>
      </div>

      <div className="sidebar">
        <SidebarItem to="/dashboard/admin/products" icon={<MdProductionQuantityLimits size={25} />}>
          Products
        </SidebarItem>
      </div>

      <div className="sidebar">
        <SidebarItem to="/dashboard/admin/users" icon={<HiUser size={25} />}>
          Users
        </SidebarItem>
      </div>

      <div className="sidebar">
        <SidebarItem to="/dashboard/admin/orders" icon={<HiShoppingBag size={25} />}>
          Orders
        </SidebarItem>
      </div>
    </aside>
  )
}
export default AdminSidebar

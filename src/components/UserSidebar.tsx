import React from "react"
import { Link } from "react-router-dom"
import { HiUser, HiChartPie } from "react-icons/hi"

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

const UserSidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <SidebarItem to="/dashboard/user" icon={<HiChartPie size={25} />}>
          Dashboard
        </SidebarItem>
      </div>

      <div className="sidebar">
        <SidebarItem to="/dashboard/user/profile" icon={<HiUser size={25} />}>
          Profile
        </SidebarItem>
      </div>
    </div>
  )
}
export default UserSidebar

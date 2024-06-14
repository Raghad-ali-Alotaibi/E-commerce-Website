import AdminSidebar from "@/components/AdminSidebar"
import useUserState from "@/hooks/useUserState"
import { useNavigate } from "react-router-dom"

export const DashboardAdmin = () => {
  const { userData} = useUserState()
  const navigate = useNavigate()

  if (!userData || !userData.firstName) {
    navigate("/login");
    return null;
  }

  return (
    <div className="wrap">
      <AdminSidebar />
      <div className="dashboard__container">
        <div className="dashboard__content">
          <h1>Welcome Back {userData.firstName} &#10024;</h1>
          <h2>wishing you an easy, smile day &#128568;</h2>
        </div>
      </div>
    </div>
  )
}

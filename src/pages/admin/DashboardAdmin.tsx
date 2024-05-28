import AdminSidebar from "@/components/AdminSidebar"
import useUserState from "@/hooks/useUserState"
import { useNavigate } from "react-router-dom"

export const DashboardAdmin = () => {
  const { userData, isLoading } = useUserState()
  const navigate = useNavigate()

  // If user data is still loading, show a loading indicator
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userData || !userData.firstName) {
    navigate("/login");
    return null;
  }

  return (
    <div className="wrap">
      <AdminSidebar />
      <div className="dashboard__container">
        <div className="dashboard__content">
          <h1>Welcome Back {userData.firstName} &#10024; .</h1>
          <h2>wishing you an easy, smile day &#128568;</h2>
        </div>
      </div>
    </div>
  )
}

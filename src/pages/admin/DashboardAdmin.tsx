import AdminSidebar from "@/components/AdminSidebar"
import useUserState from "@/hooks/useUserState"

export const DashboardAdmin = () => {
  const { userData } = useUserState()

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

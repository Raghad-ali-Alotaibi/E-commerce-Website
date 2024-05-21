import UserSidebar from "@/components/UserSidebar"
import useUserState from "@/hooks/useUserState"

export const UserProfile = () => {
  const { userData } = useUserState()

  return (
    <div>
      <UserSidebar />
      <div>
        {userData && (
          <>
            <h3>First Name: {userData.firstName}</h3>
            <h3>Last Name: {userData.lastName}</h3>
            <p>Email: {userData.email}</p>
            <p>Mobile: {userData.mobile}</p>
          </>
        )}
      </div>
    </div>
  )
}

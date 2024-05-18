import { Link } from "react-router-dom"

import PageTitle from "@/components/PageTitle"

export const Error = () => {
  return (
    <>
      <PageTitle title="404 Not Found" />
      <div className="not__found">
        <img className="not-found__img" src="/public/images/error.png" />
        <p className="not-found__info">Oops! The page you are looking for is not here. </p>
        <Link to="/">
          <button className="not-found__button">Back to Home</button>
        </Link>
      </div>
    </>
  )
}

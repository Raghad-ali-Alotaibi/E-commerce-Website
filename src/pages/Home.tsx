import PageTitle from "@/components/PageTitle"
import HomeBanner from "@/components/HomeBanner"
import Products from "@/components/Products"

export const Home = () => {
  return (
    <div className="home__container">
      <PageTitle title="Home" />
      <HomeBanner />
      <Products/>
    </div>
  )
}
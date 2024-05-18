import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { fetchProducts } from "@/tookit/slices/ProductSlice"
import { AppDispatch, RootState } from "@/tookit/store"
import SingleProduct from "./SingleProduct"

const Products = () => {
  const { products, isLoading, error, totalPages } = useSelector(
    (state: RootState) => state.ProductR
  )

  const dispatch: AppDispatch = useDispatch()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(4)
  const [keyword, setkeyword] = useState("")
  const [sortBy, setsortBy] = useState("price")

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts({ pageNumber, pageSize, keyword, sortBy }))
    }
    fetchData()
  }, [pageNumber, keyword, sortBy])

  const handlePreviousPage = () => {
    setPageNumber((currentPage) => currentPage - 1)
  }

  const handleNextPage = () => {
    setPageNumber((currentPage) => currentPage + 1)
  }
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setkeyword(event.target.value)
  }
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setsortBy(event.target.value)
  }

  return (
    <>
      {isLoading && <p>Loading</p>}
      {error && <p>error{error}</p>}
      <div className="container">
        <input
          type="search"
          placeholder="Search Products"
          className="search__products"
          value={keyword}
          onChange={handleSearchChange}
          style={{ 
            backgroundImage: `url('/images/search-icon.png')`,
            backgroundPosition: "10px center",
            backgroundSize: "20px 20px",
            backgroundRepeat: "no-repeat",
            paddingLeft: "35px"
          }}
        />
        <div className="products__sort">
          <p className="products-sort__title">Sort By :</p>
          <select name="sort" id="sort" onChange={handleSortChange}>
            <option value="price">Price</option>
            <option value="product name">Product Name</option>
          </select>
        </div>
      </div>

      <section className="products">
        {products &&
          products.length > 0 &&
          products.map((product) => <SingleProduct key={product.productId} product={product} />)}
      </section>
      <div className="pagination">
        <button
          className="button__pagination"
          onClick={handlePreviousPage}
          disabled={pageNumber === 1}
        >
          <i className="fa-solid fa-angle-left"></i>
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button className="button__numbers" key={index} onClick={() => setPageNumber(index + 1)}>
            {index + 1}
          </button>
        ))}
        <button
          className="button__pagination"
          onClick={handleNextPage}
          disabled={pageNumber === totalPages}
        >
          <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </>
  )
}
export default Products

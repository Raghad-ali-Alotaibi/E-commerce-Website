import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

import { fetchProducts, searchProducts } from "@/tookit/slices/ProductSlice"
import { AppDispatch } from "@/tookit/store"
import SingleProduct from "./SingleProduct"
import { Horizontal } from "./Horizontal"
import useProductState from "@/hooks/useProductState"
import useCategoriesState from "@/hooks/useCategoriesState"
import { fetchCategories } from "@/tookit/slices/CategorySlice"

const Products = () => {
  const { products, isLoading, error, totalPages } = useProductState()
  const { categories } = useCategoriesState()

  const dispatch: AppDispatch = useDispatch()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(4)
  const [sortBy, setSortBy] = useState("price")
  const [searchKeyword, setSearchKeyword] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts({ pageNumber, pageSize, sortBy, selectedCategories }))
    }
    fetchData()
  }, [pageNumber, sortBy, selectedCategories])

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategories())
    }
    fetchData()
  }, [])

  const handlePreviousPage = () => {
    setPageNumber((currentPage) => currentPage - 1)
  }

  const handleNextPage = () => {
    setPageNumber((currentPage) => currentPage + 1)
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value)
  }

  const handleSearch = async () => {
    if (searchKeyword.trim()) {
      await dispatch(searchProducts(searchKeyword))
    } else {
      // fetch all products
      await dispatch(fetchProducts({ pageNumber, pageSize, sortBy, selectedCategories }))
    }
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value)
  }
  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    )
  }

  return (
    <>
      {isLoading && (
        <div className="loading-spinner-container">
          <div className="loading-spinner">
            <FontAwesomeIcon icon={faSpinner} spin style={{ color: "#889785", fontSize: "3em" }} />
            <span>Loading...</span>
          </div>
        </div>
      )}
      {error && <p>error{error}</p>}
      <p className="title__product">Our Products</p>
      <div className="search__container">
        <div className="search__content">
          <input
            type="search"
            placeholder="Search Products"
            value={searchKeyword}
            onChange={handleInputChange}
            className="search__products"
            style={{
              backgroundImage: `url('/images/search-icon.png')`,
              backgroundPosition: "0.6rem center",
              backgroundSize: "1.2rem 1.2rem",
              backgroundRepeat: "no-repeat",
              paddingLeft: "2.1rem",
              flex: 1
            }}
          />
          <button className="button__search" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div className="container">
        <div className="categories__container">
          <p className="title__categories">Filter by categories:</p>
          {categories &&
            categories.length > 0 &&
            categories.map((category) => (
              <div key={category.categoryId} className="categories">
                <label htmlFor="categories">
                  <input
                    type="checkbox"
                    value={category.categoryId}
                    checked={selectedCategories.includes(category.categoryId)}
                    onChange={() => handleCategoryChange(category.categoryId)}
                  />
                  {category.categoryName}
                </label>
              </div>
            ))}
        </div>

        <div className="products__sort">
          <p className="products-sort__title">Sort By :</p>
          <select name="sort" id="sort" onChange={handleSortChange}>
            <option value="price">Price</option>
            <option value="product name">Product Name</option>
          </select>
        </div>
      </div>
      <Horizontal />
      <section className="products">
        {products &&
          products.length > 0 &&
          products.map((product) => <SingleProduct key={product.productSlug} product={product} />)}
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

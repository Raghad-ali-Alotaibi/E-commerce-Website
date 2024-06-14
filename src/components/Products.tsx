import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { IoPhonePortraitOutline } from "react-icons/io5"
import { MdOutlineLaptopMac } from "react-icons/md"
import { IoWatch } from "react-icons/io5"
import { FaTv } from "react-icons/fa"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

import { fetchProducts, searchProducts } from "@/tookit/slices/ProductSlice"
import { AppDispatch } from "@/tookit/store"
import SingleProduct from "./SingleProduct"
import { Horizontal } from "./Horizontal"
import useProductState from "@/hooks/useProductState"
import useCategoriesState from "@/hooks/useCategoriesState"
import { fetchCategories } from "@/tookit/slices/CategorySlice"
import Categories from "./Categories"

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
      <Horizontal />
      {isLoading && (
        <div className="loading-spinner-container">
          <div className="loading-spinner">
            <FontAwesomeIcon icon={faSpinner} spin style={{ color: "#889785", fontSize: "3em" }} />
          </div>
        </div>
      )}
      {error && <p>error{error}</p>}
      
      {!isLoading && !error && (
        <div className="display__categories">
          <div className="categories__container">
            {categories &&
              categories.length > 0 &&
              categories.map((category) => {
                let icon
                switch (category.categoryName) {
                  case "Phone":
                    icon = <IoPhonePortraitOutline size={20} />
                    break
                  case "Laptop":
                    icon = <MdOutlineLaptopMac size={20} />
                    break
                  case "Watch":
                    icon = <IoWatch size={20} />
                    break
                  case "TV":
                    icon = <FaTv size={20} />
                    break
                  default:
                    icon = <IoPhonePortraitOutline size={20} />
                }
                return (
                  <Categories
                    key={category.categoryId}
                    categoryId={category.categoryId}
                    label={category.categoryName}
                    selected={selectedCategories.includes(category.categoryId)}
                    handleCategoryChange={handleCategoryChange}
                    icon={icon}
                  />
                )
              })}
          </div>
        </div>
      )}
      {!isLoading && !error && (
        <section className="products">
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <SingleProduct key={product.productSlug} product={product} />
            ))}
        </section>
      )}
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

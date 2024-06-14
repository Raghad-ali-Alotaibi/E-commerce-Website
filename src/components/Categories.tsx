import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

interface CategoryProps {
  label: string;
  icon: ReactNode;
  selected?: boolean;
  categoryId: number;
  handleCategoryChange: (categoryId: number) => void;
}

const Categories: React.FC<CategoryProps> = ({ label, icon, selected, categoryId, handleCategoryChange }) => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);

  const handleClick = () => {
    if (label === "All") {
      navigate("/");
    } else {
      const currentQuery = params ? queryString.parse(params.toString()) : {};
      const updateQuery = {
        ...currentQuery,
        category: label
      };
      const url = queryString.stringifyUrl(
        {
          url: "/",
          query: updateQuery
        },
        {
          skipNull: true
        }
      );
      navigate(url);
    }
    handleCategoryChange(categoryId);
  };

  return (
    <div
      onClick={handleClick}
      className={`categories__container ${selected ? "selected1" : "selected2"}`}
    >
      {icon}
      <div className="label">{label}</div>
    </div>
  );
};

export default Categories;

import { useNavigate } from "react-router-dom";
import "./category-item.styles.scss";

function CategoryItem({ category }) {
  const navigate = useNavigate();

  return (
    <div
      className="category-container"
      key={category.id}
      onClick={() => {
        navigate(`shop/${category.title}`);
      }}
    >
      <div
        className="background-image"
        style={{ backgroundImage: `url(${category.imageUrl})` }}
      />
      <div className="category-body-container">
        <h2>{category.title.toUpperCase()}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
}

export default CategoryItem;

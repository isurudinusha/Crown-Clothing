import CategoryItem from "../category-item/category-item.component";
import "./categories.styles.scss";

function Categories({ categories }) {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <CategoryItem category={category} key={category.id} />
      ))}
    </div>
  );
}

export default Categories;

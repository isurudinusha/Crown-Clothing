import { useContext } from "react";
import { CategoriesContext } from "../../context/categories.context";
import { useSelector } from "react-redux";
import ProductCard from "../../components/product-card/product-card.component";
import { Link } from "react-router-dom";
import { selectCategories } from "../../store/categories/categories.selector";

function CategoriesPreview() {
  // const { categoriesMap } = useContext(CategoriesContext);
  const categoriesMap = useSelector(selectCategories);

  return (
    <>
      {categoriesMap.length > 0 ? (
        Object.keys(categoriesMap).map((key) => (
          <>
            <h2 style={{ cursor: "pointer" }}>
              <Link to={categoriesMap[key].title.toLowerCase()}>
                {categoriesMap[key].title.toUpperCase()} &#10148;
              </Link>
            </h2>
            <div className="products-container">
              {categoriesMap[key].items.slice(0, 4).map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </>
        ))
      ) : (
        <div className="loading-container">
          <div className="preloader">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              <path
                fill="#626767"
                stroke="#626767"
                stroke-width="15"
                transform-origin="center"
                d="m148 84.7 13.8-8-10-17.3-13.8 8a50 50 0 0 0-27.4-15.9v-16h-20v16A50 50 0 0 0 63 67.4l-13.8-8-10 17.3 13.8 8a50 50 0 0 0 0 31.7l-13.8 8 10 17.3 13.8-8a50 50 0 0 0 27.5 15.9v16h20v-16a50 50 0 0 0 27.4-15.9l13.8 8 10-17.3-13.8-8a50 50 0 0 0 0-31.7Zm-47.5 50.8a35 35 0 1 1 0-70 35 35 0 0 1 0 70Z"
              >
                <animateTransform
                  type="rotate"
                  attributeName="transform"
                  calcMode="spline"
                  dur="2"
                  values="0;120"
                  keyTimes="0;1"
                  keySplines="0 0 1 1"
                  repeatCount="indefinite"
                ></animateTransform>
              </path>
            </svg>
          </div>
        </div>
      )}
    </>
  );
}

export default CategoriesPreview;

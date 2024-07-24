import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
// import { CategoriesContext } from "../../context/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import { useNavigate } from "react-router-dom";
import { selectCategories } from "../../store/categories/categories.selector";
import "./category.styles.scss";

function Category() {
  // const { categoriesMap } = useContext(CategoriesContext);
  const categoriesMap = useSelector(selectCategories);
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Object.keys(categoriesMap).map((key) => {
      if (categoriesMap[key].title.toLowerCase() === category)
        setProducts(categoriesMap[key].items);
    });
    window.scrollTo(0, 0);
  }, [category, categoriesMap]);

  return (
    <>
      {products.length > 0 ? (
        <>
          <div
            className="category-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
              {" "}
              &#11164;
            </h2>
            <h2 style={{ textAlign: "center", flexGrow: 1 }}>
              {category.toUpperCase()}
            </h2>
          </div>
          <div className="products-container">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
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

export default Category;

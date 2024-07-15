import { createContext, useState, useEffect } from "react";
import {
  addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from "../utils/firebase/firebase.utils.js";
// Removed the commented import as it's not being used in the current context
// import SHOP_DATA from "../shop-data.js";

export const CategoriesContext = createContext({ categoriesMap: {} });

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  useEffect(() => {
    const getCategories = async () => {
      const categoriesMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoriesMap);
    };
    getCategories();
  }, []);

  const value = { categoriesMap, setCategoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

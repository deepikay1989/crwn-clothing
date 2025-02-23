import { useContext, Fragment } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesMap, selectCategoriesIsLoading } from "../../store/categories/category.selector";
// import { CategoriesContext } from "../../contexts/categories.context";
import { Spinner } from "../../componnets/spinner/spinner";
import { CategoryPreview } from "../../componnets/category-preview/category-preview";

const CategoriesPreview = () => {
  // const { categoriesMap } = useContext(CategoriesContext);
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  return (
    <Fragment>
      {
        isLoading ? (
          <Spinner />
        ) : (
          Object.keys(categoriesMap).map((title) => { 
            const products = categoriesMap[title];
            return (
                <CategoryPreview key={title} title={title} products={products} />
            )      
          })
        )
      }      
    </Fragment>
  );
};

export { CategoriesPreview };

import { useContext, useEffect, useState, Fragment} from 'react';
import { useParams } from 'react-router-dom';
import { CategoriesContext } from '../../contexts/categories.context';
import { ProductCard } from '../../componnets/product-card/product-card';
import './category.styles.scss';

const Category = () => {
    const {category} = useParams();
    const {categoriesMap} = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);
    useEffect(() =>{
        setProducts(categoriesMap[category]);
    },[category, categoriesMap]);

    return (
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>            
                {
                    products && 
                        products.map((product) => {
                        return (
                            <ProductCard key={product.id} product={product} />
                        )
                    })
                }
            </div>
        </Fragment>
    )

}

export {Category}
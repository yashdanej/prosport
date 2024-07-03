import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../ReduxToolkit/Hooks';
import { Container } from 'reactstrap';
import ProductFeatures from './ProductFeatures/ProductFeatures';
import { setProductItem } from '../../../../ReduxToolkit/Reducers/ProductSlice';
import { productsData } from '../../../../Data/Application/Ecommerce/Product';
import ProductGrid from './ProductGrid/ProductGrid';

const ProductsContainer = () => {
    const { sideBarOn } = useAppSelector((state) => state.filterData);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(setProductItem(productsData));
    }, []);
  return (
    <Container fluid className={`product-wrapper ${sideBarOn ? "sidebaron" : ""}`}>
      <div className="product-grid">
        <ProductFeatures />
        <ProductGrid />
      </div>
    </Container>
  )
}

export default ProductsContainer
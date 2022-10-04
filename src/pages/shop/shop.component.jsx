import { useContext } from "react";

import ProductCard from "../../components/product-card/product-card.component";

import { ProductsContext } from "../../contexts/products.context";

import "./shop.styles.scss";

const ShopPage = () => {
  const { products } = useContext(ProductsContext);
  console.log(products);

  return (
    <div className="category-container">
      {products.map((category, index) => {
        return (
          <div>
            <h2>{category.title}</h2>

            <div className="responsive" key={index}>
              {category.items.map((item) => {
                return <ProductCard key={item.id} product={item} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShopPage;

import React, { useState } from "react";
import Product from "./product";

export default function ProductPanel({ products }) {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleProductClick = (product) => {
    if (
      !selectedProducts.find(
        (selectedProduct) => selectedProduct.id === product.id
      )
    ) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };
  console.log(products.products[0]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 items-start">
      {Array.isArray(products.products) ? (
        products.products.map((product) => (
          <Product
            key={product._id}
            id={product._id}
            name={product.name}
            content={product.description}
            price={product.price}
            onClick={() => handleProductClick(product)}
          />
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
}

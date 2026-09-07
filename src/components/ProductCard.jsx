import React, { useState } from 'react';
import './components.css';

/**
 * Displays one product with a size dropdown and a button that asks the
 * parent to run a return-risk check for the currently selected size.
 *
 * Props:
 *  - product: { id, name, category, price, image, sizes[] }
 *  - onCheckRisk: (product, selectedSize) => void
 */
export default function ProductCard({ product, onCheckRisk }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  return (
    <div className="product-card">
      <div className="product-card__image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
        />
      </div>

      <div className="product-card__body">
        <div className="product-card__category">{product.category}</div>
        <h3 className="product-card__name">{product.name}</h3>
        <div className="product-card__price">₹{product.price.toLocaleString('en-IN')}</div>

        <label className="product-card__size-label" htmlFor={`size-${product.id}`}>
          Size
        </label>
        <select
          id={`size-${product.id}`}
          className="product-card__size-select"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          {product.sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <button
          className="product-card__risk-btn"
          onClick={() => onCheckRisk(product, selectedSize)}
        >
          Check return risk
        </button>
      </div>
    </div>
  );
}

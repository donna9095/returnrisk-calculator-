import React, { useState } from 'react';
import './components.css';

/**
 * Displays one product with a size dropdown, graceful image fallback,
 * and a button to run a return-risk check.
 *
 * Props:
 *  - product: { id, name, category, price, image, sizes[] }
 *  - onCheckRisk: (product, selectedSize) => void
 */
export default function ProductCard({ product, onCheckRisk }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [imgSrc, setImgSrc] = useState(product.image);
  const [imgFailed, setImgFailed] = useState(false);

  function handleImgError() {
    if (!imgFailed) {
      setImgFailed(true);
      // Category fallback images from Unsplash (verified 200 OK)
      const fallbacks = {
        'Clothing': 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
        'Footwear': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
        'Jewellery': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80',
        'Watches': 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80',
        'Bags, Wallets & Belts': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80'
      };
      setImgSrc(fallbacks[product.category] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80');
    }
  }

  return (
    <div className="product-card">
      <div className="product-card__image-wrap">
        <img
          src={imgSrc}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
          onError={handleImgError}
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

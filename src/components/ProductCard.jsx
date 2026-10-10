function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">

      <div className="product-image">
        🍕
      </div>

      <div className="product-info">

        <h3>{product.name}</h3>

        <p>{product.description}</p>

        <strong>
          ₡{product.price.toLocaleString()}
        </strong>

        <button onClick={() => onAddToCart(product)}>
          Agregar
        </button>

      </div>

    </article>
  )
}

export default ProductCard
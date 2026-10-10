import { useState } from "react"
import products from "../data/products"
import categories from "../data/categories"
import ProductCard from "./ProductCard"
import Cart from "./Cart"

function Menu({
  cart,
  addToCart,
  decreaseQuantity,
  removeProduct
}) {
  const [selectedCategory, setSelectedCategory] = useState("Pizzas")

  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  )

  return (
    <section id="menu" className="menu">

      <div className="menu-content">

        <div className="menu-products">

          <h2>Nuestro menú</h2>

          <p className="menu-description">
            Elige tus productos favoritos.
          </p>

          <div className="categories">

            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "active"
                    : ""
                }
              >
                {category}
              </button>
            ))}

          </div>

          <div className="products-grid">

            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}

          </div>

        </div>

        <Cart
          key={cart.length}
          cart={cart}
          addToCart={addToCart}
          decreaseQuantity={decreaseQuantity}
          removeProduct={removeProduct}
        />

      </div>

    </section>
  )
}

export default Menu
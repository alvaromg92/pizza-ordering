function Cart({
  cart,
  addToCart,
  decreaseQuantity,
  removeProduct
}) {

  const groupedProducts = cart.reduce(
    (groups, product) => {

      const existingProduct = groups.find(
        (item) => item.id === product.id
      )

      if (existingProduct) {
        existingProduct.quantity += 1
      } else {
        groups.push({
          ...product,
          quantity: 1
        })
      }

      return groups
    },
    []
  )

  const cantidad = groupedProducts.reduce(
    (sum, product) => sum + product.quantity,
    0
  )

  const total = groupedProducts.reduce(
    (sum, product) =>
      sum + Number(product.price) * product.quantity,
    0
  )

  return (
    <aside className="cart">

      <div className="cart-header">

        <h2>🛒 Tu pedido</h2>

        <span>{cantidad}</span>

      </div>

      {cart.length === 0 ? (

        <p className="cart-empty">
          Tu pedido está vacío.
        </p>

      ) : (

        <div className="cart-products">

          {groupedProducts.map((product) => (

            <div
              className="cart-product"
              key={product.id}
            >

              <div>

                <h4>{product.name}</h4>

                <p>
                  ₡{Number(product.price).toLocaleString()}
                </p>

                <strong>
                  Cantidad: {product.quantity}
                </strong>

              </div>

              <div>

                <button
                  onClick={() => decreaseQuantity(product.id)}
                >
                  −
                </button>

                <button
                  onClick={() => addToCart(product)}
                >
                  +
                </button>

                <button
                  onClick={() => removeProduct(product.id)}
                >
                  ×
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

      <div className="cart-total">

        <span>Total</span>

        <strong>
          ₡{total.toLocaleString()}
        </strong>

      </div>

      <button className="cart-button">
        Continuar pedido
      </button>

    </aside>
  )
}

export default Cart
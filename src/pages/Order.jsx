import { useState } from "react"

function Order({ cart }) {

  const [name, setName] = useState("")
  const [comment, setComment] = useState("")

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

  const total = groupedProducts.reduce(
    (sum, product) =>
      sum + Number(product.price) * product.quantity,
    0
  )

  return (
    <section className="order">

      <div className="order-content">

        <h1>Completar pedido</h1>

        <div className="order-form">

          <h2>Datos del cliente</h2>

          <label>
            Nombre
          </label>

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Escribe tu nombre"
          />

          <label>
            Comentarios
          </label>

          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="¿Alguna indicación especial?"
          />

        </div>

        <h2>Resumen de tu pedido</h2>

        {groupedProducts.map((product) => (

          <div
            className="order-product"
            key={product.id}
          >

            <div>

              <h3>{product.name}</h3>

              <p>
                Cantidad: {product.quantity}
              </p>

            </div>

            <strong>
              ₡{(
                Number(product.price) * product.quantity
              ).toLocaleString()}
            </strong>

          </div>

        ))}

        <div className="order-total">

          <span>Total</span>

          <strong>
            ₡{total.toLocaleString()}
          </strong>

        </div>

      </div>

    </section>
  )
}

export default Order
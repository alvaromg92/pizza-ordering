import { useState } from "react"
import { useSearchParams } from "react-router-dom"

function Order({ cart }) {

  const [searchParams] = useSearchParams()

  const mesa = searchParams.get("mesa")

  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [confirmedOrder, setConfirmedOrder] = useState(null)

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

  if (!mesa) {
    return (
      <section className="order">

        <div className="order-content">

          <h1>No se pudo identificar la mesa</h1>

          <p>
            Por favor, escanea nuevamente el código QR de tu mesa.
          </p>

        </div>

      </section>
    )
  }

  function handleConfirmOrder() {

    if (!name.trim()) {
      alert("Por favor, escribe tu nombre.")
      return
    }

    const order = {
      customerName: name,
      table: mesa,
      comment: comment,
      products: groupedProducts,
      total: total,
      status: "pending"
    }

    setConfirmedOrder(order)

    console.log(order)
  }

  if (confirmedOrder) {
    return (
      <section className="order">

        <div className="order-content">

          <h1>¡Pedido confirmado!</h1>

          <p>
            Gracias, {confirmedOrder.customerName}.
          </p>

          <p>
            Tu pedido ha sido recibido correctamente.
          </p>

          <div className="order-table">
            🪑 Mesa {confirmedOrder.table}
          </div>

          <h2>Resumen</h2>

          {confirmedOrder.products.map((product) => (

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
              ₡{confirmedOrder.total.toLocaleString()}
            </strong>

          </div>

          <p>
            Estado: Pedido pendiente
          </p>

        </div>

      </section>
    )
  }

  return (
    <section className="order">

      <div className="order-content">

        <h1>Completar pedido</h1>

        <div className="order-table">
          🪑 Mesa {mesa}
        </div>

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

        <button
          className="order-button"
          onClick={handleConfirmOrder}
        >
          Confirmar pedido
        </button>

      </div>

    </section>
  )
}

export default Order
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import createOrder from "../services/orderService"

function Order({ cart }) {

  const [searchParams] = useSearchParams()

  const mesa = searchParams.get("mesa")

  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [confirmedOrder, setConfirmedOrder] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

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

  if (!mesa || mesa === "null") {
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

  async function handleConfirmOrder() {

    if (!name.trim()) {
      alert("Por favor, escribe tu nombre.")
      return
    }

    if (groupedProducts.length === 0) {
      alert("Agrega al menos un producto a tu pedido.")
      return
    }

    const order = {
      customerName: name.trim(),
      table: mesa,
      comment: comment.trim(),
      products: groupedProducts,
      total: total,
      status: "pending"
    }

    try {

      setIsSaving(true)

      const orderId = await createOrder(order)

      setConfirmedOrder({
        ...order,
        id: orderId
      })

    } catch (error) {

      console.error("Error al guardar el pedido:", error)

      alert(
        "No se pudo enviar el pedido. Inténtalo nuevamente."
      )

    } finally {

      setIsSaving(false)

    }
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
          disabled={isSaving}
        >
          {isSaving
            ? "Enviando pedido..."
            : "Confirmar pedido"
          }
        </button>

      </div>

    </section>
  )
}

export default Order
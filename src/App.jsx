import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Menu from "./components/Menu"
import Order from "./pages/Order"
import AdminLogin from "./pages/src/pages/AdminLogin"

import "./App.css"

function App() {

  const [cart, setCart] = useState([])

  function addToCart(product) {
    setCart((currentCart) => [
      ...currentCart,
      product
    ])
  }

  function decreaseQuantity(productId) {

    setCart((currentCart) => {

      const index = currentCart.findIndex(
        (product) => product.id === productId
      )

      if (index === -1) {
        return currentCart
      }

      const newCart = [...currentCart]

      newCart.splice(index, 1)

      return newCart
    })
  }

  function removeProduct(productId) {

    setCart((currentCart) =>
      currentCart.filter(
        (product) => product.id !== productId
      )
    )
  }

  return (
    <BrowserRouter>

      <Navbar cart={cart} />

      <Routes>

        <Route
          path="/"
          element={
            <>
              <Hero />

              <Menu
                cart={cart}
                addToCart={addToCart}
                decreaseQuantity={decreaseQuantity}
                removeProduct={removeProduct}
              />
            </>
          }
        />

        <Route
          path="/orden"
          element={<Order cart={cart} />}
        />

        <Route
          path="/admin"
          element={<AdminLogin />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App
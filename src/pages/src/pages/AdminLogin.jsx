import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../firebase"
import "./AdminLogin.css"

function AdminLogin() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  async function handleLogin(event) {

    event.preventDefault()

    setError("")

    if (!email || !password) {
      setError("Completa el correo y la contraseña.")
      return
    }

    try {

      setLoading(true)

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      setLoggedIn(true)

    } catch (error) {

      console.error(error)

      setError(
        "Correo o contraseña incorrectos."
      )

    } finally {

      setLoading(false)

    }
  }

  if (loggedIn) {
    return (
      <section className="admin">

        <div className="admin-content">

          <h1>Panel administrador</h1>

          <p>
            Inicio de sesión correcto.
          </p>

          <p>
            Aquí construiremos el panel de pedidos.
          </p>

        </div>

      </section>
    )
  }

  return (
    <section className="admin">

      <div className="admin-login">

        <h1>Panel administrador</h1>

        <p>
          Inicia sesión para administrar los pedidos.
        </p>

        <form onSubmit={handleLogin}>

          <label>
            Correo electrónico
          </label>

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="admin@correo.com"
          />

          <label>
            Contraseña
          </label>

          <input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Tu contraseña"
          />

          {error && (
            <p className="admin-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Iniciando sesión..."
              : "Iniciar sesión"
            }
          </button>

        </form>

      </div>

    </section>
  )
}

export default AdminLogin
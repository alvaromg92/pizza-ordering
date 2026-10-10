function Navbar({ cart }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        🍕 DODO PIZZA
      </div>

      <div className="navbar-cart">
        🛒 <span>{cart.length}</span>
      </div>
    </nav>
  )
}

export default Navbar
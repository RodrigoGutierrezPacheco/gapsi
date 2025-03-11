import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ height: "60vh" }}
    >
      <div className="w-75 w-md-50 text-center">
        <img
          src="/images/logo.png"
          alt="Gapsi e-Commerce Logo"
          className="img-fluid mb-3"
          style={{ maxWidth: "200px" }}
        />
        <h1 className="fw-bold">Bienvenido a Gapsi e-Commerce</h1>
        <p className="text-muted">
          Esta es una prueba técnica desarrollada para Gapsi, donde se crea un
          ecommerce básico.
        </p>
        <p>Navega por los productos y agrégalos al carrito.</p>
        <Link to="/productos">
          <button className="btn btn-primary mt-3">Ver productos</button>
        </Link>
      </div>
    </div>
  );
}

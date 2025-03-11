import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import { useCart } from "../../Context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "400px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  maxHeight: "80vh", 
  overflowY: "auto", 
};

export default function ShoppingCart() {
  const [cartOpen, setCartOpen] = useState(false);
  const { cartItems, removeFromCart, addToCart } = useCart();

  const handleCartOpen = () => setCartOpen(true);
  const handleCartClose = () => setCartOpen(false);

  // Permitir soltar productos en el carrito
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const productData = event.dataTransfer.getData("product");
    if (productData) {
      const product = JSON.parse(productData);
      addToCart(product);
    }
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleCartOpen}>
        <i class="fa-solid fa-cart-shopping"></i>
      </IconButton>

      <Modal
        open={cartOpen}
        onClose={handleCartClose}
        aria-labelledby="modal-cart-title"
        aria-describedby="modal-cart-description"
      >
        <Box sx={modalStyle} onDragOver={handleDragOver} onDrop={handleDrop}>
          <Typography
            id="modal-cart-title"
            variant="h6"
            component="h2"
            className="text-center mb-4"
          >
            Carrito de Compras
          </Typography>
          {cartItems.length === 0 ? (
            <Typography id="modal-cart-description" className="text-center">
              No hay productos en el carrito.
            </Typography>
          ) : (
            <Box>
              {cartItems.map((item, index) => (
                <Box
                  key={index}
                  className="d-flex justify-content-between align-items-center mb-3"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded me-3"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <Typography variant="body1" className="mb-0">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" className="text-muted">
                        ${item.price}
                      </Typography>
                    </div>
                  </div>
                  <Button
                    onClick={() => removeFromCart(index)}
                    color="error"
                    className="btn btn-danger btn-sm"
                  >
                    Eliminar
                  </Button>
                </Box>
              ))}
              <div className="d-flex justify-content-between align-items-center mt-4">
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">
                  ${cartItems.reduce((total, item) => total + item.price, 0)}
                </Typography>
              </div>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className="mt-3"
              >
                Finalizar Compra
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
}

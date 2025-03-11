import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, IconButton } from '@mui/material';
import { useCart } from '../../Context/CartContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function ProductCard({ product }) {
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const cartItem = cartItems.find((item) => item.id === product.id);
  const isInCart = cartItem !== undefined;

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(product));
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 300, 
        height: 400, 
        position: 'relative', 
        borderRadius: '8px', 
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', 
      }}
      draggable
      onDragStart={handleDragStart}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />

      <CardContent sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            fontWeight: 'bold', 
            whiteSpace: 'nowrap', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
          }}
        >
          {product.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          {Array.from({ length: 5 }).map((_, index) =>
            index < product?.rating?.averageRating ? (
              <StarIcon key={index} sx={{ color: '#FFD700' }} />
            ) : (
              <StarBorderIcon key={index} sx={{ color: '#CCCCCC' }} />
            )
          )}
        </Box>

        <Typography 
          variant="h6" 
          sx={{ color: 'error.main', fontWeight: 'bold', mt: 1 }}
        >
          ${product.price}
        </Typography>
      </CardContent>

      <Box sx={{ p: 2 }}>
        {isInCart ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <IconButton onClick={() => decreaseQuantity(cartItems.indexOf(cartItem))} color="primary">
              <RemoveIcon />
            </IconButton>
            <Typography variant="h6">{cartItem.quantity}</Typography>
            <IconButton onClick={() => increaseQuantity(cartItems.indexOf(cartItem))} color="primary">
              <AddIcon />
            </IconButton>
          </Box>
        ) : (
          <Button
            variant="contained"
            fullWidth
            onClick={() => addToCart(product)}
            sx={{ backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.dark' } }}
          >
            Agregar
          </Button>
        )}
      </Box>
    </Card>
  );
}
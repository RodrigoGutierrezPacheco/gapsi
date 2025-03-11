import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import { useCart } from '../../Context/CartContext';
import { React } from 'react';

const Logo = styled('img')({
  height: '40px',
  marginRight: '10px',
  cursor: 'pointer',
});

const NavLink = styled(Link)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: 'none',
  marginRight: theme.spacing(2),
  '&:hover': {
    textDecoration: 'underline',
  },
}));

export default function Header() {
  const { cartItems } = useCart();

  return (
      <Toolbar>
        <Link to="/">
          <Logo src="/images/logoBlanco.png" alt="Gapsi Logo" />
        </Link>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          e-Commerce Gapsi
        </Typography>

        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/productos">Productos</NavLink>

        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: 'block', sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Badge badgeContent={cartItems.length} color="error">
          <ShoppingCart />
        </Badge>
      </Toolbar>
  );
}

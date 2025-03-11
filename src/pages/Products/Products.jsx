import { useEffect, useState, useCallback } from "react";
import { getAllProducts } from "./../../services/products";
import ProductCard from "../../components/Cards/ProductCard";
import {
  Container,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useCart } from "../../Context/CartContext";

export default function Products() {
  const { cartItems, clearCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoadingProds, setIsLoadingProds] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);

  const fetchProducts = useCallback(async () => {
    if (!hasMore || isLoadingProds) return;
    setIsLoadingProds(true);
    setNoResults(false);
    try {
      const response = await getAllProducts(searchQuery, page);
      if (response.status === 200) {
        const newProducts =
          response.data.item.props.pageProps.initialData.searchResult
            .itemStacks?.[0]?.items;

        if (newProducts.length === 0) {
          setHasMore(false);
          if (page === 1) {
            setNoResults(true);
          }
        } else {
          setAllProducts((prevProducts) =>
            page === 1 ? newProducts : [...prevProducts, ...newProducts]
          );
        }
      } else {
        alert("Error al buscar productos");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingProds(false);
    }
  }, [hasMore, isLoadingProds, searchQuery, page]);

  const handleSearch = () => {
    if (searchQuery) {
      setPage(1);
      setAllProducts([]);
      setHasMore(true);
      setIsSearchTriggered(true);
      fetchProducts();
    }
  };

  const handleScroll = useCallback(() => {
    const scrollThreshold = 400;
    if (
      window.innerHeight + document.documentElement.scrollTop + scrollThreshold >=
      document.documentElement.offsetHeight
    ) {
      if (!isLoadingProds && hasMore) {
        setPage((prevPage) => prevPage + 1);  
      }
    }
  }, [isLoadingProds, hasMore]);
  
  useEffect(() => {
    if (isSearchTriggered && hasMore && !isLoadingProds) {
      fetchProducts(); 
    }
  }, [fetchProducts, isSearchTriggered, hasMore, page, isLoadingProds]);
  
  useEffect(() => {
    if (isSearchTriggered) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSearchTriggered, handleScroll]);
  
  const filteredProducts = allProducts.filter(
    (product) =>
      !cartItems.some((cartItem) => cartItem.id === product.id) && product.price
  );

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container justifyContent="flex-end" sx={{ position: "relative" }}>
        {cartItems.length > 0 && (
          <Button
            variant="contained"
            color="error"
            onClick={handleClearCart}
            sx={{
              mb: 4,
              position: "absolute",
              top: 0,
              right: 0,
            }}
          >
            Limpiar carrito
          </Button>
        )}
      </Grid>

      <Typography variant="h4" align="center" gutterBottom>
        Productos
      </Typography>

      <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
        <Grid item xs={12} sm={8} md={6}>
          <div className="input-group">
            <TextField
              fullWidth
              label="Buscar productos"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <i
                    className="fa-solid fa-magnifying-glass"
                    style={{ marginRight: "8px" }}
                  ></i>
                ),
                endAdornment: searchQuery && (
                  <i
                    className="fa-solid fa-xmark"
                    style={{ cursor: "pointer" }}
                    onClick={() => setSearchQuery("")}
                  ></i>
                )
              }}
            />
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          md={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            variant="contained"
            onClick={handleSearch}
            fullWidth
            sx={{ height: "100%" }}
          >
            Buscar
          </Button>
        </Grid>
      </Grid>
      {noResults ? (
        <Typography variant="h6" align="center" sx={{ my: 4 }}>
          No se encontraron resultados.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredProducts.map((product, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
      {isLoadingProds && (
        <Grid container justifyContent="center" sx={{ my: 4 }}>
          <CircularProgress />
        </Grid>
      )}
      {!hasMore && !noResults && (
        <Typography variant="h6" align="center" sx={{ my: 4 }}>
          No hay más productos para mostrar.
        </Typography>
      )}
    </Container>
  );
}
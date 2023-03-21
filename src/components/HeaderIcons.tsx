import { Badge, Box, IconButton, SxProps, Theme } from "@mui/material";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../contexts/ShoppingCartContext";
import { theme } from "../theme";

const iconStyle: SxProps<Theme> = {
  fontSize: { xs: "2rem", sm: "2.5rem" },
  cursor: "pointer",
  padding: { xs: "0rem", md: "0.3rem" },
};

// const StyledLink = styled(Link)<LinkProps>(() => ({
//   textDecoration: "none",
//   color: "inherit",
// }));

function HeaderIcons() {
  const { items } = useShoppingCart();

  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box className="material-symbols-outlined" sx={iconStyle}>
        admin_panel_settings
      </Box>
      <Box className="material-symbols-outlined" sx={iconStyle}>
        favorite
      </Box>
      <Badge
        data-cy="cart-items-count-badge"
        badgeContent={items.length}
        color="primary"
        sx={{
          "& .MuiBadge-badge": {
            fontFamily: theme.typography.subtitle2.fontFamily,
            textAlign: "center",
          },
        }}
      >
        <IconButton
          component={Link}
          to="/checkout"
          data-cy="cart-link"
          className="material-symbols-outlined"
          sx={{
            fontSize: { xs: "2rem", sm: "2.5rem", cursor: "pointer" },
            color: (theme) => theme.palette.text.primary,
            padding: "0",
          }}
        >
          shopping_bag
        </IconButton>
      </Badge>
    </Box>
  );
}

export default HeaderIcons;

import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { CSSProperties } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useProduct } from "../contexts/AdminProductContext";

const ProductSchema = Yup.object({
  title: Yup.string().required("Please enter the title for the product"),
  price: Yup.number().required("Please enter the price for the product"),
  description: Yup.string().required(
    "Please enter the description for the product"
  ),
  brand: Yup.string().required("Please enter the brand name for the product"),
  image: Yup.string().required("Please enter the url for the products image"),
  id: Yup.string().required("Please enter the product id"),
});

export type ProductValues = Yup.InferType<typeof ProductSchema>;

function AddProductForm() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { addProduct, editProduct, products } = useProduct();

  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  // const product = undefined;

  const isEdit = Boolean(product);

  const formik = useFormik<ProductValues>({
    initialValues: {
      title: isEdit ? product?.title ?? "" : "",
      price: isEdit ? product?.price ?? 0 : 0,
      description: isEdit ? product?.description ?? "" : "",
      brand: isEdit ? product?.brand ?? "" : "",
      image: isEdit ? product?.image ?? "" : "",
      id: isEdit
        ? product?.id ?? `b${Math.floor(Math.random() * 10000)}`
        : `b${Math.floor(Math.random() * 10000)}`,
    },
    validationSchema: ProductSchema,
    onSubmit: (product) => {
      if (isEdit) {
        editProduct(product);
      } else {
        addProduct(product);
      }
      navigate("/admin");
    },
  });

  return (
    <Container maxWidth={isSmallScreen ? "sm" : "md"}>
      <IconButton
        className="material-symbols-outlined"
        component={Link}
        to="/admin"
        sx={{
          marginTop: "1rem",
          color: theme.palette.text.primary,
        }}>
        arrow_back
      </IconButton>
      <Typography variant="h5" margin={"1rem"}>
        {isEdit ? "Edit Product" : "Add a new product"}
      </Typography>
      <Container
        sx={{
          width: isSmallScreen ? "sm" : "md",
          margin: "1rem",
          display: "flex",
          flexDirection: "column",
          padding: "0px !important",
        }}>
        <form
          onSubmit={formik.handleSubmit}
          style={rootStyle}
          data-cy="product-form">
          <Container
            sx={{
              padding: "0 !important",
              display: "flex",
              flexDirection: "row",
              width: "100%",
              gap: "1rem",
            }}>
            <TextField
              id="title"
              type="text"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.title && formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              inputProps={{ "data-cy": "product-title" }}
              FormHelperTextProps={{ "data-cy": "product-title-error" } as any}
              sx={{ flex: 1 }}
            />
            <TextField
              id="price"
              type="number"
              name="price"
              label="Price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.price && formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              inputProps={{ "data-cy": "product-price" }}
              FormHelperTextProps={{ "data-cy": "product-price-error" } as any}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">SEK</InputAdornment>
                ),
              }}
              sx={{ flex: 1 }}
            />
          </Container>
          <Container
            sx={{
              padding: "0 !important",
              display: "flex",
              flexDirection: "row",
              width: "100%",
              gap: "1rem",
            }}>
            <TextField
              id="brand"
              type="text"
              name="brand"
              label="Brand"
              value={formik.values.brand}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.brand && formik.errors.brand)}
              helperText={formik.touched.brand && formik.errors.brand}
              inputProps={{ "data-cy": "product-brand" }}
              FormHelperTextProps={{ "data-cy": "product-brand-error" } as any}
              sx={{ flex: 1 }}
            />
            <TextField
              id="image"
              type="text"
              name="image"
              label="Image URL"
              value={formik.values.image}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.image && formik.errors.image)}
              helperText={formik.touched.image && formik.errors.image}
              inputProps={{ "data-cy": "product-image" }}
              FormHelperTextProps={{ "data-cy": "product-image-error" } as any}
              sx={{ flex: 1 }}
            />
          </Container>
          <TextField
            id="description"
            type="text"
            name="description"
            label="Description"
            multiline
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(
              formik.touched.description && formik.errors.description
            )}
            helperText={formik.touched.description && formik.errors.description}
            inputProps={{ "data-cy": "product-description" }}
            FormHelperTextProps={
              { "data-cy": "product-description-error" } as any
            }
          />
          <Button type="submit" variant="contained">
            {isEdit ? "Edit Product" : "Add Product"}
          </Button>
          {/* {isEdit ? (
            <Button
              type="submit"
              variant="contained"
              data-cy="admin-edit-product"
            >
              Edit Product
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              data-cy="admin-add-product"
            >
              Add Product
            </Button>
          )} */}
        </form>
      </Container>
    </Container>
  );
}

const rootStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

export default AddProductForm;

import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./components/ProductDetailPage";
import AllProductPage from "./pages/AllProductPage";
import { ProductProvider } from "./contexts/ProductContext";
import ContactPage from "./pages/ContactPage";
import LikedProductsPage from "./pages/LikedProductsPage";
import CartPage from "./pages/CartPage"; // Import the CartPage
import ProductPaymentPage from "./pages/ProductPaymentPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import AddProductForm from "./pages/AddProductForm";
import SignupPage from "./pages/SignupPage";
import OwnerSignup from "./pages/OwnerSignup";

function App() {
  return (
    <ProductProvider> {/* Provides product data to all components */}
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<OwnerSignup />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/shop/allproductpage" element={<AllProductPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/liked-products" element={<LikedProductsPage />} />
        <Route path="/product-payment" element={<ProductPaymentPage />} />
        <Route path="/cart" element={<CartPage />} /> {/* Ensure CartPage is routed */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </ProductProvider>
  );
}

export default App;
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './utils/ScrollToTop';
import ProtectedRoute from './router/ProtectedRoute';
import AppLayout from './components/AppLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import VerifyOtp from './pages/VerifyOtp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import EditProfile from './pages/EditProfile';
import ProductPage from './pages/ProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import QuotationSuccessPage from './pages/QuotationSuccessPage';
import HomePage from './pages/HomePage';
import TermsConditionsPage from './pages/TermsConditionsPage';
import HowToBuyPage from './pages/HowToBuyPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:productSlug" element={<ProductDetailPage />} />
          <Route path="/quotation-success" element={<QuotationSuccessPage />} />
          <Route path="/terms-conditions" element={<TermsConditionsPage />} />
          <Route path="/how-to-buy" element={<HowToBuyPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blogs/:blogSlug" element={<BlogDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<EditProfile />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
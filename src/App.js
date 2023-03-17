import { Routes, Route } from "react-router-dom";
import { LoginPage } from "pages/login-page";
import { ProfilePage } from "pages/profile-page";
import { HomePage } from "pages/home-page";
import { NotFoundPage } from "pages/notFound-page";
import ProtectedRoute from "services/useAuth";
import { AuthLayout } from "layouts/auth-layout";
import { Toastify } from "components/toastify";
import { OrderPage } from "pages/order-page/order-page";
import { useResetScroll } from "hooks/useResetScroll";

function App() {
  useResetScroll()

  return (
    <>
      <Toastify
        theme="dark"
        toastClassName={'toast-container'}
        autoClose={2000}
      />
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}


export default App;

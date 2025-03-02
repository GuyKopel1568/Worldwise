import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Product from "./pages/Product";
// import HomePage from "./pages/HomePage";
// import Pricing from "./pages/Pricing";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

const HomePage = lazy(() => import("./pages/HomePage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));

//efore lazy loading
// dist/assets/index-0934ee27.css   45.93 kB │ gzip:  11.36 kB
// dist/assets/index-8bce92fb.js   509.23 kB │ gzip: 148.64 kB

//after lazy loading
// dist/assets/Product.module-02d70b80.js    0.06 kB │ gzip:   0.07 kB
// dist/assets/PageNotFound-8d8ea53c.js      0.15 kB │ gzip:   0.15 kB
// dist/assets/Logo-c31809f1.js              0.21 kB │ gzip:   0.19 kB
// dist/assets/PageNav-551980cb.js           0.54 kB │ gzip:   0.28 kB
// dist/assets/Pricing-1b9c55c0.js           0.65 kB │ gzip:   0.42 kB
// dist/assets/Homepage-77ec7883.js          0.67 kB │ gzip:   0.42 kB
// dist/assets/AppLayout-ee600c69.js       157.00 kB │ gzip:  46.29 kB
// dist/assets/index-f4d052d6.js           350.61 kB │ gzip: 101.85 kB

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;

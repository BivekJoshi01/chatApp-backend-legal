// AppRoutes.tsx
import React from "react";
import CustomLoader from "../components/Loader/CustomLoader";
import { HashRouter, Route, Routes } from "react-router";
import AdminPageLayout from "../layout/AdminPageLayout";

// ---------------------------------------------------------------------------------------u
import { MenuRoutesConfig } from "./routesConfig";
import LandingPage from "../pages/Landing/LandingPage";
import AuthLayout from "../pages/Auth/AuthLayout";
import UserPageLayout from "../layout/UserPageLayout";
import { UserRoutesConfig } from "./userRouteConfig";
import DelayedSuspense from "../components/Loader/LoaderWithDelay";
import ProtectedRoute from "./ProtectedRoute";
import NotFound404Page from "../pages/Auth/Error/NotFound404Page";
import Unauthorized401Page from "../pages/Auth/Error/Unauthorized401Page";
// ------------------------------------------------------------------------------------------

// Lazy auth pages
const RegisterPage = React.lazy(
  () => import("../pages/Auth/Register/RegisterPage")
);
const SignUpVerification = React.lazy(
  () => import("../pages/Auth/Register/SignUpVerification")
);
const LoginPage = React.lazy(() => import("../pages/Auth/Login/LoginPage"));
const ForgotPassword = React.lazy(
  () => import("../pages/Auth/ForgotPassword/ForgotPassword")
);
const ResetPassword = React.lazy(
  () => import("../pages/Auth/ForgotPassword/ResetPassword")
);

const AppRoutes: React.FC = () => {
  return (
    <HashRouter>
      <DelayedSuspense fallback={<CustomLoader />} minDelay={1000}>
        <Routes>
          <Route path="/unauthorized" element={<Unauthorized401Page />} />
          <Route path="*" element={<NotFound404Page />} />

          {/* Root route */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="verify-email" element={<SignUpVerification />} />
            <Route path="reset-password/:id" element={<ResetPassword />} />
          </Route>

          {/* Admin routes */}
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={true}
                allowedRoles={["ADMIN"]}
                element={<AdminPageLayout />}
              />
            }
          >
            {MenuRoutesConfig?.map((headRoute, index) => {
              return (
                <Route
                  key={index}
                  path={headRoute.path}
                  element={<headRoute.element />}
                >
                  {headRoute.headChildren?.map((headChildren, childIndex) => (
                    <Route
                      key={childIndex}
                      path={headChildren.path}
                      element={<headChildren.element />}
                    >
                      {headChildren?.children?.map(
                        (childRoute, grandChildIndex) => (
                          <Route
                            key={grandChildIndex}
                            path={childRoute.path}
                            element={<childRoute.element />}
                          />
                        )
                      )}
                    </Route>
                  ))}
                </Route>
              );
            })}
          </Route>

          {/* User routes */}
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={true}
                allowedRoles={["CUSTOMER"]}
                element={<UserPageLayout />}
              />
            }
          >
            {UserRoutesConfig?.map((headRoute, index) => {
              return (
                <Route
                  key={index}
                  path={headRoute.path}
                  element={<headRoute.element />}
                >
                  {headRoute.headChildren?.map((headChildren, childIndex) => (
                    <Route
                      key={childIndex}
                      path={headChildren.path}
                      element={<headChildren.element />}
                    >
                      {headChildren?.children?.map(
                        (childRoute, grandChildIndex) => (
                          <Route
                            key={grandChildIndex}
                            path={childRoute.path}
                            element={<childRoute.element />}
                          />
                        )
                      )}
                    </Route>
                  ))}
                </Route>
              );
            })}
          </Route>
        </Routes>
      </DelayedSuspense>
    </HashRouter>
  );
};

export default AppRoutes;

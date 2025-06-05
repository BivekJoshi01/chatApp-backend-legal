// AppRoutes.tsx
import React from "react";
import { HashRouter, Route, Routes } from "react-router";
import AdminPageLayout from "../layout/AdminPageLayout";

// ---------------------------------------------------------------------------------------u
import RegisterPage from "../pages/Auth/Register/RegisterPage";
import { MenuRoutesConfig } from "./routesConfig";
import LandingPage from "../pages/Landing/LandingPage";
import SignUpVerification from "../pages/Auth/Register/SignUpVerification";
// ------------------------------------------------------------------------------------------



const AppRoutes: React.FC = () => {

  return (
    <HashRouter>
      <Routes>
        {/* Root route */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/verify-email" element={<SignUpVerification />} />
        <Route path="/reset-password/:id" element={<SignUpVerification />} />

        {/* Admin routes */}
        <Route element={<AdminPageLayout />}>
          {MenuRoutesConfig?.map((headRoute, index) => {
            return (
              <Route key={index} path={headRoute.path} element={<headRoute.element />}>
                {headRoute.headChildren?.map((headChildren, childIndex) => (
                  <Route key={childIndex} path={headChildren.path} element={<headChildren.element />}>
                    {headChildren?.children?.map((childRoute, grandChildIndex) => (
                      <Route
                        key={grandChildIndex}
                        path={childRoute.path}
                        element={<childRoute.element />}
                      />
                    ))}
                  </Route>
                ))}
              </Route>
            );
          })}
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;

import React, { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import Login from "./components/Login.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import ProtectedRoute from "./context/ProtectedRoute.jsx";
import Articles from "./pages/Articles.jsx";
import SkeletonAdmin from "./components/skeletons/SkeletonAdmin.jsx";
import ErrorFallback from "./components/ErrorFallback.jsx";

// Lazy load Admin component
const Admin = lazy(() => import('./pages/Admin.jsx'));

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                {/* Public routes */}
                <Route path="/about" element={<About />} />
                <Route path="/home" element={<Home />} />

                {/* Authentication routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterForm />} />

                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/articles" element={<Articles />} />
                    <Route 
                        path="/admin" 
                        element={
                            <ErrorBoundary
                                FallbackComponent={ErrorFallback}
                                onReset={() => window.location.href = '/'}
                            >
                                <Suspense fallback={<SkeletonAdmin />}>
                                    <Admin />
                                </Suspense>
                            </ErrorBoundary>
                        }
                    />
                </Route>

                {/* Catch-all redirect */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
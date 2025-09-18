import { createBrowserRouter } from "react-router";
import { RootLayout } from "../layout/root.layout";
import { Home } from "../pages/home";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import AboutPage from "../pages/AboutPage";
import ComparisonPage from "../pages/ComparisonPage";

export const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "products",
                element: <ProductsPage />,
            },
            {
                path: "products/:productId",
                element: <ProductDetailsPage />,
            },
            {
                path: "about",
                element: <AboutPage />
            },
            {
                path:"compare",
                element: <ComparisonPage/>
            }
        ],
    },
]);
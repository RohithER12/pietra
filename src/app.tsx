import { RouterProvider } from "react-router";
import { AppRouter } from "./router/index.router";
import { CompareProvider } from "./components/common/CompareContext";

export const App = () => {
    return (
        <CompareProvider>
            <RouterProvider router={AppRouter}/>
        </CompareProvider>
    );
};
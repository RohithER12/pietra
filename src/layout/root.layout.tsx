import { Outlet } from "react-router";
import { Navbar } from "../components/common/navbar";
import { Footer } from "../components/common/footer";
import { ScrollToTop } from "../utils/scrollToTop";
import { CompareButton } from "../components/common/CompareButton";

export const RootLayout = () => {
    return (
        <>
            <ScrollToTop/>
            <Navbar />
            <main className="max-w-[1920px] min-h-[70vh] mx-auto">
                <Outlet />
            </main>
            <CompareButton />
            <Footer />
        </>
    );
};

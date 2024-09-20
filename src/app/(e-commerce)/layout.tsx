import FreeShippingBanner from "@/components/banners/FreeShippingBanner";
import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";

const EcommerceLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <FreeShippingBanner
                price={139}
                currency="€"
                company="Mondial Relay"
            />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
};

export default EcommerceLayout;

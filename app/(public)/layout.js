import { CartProvider } from "@/app/components/cart/cartcontext";
import "../globals.css";
import Header from "../components/header";
import Footer from "../components/footer";

export default function PublicLayout({ children }) {
  return (
    <>
      <CartProvider>
        <Header />
        {children}
        <Footer />
      </CartProvider>
    </>
  );
}

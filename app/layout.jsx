import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: 'Property Pulse' ,
  keywords: 'rental , property , real estate' ,
  description: 'Find property to rent , cheap and easy'
}

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <Navbar/>
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
};

export default MainLayout;

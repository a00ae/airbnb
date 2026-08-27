import DestinationsSection from "./components/DestinationsSection"
import { FooterBottomNav } from "./components/FooterBottomNav";
import { FooterNav } from "./components/FooterNav";
import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_container">
        
        <DestinationsSection />
        <FooterNav />
        <FooterBottomNav />

      </div>
    </footer>
  )
}

export default Footer

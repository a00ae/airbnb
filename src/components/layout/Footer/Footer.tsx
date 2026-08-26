import DestinationsSection from "./components/DestinationsSection"
import { FooterNav } from "./components/FooterNav";
import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_container">
        
        <DestinationsSection />
        <FooterNav />

      </div>
    </footer>
  )
}

export default Footer
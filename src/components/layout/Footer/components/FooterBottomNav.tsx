import {
  RiFacebookCircleFill,
  RiGlobalLine,
  RiInstagramLine,
  RiTwitterXFill,
} from "@remixicon/react";

// 1. مصفوفة الروابط القانونية
const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "UK Modern Slavery Act", href: "/uk-slavery-act" },
  { label: "Company details", href: "/company-details" },
  { label: "Airbnb UK Limited S.172 Statement", href: "/s172-statement" },
  {
    label: "Airbnb Payments UK Limited S.172 Statement",
    href: "/payments-s172",
  },
];

export const FooterBottomNav = () => {
  return (
    <div className="footer_bottom">
      {/* القسم الأيسر: الحقوق والروابط */}
      <div className="footer_bottom_nav_left">
        <span className="footer_bottom_copyright">© 2026 Airbnb, Inc.</span>

        <ul className="footer_bottom_links">
          {LEGAL_LINKS.map((link) => (
            <li key={link.href} className="footer_bottom_link_item">
              <a href={link.href} className="footer_bottom_link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* القسم الأيمن: اللغة والعملة والتواصل الاجتماعي */}
      <div className="footer_bottom_nav_right">
        <button className="footer_bottom_action_btn">
          <span className="icon_globe"><RiGlobalLine /></span>
          <span>English (GB)</span>
        </button>

        <button className="footer_bottom_action_btn">
          <span>£ GBP</span>
        </button>

        <div className="footer_bottom_socials">
          <a href="https://facebook.com" aria-label="Facebook">
            <RiFacebookCircleFill />
          </a>
          <a href="https://twitter.com" aria-label="X">
            <RiTwitterXFill />
          </a>
          <a href="https://instagram.com" aria-label="Instagram">
            <RiInstagramLine />
          </a>
        </div>
      </div>
    </div>
  );
};

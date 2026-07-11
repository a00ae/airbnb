import { RiCloseLine } from "@remixicon/react";
import "./global-language.scss";
import { useState } from "react";
const  LANGUAGES  = {
  en: "english",
  ar: "arabic",
} as const;

type LanguageType = typeof LANGUAGES[keyof typeof LANGUAGES];
type Props = {
  close: () => void;
};

const GlobalLanguage = (props: Props) => {
  const [language, setLanguage] = useState<LanguageType>(LANGUAGES.en);
  return (
    <div className="global-language">
      {/* colse */}
      <div onClick={() => props.close()} className="global-language_close">
        <RiCloseLine size={25} />
      </div>
      {/*  */}
      
      <div className="global-language_btn">
        <span data-title-lang>langage</span>
        <div className="btn-group">
        {Object.entries(LANGUAGES).map(([key, value]) => (
          <button
            key={key}
            className={`lang-btn ${language === value ? "active" : ""}`}
            onClick={() => setLanguage(value)}
          >
            {value === "arabic" ? "العربية" : "English"}
          </button>
        ))}

        </div>
      </div>
    </div>
  );
};

export default GlobalLanguage;

import { RiCloseLine } from "@remixicon/react";
import "./global-language.scss";

type Props = {
  close: () => void;
};

const GlobalLanguage = (props: Props) => {
  return (
    <div className="global-language">
      {/* colse */}
      <div onClick={() => props.close()} className="global-language_close">
        <RiCloseLine size={25} />
      </div>
    </div>
  );
};

export default GlobalLanguage;

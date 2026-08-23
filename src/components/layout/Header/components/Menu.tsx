

type MenuProps = {
  label: string;
  icon: React.ReactNode;
};

interface SetAction {
  visible: string | null;
  setVisible: React.Dispatch<React.SetStateAction<string | null>>;
}

const Menu = ({ item, Action }: { item: MenuProps; Action: SetAction }) => {
  const handleClickMenu = (label: string) => {
    if(label == "mode") {
      document.body.classList.toggle("dark");
      return;
    }
   Action.setVisible((prev)=> (prev === label ? null : label));
  };

  return (
    <>
      <div
        onClick={() => handleClickMenu(item.label)}
        className="translate-last"
        key={item.label}>
        {item.icon}
      </div>
    </>
  );
};

export default Menu;

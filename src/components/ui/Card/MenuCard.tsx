import type { MenuList } from "./Drop-Down/index";





// من اجل الصيانة
// مكون فرعي مستقل ومسهل للصيانة
const MenuCard: React.FC<{ card: MenuList
 }> = ({ card }) => {
  // الحالة الأولى: عنوان وأيقونة
  if (card.title && card.icon) {
    return (
      <div className="menu_btn icon">
        {card.icon}
        <span data-title>{card.title}</span>
      </div>
    );
  }

  // الحالة الثانية: عنوان ووصف
  if (card.title && card.description) {
    // تعديل إملائي بسيط لـ description
    return (
      <div className="menu_btn description">
        <span data-title>{card.title}</span>
        <span data-description>{card.description}</span>
      </div>
    );
  }

  // الحالة الثالثة: قائمة عناوين فرعية
  if (card.titles) {
    return (
      <div className="menu_btn titles">
        {card.titles.map((item) => (
          <div key={item} className="item-btn">
            <span>{item}</span>
          </div>
        ))}
      </div>
    );
  }

  // الحالة الرابعة: عنوان فقط
  if (card.title) {
    return (
      <div className="menu_btn log-in">
        <span>{card.title}</span>
      </div>
    );
  }

  // في حال لم يطابق أي شرط
  return null;
};

export default MenuCard;
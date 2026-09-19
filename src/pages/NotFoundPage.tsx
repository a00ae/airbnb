import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <div className="not-found-container">
      <h2>404 - الصفحة غير موجودة</h2>
      <p>يبدو أن الصفحة التي تبحث عنها غير متوفرة أو تم تغيير عنوانها.</p>
      <Link to="/airbnb/">العودة للرئيسية</Link>
    </div>
  );
}

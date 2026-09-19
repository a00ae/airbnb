import { useRouteError, isRouteErrorResponse, Link } from 'react-router';

export default function ErrorPage() {
  const error = useRouteError();
  let errorMessage = 'حدث خطأ غير متوقع!';

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || error.data?.message;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="error-container">
      <h1>عفواً! حدث خطأ ما</h1>
      <p>{errorMessage}</p>
      <Link to="/airbnb/" replace>
        العودة إلى الصفحة الرئيسية
      </Link>
    </div>
  );
}
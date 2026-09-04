import { Footer, Header, Main, Apt } from "./components";
import { ApartmentsProvider } from "./context/ApartmentsContext";
function App() {
  return (
    <ApartmentsProvider>
      <Header />
      <Apt />
      <Main />
      <Footer />
    </ApartmentsProvider>
  );
}

export default App;

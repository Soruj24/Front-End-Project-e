import { Outlet } from "react-router-dom";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;

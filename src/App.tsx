import { Outlet } from "react-router-dom";
import Footer from "./Layout/Footer";

function App() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default App;

import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import "./App.css";
import NavBar from "./components/Layout/NavBar";
import Footer from "./components/Layout/Footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Outlet />
      <ToastContainer
        pauseOnHover={false}
        autoClose={3000}
        position="bottom-right"
      />
      <Footer />
    </div>
  );
}

export default App;

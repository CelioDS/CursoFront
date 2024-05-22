import "./App.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/Layout/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Layout/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Outlet />
      <ToastContainer
        pauseOnHover={false}
        autoClose={3000}
        position="bottom-right"
      />
    </div>
  );
}

export default App;

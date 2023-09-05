import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserLogin } from "./redux/features/authSlice";
import AddEditTour from "./pages/AddEditTour";
import TourDetail from "./pages/TourDetail";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import TagTours from "./pages/TagTours";

function App() {
  // To persist the current logged user state
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user-profile"));
  const data = window.location.pathname.startsWith("/tour/");

  useEffect(() => {
    dispatch(setUserLogin(user));
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        {!data ? <Header /> : <Header style={{ display: "none" }} />}
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tour/q" element={<Home />} />
          <Route path="/tour/tag/:tag" element={<TagTours />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/addtour"
            element={
              <PrivateRoute>
                <AddEditTour />
              </PrivateRoute>
            }
          />
          <Route
            path="/addtour/:id"
            element={
              <PrivateRoute>
                <AddEditTour />
              </PrivateRoute>
            }
          />
          <Route path="/tour/:id" element={<TourDetail />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

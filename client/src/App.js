import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {rehydrate} from "./store/features/authSlice";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Profile from "./components/Profile";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(rehydrate())
    }, [dispatch]);
  return (
    <>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={
                    <ProtectedRoutes>
                        <Profile />
                    </ProtectedRoutes>
                } />
            </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;

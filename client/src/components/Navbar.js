import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
    const token = useSelector(state => state.users.token);

    return (
        <div className="w-100 h-24 bg-gray-700 mb-4">
            <div className="container mx-auto w-100 h-24 flex justify-between items-center">
                <div className="logo">
                    <h4 className="text-white text-xl font-bold font-mono">Mern Auth</h4>
                </div>
                <div className="nav-list flex align-center items-center">
                    <Link to="/" className="nav-link text-white mx-3">
                        Home
                    </Link>
                    {token ? (
                        <Link to="/profile" className="nav-link text-white mx-3">
                            Profile
                        </Link>
                    ) : (
                        <span>
                            <Link
                                to="/login"
                                className="nav-link text-white mx-3 bg-blue-400 hover:bg-blue-500 py-2 px-4 rounded">
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="nav-link text-white mx-3 bg-blue-400 hover:bg-blue-500 py-2 px-4 rounded">
                                Register
                            </Link>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;

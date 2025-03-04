import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../store/features/authSlice";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const {user} = useSelector(state => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profileImage = user?.profile
        ? `http://localhost:3001/profile/${user.profile}` // ✅ Load from backend
        : "/images/profile/avatar.jpg"; // Fallback image
    const onHandleLogout = () => {
        dispatch(logout());
        navigate("/");
    }
    return (
        <div className="container mx-auto bg-gray-200 rounded shadow-md py-20 px-16">
            <h3 className="text-grey-900">
                {user ? <div className="card flex items-center">
                    <img src={profileImage} alt="" className="card-img w-36 h-36 object-cover" />
                    <div className="card-body ml-12">
                        <h2 className="text-bold text-3xl font-bold mb-2">{user.name}</h2>
                        <p className="text-sm text-gray-500 mb-6">{user.email}</p>
                        <button className="py-2 px-3 bg-red-600 hover:bg-red-800 transition rounded text-white" onClick={onHandleLogout}>Logout</button>
                    </div>
                </div>: ''}
            </h3>
        </div>
    );
};

export default Profile;

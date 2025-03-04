import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../store/actions/authActions";

const Register = () => {
    const [user, setUser] = React.useState({
        name: "",
        email: "",
        password: "",
        profile: ""
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isToken = useSelector((state) => state.users.token);

    const onInputChange = (e) => {
        if (e.target.name === "profile") {
            setUser({ ...user, profile: e.target.files[0] });
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    const onRegisterUser = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("password", user.password);
        formData.append("profile", user.profile); // Append file

        dispatch(registerUser(formData))
            .unwrap()
            .then(() => navigate("/"))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        if (isToken) {
            navigate("/");
        }
    }, [isToken])
    return (
        <div className="w-100 h-screen flex justify-center bg-blue-50">
            <div className="container mt-16">
                <div className="w-1/2 mx-auto bg-white py-10 px-8 shadow-md rounded">
                    <h2 className="text-xl text-center font-bold text-gray-700 mb-5">Register</h2>
                    <form onSubmit={e => onRegisterUser(e)}>
                        <div className="mb-4">
                            <label htmlFor="name"
                                   className="block font-bold text-gray-700 text-sm mb-2">FullName</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Full Name"
                                className="shadow appearance-none border w-full leading-tight focus:outline-none focus:shadow-outlin py-2 px-3 border-gray-300 rounded-md"
                                required
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block font-bold text-gray-700 text-sm mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                className="shadow appearance-none border w-full leading-tight focus:outline-none focus:shadow-outlin py-2 px-3 border-gray-300 rounded-md"
                                required
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password"
                                   className="block font-bold text-gray-700 text-sm mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                className="shadow appearance-none border w-full leading-tight focus:outline-none focus:shadow-outlin py-2 px-3 border-gray-300 rounded-md"
                                required
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="profile" className="block font-bold text-gray-700 text-sm mb-2">Profile /
                                Image</label>
                            <input
                                type="file"
                                name="profile"
                                id="profile"
                                className="shadow appearance-none border w-full leading-tight focus:outline-none focus:shadow-outlin py-2 px-3 border-gray-300 rounded-md"
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit">
                                Register
                            </button>
                            <Link to="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                                Already have account? Login!
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;

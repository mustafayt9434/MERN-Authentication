import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../store/actions/authActions";

const Login = () => {
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isToken = useSelector((state) => state.users.token);
    const onInputChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const onLoginUser = e => {
        e.preventDefault();
        dispatch(loginUser(user))
            .unwrap()
            .then(() => navigate("/"))
            .catch((error) => console.log(error))
    }
    useEffect(() => {
        if (isToken) {
            navigate("/");
        }
    }, [isToken])
    return (
        <div className="w-100 h-screen flex justify-center bg-blue-50">
            <div className="container mt-16">
                <div className="w-1/2 mx-auto bg-white py-10 px-8 shadow-md rounded">
                    <h2 className="text-xl text-center font-bold text-gray-700 mb-5">Login</h2>
                    <form onSubmit={e => onLoginUser(e)}>
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
                        <div className="flex items-center justify-between mt-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit">
                                Login
                            </button>
                            <Link to="/register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                                Don't have an account? Sign in!
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

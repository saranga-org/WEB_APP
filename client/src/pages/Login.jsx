import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { reset, login } from "../features/auth/authSlice";
import Loading from "../components/spinners/Loading";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const { userName, password } = formData;

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess) {
      navigate("/");
      toast.success("Login Succesfull");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  if (isLoading) return <Loading />;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!userName || !password) {
      toast.warning("All fields are mandetory");
    } else {
      dispatch(login(formData));
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen login_body">
      <div className="h-fit bg-white sm:w-[550px] w-full flex flex-col justify-center items-center opacity-85 rounded-lg p-5">
        <h1 className="text-3xl font-extrabold capitalize">login</h1>

        <div className="flex items-center justify-between w-full p-3 my-3 mt-5 border-2 rounded-md">
          <input
            id="userName"
            name="userName"
            value={userName}
            onChange={onChange}
            placeholder="Username"
            className="w-full p-1 mr-2 outline-none"
            type="text"
          />
          <PersonIcon />
        </div>

        <div className="flex items-center justify-between w-full p-3 my-3 border-2 rounded-md">
          <input
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Password"
            className="w-full p-1 mr-2 outline-none"
            type="password"
          />
          <PasswordIcon />
        </div>

        <button onClick={onSubmit} className="w-full btn">
          Login
        </button>

        <h3 className="mt-2 text-sm font-semibold">
          Do not have an account ?
          <span
            onClick={() => navigate("/register")}
            className="ml-1 underline cursor-pointer hover:text-blue-500"
          >
            register
          </span>
        </h3>
      </div>
    </div>
  );
}

export default Login;

import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { reset, register } from "../features/auth/authSlice";
import Loading from "../components/spinners/Loading";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    idType: "",
    role: "",
    contactNumber: "",
    password: "",
  });

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    firstName,
    lastName,
    userName,
    idType,
    role,
    contactNumber,
    password,
  } = formData;

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess) {
      navigate("/verify");
      toast.success("Registration Succesfull");
      toast.warning("You have to verify your Account !!!");
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
    if (
      !firstName ||
      !lastName ||
      !userName ||
      !idType ||
      !role ||
      !contactNumber ||
      !password
    ) {
      toast.warning("All fields are mandetory");
    } else {
      dispatch(register(formData));
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen login_body">
      <div className="h-fit bg-white sm:w-[550px] w-full flex flex-col justify-center items-center opacity-85 rounded-lg p-5">
        <h1 className="text-3xl font-extrabold capitalize">register</h1>
        <div className="flex items-center justify-between w-full p-3 my-3 mt-5 border-2 rounded-md">
          <input
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={onChange}
            placeholder="First Name"
            className="w-full p-1 mr-2 outline-none"
            type="text"
          />
          <PersonIcon />
        </div>

        <div className="flex items-center justify-between w-full p-3 my-3 mt-5 border-2 rounded-md">
          <input
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={onChange}
            placeholder="Last Name"
            className="w-full p-1 mr-2 outline-none"
            type="text"
          />
          <PersonIcon />
        </div>

        <div className="flex items-center justify-between w-full p-3 my-3 mt-5 border-2 rounded-md">
          <input
            id="userName"
            name="userName"
            value={userName}
            onChange={onChange}
            placeholder="Username"
            className="w-full p-1 mr-2 outline-none"
            type="text"
            autoComplete="off"
          />
          <PersonIcon />
        </div>

        <div className="flex items-center w-full p-3 my-3 border-2 rounded-md">
          <select
            name="idType"
            value={idType}
            onChange={onChange}
            className="w-full p-1 outline-none"
          >
            <option value="" disabled>
              Select ID Type
            </option>
            <option value="NIC">NIC</option>
            <option value="LICENSE">LICENSE</option>
          </select>
        </div>

        <div className="flex items-center my-3 space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="role"
              value="USER"
              onChange={onChange}
              //checked={selectedRole === "USER"}
              className="mr-2"
            />
            USER
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="role"
              value="STATION_OWNER"
              onChange={onChange}
              //checked={selectedRole === "STATION_OWNER"}
              className="mr-2"
            />
            STATION_OWNER
          </label>
        </div>

        <div className="flex items-center justify-between w-full p-3 my-3 mt-5 border-2 rounded-md">
          <input
            id="contactNumber"
            name="contactNumber"
            value={contactNumber}
            onChange={onChange}
            placeholder="+94xxxxxxxxx"
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
            autoComplete="off"
          />
          <PasswordIcon />
        </div>

        <button onClick={onSubmit} className="w-full btn">
          Sign In
        </button>

        <h3 className="mt-2 text-sm font-semibold">
          Have an account ?
          <span
            onClick={() => navigate("/login")}
            className="ml-1 underline cursor-pointer hover:text-blue-500"
          >
            login
          </span>
        </h3>
      </div>
    </div>
  );
}

export default Register;

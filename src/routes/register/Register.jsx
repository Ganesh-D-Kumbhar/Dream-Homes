import React from "react";
import { useForm } from "react-hook-form";
import "./register.css";
import bg from "../../../public/bg.png";
import user from "../../assets/user.png";
import { useNavigate, Link } from "react-router-dom";
function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = () => {
    navigate("/home");
  };
  return (
    <div className="register">
      {/* <img id="bg" src="https://www.kt-bank.de/app/uploads/2022/01/kt_privat_immobilienfinanzierung02-1024x1024.jpg" alt="" /> */}

      <div className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="userLogo">
            <img src={user} alt="" />
            {/* <img src="https://archive.org/download/HeaderIconUser/Header-Icon-User.png" alt="" /> */}
          </div>
          <label htmlFor="name">Full Name</label>
          <input
            autoComplete="off"
            type="text"
            name="fname"
            {...register("fname", {
              required: { value: true, message: "This field is required." },
              minLength: {
                value: 6,
                message: "Should contain at least 6 characters.",
              },
              maxLength: {
                value: 42,
                message: "Should not exceed 42 characters.",
              },
            })}
          />
          {errors.fname && <p className="errorMsg">{errors.fname.message}</p>}

          <label htmlFor="email">Enter Email</label>
          <input
            autoComplete="off"
            type="email"
            {...register("email", {
              required: { value: true, message: "This field is required." },
              minLength: {
                value: 12,
                message: "Should contain at least 12 characters.",
              },
              maxLength: {
                value: 64,
                message: "Should not exceed 64 characters.",
              },
            })}
          />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}

          <label htmlFor="password">Enter Password</label>
          <input
            autoComplete="off"
            type="password"
            name="password"
            {...register("password", {
              required: { value: true, message: "This field is required." },
              minLength: {
                value: 8,
                message: "Should contain at least 8 characters.",
              },
              maxLength: {
                value: 16,
                message: "Should not exceed 16 characters.",
              },
            })}
          />
          {errors.password && (
            <p className="errorMsg">{errors.password.message}</p>
          )}

          <label htmlFor="cpassword">Confirm Password</label>
          <input
            autoComplete="off"
            type="password"
            name="cpassword"
            {...register("cpassword", {
              required: { value: true, message: "This field is required." },
              minLength: {
                value: 8,
                message: "Should contain at least 6 characters.",
              },
              maxLength: {
                value: 16,
                message: "Should not exceed 16 characters.",
              },
              validate: (val) => {
                if (watch("password") !== val) {
                  return "Both passwords are not matching.";
                }
              },
            })}
          />
          {errors.cpassword && (
            <p className="errorMsg">{errors.cpassword.message}</p>
          )}
          <Link to="/login">
            <p>Already have an account?</p>
          </Link>
          <div className="btn">
            <button id="sub">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

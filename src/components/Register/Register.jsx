import { useState, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { CounterContext } from "../../Context/CounterContext.jsx";

export default function Register() {
  const { setUserLogin } = useContext(CounterContext);
  const [apiErr, setApiErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function handleRegister(formValues) {
    setIsLoading(true);
    setApiErr("");
    axios
      .post("https://api.freeapi.app/api/v1/users/register", formValues)
      .then((res) => {
        const token = res.data?.token || "active_user_token";
        setUserLogin(token);
        localStorage.setItem("userToken", token);
        localStorage.setItem("userName", formValues.username);
        toast.success("Account created successfully!");
        navigate("/");
      })
      .catch((err) => {
        const msg =
          err.response?.data?.message ||
          "Registration failed. Please check your data or try again.";
        setApiErr(msg);
        toast.error(msg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be less than 50 characters")
      .required("Full name is required"),
    email: yup.string().email("Enter a valid email address").required("Email is required"),
    phone: yup
      .string()
      .matches(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number (e.g. 01012345678)")
      .required("Phone number is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    onSubmit: handleRegister,
    validationSchema: validationSchema,
  });

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200/80 shadow-xl p-8 sm:p-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center text-xl mx-auto shadow-md shadow-emerald-500/20">
            <i className="fa-solid fa-user-plus"></i>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Create your MemoStore Account
          </h1>
          <p className="text-slate-500 text-xs">
            Join thousands of shoppers and enjoy exclusive discounts & free shipping
          </p>
        </div>

        {apiErr && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center gap-2">
            <i className="fa-solid fa-circle-exclamation shrink-0"></i>
            <span>{apiErr}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Full Name
            </label>
            <div className="relative">
              <input
                id="username"
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="John Doe"
                className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl py-2.5 pl-10 pr-4 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
              />
              <i className="fa-solid fa-user absolute left-3.5 top-3.5 text-slate-400 text-sm"></i>
            </div>
            {formik.errors.username && formik.touched.username && (
              <p className="text-rose-500 text-xs mt-1 font-medium">{formik.errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="name@example.com"
                className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl py-2.5 pl-10 pr-4 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
              />
              <i className="fa-solid fa-envelope absolute left-3.5 top-3.5 text-slate-400 text-sm"></i>
            </div>
            {formik.errors.email && formik.touched.email && (
              <p className="text-rose-500 text-xs mt-1 font-medium">{formik.errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Phone Number
            </label>
            <div className="relative">
              <input
                id="phone"
                type="text"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="01012345678"
                className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl py-2.5 pl-10 pr-4 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
              />
              <i className="fa-solid fa-phone absolute left-3.5 top-3.5 text-slate-400 text-sm"></i>
            </div>
            {formik.errors.phone && formik.touched.phone && (
              <p className="text-rose-500 text-xs mt-1 font-medium">{formik.errors.phone}</p>
            )}
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl py-2.5 pl-10 pr-9 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
                />
                <i className="fa-solid fa-lock absolute left-3.5 top-3.5 text-slate-400 text-sm"></i>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 text-xs"
                >
                  <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
              </div>
              {formik.errors.password && formik.touched.password && (
                <p className="text-rose-500 text-xs mt-1 font-medium">{formik.errors.password}</p>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="rePassword"
                  type={showPassword ? "text" : "password"}
                  name="rePassword"
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl py-2.5 pl-10 pr-4 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
                />
                <i className="fa-solid fa-shield-halved absolute left-3.5 top-3.5 text-slate-400 text-sm"></i>
              </div>
              {formik.errors.rePassword && formik.touched.rePassword && (
                <p className="text-rose-500 text-xs mt-1 font-medium">{formik.errors.rePassword}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 active:scale-95 disabled:opacity-75"
          >
            {isLoading ? (
              <>
                <i className="fa-solid fa-circle-notch fa-spin text-sm"></i>
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-slate-500 pt-2">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-emerald-600 hover:underline">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
}

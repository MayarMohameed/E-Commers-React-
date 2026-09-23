import { useState, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { CounterContext } from "../../Context/CounterContext.jsx";

export default function Login() {
  const { setUserLogin } = useContext(CounterContext);
  const [apiErr, setApiErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function handleLogin(formValues) {
    setIsLoading(true);
    setApiErr("");
    axios
      .post("https://api.freeapi.app/api/v1/users/login", formValues)
      .then((res) => {
        const token = res.data?.token || "active_user_token";
        setUserLogin(token);
        localStorage.setItem("userToken", token);
        if (formValues.email) {
          const name = formValues.email.split("@")[0];
          localStorage.setItem("userName", name);
        }
        toast.success("Login successful!");
        navigate("/");
      })
      .catch((err) => {
        const msg = err.response?.data?.message || "Invalid credentials or service unavailable.";
        setApiErr(msg);
        toast.error(msg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const validationSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleLogin,
    validationSchema: validationSchema,
  });

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/80 shadow-xl p-8 sm:p-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center text-xl mx-auto shadow-md shadow-emerald-500/20">
            <i className="fa-solid fa-bag-shopping"></i>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Sign In to MemoStore
          </h1>
          <p className="text-slate-500 text-xs">
            Access your order history, saved wishlist, and checkout perks
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
          {/* Email Field */}
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
                className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl py-3 pl-10 pr-4 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
              />
              <i className="fa-solid fa-envelope absolute left-3.5 top-3.5 text-slate-400 text-sm"></i>
            </div>
            {formik.errors.email && formik.touched.email && (
              <p className="text-rose-500 text-xs mt-1 font-medium">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <a href="#" className="text-[11px] font-semibold text-emerald-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl py-3 pl-10 pr-10 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
              />
              <i className="fa-solid fa-lock absolute left-3.5 top-3.5 text-slate-400 text-sm"></i>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 text-sm"
              >
                <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
            {formik.errors.password && formik.touched.password && (
              <p className="text-rose-500 text-xs mt-1 font-medium">{formik.errors.password}</p>
            )}
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
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-slate-500 pt-2">
          Don't have an account?{" "}
          <Link to="/register" className="font-bold text-emerald-600 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

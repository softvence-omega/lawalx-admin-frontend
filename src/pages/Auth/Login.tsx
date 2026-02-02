import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, Mail, CircleAlert } from "lucide-react";
import { useLoginMutation } from "@/store/Api/AuthApi/AuthApi";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/useRedux";
import { setUser } from "@/store/Slices/AuthSlice/authSlice";
import { jwtDecode } from "jwt-decode";

const Role = {
  //   VIEWER: "viewer-panel",
  //   EMPLOYEE: "staff-employee-panel", // todo: change to employee-panel when ready
  SUPPORTER: "supporter",
  //   MANAGER: "staff-manager-panel",
  ADMIN: "admin",
  //   CLIENT: "client-panel",
  SUPERADMIN: "admin",
};
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "mdkazinaim0018@gmail.com",
      password: "123456789",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    const toastId = toast.loading("Logging in...");
    try {
      const res = await login(data).unwrap();
      if (res.success) {
        console.log("inside success");
        dispatch(setUser(res?.data));
        if (res?.data?.specialToken) {
          toast.success("Logged in successfully", { id: toastId });
          navigate("/verification");
        } else {
          const { role } = jwtDecode<{
            role: "ADMIN" | "SUPERADMIN" | "SUPPORTER";
          }>(res?.data?.accessToken);
          if (Role[role]) {
            toast.success("Logged in successfully", { id: toastId });
            navigate(`/${Role[role]}`);
          } else {
            toast.error("You are not authorized", {
              id: toastId,
            });
            // navigate("/unauthorized");
          }
        }
      }
    } catch (error: unknown) {
      let message = "Login Failed";
      if (typeof error === "object" && error !== null) {
        const err = error as any;
        message = err?.data?.message || message;
      }
      toast.error(message, { id: toastId });
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center min-h-screen lg:bg-white p-4 md:p-8">
      {/* Image Section - Hidden on mobile, visible on LG+ */}
      <div className="hidden lg:flex lg:w-full flex-col items-center justify-center p-12">
        <div className="max-w-xl w-full">
          <img
            src="/Logo.png"
            alt="logo"
            className="mb-8 max-h-16 object-contain"
          />
          <img
            className="w-full h-auto drop-shadow-2xl"
            src="/login image.png"
            alt="login-Image"
          />
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-full flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl lg:shadow-none shadow-sm border border-gray-100 lg:border-none">
          {/* Logo for mobile only */}
          <div className="lg:hidden flex justify-center mb-8">
            <img src="/Logo.png" alt="logo" className="h-10 md:h-12" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center lg:text-left">
            Welcome back
          </h2>
          <p className="text-gray-500 font-medium text-base mt-3 text-center lg:text-left">
            Enter your email and password to access your account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 md:mt-12">
            {/* Email Field */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email*
              </label>

              <div
                className={`flex items-center border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } bg-gray-50 rounded-xl focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all overflow-hidden relative`}
              >
                <div className="pl-4 text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email"
                  className="w-full py-3.5 px-3 bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm md:text-base"
                />
                {errors.email && (
                  <div className="pr-4 text-red-500">
                    <CircleAlert className="w-5 h-5" />
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password*
              </label>
              <div
                className={`flex items-center border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } bg-gray-50 rounded-xl focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all overflow-hidden relative`}
              >
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Enter your password"
                  className="w-full py-3.5 px-4 bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm md:text-base"
                />

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="px-4 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                  {errors.password.message}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 mt-6">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="policy"
                    id="policy"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    Remember me
                  </span>
                </label>
                <NavLink
                  to="/forgot"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors no-underline"
                >
                  Forgot Password?
                </NavLink>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/20 active:scale-[0.98] mt-4"
            >
              Login
            </button>

            <NavLink to="/signup" className="block no-underline mt-8">
              <div className="text-center group">
                <span className="text-sm text-gray-500">
                  Don't have an account?{" "}
                </span>
                <span className="text-sm font-bold text-blue-600 group-hover:text-blue-700 group-hover:underline transition-all">
                  Sign up for free
                </span>
              </div>
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

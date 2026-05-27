import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import { authService } from "../../services/authService";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const data = await authService.login({ email, password, rememberMe: isChecked });
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full max-w-md mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Welcome back
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Sign in to access your RAGCP dashboard.
        </p>
      </div>

      <form onSubmit={handleSignIn} className="space-y-5">
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400">
            {error}
          </div>
        )}
        
        <div>
          <Label>
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input 
            placeholder="admin@example.com" 
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
        </div>
        
        <div>
          <Label>
            Password <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              {showPassword ? (
                <EyeIcon className="fill-current size-5" />
              ) : (
                <EyeCloseIcon className="fill-current size-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-3">
            <Checkbox checked={isChecked} onChange={setIsChecked} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Keep me logged in
            </span>
          </div>
          <Link
            to="/reset-password"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <button 
          type="submit"
          className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold text-white transition-all rounded-lg bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30"
        >
          Sign in
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>

      {/* Demo Credentials Section */}
      <div className="mt-10 p-5 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 rounded-xl">
        <h3 className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Demo Credentials
        </h3>
        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-2.5">
          <li className="flex justify-between items-center"><span className="font-medium text-gray-700 dark:text-gray-300">Super Admin:</span> <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700 font-mono text-blue-600 dark:text-blue-400">superadmin@example.com</code></li>
          <li className="flex justify-between items-center"><span className="font-medium text-gray-700 dark:text-gray-300">Admin:</span> <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700 font-mono text-blue-600 dark:text-blue-400">admin@example.com</code></li>
          <li className="flex justify-between items-center"><span className="font-medium text-gray-700 dark:text-gray-300">Client:</span> <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700 font-mono text-blue-600 dark:text-blue-400">client1@example.com</code></li>
          <li className="mt-3 pt-3 border-t border-blue-200/50 dark:border-blue-800/50 flex justify-between items-center"><span className="font-medium text-gray-700 dark:text-gray-300">Password (All):</span> <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700 font-mono text-blue-600 dark:text-blue-400">password123</code></li>
        </ul>
      </div>
    </div>
  );
}

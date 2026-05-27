import { useState } from "react";
import { Link } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  
  return (
    <div className="flex flex-col flex-1 w-full max-w-md mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Create an account
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Sign up to streamline your compliance workflow.
        </p>
      </div>

      <form className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* <!-- First Name --> */}
          <div className="sm:col-span-1">
            <Label>
              First Name<span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="fname"
              name="fname"
              placeholder="John"
            />
          </div>
          {/* <!-- Last Name --> */}
          <div className="sm:col-span-1">
            <Label>
              Last Name<span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="lname"
              name="lname"
              placeholder="Doe"
            />
          </div>
        </div>
        
        {/* <!-- Email --> */}
        <div>
          <Label>
            Email Address<span className="text-red-500">*</span>
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="john@example.com"
          />
        </div>
        
        {/* <!-- Password --> */}
        <div>
          <Label>
            Password<span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              placeholder="Create a strong password"
              type={showPassword ? "text" : "password"}
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

        {/* <!-- Confirm Password --> */}
        <div>
          <Label>
            Confirm Password<span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              placeholder="Confirm your password"
              type={showConfirmPassword ? "text" : "password"}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              {showConfirmPassword ? (
                <EyeIcon className="fill-current size-5" />
              ) : (
                <EyeCloseIcon className="fill-current size-5" />
              )}
            </button>
          </div>
        </div>
        
        {/* <!-- Checkbox --> */}
        <div className="flex items-start gap-3 mt-4">
          <div className="mt-0.5">
            <Checkbox
              checked={isChecked}
              onChange={setIsChecked}
            />
          </div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
            By creating an account, you agree to our{" "}
            <a href="#" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline">
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a href="#" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline">
              Privacy Policy
            </a>.
          </p>
        </div>
        
        {/* <!-- Button --> */}
        <div className="pt-2">
          <button 
            type="button"
            className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold text-white transition-all rounded-lg bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30"
          >
            Create Account
          </button>
        </div>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

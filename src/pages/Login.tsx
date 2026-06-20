import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  EyeIcon,
  EyeSlashIcon,
  ExclamationCircleIcon,
  XMarkIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

// ── Shared modules ─────────────────────────────────────────────────────
import {
  Typography,
  Input,
  Button,
  Alert,
  IconButton,
  Card,
  CardBody,
} from "../lib/mt-components";
import { BRAND } from "../constants";
import illustration from "../assets/illustration.png";

// ── Main component ─────────────────────────────────────────────────────

export function Login() {
  // Password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // Remember me toggle
  const [rememberMe, setRememberMe] = useState(false);

  // Hold dynamic error messages from form submission exceptions
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(""); // Clear previous errors

    try {
      // Extract data from the form
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email")?.toString().trim();
      const password = formData.get("password")?.toString();

      // Basic exception throwing for validation
      if (!email || !password) {
        throw new Error("Please enter both your email and password.");
      }

      // TODO: call actual login API here
      console.log("Login validation passed! Payload:", {
        email,
        password,
        rememberMe,
      });
    } catch (err) {
      // Display errors caught during validation
      setErrorMsg(err instanceof Error ? err.message : "An unexpected error occurred during login.");
    }
  };

  return (
    <div className="flex-grow flex min-h-[calc(100vh-64px)] bg-[#e6e9ef]">
      {/* ─── Left panel: branding illustration (desktop only) ─── */}
      <aside
        className="hidden lg:flex fixed left-0 top-16 bottom-0 w-1/2 flex-col items-center justify-center text-center px-12 py-12 overflow-hidden z-10"
      >
        <div className="max-w-md flex-shrink-0 flex flex-col items-center justify-center mt-10">
          <Typography
            variant="h3"
            color="blue-gray"
            className="mb-4 font-bold tracking-tight text-3xl leading-tight text-center"
          >
            Welcome Back to
            <br />
            EcoCycle.
          </Typography>

          <Typography color="gray" className="mb-8 font-normal text-base text-center leading-relaxed">
            Sign in to access your waste management portal. Track collections,
            manage schedules, and contribute to a greener tomorrow.
          </Typography>
        </div>

        <img
          src={illustration}
          alt="Eco-friendly community"
          className="w-full flex-1 min-h-0 mt-4 object-contain mix-blend-multiply hover:scale-[1.02] transition-transform duration-500"
        />
      </aside>

      {/* ─── Right panel: login form ─── */}
      <section className="w-full lg:w-1/2 lg:ml-auto flex flex-col items-center justify-center px-4 py-8 sm:py-12 sm:px-8 md:px-12 lg:px-20">
        <Card className="w-full max-w-[440px] bg-[#e6e9ef] shadow-[16px_16px_32px_#c4c7cc,-16px_-16px_32px_#ffffff] rounded-2xl sm:rounded-3xl border-none">
          <CardBody className="p-6 sm:p-12">
            <Typography variant="h4" color="blue-gray" className="mb-2 font-bold text-2xl sm:text-3xl">
              Welcome back to EcoCycle
            </Typography>
            <Typography color="gray" className="mb-8 font-normal text-base">
              Sign in to access your waste management portal
            </Typography>

            {/* Mobile-only illustration */}
            <div className="flex justify-center lg:hidden mb-8">
              <img
                src={illustration}
                alt="Eco-friendly community"
                className="w-full max-w-[220px] object-contain mix-blend-multiply"
              />
            </div>

            {/* ── Error banner (MT Alert) ── */}
            {errorMsg && (
              <Alert
                color="red"
                variant="ghost"
                className="mb-8 border-l-4 border-red-500 rounded-lg font-medium text-sm flex items-center gap-2 py-3"
                icon={<ExclamationCircleIcon className="h-5 w-5" />}
                action={
                  <IconButton
                    variant="text"
                    color="red"
                    size="sm"
                    className="!absolute top-2 right-2"
                    onClick={() => setErrorMsg("")}
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </IconButton>
                }
              >
                {errorMsg}
              </Alert>
            )}

            {/* ── Login form ── */}
            <form onSubmit={handleSubmit} className="flex flex-col">

              <div className="flex flex-col gap-6 mb-6">
                {/* Email / Username */}
                <div>
                  <Typography variant="small" color="blue-gray" className="mb-2 font-semibold text-sm">
                    Email address or username
                  </Typography>
                  <Input
                    name="email"
                    type="text"
                    placeholder="name@example.com"
                    icon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
                    crossOrigin={undefined}
                    className="!border-none !bg-[#f0f2f5] !rounded-xl shadow-[inset_4px_4px_8px_#c4c7cc,inset_-4px_-4px_8px_#ffffff]"
                  />
                </div>

                {/* Password */}
                <div>
                  <Typography variant="small" color="blue-gray" className="mb-2 font-semibold text-sm">
                    Password
                  </Typography>
                  <div className="relative">
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      crossOrigin={undefined}
                      className="!border-none !bg-[#f0f2f5] !rounded-xl shadow-[inset_4px_4px_8px_#c4c7cc,inset_-4px_-4px_8px_#ffffff]"
                    />
                    <IconButton
                      variant="text"
                      size="sm"
                      className="!absolute right-1 top-1 rounded"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-blue-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-blue-gray-400" />
                      )}
                    </IconButton>
                  </div>
                </div>
              </div>

              {/* Remember me + Forgot password row */}
              <div className="flex items-center justify-between mb-8">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe((prev) => !prev)}
                    className="h-4 w-4 rounded border-gray-300 text-[#629955] focus:ring-[#629955] cursor-pointer"
                  />
                  <Typography color="gray" className="text-sm font-normal">
                    Remember me
                  </Typography>
                </label>

                <Link
                  to="/reset-password"
                  className="text-sm font-semibold hover:underline"
                  style={{ color: BRAND.accent }}
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="flex items-center justify-center gap-3 !bg-[#629955] !text-white font-bold !shadow-[6px_6px_12px_#4e7a44,-6px_-6px_12px_#76b866] active:!shadow-[inset_4px_4px_8px_#4e7a44,inset_-4px_-4px_8px_#76b866] transition-all duration-300 py-4 rounded-xl text-lg border-none"
                fullWidth
              >
                Login to account
                <ArrowRightIcon className="h-5 w-5" strokeWidth={2.5} />
              </Button>

              {/* Register redirect */}
              <Typography color="gray" className="mt-8 text-center font-normal text-sm">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold hover:underline"
                  style={{ color: BRAND.accent }}
                >
                  Register new premises
                </Link>
              </Typography>
            </form>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}

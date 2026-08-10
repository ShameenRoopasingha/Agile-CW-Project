import { useState, type FormEvent, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRightIcon,
  EyeIcon,
  EyeSlashIcon,
  ExclamationCircleIcon,
  XMarkIcon,
  BuildingOffice2Icon,
  UserIcon,
  MapPinIcon,
  EnvelopeIcon,

} from "@heroicons/react/24/outline";

// ── Shared modules ─────────────────────────────────────────────────────
import {
  Typography,
  Input,
  Select,
  Option,
  Button,
  Alert,
  IconButton,
  Card,
  CardBody,
} from "../lib/mt-components";
import { BRAND, HOME_TOWNS } from "../constants";
import illustration from "../assets/illustration.png";
import { register, verifyRegisterOtp } from "../lib/api";
import { useAuth } from "../context/AuthContext";

// ── Main component ─────────────────────────────────────────────────────

export function SignUp() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    premisesNo: "",
    name: "",
    HomeTown: "",
    Landmark: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP state
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // ── Handlers ──

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      const { premisesNo, name, HomeTown, Landmark, email, password } = formData;

      // Basic exception throwing for validation
      if (!premisesNo || !name || !HomeTown || !Landmark || !email || !password || !confirmPassword) {
        throw new Error("Please fill in all required fields.");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match. Please try again.");
      }

      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long.");
      }

      // Call register API
      const response = await register(formData);
      
      if (response && response.message === "OTP sent to email") {
        setStep(2);
      } else {
        throw new Error(response?.message || "Unexpected response from server");
      }
    } catch (err: any) {
      setErrorMsg(err instanceof Error ? err.message : (err?.message || "An unexpected error occurred."));
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setErrorMsg("Please enter the complete 6-digit OTP.");
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        premisesNo: formData.premisesNo,
        email: formData.email,
        password: formData.password,
        otp: otpString,
      };

      const response = await verifyRegisterOtp(payload);

      if (response && response.accessToken) {
        await login(response.accessToken);
        navigate("/");
      } else {
        throw new Error(response?.message || "Invalid response from server");
      }
    } catch (err: any) {
      setErrorMsg(err instanceof Error ? err.message : (err?.message || "OTP verification failed."));
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedData = value.slice(0, 6).split("");
      const newOtp = [...otp];
      pastedData.forEach((char, i) => {
        if (index + i < 6) newOtp[index + i] = char;
      });
      setOtp(newOtp);
      const focusIndex = Math.min(index + pastedData.length, 5);
      otpRefs.current[focusIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // ── Step Content ──

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <form onSubmit={handleRegisterSubmit} className="flex flex-col">
          {/* ── SECTION: Property Details ── */}
          <div className="mb-6 flex items-center">
            <Typography variant="h6" color="blue-gray" className="font-semibold text-sm tracking-wide uppercase">
              Property Details
            </Typography>
            <div className="h-px bg-gray-200 flex-grow ml-4"></div>
          </div>

          <div className="flex flex-col gap-6 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
              <div>
                <Input
                  name="premisesNo"
                  type="text"
                  label="Assessment Number"
                  placeholder="e.g., A-101"
                  icon={<BuildingOffice2Icon className="h-5 w-5 text-gray-400" />}
                  crossOrigin={undefined}
                  className="!h-[54px] !border-none !bg-[#f0f2f5] !rounded-xl shadow-[inset_4px_4px_8px_#c4c7cc,inset_-4px_-4px_8px_#ffffff]"
                  value={formData.premisesNo}
                  onChange={(e: any) => handleInputChange("premisesNo", e.target.value)}
                />
              </div>

              <div>
                <Input
                  name="name"
                  type="text"
                  label="Property Owner Name"
                  placeholder="e.g., John Doe"
                  icon={<UserIcon className="h-5 w-5 text-gray-400" />}
                  crossOrigin={undefined}
                  className="!h-[54px] !border-none !bg-[#f0f2f5] !rounded-xl shadow-[inset_4px_4px_8px_#c4c7cc,inset_-4px_-4px_8px_#ffffff]"
                  value={formData.name}
                  onChange={(e: any) => handleInputChange("name", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
              <Select 
                label="Home Town" 
                className="!h-[54px] !border-none !bg-[#f0f2f5] !rounded-xl shadow-[inset_4px_4px_8px_#c4c7cc,inset_-4px_-4px_8px_#ffffff]"
                value={formData.HomeTown}
                onChange={(val: any) => handleInputChange("HomeTown", val as string)}
              >
                {HOME_TOWNS.map((town) => (
                  <Option key={town.value} value={town.value}>
                    {town.label}
                  </Option>
                ))}
              </Select>

              <Input
                name="Landmark"
                type="text"
                label="Land Mark"
                placeholder="e.g., Near City Mall"
                icon={<MapPinIcon className="h-5 w-5 text-gray-400" />}
                crossOrigin={undefined}
                className="!h-[54px] !border-none !bg-[#f0f2f5] !rounded-xl shadow-[inset_4px_4px_8px_#c4c7cc,inset_-4px_-4px_8px_#ffffff]"
                value={formData.Landmark}
                onChange={(e: any) => handleInputChange("Landmark", e.target.value)}
              />
            </div>
          </div>

          {/* ── SECTION: Account Details ── */}
          <div className="mb-6 flex items-center">
            <Typography variant="h6" color="blue-gray" className="font-semibold text-sm tracking-wide uppercase">
              Account Details
            </Typography>
            <div className="h-px bg-gray-200 flex-grow ml-4"></div>
          </div>

          <div className="flex flex-col gap-6 mb-10">
            <Input
              name="email"
              type="email"
              label="Email Address"
              placeholder="name@example.com"
              icon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
              crossOrigin={undefined}
              className="!h-[54px] !border-none !bg-[#f0f2f5] !rounded-xl shadow-[inset_4px_4px_8px_#c4c7cc,inset_-4px_-4px_8px_#ffffff]"
              value={formData.email}
              onChange={(e: any) => handleInputChange("email", e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  placeholder="••••••••"
                  crossOrigin={undefined}
                  className="!h-[54px] !border-none !bg-[#f0f2f5] !rounded-xl shadow-[inset_4px_4px_8px_#c4c7cc,inset_-4px_-4px_8px_#ffffff]"
                  value={formData.password}
                  onChange={(e: any) => handleInputChange("password", e.target.value)}
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

              <div className="relative">
                <Input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  label="Confirm Password"
                  placeholder="••••••••"
                  crossOrigin={undefined}
                  className="!h-[54px] !border-none !bg-[#f0f2f5] !rounded-xl shadow-[inset_4px_4px_8px_#c4c7cc,inset_-4px_-4px_8px_#ffffff]"
                  value={confirmPassword}
                  onChange={(e: any) => setConfirmPassword(e.target.value)}
                />
                <IconButton
                  variant="text"
                  size="sm"
                  className="!absolute right-1 top-1 rounded"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-blue-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-blue-gray-400" />
                  )}
                </IconButton>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center gap-3 !bg-[#629955] !text-white font-bold !shadow-[6px_6px_12px_#4e7a44,-6px_-6px_12px_#76b866] active:!shadow-[inset_4px_4px_8px_#4e7a44,inset_-4px_-4px_8px_#76b866] transition-all duration-300 py-4 rounded-xl text-lg border-none disabled:opacity-70"
            fullWidth
          >
            {isLoading ? "Processing..." : "Register Premises"}
            {!isLoading && <ArrowRightIcon className="h-5 w-5" strokeWidth={2.5} />}
          </Button>

          <Typography color="gray" className="mt-8 text-center font-normal text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold hover:underline"
              style={{ color: BRAND.accent }}
            >
              Sign in here
            </Link>
          </Typography>
        </form>
      );
    }

    if (step === 2) {
      return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-[#f0f5ee] flex items-center justify-center">
              <EnvelopeIcon className="h-8 w-8 text-[#629955]" strokeWidth={2} />
            </div>
          </div>
          <Typography variant="h4" color="blue-gray" className="mb-2 font-bold text-2xl sm:text-3xl text-center">
            Verify Email
          </Typography>
          <Typography color="gray" className="mb-8 font-normal text-base text-center">
            We sent a 6-digit OTP to <strong>{formData.email}</strong>
          </Typography>

          <form onSubmit={handleOtpSubmit} className="flex flex-col">
            <div className="flex justify-between items-center w-full !border-none !bg-[#f0f2f5] rounded-xl shadow-[inset_4px_4px_8px_#c4c7cc,inset_-4px_-4px_8px_#ffffff] py-3 px-4 mb-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (otpRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="w-8 h-10 sm:w-10 text-center text-xl sm:text-2xl font-medium bg-transparent border-none outline-none focus:ring-0 text-gray-800"
                />
              ))}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-3 !bg-[#629955] !text-white font-bold !shadow-[6px_6px_12px_#4e7a44,-6px_-6px_12px_#76b866] active:!shadow-[inset_4px_4px_8px_#4e7a44,inset_-4px_-4px_8px_#76b866] transition-all duration-300 py-4 rounded-xl text-lg border-none disabled:opacity-70"
              fullWidth
            >
              {isLoading ? "Verifying..." : "Verify & Login"}
            </Button>
            
            <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm font-semibold hover:opacity-80 transition-opacity"
                  style={{ color: BRAND.accent }}
                >
                  Back to form
                </button>
            </div>
          </form>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex-grow flex min-h-[calc(100vh-64px)] bg-[#e6e9ef]">
      {/* ─── Left panel: branding illustration (desktop only) ─── */}
      <aside className="hidden lg:flex fixed left-0 top-16 bottom-0 w-1/2 flex-col items-center justify-center text-center px-12 py-12 overflow-hidden z-10">
        <div className="max-w-md flex-shrink-0 flex flex-col items-center justify-center mt-10">
          <Typography
            variant="h3"
            color="blue-gray"
            className="mb-4 font-bold tracking-tight text-3xl leading-tight text-center"
          >
            Clean Neighborhoods,
            <br />
            Greener Future.
          </Typography>

          <Typography color="gray" className="mb-8 font-normal text-base text-center leading-relaxed">
            Join thousands of citizens in our mission for a sustainable circular
            economy. Register your premises today to manage waste collection and
            track environmental impact.
          </Typography>
        </div>

        <img
          src={illustration}
          alt="Eco-friendly community"
          className="w-full flex-1 min-h-0 mt-4 object-contain mix-blend-multiply hover:scale-[1.02] transition-transform duration-500"
        />
      </aside>

      {/* ─── Right panel: registration form ─── */}
      <section className="w-full lg:w-1/2 lg:ml-auto flex flex-col items-center justify-center px-4 py-8 sm:py-12 sm:px-8 md:px-12 lg:px-20">
        <Card className="w-full max-w-[560px] bg-[#e6e9ef] shadow-[16px_16px_32px_#c4c7cc,-16px_-16px_32px_#ffffff] rounded-2xl sm:rounded-3xl border-none">
          <CardBody className="p-6 sm:p-12 overflow-hidden">
            {step === 1 && (
              <>
                <Typography variant="h4" color="blue-gray" className="mb-2 font-bold text-2xl sm:text-3xl">
                  Create an Account
                </Typography>
                <Typography color="gray" className="mb-6 font-normal text-base">
                  Enter your property details below to get started.
                </Typography>
              </>
            )}

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

            {renderStepContent()}

          </CardBody>
        </Card>
      </section>
    </div>
  );
}

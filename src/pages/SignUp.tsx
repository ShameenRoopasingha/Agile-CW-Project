import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
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
  CheckIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

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

// ── Main component ─────────────────────────────────────────────────────

export function SignUp() {
  // Password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Hold dynamic error messages from form submission exceptions
  const [errorMsg, setErrorMsg] = useState("");

  // Loading state
  const [loading, setLoading] = useState(false);

  // Controlled HomeTown select
  const [selectedHomeTown, setSelectedHomeTown] = useState("");

  // Store form data between steps
  const [formPayload, setFormPayload] = useState<{
    premisesNo: string;
    name: string;
    HomeTown: string;
    Landmark: string;
    email: string;
    password: string;
  } | null>(null);

  // OTP state
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // ── Step 1: Registration form submit ──
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(""); // Clear previous errors

    try {
      // Extract data from the form
      const formData = new FormData(e.currentTarget);
      const premisesNo = formData.get("premisesNo")?.toString().trim();
      const name = formData.get("name")?.toString().trim();
      const Landmark = formData.get("Landmark")?.toString().trim();
      const email = formData.get("email")?.toString().trim();
      const password = formData.get("password")?.toString();
      const confirmPassword = formData.get("confirmPassword")?.toString();

      // Basic exception throwing for validation
      if (!premisesNo || !name || !selectedHomeTown || !Landmark || !email || !password || !confirmPassword) {
        throw new Error("Please fill in all required fields.");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match. Please try again.");
      }

      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long.");
      }

      const payload = {
        premisesNo,
        name,
        HomeTown: selectedHomeTown,
        Landmark,
        email,
        password,
      };

      setLoading(true);
      await registerRequestOtp(payload);

      // Save payload for OTP step
      setFormPayload(payload);
      setStep(2);

    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrorMsg(err.response?.data?.message || err.response?.data?.error || "Registration failed. Please try again.");
      } else {
        setErrorMsg(err instanceof Error ? err.message : "An unexpected error occurred during registration.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Step 2: OTP handlers ──
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

  const handleVerifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setErrorMsg("Please enter the complete 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);
      const response = await registerVerifyOtp({
        email: formPayload!.email,
        otp: otpCode,
      });

      // Store token on success
      if (response.data?.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
      }

      setStep(3);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrorMsg(err.response?.data?.message || err.response?.data?.error || "OTP verification failed. Please try again.");
      } else {
        setErrorMsg(err instanceof Error ? err.message : "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!formPayload) return;
    setErrorMsg("");
    try {
      setLoading(true);
      await registerRequestOtp(formPayload);
      setOtp(["", "", "", "", "", ""]);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrorMsg(err.response?.data?.message || err.response?.data?.error || "Failed to resend OTP.");
      } else {
        setErrorMsg(err instanceof Error ? err.message : "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Render Step Content ──
  const renderStepContent = () => {
    switch (step) {
      // ────────── STEP 1: Registration Form ──────────
      case 1:
        return (
          <>
            <Typography variant="h4" color="blue-gray" className="mb-2 font-bold text-2xl sm:text-3xl">
              Create an Account
            </Typography>
            <Typography color="gray" className="mb-6 font-normal text-base">
              Enter your property details below to get started.
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

            {/* ── Registration form ── */}
            <form onSubmit={handleSubmit} className="flex flex-col">

              {/* ── SECTION: Property Details ── */}
              <div className="mb-6 flex items-center">
                <Typography variant="h6" color="blue-gray" className="font-semibold text-sm tracking-wide uppercase">
                  Property Details
                </Typography>
                <div className="h-px bg-gray-200 flex-grow ml-4"></div>
              </div>

              <div className="flex flex-col gap-6 mb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
                  {/* Assessment Number */}
                  <div>
                    <Input
                      name="premisesNo"
                      type="text"
                      label="Assessment Number"
                      placeholder="e.g., 1234567890"
                      icon={<BuildingOffice2Icon className="h-5 w-5 text-gray-400" />}
                      crossOrigin={undefined}
                      className="!bg-white"
                    />
                    <Typography variant="small" color="gray" className="mt-2 text-xs">
                      10-digit number on your municipal tax receipt.
                    </Typography>
                  </div>

                  {/* Property Owner Name */}
                  <div>
                    <Input
                      name="ownerName"
                      type="text"
                      label="Property Owner Name"
                      placeholder="e.g., A.B. Perera"
                      icon={<UserIcon className="h-5 w-5 text-gray-400" />}
                      crossOrigin={undefined}
                      className="!bg-white"
                    />
                  </div>
                </div>

                {/* Home Town + Landmark */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
                  <Select label="Home Town" className="!bg-white">
                  <Select
                    value={selectedHomeTown}
                    onChange={(val: string) => setSelectedHomeTown(val)}
                    className="!h-[54px] !border-none !bg-[#f0f2f5] !rounded-xl shadow-[inset_4px_4px_8px_#c4c7cc,inset_-4px_-4px_8px_#ffffff]"
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
                    placeholder="e.g., Near Park"
                    icon={<MapPinIcon className="h-5 w-5 text-gray-400" />}
                    crossOrigin={undefined}
                    className="!bg-white"
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
                {/* Email Address */}
                <Input
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="name@example.com"
                  icon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
                  crossOrigin={undefined}
                  className="!bg-white"
                />

                {/* Passwords */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
                  <div className="relative">
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      placeholder="••••••••"
                      crossOrigin={undefined}
                      className="!bg-white"
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
                      className="!bg-white"
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

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-3 !bg-[#629955] !text-white font-bold !shadow-[6px_6px_12px_#4e7a44,-6px_-6px_12px_#76b866] active:!shadow-[inset_4px_4px_8px_#4e7a44,inset_-4px_-4px_8px_#76b866] transition-all duration-300 py-4 rounded-xl text-lg border-none disabled:opacity-60"
                fullWidth
              >
                {loading ? "Registering..." : "Register Premises"}
                {!loading && <ArrowRightIcon className="h-5 w-5" strokeWidth={2.5} />}
              </Button>

              {/* Sign-in redirect */}
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
          </>
        );

      // ────────── STEP 2: OTP Verification ──────────
      case 2:
        return (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#f0f5ee] flex items-center justify-center">
                <EnvelopeIcon className="h-8 w-8 text-[#629955]" strokeWidth={2} />
              </div>
            </div>
            <Typography variant="h4" color="blue-gray" className="mb-2 font-bold text-2xl sm:text-3xl text-center">
              Verify your email
            </Typography>
            <Typography color="gray" className="mb-8 font-normal text-base text-center">
              Enter the 6-digit OTP sent to <strong>{formPayload?.email}</strong>
            </Typography>

            {/* ── Error banner ── */}
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

            <form onSubmit={handleVerifyOtp} className="flex flex-col">
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

              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-3 !bg-[#629955] !text-white font-bold !shadow-[6px_6px_12px_#4e7a44,-6px_-6px_12px_#76b866] active:!shadow-[inset_4px_4px_8px_#4e7a44,inset_-4px_-4px_8px_#76b866] transition-all duration-300 py-4 rounded-xl text-base border-none disabled:opacity-60"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </Button>
                <Button
                  variant="outlined"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center border-2 border-[#629955] text-[#629955] font-bold py-4 rounded-xl text-base hover:bg-[#f0f5ee] transition-all duration-300 disabled:opacity-60"
                  onClick={handleResendOtp}
                >
                  Resend OTP
                </Button>
              </div>

              {/* Go back link */}
              <Typography color="gray" className="mt-8 text-center font-normal text-sm">
                Entered wrong details?{" "}
                <button
                  type="button"
                  className="font-semibold hover:underline bg-transparent border-none cursor-pointer"
                  style={{ color: BRAND.accent }}
                  onClick={() => {
                    setStep(1);
                    setOtp(["", "", "", "", "", ""]);
                    setErrorMsg("");
                  }}
                >
                  Go back
                </button>
              </Typography>
            </form>
          </>
        );

      // ────────── STEP 3: Success ──────────
      case 3:
        return (
          <>
            <div className="flex justify-center mb-6 mt-4">
              <div className="w-20 h-20 rounded-full bg-[#f0f5ee] flex items-center justify-center">
                <CheckIcon className="h-10 w-10 text-[#629955]" strokeWidth={3} />
              </div>
            </div>
            <Typography variant="h4" color="blue-gray" className="mb-2 font-bold text-2xl sm:text-3xl text-center">
              Registration Complete!
            </Typography>
            <Typography color="gray" className="mb-10 font-normal text-base text-center max-w-sm mx-auto">
              Your account has been successfully created. You can now log in to access your waste management portal.
            </Typography>

            <Button
              onClick={() => navigate("/login")}
              className="flex items-center justify-center gap-3 !bg-[#629955] !text-white font-bold !shadow-[6px_6px_12px_#4e7a44,-6px_-6px_12px_#76b866] active:!shadow-[inset_4px_4px_8px_#4e7a44,inset_-4px_-4px_8px_#76b866] transition-all duration-300 py-4 rounded-xl text-lg border-none"
              fullWidth
            >
              Go to Login
              <ArrowRightIcon className="h-5 w-5" strokeWidth={2.5} />
            </Button>
          </>
        );

      default:
        return null;
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
          <CardBody className="p-6 sm:p-12">

            {/* Step indicator */}
            {step < 3 && (
              <div className="flex items-center justify-between mb-8">
                <Typography variant="small" color="gray" className="font-medium text-sm">
                  Step {step} of 2
                </Typography>
                <div className="flex gap-1.5">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${i <= step ? "bg-[#629955]" : "bg-gray-300"
                        }`}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            {renderStepContent()}

          </CardBody>
        </Card>
      </section>
    </div>
  );
}

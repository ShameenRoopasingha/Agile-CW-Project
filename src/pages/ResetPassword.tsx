import { useState, type FormEvent, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  EnvelopeIcon, 
  ArrowRightIcon,
  CheckIcon,
  EyeIcon,
  EyeSlashIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";

// ── Shared modules ─────────────────────────────────────────────────────
import {
  Typography,
  Input,
  Button,
  Card,
  CardBody,
  IconButton,
} from "../lib/mt-components";
import { BRAND } from "../constants";
import illustration from "../assets/illustration.png";

// ── Main component ─────────────────────────────────────────────────────

export function ResetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  
  // OTP state
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Password state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ── Handlers ──
  const handleSendOtp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep(2);
  };

  const handleVerifyOtp = (e: FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleResetPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep(4);
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
      // Focus the last filled input
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

  // ── Render Step Content ──
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Typography variant="h4" color="blue-gray" className="mb-2 font-bold text-2xl sm:text-3xl">
              Reset your password
            </Typography>
            <Typography color="gray" className="mb-8 font-normal text-base">
              Enter your email address below and we'll send a 6 digit OTP verification code.
            </Typography>

            <form onSubmit={handleSendOtp} className="flex flex-col">
              <div className="mb-6">
                <Typography variant="small" color="blue-gray" className="mb-2 font-semibold text-sm">
                  Email address
                </Typography>
                <Input
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  icon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
                  crossOrigin={undefined}
                  className="!bg-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="mt-2 flex items-center justify-center gap-3 !bg-[#629955] !text-white font-bold !shadow-[6px_6px_12px_#4e7a44,-6px_-6px_12px_#76b866] active:!shadow-[inset_4px_4px_8px_#4e7a44,inset_-4px_-4px_8px_#76b866] transition-all duration-300 py-4 rounded-xl text-lg border-none"
                fullWidth
              >
                Send OTP
              </Button>

              <div className="mt-8 flex justify-center">
                <Link
                  to="/login"
                  className="flex items-center gap-2 font-semibold hover:opacity-80 transition-opacity"
                  style={{ color: BRAND.accent }}
                >
                  Back to login
                  <ArrowRightIcon className="h-4 w-4" strokeWidth={2.5} />
                </Link>
              </div>
            </form>
          </>
        );

      case 2:
        return (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#f0f5ee] flex items-center justify-center">
                <EnvelopeIcon className="h-8 w-8 text-[#629955]" strokeWidth={2} />
              </div>
            </div>
            <Typography variant="h4" color="blue-gray" className="mb-2 font-bold text-2xl sm:text-3xl text-center">
              Check your email
            </Typography>
            <Typography color="gray" className="mb-8 font-normal text-base text-center">
              Enter the 6-digit verification code sent to your email.
            </Typography>

            <form onSubmit={handleVerifyOtp} className="flex flex-col">
              <div className="flex justify-between items-center w-full border border-gray-300 rounded-xl py-3 px-4 bg-white mb-8">
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
                  className="flex-1 flex items-center justify-center gap-3 !bg-[#629955] !text-white font-bold !shadow-[6px_6px_12px_#4e7a44,-6px_-6px_12px_#76b866] active:!shadow-[inset_4px_4px_8px_#4e7a44,inset_-4px_-4px_8px_#76b866] transition-all duration-300 py-4 rounded-xl text-base border-none"
                >
                  Verify OTP
                </Button>
                <Button
                  variant="outlined"
                  className="flex-1 flex items-center justify-center border-2 border-[#629955] text-[#629955] font-bold py-4 rounded-xl text-base hover:bg-[#f0f5ee] transition-all duration-300"
                  onClick={() => console.log("Resend OTP")}
                >
                  Resend OTP
                </Button>
              </div>
            </form>
          </>
        );

      case 3:
        return (
          <>
            <Typography variant="h4" color="blue-gray" className="mb-2 font-bold text-2xl sm:text-3xl">
              Create New Password
            </Typography>
            <Typography color="gray" className="mb-8 font-normal text-base">
              OTP verified successfully. Create a strong password to protect your EcoCycle account.
            </Typography>

            <form onSubmit={handleResetPassword} className="flex flex-col">
              <div className="mb-6">
                <Typography variant="small" color="blue-gray" className="mb-2 font-semibold text-sm">
                  New Password
                </Typography>
                <div className="relative">
                  <Input
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    crossOrigin={undefined}
                    className="!bg-white"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
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
                <Typography variant="small" color="gray" className="mt-2 text-xs flex items-start gap-1.5">
                  <InformationCircleIcon className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-500" /> 
                  Minimum 8 characters, including one uppercase letter and one number.
                </Typography>
              </div>

              <div className="mb-8">
                <Typography variant="small" color="blue-gray" className="mb-2 font-semibold text-sm">
                  Confirm Password
                </Typography>
                <div className="relative">
                  <Input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    crossOrigin={undefined}
                    className="!bg-white"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
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

              <Button
                type="submit"
                className="flex items-center justify-center gap-3 !bg-[#629955] !text-white font-bold !shadow-[6px_6px_12px_#4e7a44,-6px_-6px_12px_#76b866] active:!shadow-[inset_4px_4px_8px_#4e7a44,inset_-4px_-4px_8px_#76b866] transition-all duration-300 py-4 rounded-xl text-lg border-none"
                fullWidth
              >
                Reset Password
                <ArrowRightIcon className="h-5 w-5" strokeWidth={2.5} />
              </Button>
            </form>
          </>
        );

      case 4:
        return (
          <>
            <div className="flex justify-center mb-6 mt-4">
              <div className="w-20 h-20 rounded-full bg-[#f0f5ee] flex items-center justify-center">
                <CheckIcon className="h-10 w-10 text-[#629955]" strokeWidth={3} />
              </div>
            </div>
            <Typography variant="h4" color="blue-gray" className="mb-2 font-bold text-2xl sm:text-3xl text-center">
              Password updated
            </Typography>
            <Typography color="gray" className="mb-10 font-normal text-base text-center max-w-sm mx-auto">
              Your password has been successfully reset. You can now use your new password to log in to your account.
            </Typography>

            <Link to="/login" className="w-full block">
              <Button
                className="flex items-center justify-center gap-3 !bg-[#629955] !text-white font-bold !shadow-[6px_6px_12px_#4e7a44,-6px_-6px_12px_#76b866] active:!shadow-[inset_4px_4px_8px_#4e7a44,inset_-4px_-4px_8px_#76b866] transition-all duration-300 py-4 rounded-xl text-lg border-none"
                fullWidth
              >
                Back to login
                <ArrowRightIcon className="h-5 w-5" strokeWidth={2.5} />
              </Button>
            </Link>
          </>
        );

      default:
        return null;
    }
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
            Join over 50,000 households in our mission to automate waste management
            and build a more sustainable community together.
          </Typography>
        </div>

        <img
          src={illustration}
          alt="Eco-friendly community"
          className="w-full flex-1 min-h-0 mt-4 object-contain mix-blend-multiply hover:scale-[1.02] transition-transform duration-500"
        />
      </aside>

      {/* ─── Right panel: dynamic forms ─── */}
      <section className="w-full lg:w-1/2 lg:ml-auto flex flex-col items-center justify-center px-4 py-8 sm:py-12 sm:px-8 md:px-12 lg:px-20">
        <Card className="w-full max-w-[500px] bg-[#e6e9ef] shadow-[16px_16px_32px_#c4c7cc,-16px_-16px_32px_#ffffff] rounded-2xl sm:rounded-3xl border-none">
          <CardBody className="p-6 sm:p-12">
            
            {/* Step indicator */}
            <div className="flex items-center justify-between mb-8">
              <Typography variant="small" color="gray" className="font-medium text-sm">
                Step {step} of 4
              </Typography>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i <= step ? "bg-[#1f2937]" : "bg-gray-300"
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Mobile-only illustration */}
            <div className="flex justify-center lg:hidden mb-8">
              <img
                src={illustration}
                alt="Eco-friendly community"
                className="w-full max-w-[220px] object-contain mix-blend-multiply"
              />
            </div>

            {renderStepContent()}

          </CardBody>
        </Card>
      </section>
    </div>
  );
}

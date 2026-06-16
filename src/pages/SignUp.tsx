import { useState, type FormEvent } from "react";
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

// ── Main component ─────────────────────────────────────────────────────

export function SignUp() {
  // Password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Hold dynamic error messages from form submission exceptions
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(""); // Clear previous errors

    try {
      // Extract data from the form
      const formData = new FormData(e.currentTarget);
      const assessmentNumber = formData.get("assessmentNumber")?.toString().trim();
      const ownerName = formData.get("ownerName")?.toString().trim();
      const email = formData.get("email")?.toString().trim();
      const password = formData.get("password")?.toString();
      const confirmPassword = formData.get("confirmPassword")?.toString();

      // Basic exception throwing for validation
      if (!assessmentNumber || !ownerName || !email || !password || !confirmPassword) {
        throw new Error("Please fill in all required fields.");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match. Please try again.");
      }

      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long.");
      }

      // TODO: call actual registration API here
      console.log("Validation passed! Payload:", Object.fromEntries(formData));
      
    } catch (err: any) {
      // Display errors caught during validation
      setErrorMsg(err.message || "An unexpected error occurred during registration.");
    }
  };

  return (
    <div className="flex-grow flex min-h-[calc(100vh-64px)] bg-[#f8fafc]">
      {/* ─── Left panel: branding illustration (desktop only) ─── */}
      <aside
        className="hidden lg:flex fixed left-0 top-16 bottom-0 w-1/2 flex-col items-center justify-center text-center px-12 py-12 overflow-y-auto z-10 custom-scrollbar"
        style={{ backgroundColor: BRAND.panelBg }}
      >
        <div className="max-w-md flex flex-col items-center justify-center">
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

          <img
            src={illustration}
            alt="Eco-friendly community"
            className="w-1/2 object-contain mix-blend-multiply hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      </aside>

      {/* ─── Right panel: registration form ─── */}
      <section className="w-full lg:w-1/2 lg:ml-auto flex flex-col items-center justify-center px-4 py-12 sm:px-8 md:px-12 lg:px-20">
        <Card className="w-full max-w-[560px] shadow-2xl shadow-blue-gray-900/5 border border-white rounded-3xl bg-white">
          <CardBody className="p-8 sm:p-12">
            <Typography variant="h4" color="blue-gray" className="mb-2 font-bold text-3xl">
              Create an Account
            </Typography>
            <Typography color="gray" className="mb-8 font-normal text-base">
              Enter your property details below to get started.
            </Typography>

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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Assessment Number */}
                  <div>
                    <Input
                      name="assessmentNumber"
                      type="text"
                      label="Assessment Number"
                      placeholder="e.g., 1234567890"
                      icon={<BuildingOffice2Icon className="h-5 w-5 text-gray-400" />}
                      crossOrigin={undefined}
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
                    />
                  </div>
                </div>

                {/* Home Town + Landmark */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Select label="Home Town">
                    {HOME_TOWNS.map((town) => (
                      <Option key={town.value} value={town.value}>
                        {town.label}
                      </Option>
                    ))}
                  </Select>

                  <Input
                    name="landmark"
                    type="text"
                    label="Land Mark"
                    placeholder="e.g., Near Park"
                    icon={<MapPinIcon className="h-5 w-5 text-gray-400" />}
                    crossOrigin={undefined}
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
                />

                {/* Passwords */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative">
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      placeholder="••••••••"
                      crossOrigin={undefined}
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
                className="flex items-center justify-center gap-3 !bg-[#003829] hover:!bg-[#00291e] !text-white shadow-lg shadow-[#003829]/20 hover:shadow-xl hover:shadow-[#003829]/30 hover:-translate-y-0.5 transition-all py-4 rounded-xl text-base"
                fullWidth
              >
                Register Premises
                <ArrowRightIcon className="h-5 w-5" strokeWidth={2.5} />
              </Button>

              {/* Sign-in redirect */}
              <Typography color="gray" className="mt-8 text-center font-normal text-sm">
                Already have an account?{" "}
                <a
                  href="#"
                  className="font-semibold hover:underline"
                  style={{ color: BRAND.accent }}
                >
                  Sign in here
                </a>
              </Typography>
            </form>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}

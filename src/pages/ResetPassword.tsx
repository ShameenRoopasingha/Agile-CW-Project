import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { EnvelopeIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

// ── Shared modules ─────────────────────────────────────────────────────
import {
  Typography,
  Input,
  Button,
  Card,
  CardBody,
} from "../lib/mt-components";
import { BRAND } from "../constants";
import illustration from "../assets/illustration.png";

// ── Main component ─────────────────────────────────────────────────────

export function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Send OTP for:", email);
    // TODO: integrate with actual OTP API
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

      {/* ─── Right panel: reset password form ─── */}
      <section className="w-full lg:w-1/2 lg:ml-auto flex flex-col items-center justify-center px-4 py-8 sm:py-12 sm:px-8 md:px-12 lg:px-20">
        <Card className="w-full max-w-[500px] bg-[#e6e9ef] shadow-[16px_16px_32px_#c4c7cc,-16px_-16px_32px_#ffffff] rounded-2xl sm:rounded-3xl border-none">
          <CardBody className="p-6 sm:p-12">
            
            {/* Step indicator */}
            <div className="flex items-center justify-between mb-8">
              <Typography variant="small" color="gray" className="font-medium text-sm">
                Step 1 of 4
              </Typography>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#629955]"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>
            </div>

            <Typography variant="h4" color="blue-gray" className="mb-2 font-bold text-2xl sm:text-3xl">
              Reset your password
            </Typography>
            <Typography color="gray" className="mb-8 font-normal text-base">
              Enter your email address below and we'll send a 6 digit OTP verification code.
            </Typography>

            {/* Mobile-only illustration */}
            <div className="flex justify-center lg:hidden mb-8">
              <img
                src={illustration}
                alt="Eco-friendly community"
                className="w-full max-w-[220px] object-contain mix-blend-multiply"
              />
            </div>

            {/* ── Reset form ── */}
            <form onSubmit={handleSubmit} className="flex flex-col">
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

              {/* Submit */}
              <Button
                type="submit"
                className="mt-2 flex items-center justify-center gap-3 !bg-[#629955] !text-white font-bold !shadow-[6px_6px_12px_#4e7a44,-6px_-6px_12px_#76b866] active:!shadow-[inset_4px_4px_8px_#4e7a44,inset_-4px_-4px_8px_#76b866] transition-all duration-300 py-4 rounded-xl text-lg border-none"
                fullWidth
              >
                Send OTP
              </Button>

              {/* Back to login redirect */}
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
          </CardBody>
        </Card>
      </section>
    </div>
  );
}

import { Typography, Card, CardBody } from "../../lib/mt-components";
import {
  UserCircleIcon,
  EnvelopeIcon,
  MapPinIcon,
  BuildingOffice2Icon,
  PhoneIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

export function Profile() {
  const profileData = {
    name: "A.B. Perera",
    email: "ab.perera@example.com",
    phone: "+94 77 123 4567",
    premisesNo: "A-12345",
    homeTown: "Colombo",
    landmark: "Near Central Park",
    memberSince: "January 2025",
    zone: "Zone A",
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      {/* Profile Header */}
      <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none">
        <CardBody className="p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-[#e6e9ef] shadow-[8px_8px_16px_#c4c7cc,-8px_-8px_16px_#ffffff] flex items-center justify-center shrink-0">
              <UserCircleIcon className="w-16 h-16 text-gray-400" />
            </div>
            <div className="text-center sm:text-left">
              <Typography variant="h4" color="blue-gray" className="font-bold text-2xl mb-1">
                {profileData.name}
              </Typography>
              <Typography variant="small" color="gray" className="text-sm">
                Premises No: <span className="font-semibold text-gray-700">{profileData.premisesNo}</span>
              </Typography>
              <Typography variant="small" color="gray" className="text-xs mt-1">
                Member since {profileData.memberSince}
              </Typography>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Contact Information */}
      <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none">
        <CardBody className="p-6">
          <Typography variant="h6" color="blue-gray" className="font-bold mb-5">
            Contact Information
          </Typography>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 p-3 rounded-xl bg-[#f0f2f5] shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff]">
              <EnvelopeIcon className="h-5 w-5 text-gray-500 shrink-0" />
              <div>
                <Typography variant="small" color="gray" className="text-xs font-medium uppercase tracking-wider">
                  Email
                </Typography>
                <Typography variant="small" color="blue-gray" className="font-semibold text-sm">
                  {profileData.email}
                </Typography>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-xl bg-[#f0f2f5] shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff]">
              <PhoneIcon className="h-5 w-5 text-gray-500 shrink-0" />
              <div>
                <Typography variant="small" color="gray" className="text-xs font-medium uppercase tracking-wider">
                  Phone
                </Typography>
                <Typography variant="small" color="blue-gray" className="font-semibold text-sm">
                  {profileData.phone}
                </Typography>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Property Details */}
      <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none">
        <CardBody className="p-6">
          <Typography variant="h6" color="blue-gray" className="font-bold mb-5">
            Property Details
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-3 rounded-xl bg-[#f0f2f5] shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff]">
              <BuildingOffice2Icon className="h-5 w-5 text-gray-500 shrink-0" />
              <div>
                <Typography variant="small" color="gray" className="text-xs font-medium uppercase tracking-wider">
                  Premises No
                </Typography>
                <Typography variant="small" color="blue-gray" className="font-semibold text-sm">
                  {profileData.premisesNo}
                </Typography>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-xl bg-[#f0f2f5] shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff]">
              <MapPinIcon className="h-5 w-5 text-gray-500 shrink-0" />
              <div>
                <Typography variant="small" color="gray" className="text-xs font-medium uppercase tracking-wider">
                  Home Town
                </Typography>
                <Typography variant="small" color="blue-gray" className="font-semibold text-sm">
                  {profileData.homeTown}
                </Typography>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-xl bg-[#f0f2f5] shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff]">
              <MapPinIcon className="h-5 w-5 text-gray-500 shrink-0" />
              <div>
                <Typography variant="small" color="gray" className="text-xs font-medium uppercase tracking-wider">
                  Landmark
                </Typography>
                <Typography variant="small" color="blue-gray" className="font-semibold text-sm">
                  {profileData.landmark}
                </Typography>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-xl bg-[#f0f2f5] shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff]">
              <CalendarDaysIcon className="h-5 w-5 text-gray-500 shrink-0" />
              <div>
                <Typography variant="small" color="gray" className="text-xs font-medium uppercase tracking-wider">
                  Collection Zone
                </Typography>
                <Typography variant="small" color="blue-gray" className="font-semibold text-sm">
                  {profileData.zone}
                </Typography>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

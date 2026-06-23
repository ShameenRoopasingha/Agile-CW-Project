import { memo } from "react";
import { Typography, Card } from "../../../../lib/mt-components";

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  iconColorClass: string;
}

export const StatCard = memo(({ icon: Icon, title, value, iconColorClass }: StatCardProps) => {
  return (
    <Card className="flex-1 bg-[#e6e9ef] shadow-[8px_8px_16px_#c4c7cc,-8px_-8px_16px_#ffffff] border-none rounded-2xl p-5 sm:p-6 flex flex-row items-center gap-4">
       <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 bg-[#e6e9ef] shadow-[inset_4px_4px_8px_#c4c7cc,inset_-4px_-4px_8px_#ffffff]`}>
         <Icon className={`w-7 h-7 ${iconColorClass}`} />
       </div>
       <div>
         <Typography variant="small" color="blue-gray" className="font-bold text-sm text-gray-600 mb-1 leading-tight">
           {title}
         </Typography>
         <Typography variant="h4" color="blue-gray" className="font-bold text-2xl leading-none text-gray-900">
           {value}
         </Typography>
       </div>
    </Card>
  );
});
StatCard.displayName = "StatCard";

import React, { SVGProps } from "react";
import { AlertCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/ui/tooltip";

type TSVGElementProps = React.ReactElement<SVGProps<SVGSVGElement>>;

const AccountCard = ({
  title,
  icon,
  content,
  description,
  descriptionInfo,
}: {
  title: string;
  icon: TSVGElementProps;
  content: string;
  description?: string;
  descriptionInfo?: React.ReactNode;
}) => {
  return (
    <Card className="bg-background border-border mt-3 w-[300px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{content}</div>
        {description && (
          <div className="flex items-center justify-start">
            <p className="text-muted-foreground text-xs">{description}</p>
            {descriptionInfo && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertCircle className="ml-1" size={15} />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm border-none bg-transparent p-0">
                    {descriptionInfo}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AccountCard;

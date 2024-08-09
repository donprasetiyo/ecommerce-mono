import { Dispatch, SetStateAction } from "react";
import { AlertCircle } from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@repo/ui/components/ui/alert";
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/ui/components/ui/tooltip";

interface ToolTip {
  title: string;
  description: string | React.ReactNode;
  type: "warning" | "info" | "error";
}

interface DialogState {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const MutationDialog = ({
  title,
  description,
  formComponent,
  children,
  childrenTooltip,
  dialogState,
}: {
  title: string;
  description: string;
  formComponent: React.ReactNode;
  children: React.ReactNode;
  dialogState: DialogState;
  childrenTooltip?: ToolTip;
}) => {
  return (
    <Dialog open={dialogState.isOpen} onOpenChange={dialogState.setIsOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span tabIndex={0}>
            <DialogTrigger asChild>{children}</DialogTrigger>
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-[500px] bg-transparent">
          {childrenTooltip ? (
            <Alert variant="default" className="bg-popover border-border p-4">
              {childrenTooltip.type === "info" && (
                <AlertCircle className="h-4 w-4" size={70} />
              )}
              <AlertTitle>{childrenTooltip.title}</AlertTitle>
              <AlertDescription>{childrenTooltip.description}</AlertDescription>
            </Alert>
          ) : null}
        </TooltipContent>
      </Tooltip>
      <DialogContent className="border-border bg-popover max-h-[calc(100vh_-_100px)] gap-2 overflow-auto p-0">
        <>
          <CardHeader className="pb-3">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          {formComponent}
        </>
      </DialogContent>
    </Dialog>
  );
};

export default MutationDialog;

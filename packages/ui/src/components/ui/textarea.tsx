import * as React from "react"

import { cn } from "@repo/ui/lib/util"
import { autoResizeTextarea } from "@repo/ui/types/AutoResizeTextArea";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {

    const innerRef = React.useRef<HTMLTextAreaElement>(null);
    React.useImperativeHandle(ref, () => innerRef.current!, []);

    if (innerRef.current) {
      const length = innerRef.current.value.length;
      innerRef.current.setSelectionRange(length, length);
    }

    React.useEffect(() => {
      autoResizeTextarea(Array.from(document.querySelectorAll('textarea.auto-resize')), { maxHeight: 196 });
    }, [])

    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-[#ddd] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }

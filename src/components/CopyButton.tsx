import { useState } from "react";
import TurndownService from "turndown";

import { Copy, CopyCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text?: string;
  html?: string;
  htmlRef?: React.RefObject<HTMLElement | null>;
  className?: string;
}

export function CopyButton({
  text,
  html,
  htmlRef,
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      if (!text && !html && !htmlRef?.current) {
        console.error("No text, HTML, or HTML reference to copy");
        return;
      }

      const htmlContent = html || htmlRef?.current?.innerHTML || "";
      let textContent = text ?? "";
      if (textContent != "" && htmlContent) {
        const turndownService = new TurndownService();
        textContent = turndownService.turndown(htmlContent);
      }

      if (htmlContent) {
        const clipboardData = new ClipboardItem({
          "text/plain": new Blob([textContent], { type: "text/plain" }),
          "text/html": new Blob([htmlContent], { type: "text/html" }),
        });
        await navigator.clipboard.write([clipboardData]);
      } else {
        await navigator.clipboard.writeText(textContent);
      }

      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: textContent,
        variant: "default",
      });

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive",
      });
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(className, "h-9")}
      onClick={copyToClipboard}
    >
      {copied ? (
        <span className="hidden md:block">Copied!</span>
      ) : (
        <span className="hidden md:block">Copy to Clipboard</span>
      )}
      {copied ? (
        <CopyCheck className="h-4 w-4" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );
}

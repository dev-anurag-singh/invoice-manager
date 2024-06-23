"use client";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Moon, Sun } from "lucide-react";

export function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            variant="ghost"
            className="p-0 hover:bg-transparent"
          >
            <Moon className="hidden cursor-pointer fill-foreground-light stroke-inherit transition-colors hover:fill-white/70 dark:inline-block" />
            <Sun className="stroke-foreground-light transition-colors hover:stroke-white/70 dark:hidden" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">Toggle theme</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

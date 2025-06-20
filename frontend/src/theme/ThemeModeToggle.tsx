import { Moon, Sun } from "lucide-react";

import { useTheme } from "./ThemeProvider";
import { Button } from "../components/Button/button";

export default function ThemeModeToggle() {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      variant="outline"
      size="icon"
      className="h-full titlebar-button focus-visible:ring-0
        border-0  duration-500
        ease-in-out transition-all bg-amber-600"
      onClick={() => {
        setTheme({
          mode: theme.mode === "light" ? "dark" : "light",
          color: "violet",
        });
      }}
    >
      <Sun
        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-foreground
          dark:-rotate-90 dark:scale-0"
      />
      <Moon
        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0
          dark:scale-100 text-foreground"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

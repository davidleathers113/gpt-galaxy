
import { Footerdemo } from "@/components/ui/footer-section";
import { useTheme } from "@/hooks/use-theme";

function Footer() {
  const { isDarkMode, setIsDarkMode } = useTheme();
  
  return (
    <div className="block">
      <Footerdemo isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </div>
  );
}

export { Footer };

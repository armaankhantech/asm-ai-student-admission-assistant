// ASM CSIT reference recreation: shared official-style header and footer retain visual continuity across the two routes.
import type { ReactNode } from "react";
import { ChatbotLauncher } from "@/components/chatbot/ChatbotLauncher";
import { ChatbotPanel } from "@/components/chatbot/ChatbotPanel";
import { ChatbotProvider } from "@/components/chatbot/ChatbotProvider";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteShell({ children }: { children: ReactNode }) {
  return <ChatbotProvider><div className="min-h-screen bg-[#f5f2ec] text-[#10213b]"><Header /><main>{children}</main><Footer /><ChatbotPanel /><ChatbotLauncher /></div></ChatbotProvider>;
}



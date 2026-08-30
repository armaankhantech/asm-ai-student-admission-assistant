// ASM AI Signal Field: polished Markdown rendering for assistant responses.
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { ChatMessage as ChatMessageType } from "@/types/chat";
import { GroundingIndicator } from "./GroundingIndicator";

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const user = message.role === "user";
    if (!user && !message.content.trim()) {
    return null;
  }

  if (user) {
    return (
      <div className="asm-ai-message asm-ai-message--user flex min-w-0 justify-end">
        <div className="min-w-0 max-w-[83%] overflow-hidden rounded-[18px] rounded-br-[4px] bg-[#193b78] px-3.5 py-3 text-sm leading-5 text-white shadow-[0_5px_14px_rgba(25,59,120,.16)]">
          <p className="min-w-0 whitespace-pre-line break-words [overflow-wrap:anywhere]">
            {message.content}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="asm-ai-message asm-ai-message--assistant flex min-w-0 items-start gap-2.5">
      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full border border-[#cce2ef] bg-white p-0">
        <img
          src="/assets/asm-csit-chatbot-logo.png"
          alt="ASM CSIT"
          className="h-full w-full object-cover"
        />
      </span>

      <div className="min-w-0 max-w-[84%]">
        <p className="mb-1 ml-1 text-[9px] font-bold uppercase tracking-[.12em] text-[#5c83ae]">
          ASM AI
        </p>

        <div className="min-w-0 max-w-full overflow-hidden rounded-[18px] rounded-tl-[4px] border border-[#dce7f0] bg-white px-3.5 py-3 text-sm leading-5 text-[#3d4f69] shadow-[0_3px_9px_rgba(20,61,113,.05)]">
          <div
            className="
              min-w-0 max-w-full break-words
              [overflow-wrap:anywhere]

              [&>p]:mb-2.5
              [&>p:last-child]:mb-0

              [&>h1]:mb-2
              [&>h1]:mt-1
              [&>h1]:text-base
              [&>h1]:font-bold
              [&>h1]:text-[#193b78]

              [&>h2]:mb-2
              [&>h2]:mt-3
              [&>h2]:text-[15px]
              [&>h2]:font-bold
              [&>h2]:text-[#193b78]

              [&>h3]:mb-1.5
              [&>h3]:mt-2.5
              [&>h3]:text-sm
              [&>h3]:font-bold
              [&>h3]:text-[#193b78]

              [&>ul]:mb-2.5
              [&>ul]:ml-4
              [&>ul]:list-disc
              [&>ul>li]:mb-1

              [&>ol]:mb-2.5
              [&>ol]:ml-4
              [&>ol]:list-decimal
              [&>ol>li]:mb-1

              [&_strong]:font-semibold
              [&_em]:italic

              [&_a]:break-all
              [&_a]:font-medium
              [&_a]:text-[#193b78]
              [&_a]:underline

              [&>blockquote]:my-2
              [&>blockquote]:border-l-2
              [&>blockquote]:border-[#cce2ef]
              [&>blockquote]:pl-3
              [&>blockquote]:italic

              [&>pre]:my-2
              [&>pre]:max-w-full
              [&>pre]:overflow-x-auto
              [&>pre]:rounded-lg
              [&>pre]:bg-[#f4f7fa]
              [&>pre]:p-2.5
              [&>pre]:text-xs

              [&_code]:break-words
              [&_code]:[overflow-wrap:anywhere]

              [&>table]:my-2
              [&>table]:block
              [&>table]:max-w-full
              [&>table]:overflow-x-auto
              [&>table]:text-xs
              [&_th]:border
              [&_th]:border-[#dce7f0]
              [&_th]:bg-[#f4f7fa]
              [&_th]:px-2
              [&_th]:py-1.5
              [&_th]:font-semibold
              [&_td]:border
              [&_td]:border-[#dce7f0]
              [&_td]:px-2
              [&_td]:py-1.5
            "
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        </div>

        <GroundingIndicator grounding={Boolean(message.grounding)} />
      </div>
    </div>
  );
}
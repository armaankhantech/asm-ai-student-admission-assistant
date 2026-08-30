// ASM CSIT reference recreation: a minimal event bridge keeps the site UI decoupled from the assistant implementation.
export function requestAsmAiOpen(prompt?: string) {
  window.dispatchEvent(new CustomEvent("asm-ai:open", { detail: { prompt } }));
}



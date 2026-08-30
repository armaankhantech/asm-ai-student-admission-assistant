const { spawn } = require("node:child_process");

const commands = [
  {
    name: "BACKEND",
    command: "pnpm",
    args: ["--dir", "backend", "start"],
  },
  {
    name: "FRONTEND",
    command: "pnpm",
    args: ["--dir", "ASM frontend", "dev"],
  },
];

const children = commands.map(({ name, command, args }) => {
  const child = spawn(
    process.platform === "win32" ? "cmd.exe" : command,
    process.platform === "win32" ? ["/d", "/s", "/c", command, ...args] : args,
    {
      stdio: "inherit",
      windowsHide: false,
    }
  );

  child.on("error", (error) => {
    console.error(`[${name}] failed to start:`, error);
  });

  return child;
});

let shuttingDown = false;

function shutdown(code = 0) {
  if (shuttingDown) return;
  shuttingDown = true;

  for (const child of children) {
    if (!child.killed) {
      child.kill();
    }
  }

  process.exit(code);
}

for (const child of children) {
  child.on("exit", (code) => {
    if (!shuttingDown && code !== 0) {
      shutdown(code ?? 1);
    }
  });
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

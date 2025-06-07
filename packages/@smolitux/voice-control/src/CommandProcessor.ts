export class CommandProcessor {
  processCommand(
    text: string,
    registeredComponents: Map<string, string[]>
  ): { command: string; targetId: string } | { command: null; targetId: null } {
    const normalized = text.toLowerCase().trim();
    for (const [componentId, commands] of registeredComponents.entries()) {
      for (const command of commands) {
        if (normalized.includes(command.toLowerCase())) {
          return { command, targetId: componentId };
        }
      }
    }
    return { command: null, targetId: null };
  }
}

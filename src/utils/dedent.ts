export const dedent = (str: string) => {
  const lines = str.split('\n');

  const minIndent = Math.min(
    ...lines
      .filter((line) => line.trim())
      .map((line) => line.match(/^(\s*)/)![1].length)
  );

  return lines
    .map((line) => {
      const content = line.slice(minIndent);
      const leadingSpaces = content.match(/^(\s*)/)?.[1].length ?? 0;

      return ' '.repeat((leadingSpaces / 2) * 4) + content.trimStart();
    })
    .join('\n')
    .trim();
};

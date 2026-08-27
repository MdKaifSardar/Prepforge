export function formatMarkdownToHtml(text: string): string {
  if (!text) return '';
  let src = text;

  // Format Code/Diagram Blocks (``` ... ```)
  src = src.replace(/```(ascii|mermaid|text)?\n([\s\S]*?)```/g, (match, lang, content) => {
    return `<div class="my-4 overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 font-mono text-xs leading-relaxed text-indigo-300 shadow-inner dark:border-zinc-800 dark:bg-zinc-950"><pre class="whitespace-pre">${content.trim()}</pre></div>`;
  });

  // Format Example Blocks
  src = src.replace(/Example:\s*([\s\S]*?)(?=\n\n|$)/g, (match, exBody) => {
    const formattedLines = exBody.trim().split('\n').map((line: string) => {
      if (line.startsWith('Input:')) return `<div class="my-1"><strong class="text-indigo-400 font-semibold">Input:</strong> ${line.replace('Input:', '').trim()}</div>`;
      if (line.startsWith('Output:')) return `<div class="my-1"><strong class="text-emerald-400 font-semibold">Output:</strong> ${line.replace('Output:', '').trim()}</div>`;
      if (line.startsWith('Explanation:')) return `<div class="mt-2 text-zinc-400"><strong class="text-zinc-300 font-semibold">Explanation:</strong> ${line.replace('Explanation:', '').trim()}</div>`;
      return `<div>${line}</div>`;
    }).join('');
    return `<div class="my-4 overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 font-mono text-xs leading-relaxed text-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/60">${formattedLines}</div>`;
  });

  // Format Block Math ($$ ... $$)
  src = src.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
    const cleanFormula = formula
      .replace(/\\implies/g, ' ⟹ ')
      .replace(/\\times/g, ' × ')
      .replace(/\\le/g, ' ≤ ')
      .replace(/\\ge/g, ' ≥ ')
      .replace(/\\log/g, 'log')
      .replace(/\\min/g, 'min')
      .replace(/\\max/g, 'max')
      .replace(/\\text\{([^}]+)\}/g, '$1')
      .trim();
    return `<div class="my-3 overflow-x-auto rounded-xl border border-indigo-800/40 bg-indigo-950/40 p-3 text-center font-mono text-xs text-indigo-300 font-semibold">${cleanFormula}</div>`;
  });

  // Format Inline Math ($ ... $)
  src = src.replace(/\$([^$\n]+)\$/g, (match, mathStr) => {
    const cleanMath = mathStr
      .replace(/\\log/g, 'log')
      .replace(/\\le/g, ' ≤ ')
      .replace(/\\ge/g, ' ≥ ')
      .replace(/\\times/g, ' × ')
      .replace(/\\implies/g, ' ⟹ ')
      .replace(/\\text\{([^}]+)\}/g, '$1')
      .trim();
    return `<code class="rounded-md bg-indigo-950/40 px-1.5 py-0.5 font-mono text-xs text-indigo-300 border border-indigo-800/40 dark:bg-indigo-950/60">${cleanMath}</code>`;
  });

  // Headings
  src = src.replace(/^### (.*$)/gim, '<h3 class="mt-5 mb-2 font-bold text-zinc-900 dark:text-zinc-100 text-sm flex items-center gap-1.5">$1</h3>');
  src = src.replace(/^## (.*$)/gim, '<h2 class="mt-6 mb-3 font-extrabold text-zinc-900 dark:text-white text-base">$1</h2>');

  // Bold
  src = src.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-zinc-900 dark:text-zinc-100">$1</strong>');

  // Inline Code
  src = src.replace(/`([^`]+)`/g, '<code class="rounded-md bg-indigo-950/40 px-1.5 py-0.5 font-mono text-xs text-indigo-300 border border-indigo-800/40 dark:bg-indigo-950/60">$1</code>');

  // Bullet Lists
  const lines = src.split('\n');
  let inList = false;
  let result: string[] = [];

  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (!inList) {
        result.push('<ul class="my-2.5 list-disc space-y-1.5 pl-5 text-zinc-700 dark:text-zinc-300 text-xs leading-relaxed">');
        inList = true;
      }
      result.push(`<li>${trimmed.substring(2)}</li>`);
    } else {
      if (inList) {
        result.push('</ul>');
        inList = false;
      }
      if (trimmed.length > 0 && !trimmed.startsWith('<h') && !trimmed.startsWith('<div')) {
        result.push(`<p class="my-2 leading-relaxed text-zinc-700 dark:text-zinc-300 text-xs">${line}</p>`);
      } else {
        result.push(line);
      }
    }
  });

  if (inList) result.push('</ul>');
  return result.join('\n');
}

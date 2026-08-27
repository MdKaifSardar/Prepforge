'use client';

import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { Highlight, themes } from 'prism-react-renderer';

interface CodeBoxProps {
  code: string;
  filename?: string;
  language?: string;
}

export function CodeBox({ code, filename = 'solution.cpp', language = 'cpp' }: CodeBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const normLanguage = language.toLowerCase() === 'c++' ? 'cpp' : language.toLowerCase();

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-950 font-mono text-xs text-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/80 px-4 py-2 select-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex items-center gap-1.5 rounded-md bg-zinc-800/60 px-2 py-0.5 text-[11px] font-semibold text-zinc-300">
            <Terminal className="h-3 w-3 text-indigo-400" />
            <span>{filename}</span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-800/80 px-2.5 py-1 text-[11px] font-semibold text-zinc-300 transition-all hover:bg-zinc-700 hover:text-white"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-zinc-400" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body with Prism Syntax Highlighting */}
      <Highlight theme={themes.vsDark} code={code.trim()} language={normLanguage}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <div className="overflow-x-auto p-4 leading-relaxed">
            {tokens.map((line, idx) => {
              const lineProps = getLineProps({ line });
              return (
                <div key={idx} {...lineProps} className="table-row">
                  <span className="table-cell select-none pr-4 text-right text-zinc-600 dark:text-zinc-600">
                    {idx + 1}
                  </span>
                  <span className="table-cell whitespace-pre">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </Highlight>
    </div>
  );
}


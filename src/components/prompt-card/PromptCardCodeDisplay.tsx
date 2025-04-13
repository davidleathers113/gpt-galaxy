 import React from 'react';

interface PromptCardCodeDisplayProps {
  code: string;
}

const PromptCardCodeDisplay: React.FC<PromptCardCodeDisplayProps> = ({ code }) => {
  return (
    <div className="prompt-code-container group/code-container">
      {/* Background and border */}
      <div
        className="prompt-code relative rounded-lg bg-muted group/code"
      >
        {/* Code content area */}
        <div className="relative px-3 py-2">
          {/* Code block */}
          <pre
            className="text-xs sm:text-sm overflow-hidden text-ellipsis line-clamp-[8] pt-1"
            title={code} /* Add title attribute for full code on hover */
          >
            <code className="block whitespace-pre font-mono text-foreground/90">
              {code || "No code provided."} {/* Handle empty code */}
            </code>
          </pre>
        </div>
      </div>

    </div>
  );
};

export default PromptCardCodeDisplay;

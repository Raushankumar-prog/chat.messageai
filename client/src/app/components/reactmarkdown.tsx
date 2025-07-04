import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/tomorrow-night-bright.css";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import React, { HTMLAttributes, ReactNode } from 'react';
import type { Components } from 'react-markdown';

type CodeProps = HTMLAttributes<HTMLElement> & {
  inline?: boolean;
  className?: string;
  children?: ReactNode;
};

const Code = ({ inline, className, children, ...props }: CodeProps) => {
  const language = className?.replace("language-", "") ?? "code";
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    const text = React.Children.toArray(children)
      .map(child => {
        if (typeof child === 'string') return child;
        if (React.isValidElement(child) && typeof (child.props as { children?: unknown }).children === 'string') {
          return (child.props as { children: string }).children;
        }
        return '';
      })
      .join('');
    
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  if (inline) {
    return (
      <code className="bg-gray-800 text-green-400 px-1 rounded text-sm font-mono" {...props}>
        {children}
      </code>
    );
  }

  const isMultiline = String(children).includes("\n");
  if (isMultiline) {
    return (
     <div className="relative group my-4 w-full max-w-[66vw]">
  <div className="absolute top-2 right-6 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    <span className="text-xs text-gray-400 uppercase">{language}</span>
    <button
      onClick={copyToClipboard}
      className="text-gray-400 hover:text-gray-200 transition-colors"
      aria-label={isCopied ? "Copied!" : "Copy to clipboard"}
    >
      {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </button>
  </div>
  <pre className="overflow-x-auto p-4 rounded-lg bg-gray-950 border border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
    <code 
      className={`${className} block whitespace-pre min-w-fit`} 
      {...props}
    >
      {children}
    </code>
  </pre>
</div>
    );
  }

  return (
    <code className="bg-gray-800 text-green-400 px-1 rounded text-sm font-mono" {...props}>
      {children}
    </code>
  );
};

const components: Components = {
  h1: (props) => <h1 className="text-2xl font-extrabold mt-5 mb-3" {...props} />,
  h2: (props) => <h2 className="text-xl font-bold mt-4 mb-2" {...props} />,
  h3: (props) => <h3 className="text-lg font-semibold mt-3 mb-2" {...props} />,
  p: (props) => <p className="mb-2" {...props} />,
  strong: (props) => <strong className="font-bold" {...props} />,
  em: (props) => <em className="italic" {...props} />,
  a: (props) => (
    <a
      className="text-blue-600 underline hover:text-blue-800"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote className="border-l-4 border-gray-500 pl-4 italic text-gray-400" {...props} />
  ),
  hr: (props) => <hr className="border-t-2 border-gray-300 my-4" {...props} />,
  ul: (props) => <ul className="list-outside ml-4 space-y-1" {...props} />,
  ol: (props) => <ol className="list-outside ml-4 space-y-1" {...props} />,
  li: (props) => <li className="ml-5 list-disc" {...props} />,
  code: Code,
  html: (props) => {
    const { children, ...rest } = props;
    return (
      <div 
        {...rest as HTMLAttributes<HTMLDivElement>}
        className="html-content-wrapper"
      >
        {children}
      </div>
    );
  },
};

interface UsingReactMarkdownProps {
  markdown: string;
}

function UsingReactMarkdown({ markdown }: UsingReactMarkdownProps) {
  return (
    <ReactMarkdown
      components={components}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
    >
      {markdown}
    </ReactMarkdown>
  );
}

export default UsingReactMarkdown;
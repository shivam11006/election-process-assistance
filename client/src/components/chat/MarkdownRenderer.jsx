import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * Memoized Markdown Renderer to prevent unnecessary re-renders
 * during chat streaming or typing.
 */
const MarkdownRenderer = memo(({ content }) => {
  return (
    <div className="prose prose-invert prose-sm max-w-none leading-relaxed">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
});

MarkdownRenderer.displayName = 'MarkdownRenderer';

export default MarkdownRenderer;

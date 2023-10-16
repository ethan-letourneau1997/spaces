'use client';

type RenderHTMLProps = {
  content: string;
  className?: string;
};

export function RenderHTML({ content, className }: RenderHTMLProps) {
  return (
    <div
      className={`!prose dark:!prose-invert ${className}`}
      dangerouslySetInnerHTML={{ __html: content || '' }}
    />
  );
}

'use client';

type RenderHTMLProps = {
  content: string;
};

export function RenderHTML({ content }: RenderHTMLProps) {
  return (
    <div
      className="!prose dark:!prose-invert "
      dangerouslySetInnerHTML={{ __html: content || '' }}
    />
  );
}

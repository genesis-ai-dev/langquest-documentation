export function Screenshot({
  src,
  alt = '',
  maxWidth = 300,
}: {
  src: string;
  alt?: string;
  maxWidth?: number;
}) {
  return (
    <img
      src={src}
      alt={alt}
      style={{ maxWidth: `${maxWidth}px`, width: '100%', height: 'auto', borderRadius: '12px' }}
    />
  );
}

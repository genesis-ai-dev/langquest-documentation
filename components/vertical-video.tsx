export function VerticalVideo({ src }: { src: string }) {
  return (
    <div className="vertical-video-container">
      <div className="vertical-video-wrapper">
        <iframe
          src={src}
          frameBorder="0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  );
}

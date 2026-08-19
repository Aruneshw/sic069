export default function MarketingLoading() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center" style={{ background: "var(--bg-primary)" }}>
      <div className="text-center">
        <h2
          className="text-2xl font-bold tracking-tight mb-4"
          style={{
            fontFamily: "var(--font-playfair), Playfair Display, serif",
            color: "var(--text-primary)",
          }}
        >
          Zero Gravity
        </h2>
        <div
          className="w-8 h-8 mx-auto rounded-full border-2 animate-spin"
          style={{
            borderColor: "var(--border-subtle)",
            borderTopColor: "var(--gold-500)",
          }}
        />
        <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>
          Preparing your journey...
        </p>
      </div>
    </div>
  );
}

export function GridBg({ variant = 'default' }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className={`absolute inset-0 ${variant === 'small' ? 'bg-grid-sm' : 'bg-grid'} mask-radial opacity-[0.5]`} />
      <div
        className="absolute -top-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-[0.45] blur-3xl"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 50%, hsl(var(--glow-cyan) / 0.18), transparent 60%)',
        }}
      />
      <div
        className="absolute -bottom-40 left-1/3 h-[300px] w-[700px] -translate-x-1/2 rounded-full opacity-[0.35] blur-3xl"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 50%, hsl(var(--glow-purple) / 0.18), transparent 60%)',
        }}
      />
    </div>
  );
}

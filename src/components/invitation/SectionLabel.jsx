export default function SectionLabel({ children, className = "" }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="h-px w-8 bg-accent" />
      <span className="text-[0.62rem] uppercase tracking-[0.38em] text-muted-foreground">
        {children}
      </span>
    </div>
  );
}
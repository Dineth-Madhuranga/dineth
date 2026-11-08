export function SectionHeading({
  number,
  label,
  children,
}: {
  number: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">
        <span className="section-number">{number}</span>
        {label}
      </p>
      <h2>{children}</h2>
    </div>
  );
}

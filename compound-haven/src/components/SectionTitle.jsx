export default function SectionTitle({
  eyebrow,
  title,
  description,
  center = false,
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#a48664]">
        {eyebrow}
      </p>

      <h2 className="serif text-4xl leading-tight text-[#44372c] md:text-5xl">
        {title}
      </h2>

      {description && (
        <p
          className={`mt-4 max-w-2xl text-sm leading-7 text-[#7c7167] ${
            center ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
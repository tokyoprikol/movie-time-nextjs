export default function DataField({
  title,
  data,
}: {
  title: string;
  data: string | number | boolean | undefined;
}) {
  return (
    <div>
      <h1 className="text-sm font-semibold sm:text-lg">{title}</h1>
      <span className="text-sm text-neutral-400 italic sm:text-base">
        {data}
      </span>
    </div>
  );
}

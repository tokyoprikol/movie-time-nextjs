export default function DataField({
  title,
  data,
}: {
  title: string;
  data: string | number | undefined;
}) {
  return (
    <div>
      <h1 className="text-lg font-semibold">{title}</h1>
      <span className="text-neutral-300 italic">{data}</span>
    </div>
  );
}

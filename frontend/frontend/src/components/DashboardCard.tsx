interface Props {
  title: string;
  value: string | number;
}

export default function DashboardCard({
  title,
  value,
}: Props) {
  return (
    <div className="rounded-xl bg-slate-800 p-6 shadow">
      <h3 className="text-sm text-gray-400">
        {title}
      </h3>

      <p className="mt-3 text-4xl font-bold text-white">
        {value}
      </p>
    </div>
  );
}
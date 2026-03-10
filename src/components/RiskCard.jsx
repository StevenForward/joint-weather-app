const colorMap = {
  green: {
    bg: "bg-green-50",
    border: "border-green-400",
    badge: "bg-green-100 text-green-800",
    dot: "bg-green-500",
  },
  yellow: {
    bg: "bg-yellow-50",
    border: "border-yellow-400",
    badge: "bg-yellow-100 text-yellow-800",
    dot: "bg-yellow-500",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-400",
    badge: "bg-red-100 text-red-800",
    dot: "bg-red-500",
  },
};

export default function RiskCard({ risk }) {
  const colors = colorMap[risk.color];

  return (
    <div className={`rounded-2xl border-2 p-6 ${colors.bg} ${colors.border} shadow-sm`}>
      <div className="flex items-center gap-3 mb-4">
        <span className={`w-3 h-3 rounded-full ${colors.dot}`} />
        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${colors.badge}`}>
          {risk.label}
        </span>
      </div>
      <p className="text-gray-700 text-base mb-4">{risk.message}</p>
      <div className="border-t pt-4 mt-2">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
          What to do
        </p>
        <p className="text-gray-700 text-sm">{risk.advice}</p>
      </div>
    </div>
  );
}
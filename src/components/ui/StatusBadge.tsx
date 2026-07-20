interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase();
  
  let baseClass = "px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider inline-flex items-center justify-center";
  let colorClass = "";

  switch (normalizedStatus) {
    case "confirmed":
    case "published":
      colorClass = "bg-success-light text-success";
      break;
    case "pending":
    case "filling fast":
      colorClass = "bg-warning-light text-warning";
      break;
    case "waitlisted":
    case "open":
      colorClass = "bg-info-light text-info";
      break;
    case "almost full":
      colorClass = "bg-danger-light text-danger";
      break;
    case "draft":
    case "archived":
    default:
      colorClass = "bg-slate-100 text-slate-600";
      break;
  }

  // Handle custom defined colors from globals.css for specific statuses
  if (normalizedStatus === "published") {
    colorClass = "badge-published";
  } else if (normalizedStatus === "draft") {
    colorClass = "badge-draft";
  } else if (normalizedStatus === "pending") {
    colorClass = "badge-pending";
  } else if (normalizedStatus === "confirmed") {
    colorClass = "badge-confirmed";
  } else if (normalizedStatus === "waitlisted") {
    colorClass = "badge-waitlisted";
  }

  return (
    <span className={`${baseClass} ${colorClass}`}>
      {status}
    </span>
  );
}

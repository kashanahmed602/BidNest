import {
  CheckCircle,
  Package,
  Gavel,
  Trophy,
} from "lucide-react";

const activities = [
  {
    icon: <Package size={18} />,
    title: "Product Submitted",
    desc: "Your MacBook Pro has been submitted for approval.",
    time: "5 mins ago",
  },
  {
    icon: <CheckCircle size={18} />,
    title: "Product Approved",
    desc: "iPhone 15 Pro has been approved.",
    time: "30 mins ago",
  },
  {
    icon: <Gavel size={18} />,
    title: "Bid Placed",
    desc: "You placed a bid on PlayStation 5.",
    time: "1 hour ago",
  },
  {
    icon: <Trophy size={18} />,
    title: "Auction Won",
    desc: "Congratulations! You won Canon EOS R6.",
    time: "Yesterday",
  },
];

const RecentActivity = () => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

      <h2 className="text-2xl font-bold text-white mb-6">
        Recent Activity
      </h2>

      <div className="space-y-5">

        {activities.map((activity, index) => (

          <div
            key={index}
            className="flex items-start gap-4 border-b border-slate-800 pb-4 last:border-none"
          >

            <div className="bg-amber-500/20 p-3 rounded-full text-amber-500">
              {activity.icon}
            </div>

            <div className="flex-1">

              <h3 className="text-white font-semibold">
                {activity.title}
              </h3>

              <p className="text-slate-400 text-sm mt-1">
                {activity.desc}
              </p>

            </div>

            <span className="text-xs text-slate-500">
              {activity.time}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
};

export default RecentActivity;
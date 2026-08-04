import {
  Users,
  Package,
  CheckCircle,
  XCircle,
} from "lucide-react";

const cards = [
  {
    title: "Pending Users",
    value: 12,
    icon: <Users size={32} className="text-yellow-400" />,
  },
  {
    title: "Pending Products",
    value: 25,
    icon: <Package size={32} className="text-orange-400" />,
  },
  {
    title: "Approved Products",
    value: 180,
    icon: <CheckCircle size={32} className="text-green-400" />,
  },
  {
    title: "Rejected Products",
    value: 8,
    icon: <XCircle size={32} className="text-red-400" />,
  },

  
];

const DashboardCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-slate-900 border border-slate-700 rounded-xl p-6 hover:border-amber-500 hover:scale-105 transition-all duration-300"
        >
          <div className="flex justify-between items-center">

            <div>
              <p className="text-slate-400 text-sm">
                {card.title}
              </p>

              <h2 className="text-4xl font-bold text-white mt-2">
                {card.value}
              </h2>
            </div>

            <div className="bg-slate-800 p-3 rounded-lg">
              {card.icon}
            </div>

          </div>
        </div>
      ))}

    </div>
  );
};

export default DashboardCards;
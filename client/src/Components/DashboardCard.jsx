import {
  Package,
  Gavel,
  Trophy,
  Heart,
} from "lucide-react";


const DashboardCards = ({products, auctions, winner, wishlist}) => {

  const cards = [
  {
    title: "My Products",
    value: products?.length,
    icon: <Package size={28} />,
    color: "text-blue-400",
  },
  {
    title: "Active Bids",
    value: auctions?.length,
    icon: <Gavel size={28} />,
    color: "text-amber-400",
  },
  {
    title: "Won Auctions",
    value: winner?.length,
    icon: <Trophy size={28} />,
    color: "text-green-400",
  },
  {
    title: "Wishlist",
    value: wishlist?.length,
    icon: <Heart size={28} />,
    color: "text-red-400",
  },
];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card, index) => (

        <div
          key={index}
          className="bg-slate-900 border border-slate-700 rounded-xl p-6 hover:border-amber-500 transition"
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-400">
                {card.title}
              </p>

              <h2 className="text-4xl font-bold text-white mt-3">
                {card.value}
              </h2>

            </div>

            <div className={card.color}>
              {card.icon}
            </div>

          </div>

        </div>

      ))}

    </div>
  );
};

export default DashboardCards;
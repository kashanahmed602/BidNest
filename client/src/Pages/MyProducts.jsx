import { useState } from "react";
import SidebarLayout from "../Layout/SidebarLayout";
import SellProductModal from "./SellProducts";

const MyProducts = () => {

    const [showModal, setShowModal] = useState(false);

    return (

        <SidebarLayout>

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-4xl font-bold text-white">
                    My Products
                </h1>

                <button
                    onClick={() => setShowModal(true)}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-lg font-semibold"
                >
                    + Add Product
                </button>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">

                    <img
                        src="https://placehold.co/400x250"
                        alt=""
                        className="w-full h-52 object-cover"
                    />

                    <div className="p-5">

                        <h2 className="text-xl text-white font-semibold">
                            iPhone 15 Pro
                        </h2>

                        <p className="text-slate-400 mt-2">
                            Starting Price
                        </p>

                        <h3 className="text-amber-400 text-xl font-bold">
                            $1200
                        </h3>

                        <span className="inline-block mt-4 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                            Pending Approval
                        </span>

                    </div>

                </div>

            </div>

            {showModal && (
                <SellProductModal closeModal={() => setShowModal(false)} />
            )}

        </SidebarLayout>

    );
};

export default MyProducts;
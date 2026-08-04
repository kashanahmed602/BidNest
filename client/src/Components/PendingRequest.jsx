import { Link } from "react-router-dom";

const PendingRequest = () => {
    return (
        <div className="min-h-screen bg-slate-950 flex justify-center items-center">

            <div className="bg-slate-900 border border-slate-700 rounded-xl p-10 text-center max-w-lg">

                <h1 className="text-4xl font-bold text-amber-400">
                    Request Pending
                </h1>

                <p className="text-slate-300 mt-5">
                    Your account has been created successfully.
                </p>

                <p className="text-slate-400 mt-2">
                    Please wait until the administrator approves your account.
                </p>

            </div>

        </div>
    );
};

export default PendingRequest;
import { Link } from "react-router-dom";

const AccountRejected = () => {
    return (
        <div className="min-h-screen bg-slate-950 flex justify-center items-center">

            <div className="bg-slate-900 border border-red-700 rounded-xl p-10 text-center max-w-lg">

                <h1 className="text-4xl font-bold text-red-500">
                    Account Rejected
                </h1>

                <p className="text-slate-300 mt-5">
                    Unfortunately your account request has been rejected.
                </p>

                <p className="text-slate-400 mt-2 mb-8">
                    You can create a new account using different information.
                </p>

                <Link
                    to="/signup"
                    className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg"
                >
                    Create New Account
                </Link>

            </div>

        </div>
    );
};

export default AccountRejected;
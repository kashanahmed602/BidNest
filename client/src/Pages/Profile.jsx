import SidebarLayout from "../Layout/SidebarLayout";

const Profile = () => {
  return (
    <SidebarLayout>

      <h1 className="text-4xl font-bold text-white mb-8">
        My Profile
      </h1>

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 max-w-3xl">

        <div className="flex items-center gap-6 mb-8">

          <img
            src="https://i.pravatar.cc/150"
            alt=""
            className="w-28 h-28 rounded-full border-4 border-amber-500"
          />

          <div>

            <h2 className="text-3xl font-bold text-white">
              Ali Khan
            </h2>

            <p className="text-slate-400 mt-2">
              ali@gmail.com
            </p>

            <button className="mt-4 bg-amber-500 hover:bg-amber-600 px-5 py-2 rounded-lg text-white">
              Change Picture
            </button>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <input
            type="text"
            placeholder="Full Name"
            className="bg-slate-800 p-3 rounded-lg text-white outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            className="bg-slate-800 p-3 rounded-lg text-white outline-none"
          />

          <input
            type="text"
            placeholder="Phone"
            className="bg-slate-800 p-3 rounded-lg text-white outline-none"
          />

          <input
            type="text"
            placeholder="Country"
            className="bg-slate-800 p-3 rounded-lg text-white outline-none"
          />

        </div>

        <button className="mt-8 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-white font-semibold">
          Save Changes
        </button>

      </div>

    </SidebarLayout>
  );
};

export default Profile;
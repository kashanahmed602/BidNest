import {
  LayoutDashboard,
  Store,
  Gavel,
  Package,
  Wallet,
  Trophy,
  Heart,
  Settings,
  LogOut,
  ListOrderedIcon,
  Pencil,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Sidebar = () => {

  const[user, setUser] = useState(null)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showEditModal, setShowEditModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  // ==========================================
  // GET USER
  // ==========================================

  const updateProfile = async () => {
    try{
      const update = await axios.put(`${import.meta.env.VITE_API_URL}/profileUpdate`, {
        name,
        email,
        phone
      },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
      );

      alert("User Updated Successfully");
      window.location.reload();
    }catch(error){
        alert(error.message);
    }
  }

  const updatePassword = async () => {
    if(password !== confirmPassword){
      alert("Password Not Match");
    }

    try{
      const update = await axios.put(`${import.meta.env.VITE_API_URL}/updatePassword`, {
        oldPassword,
        newPassword: password
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    )

    setOldPassword("");
    setPassword("");
    setConfirmPassword("");

    setShowChangePasswordModal(false);
    setShowEditModal(false);
    

    }catch(error){

    }
  }

  useEffect(() => {

    const getUser = async () => {

      try {

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/profile`,
          {
            headers: {
              Authorization:
                `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setUser(response.data.user);

      } catch (error) {

        console.log(
          "Error Getting User:",
          error
        );

      }

    };

    getUser();

  }, []);


  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";

  };


  return (

    <div className="
      w-72
      bg-slate-900
      border-r
      border-slate-800
      min-h-screen
      relative
      flex
      flex-col
    ">

      {/* ========================================== */}
      {/* LOGO */}
      {/* ========================================== */}

      <div className="
        p-6
        border-b
        border-slate-800
      ">

        <h1 className="
          text-3xl
          font-bold
          text-amber-500
        ">
          BidNest
        </h1>

      </div>


      {/* ========================================== */}
      {/* MENU */}
      {/* ========================================== */}

      <div className="
        mt-4
        flex
        flex-col
        pb-24
      ">

        <NavLink
          to="/dashboard"
          className="sidebar-link"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>


        <NavLink
          to="/marketplace"
          className="sidebar-link"
        >
          <Store size={20} />
          Marketplace
        </NavLink>


        <NavLink
          to="/auctions"
          className="sidebar-link"
        >
          <Gavel size={20} />
          Live Auctions
        </NavLink>


        <NavLink
          to="/my-products"
          className="sidebar-link"
        >
          <Package size={20} />
          My Products
        </NavLink>


        <NavLink
          to="/my-bids"
          className="sidebar-link"
        >
          <Wallet size={20} />
          My Bids
        </NavLink>


        <NavLink
          to="/won-auctions"
          className="sidebar-link"
        >
          <Trophy size={20} />
          Won Auctions
        </NavLink>


        <NavLink
          to="/client-orders"
          className="sidebar-link"
        >
          <ListOrderedIcon size={20} />
          Orders
        </NavLink>


        <NavLink
          to="/my-orders"
          className="sidebar-link"
        >
          <ListOrderedIcon size={20} />
          My Orders
        </NavLink>


        <NavLink
          to="/wishlist"
          className="sidebar-link"
        >
          <Heart size={20} />
          Wishlist
        </NavLink>


        <NavLink
          to="/settings"
          className="sidebar-link"
        >
          <Settings size={20} />
          Setting
        </NavLink>

        

      </div>
{/* ========================================== */}
      {/* PROFILE */}
      {/* ========================================== */}

      <div className="px-4 mt-4">

        <div className="
          bg-slate-800
          border
          border-slate-700
          rounded-xl
          p-3
        ">

          <div className="
            flex
            items-center
            gap-3
          ">

            {/* Avatar */}

            <div className="
              w-11
              h-11
              rounded-lg
              bg-amber-500
              flex
              items-center
              justify-center
              text-slate-950
              font-bold
              text-lg
              flex-shrink-0
            ">

              {user?.name
                ? user.name.charAt(0).toUpperCase()
                : "U"
              }

            </div>


            {/* User Info */}

            <div className="
              min-w-0
              flex-1
            ">

              <p className="
                text-white
                font-semibold
                truncate
              ">
                {user?.name || "Loading..."}
              </p>

              <p className="
                text-slate-400
                text-xs
                truncate
                mt-0.5
              ">
                {user?.email || ""}
              </p>

            </div>


            {/* Edit */}

            <button
              type="button"
              onClick={() => {
                setName(user?.name || "");
                setEmail(user?.email || "");
                setPhone(user?.phone || "");
                setShowEditModal(true)}}
              className="
                w-8
                h-8
                flex
                items-center
                justify-center
                rounded-lg
                text-slate-400
                hover:text-amber-400
                hover:bg-slate-700
                transition
                flex-shrink-0
              "
            >

              <Pencil size={16} />

            </button>

          </div>

        </div>

      </div>

      {/* ========================================== */}
      {/* LOGOUT */}
      {/* ========================================== */}

      <div className="
        absolute
        bottom-6
        w-72
        px-4
      ">

        <button
          onClick={logout}
          className="
            flex
            items-center
            gap-3
            w-full
            bg-red-600
            hover:bg-red-700
            py-3
            rounded-lg
            text-white
            justify-center
            transition
          "
        >

          <LogOut size={20} />

          Logout

        </button>

      </div>


      {/* ========================================== */}
      {/* EDIT PROFILE MODAL */}
      {/* ========================================== */}

      {showEditModal && (

        <div className="
          fixed
          inset-0
          z-50
          bg-black/60
          backdrop-blur-sm
          flex
          items-center
          justify-center
          p-4
        ">

          <div className="
            w-full
            max-w-md
            bg-slate-900
            border
            border-slate-700
            rounded-2xl
            p-6
            shadow-2xl
          ">

            {/* Modal Header */}

            <div className="
              flex
              items-center
              justify-between
              mb-6
            ">

              <div>

                <h2 className="
                  text-xl
                  font-bold
                  text-white
                ">
                  Edit Profile
                </h2>

                <p className="
                  text-slate-400
                  text-sm
                  mt-1
                ">
                  Update your account details
                </p>

              </div>


              <button
                onClick={() => setShowEditModal(false)}
                className="
                  text-slate-400
                  hover:text-white
                  transition
                "
              >

                <X size={22} />

              </button>

            </div>


            {/* Name */}

            <div className="mb-4">

              <label className="
                text-slate-400
                text-sm
                block
                mb-2
              ">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="
                  w-full
                  bg-slate-800
                  border
                  border-slate-700
                  rounded-lg
                  px-4
                  py-3
                  text-white
                  outline-none
                  focus:border-amber-500
                "
              />

            </div>


            {/* Email */}

            <div className="mb-6">

              <label className="
                text-slate-400
                text-sm
                block
                mb-2
              ">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="
                  w-full
                  bg-slate-800
                  border
                  border-slate-700
                  rounded-lg
                  px-4
                  py-3
                  text-white
                  outline-none
                  focus:border-amber-500
                "
              />

            </div>

             <div className="mb-6">

              <label className="
                text-slate-400
                text-sm
                block
                mb-2
              ">
                Phone
              </label>

              <input
                type="Number"
                value={phone}
                onChange={(e) =>
                  setPhone( e.target.value)
                }
                className="
                  w-full
                  bg-slate-800
                  border
                  border-slate-700
                  rounded-lg
                  px-4
                  py-3
                  text-white
                  outline-none
                  focus:border-amber-500
                "
              />

            </div>

             {/* <div className="mb-6">

              <label className="
                text-slate-400
                text-sm
                block
                mb-2
              ">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="
                  w-full
                  bg-slate-800
                  border
                  border-slate-700
                  rounded-lg
                  px-4
                  py-3
                  text-white
                  outline-none
                  focus:border-amber-500
                "
              />

            </div> */}


            {/* Buttons */}

            <div className="
              flex
              gap-3
            ">

              <button
                onClick={() => setShowChangePasswordModal(true)}
                className="
                  flex-1
                  bg-red-700
                  hover:bg-red-600
                  text-white
                  py-3
                  rounded-lg
                  transition
                "
              >
                Update Password
              </button>


              <button onClick={updateProfile}
                className="
                  flex-1
                  bg-amber-500
                  hover:bg-amber-600
                  text-white
                  font-semibold
                  py-3
                  rounded-lg
                  transition
                "
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>

      )}


       {showChangePasswordModal && (

        <div className="
          fixed
          inset-0
          z-50
          bg-black/60
          backdrop-blur-sm
          flex
          items-center
          justify-center
          p-4
        ">

          <div className="
            w-full
            max-w-md
            bg-slate-900
            border
            border-slate-700
            rounded-2xl
            p-6
            shadow-2xl
          ">

            {/* Modal Header */}

            <div className="
              flex
              items-center
              justify-between
              mb-6
            ">

              <div>

                <h2 className="
                  text-xl
                  font-bold
                  text-white
                ">
                  Change Password
                </h2>

                <p className="
                  text-slate-400
                  text-sm
                  mt-1
                ">
                  Update Your Account Password
                </p>

              </div>


              <button
                onClick={() => setShowChangePasswordModal(false)}
                className="
                  text-slate-400
                  hover:text-white
                  transition
                "
              >

                <X size={22} />

              </button>

            </div>


            {/* Name */}

            <div className="mb-4">

              <label className="
                text-slate-400
                text-sm
                block
                mb-2
              ">
                Old Password
              </label>

              <input
                type="password"
                value={oldPassword}
                onChange={(e) =>
                  setOldPassword(e.target.value)
                }
                className="
                  w-full
                  bg-slate-800
                  border
                  border-slate-700
                  rounded-lg
                  px-4
                  py-3
                  text-white
                  outline-none
                  focus:border-amber-500
                "
              />

            </div>


            {/* Email */}

            <div className="mb-6">

              <label className="
                text-slate-400
                text-sm
                block
                mb-2
              ">
                New Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="
                  w-full
                  bg-slate-800
                  border
                  border-slate-700
                  rounded-lg
                  px-4
                  py-3
                  text-white
                  outline-none
                  focus:border-amber-500
                "
              />

            </div>

             <div className="mb-6">

              <label className="
                text-slate-400
                text-sm
                block
                mb-2
              ">
                Confirm Passsword
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword( e.target.value)
                }
                className="
                  w-full
                  bg-slate-800
                  border
                  border-slate-700
                  rounded-lg
                  px-4
                  py-3
                  text-white
                  outline-none
                  focus:border-amber-500
                "
              />

            </div>

            {/* Buttons */}

            <div className="
              flex
              gap-3
            ">

              <button
                onClick={() => setShowChangePasswordModal(false)}
                className="
                  flex-1
                  bg-slate-700
                  hover:bg-slate-600
                  text-white
                  py-3
                  rounded-lg
                  transition
                "
              >
                Cancel
              </button>


              <button onClick={updatePassword}
                className="
                  flex-1
                  bg-amber-500
                  hover:bg-amber-600
                  text-white
                  font-semibold
                  py-3
                  rounded-lg
                  transition
                "
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};

export default Sidebar;
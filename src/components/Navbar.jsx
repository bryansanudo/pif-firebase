import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "@/context/UserProvider";
import ingravityLogo from "@/assets/ingravityLogo.png";
import rollerLogo from "@/assets/rollerLogo.png";

const Navbar = () => {
  const { user, signOutUser } = useContext(UserContext);

  const handleClickLogout = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.log(error.code);
    }
  };

  const classButton =
    "bg-gradient-to-r from-[#182C60] to-[#ffd7d7] py-2  px-1 text-sm md:px-4 text-white rounded-lg duration-300 hover:scale-110 ";

  return (
    <nav className=" w-full h-30 bg-[#111827] text-white">
      <div className="container flex  justify-center items-center mx-auto gap-2 md:gap-4 p-5">
        <a
          href="https://pif-bsi-landing.vercel.app/"
          className="hover:scale-105 hover:text-[#ffd7d7] duration-300"
        >
          Logo App
        </a>
        <a href="https://pifsantiagoisabellabryan.vercel.app/">
          <img
            src="/logoPoli.svg"
            alt=""
            className="rounded-full object-contain hover:scale-105 transition-300  md:h-24 md:w-24 h-20 w-20  duration-300    "
          />
        </a>

        <div className="flex gap-2">
          {user ? (
            <>
              <button onClick={handleClickLogout} className={classButton}>
                Salir
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={classButton}>
                Entrar
              </NavLink>
              <NavLink to="/register" className={classButton}>
                Registrate
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

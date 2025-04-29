import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();
  const onclickHandle = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <motion.div className="flex flex-col justify-center items-center text-center my-20">
      <div className="text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-6 rounded-full border border-neutral-500">
        <p>Text To Image Generator</p>
        <img src={assets.star_icon} alt="" />
      </div>

      <h1 className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center">
        Turn text to <span className="text-blue-600">image in seconds</span>
      </h1>
      <p className="mt-8 text-2xl">
        Turn your imagination to reality with{" "}
        <span className="text-blue-900">ImaGen</span> powered by{" "}
        <span className="text-green-500">AI</span>
      </p>

      <motion.button
        onClick={onclickHandle}
        className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1.2 }}
      >
        Generate Image
        <img className="h-6" src={assets.star_group} alt="" />
      </motion.button>
    </motion.div>
  );
};

export default Header;

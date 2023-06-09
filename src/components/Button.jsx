import React from "react";
import ButtonLoading from "@/components/ButtonLoading";

const Button = ({ text, type, className, loading, onClick }) => {
  if (loading) return <ButtonLoading />;

  return (
    <button
      onClick={onClick}
      type={type}
      className={`bg-gradient-to-r from-[#182C60] to-[#ffd7d7] py-2 px-6 text-white rounded-lg duration-300 hover:scale-110 ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;

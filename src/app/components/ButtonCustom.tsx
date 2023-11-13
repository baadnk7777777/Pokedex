import React from "react";

interface ButtonCustomProps {
    buttonName : string;
    onClick: (result: string) => void;
}

const ButtonCustom: React.FC<ButtonCustomProps> = (props) => {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick(props.buttonName);
    }
  };
  return (
    <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {props.buttonName}
    </button>
  );
};

export default ButtonCustom;

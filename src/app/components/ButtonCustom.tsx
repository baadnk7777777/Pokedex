import React from "react";

interface ButtonCustomProps {
    buttonName : string;
    buttonDisable: boolean;
    onClick: (result: string) => void;
}

const ButtonCustom: React.FC<ButtonCustomProps> = (props) => {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick(props.buttonName);
    }
  };
  return (
    <button onClick={handleClick} className={`${props.buttonDisable ? 'bg-gray-500' : 'bg-blue-500'}  text-white font-bold py-2 px-4 rounded`}>
      {props.buttonName}
    </button>
  );
};

export default ButtonCustom;

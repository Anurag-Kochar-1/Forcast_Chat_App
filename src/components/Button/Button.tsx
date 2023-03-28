import React from "react";

interface IButtonProps {
  children: React.ReactNode;
  variant?: string;
  disabled?: boolean;
  loading?: boolean;
  hidden?: boolean;
  onClick?: any;
  size?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  type?: any;
}

const Button = ({
  children,
  variant,
  size,
  disabled,
  loading,
  hidden,
  onClick,
  leftIcon,
  rightIcon,
  type = "button",
}: IButtonProps) => {
  const isButtonDisabled = () => {
    if (disabled) {
      return `cursor-not-allowed`;
    }
  };

  const getButtonSizes = () => {
    switch (size) {
      case "FULL":
        return `w-full h-10`;

      default:
        return `w-36 h-10`;
    }
  };

  return (
    <button
      hidden={hidden}
      disabled={disabled}
      title="button"
      type={type}
      onClick={!loading && !disabled ? onClick : null}
      className={`
            ${getButtonSizes()} p-4 bg-brand text-white flex justify-center items-center rounded-lg space-x-1 
            ${isButtonDisabled()}
            `}
    >
      {!loading && leftIcon && <span> {leftIcon} </span>}
      {!loading && <span className="font-semibold text-base">{children}</span>}
      {!loading && rightIcon && <span> {rightIcon} </span>}
      {loading && (
        <span className="text-lg font-bold animate-pulse">....</span>
      )}
    </button>
  );
};

export default Button;
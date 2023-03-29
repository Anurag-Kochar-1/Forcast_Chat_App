import React from "react";

interface ITextFieldProps {
  type: string;
  placeholder: string;
  title?: string;
  name: string;
  required?: boolean;
  label: string;
  value?: string | number;
  onChange?: any;
  error?: string | undefined;
  registerRef?: any;
  isSchema?: boolean;
}

const TextField = ({
  type,
  label,
  required,
  placeholder,
  value,
  onChange,
  error,
  registerRef,
  name,
  isSchema = true,
}: ITextFieldProps) => {
  const getInputStyles = () => {
    return `
        w-full h-12 bg-white border-2 rounded-md placeholder:text-black text-black p-2 outline-brand font-medium
        `;
  };

  return (
    <div
      className="w-full flex flex-col items-start justify-start space-y-1"
      onClick={() => null}
    >
      <label htmlFor="textFeild" className="font-semibold text-base">
        {label}
        {required && <span className="text-brand"> * </span>}
      </label>
      {isSchema ? (
        <input
          required={required}
          type={type}
          title={"textFeild"}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${getInputStyles()}`}
          {...registerRef(`${name}`, { required: true })}
        />
      ) : (
        <input
          required={required}
          type={type}
          title={"textFeild"}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${getInputStyles()}`}
        />
      )}

      {error && <p className="text-red-600 text-sm font-medium"> {error} </p>}
    </div>
  );
};

export default TextField;

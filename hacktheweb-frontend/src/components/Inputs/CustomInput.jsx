import React from 'react';

const CustomInput = ({
  name,
  label,
  value,
  onChange,
  type = 'text',
  className,
  error,
  placeholder
}) => {
  return (
    <div className="input-container flex flex-col gap-2">
      <label className=".label uppercase">
        {label}
      </label>
      <input
        name={name}
        value={value}
        className={` shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
          error && 'border-red-500'
        } ${className}`}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustomInput;

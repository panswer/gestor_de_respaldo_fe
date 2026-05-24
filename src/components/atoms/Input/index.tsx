import type { InputHTMLAttributes } from "react";

interface InputProps extends Partial<HTMLInputElement> {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    componentId?: string;
    type: InputHTMLAttributes<HTMLInputElement>["type"];
}

function Input({
    onChange,
    type,
    value,
    className,
    disabled,
    placeholder,
    required,
    name,
    autocomplete,
    componentId,
}: InputProps) {
    return <input
        type={type}
        value={value}
        onChange={onChange}
        className={`form-control ${className ?? ''}`}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        name={name}
        autoComplete={autocomplete}
        id={componentId}
    />
}

export default Input;
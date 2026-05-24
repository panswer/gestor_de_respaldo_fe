import { useMemo, type InputHTMLAttributes } from "react";
import Label from "../../atoms/Label";
import Input from "../../atoms/Input";

interface FormGroupProps {
    controlId?: string;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    value?: string;
    labelText?: string;
    placeHolder?: string;
    type?: InputHTMLAttributes<HTMLInputElement>["type"];
    inputClass?: string;
    labelClass?: string;
    className?: string;
    name: string;
    autocomplete?: HTMLInputElement["autocomplete"];
}

function FormGroup({
    className,
    controlId,
    disabled,
    onChange,
    required,
    value,
    labelText,
    placeHolder,
    type,
    inputClass,
    labelClass,
    name,
    autocomplete,
}: FormGroupProps) {
    const componentId = useMemo(() => controlId ?? Math.random().toString(), [controlId]);
    const componentType = useMemo(() => type ?? "text", [type]);

    return <div className={className}>
        <Label
            componentFor={componentId}
            className={labelClass}
        >{labelText}</Label>
        <Input
            type={componentType}
            value={value ?? ''}
            className={inputClass}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeHolder}
            required={required}
            name={name}
            autocomplete={autocomplete}
            componentId={componentId}
        />
    </div>
}

export default FormGroup;
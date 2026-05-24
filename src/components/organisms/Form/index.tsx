import type { FormHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import Card from "../../atoms/Card";
import FormGroup from "../../molecules/FormGroup";
import type { VariantBtn } from "../../atoms/Button";
import Button from "../../atoms/Button";
import Text from "../../atoms/Text";

export interface FormInput {
    name: string;
    autocomplete?: HTMLInputElement['autocomplete'];
    type?: InputHTMLAttributes<HTMLInputElement>['type'];
    labelText?: string;
    labelClass?: string;
    placeHolder?: string;
    value?: string;
    onChange?: (e: any) => void;
    size?: number;
    inputClass?: string;
}

export interface FormActions {
    btnText: string;
    onClick?: (e: any) => void;
    disabled?: boolean;
    variant?: VariantBtn;
    size?: number;
    type?: HTMLButtonElement['type'];
}

export interface FormProps {
    apiRoute?: string;
    apiMethod?: FormHTMLAttributes<HTMLFormElement>['method'];
    inputs: FormInput[];
    actions: FormActions[];
    inputClassContainer?: string;
    actionClassContainer?: string;
    onSubmit?: (e: any) => void;
    title?: ReactNode;
    titleClass?: string;
}

function Form({
    apiRoute,
    apiMethod,
    inputs,
    actions,
    actionClassContainer,
    inputClassContainer,
    onSubmit,
    title,
    titleClass,
}: FormProps) {
    return <Card >
        {title && (
            <Text className={titleClass ?? ''}>
                {title}
            </Text>
        )}
        <form
            action={apiRoute}
            method={apiMethod ?? 'GET'}
            className="g-3"
            onSubmit={onSubmit}
        >
            <div className={`row ${inputClassContainer ?? ''}`}>
                {
                    inputs.map((input, index) => (
                        <FormGroup
                            key={index}
                            name={input.name}
                            autocomplete={input.autocomplete}
                            type={input.type}
                            labelText={input.labelText}
                            placeHolder={input.placeHolder}
                            value={input.value}
                            onChange={input.onChange}
                            className={`col-${input.size ?? 12}`}
                            inputClass={input.inputClass}
                            labelClass={input.labelClass}
                        />
                    ))
                }
            </div>
            <div className={`row ${actionClassContainer ?? ''}`}>
                {
                    actions.map((btnProps, index) => (
                        <Button
                            key={index}
                            variant={btnProps.variant}
                            disabled={btnProps.disabled}
                            onClick={btnProps.onClick}
                            className={`col-${btnProps.size ?? 12}`}
                            type={btnProps.type}
                        >
                            {btnProps.btnText}
                        </Button>
                    ))
                }
            </div>
        </form>
    </Card>
}

export default Form;
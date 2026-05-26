import { useMemo, type ReactNode } from "react";


export const variantList = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    success: "btn-success",
    danger: "btn-danger",
    warning: "btn-warning",
    info: "btn-info",
    light: "btn-light",
    dark: "btn-dark",
    link: "btn-link",
};

export type VariantBtn = keyof typeof variantList;

export interface ButtonProps {
    children: ReactNode;
    className?: string;
    disabled?: boolean;
    icon?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    variant?: VariantBtn;
    type?: HTMLButtonElement['type'];
}

function Button({
    children,
    className,
    disabled,
    icon,
    onClick,
    variant,
    type,
}: ButtonProps) {
    const classNames = useMemo(() =>
        ['btn']
            .concat(variantList[variant ?? 'primary'])
            .concat(className ?? '')
            .join(' '),
        [className, variant]);

    return <button className={classNames} disabled={disabled} onClick={onClick} type={type}>
        {icon && <i className={`bi bi-${icon} me-1`} />}
        {children}
    </button>
}

export default Button;
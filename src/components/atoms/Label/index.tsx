import type { ReactNode } from "react";

interface LabelProps {
    children: ReactNode;
    className?: string;
    componentFor: string;
}

function Label({
    children,
    className,
    componentFor
}: LabelProps) {
    return <label
        className={`form-label ${className}`}
        htmlFor={componentFor}
    >{children}</label>
}

export default Label;
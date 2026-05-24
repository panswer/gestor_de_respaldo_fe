import type { ReactNode } from "react";

interface TextProps {
    className?: string;
    children: ReactNode;
}

function Text({ children, className = '' }: TextProps) {
    return <span className={className}>{children}</span>
}

export default Text;

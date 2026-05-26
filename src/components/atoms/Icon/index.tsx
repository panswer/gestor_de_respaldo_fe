interface IconProps {
    name: string;
    className?: string;
}

function Icon({ name, className = "" }: IconProps) {
    return <i className={`bi bi-${name} ${className}`.trim()} />;
}

export default Icon;

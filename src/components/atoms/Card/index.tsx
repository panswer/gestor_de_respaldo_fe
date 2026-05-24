interface CardProps {
    className?: string;
    children?: React.ReactNode;
    image?: string;
    alt?: string;
}

function Card({
    children,
    image,
    alt,
    className
}: CardProps) {
    return <div className={`card ${className ?? ''}`}>
        {image && <img src={image} alt={alt ?? ''} />}
        <div className="card-body">
            {children}
        </div>
    </div>
}

export default Card;
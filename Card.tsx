import React from "react";
import "./Card.scss";

export interface CardProps {
  title?: string;
  subtitle?: string;
  image?: string;
  badge?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: "default" | "elevated" | "outlined" | "glass";
  onClick?: () => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  image,
  badge,
  children,
  footer,
  variant = "default",
  onClick,
  className = "",
}) => {
  return (
    <div
      className={`card card--${variant} ${onClick ? "card--clickable" : ""} ${className}`}
      onClick={onClick}
    >
      {badge && <span className="card__badge">{badge}</span>}

      {image && (
        <div className="card__image-wrap">
          <img src={image} alt={title || "card image"} className="card__image" />
        </div>
      )}

      <div className="card__body">
        {title && <h3 className="card__title">{title}</h3>}
        {subtitle && <p className="card__subtitle">{subtitle}</p>}
        {children && <div className="card__content">{children}</div>}
      </div>

      {footer && <div className="card__footer">{footer}</div>}
    </div>
  );
};

export default Card;

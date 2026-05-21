import React from "react";
import { Link } from "react-router";

interface CardInfoProps {
    title: string;
    image: string;
    link: string;
}

const CardInfo: React.FC<CardInfoProps> = ({ title, image, link }) => {
    return (
        <Link to={link} className="text-decoration-none sw-card">
            <div className="sw-poster-wrapper">
                <img src={image} alt={title} className="sw-poster" />
            </div>
            <div className="sw-info mt-3">
                <h6 className="text-light fw-bold sw-title">{title}</h6>
            </div>
        </Link>
    );
};

export default CardInfo;

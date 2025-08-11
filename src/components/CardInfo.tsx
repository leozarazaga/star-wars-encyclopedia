import { Card } from "react-bootstrap";
import { Link } from "react-router";

interface CardInfoProps {
    title: string;
    image: string;
    link: string;
}

const CardInfo: React.FC<CardInfoProps> = ({ title, image, link }) => {
    return (
        <Card>
            <Link to={link}>
                <Card.Img variant="top" src={image} alt={title} className="card-img-dimension" />
            </Link>
            <Card.Body className="card-info-body">
                <Link to={link} className="card-title-link">
                    <Card.Title className="card-title-text">{title}</Card.Title>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default CardInfo;

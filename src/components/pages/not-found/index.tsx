import { useNavigate } from "react-router";
import Text from "../../atoms/Text";
import Button from "../../atoms/Button";

function NotFoundPage() {
    const navigate = useNavigate();

    return <div className="row">
        <div className="col d-flex flex-column justify-content-center align-items-center gap-3">
            <Text className="display-1 fw-bold text-secondary">404</Text>
            <Text className="fs-3">Página no encontrada</Text>
            <Text className="text-muted">La página que buscas no existe o ha sido movida.</Text>
            <Button icon="house" onClick={() => navigate("/", { replace: true })}>
                Volver al inicio
            </Button>
        </div>
    </div>
}

export default NotFoundPage;

import { useCallback } from "react";
import Button from "../../atoms/Button";
import Text from "../../atoms/Text";
import { useNavigate } from "react-router";

function HomePage() {
    const navigate = useNavigate();

    const handleSignOut = useCallback(() => {
        sessionStorage.removeItem('token');
        navigate('/');
    }, []);

    return <div className="row">
        <div className="col d-flex flex-column justify-content-center align-items-center gap-3">
            <Text className="fs-1">Home Page</Text>
            <Button onClick={handleSignOut}>Cerrar sesión</Button>
        </div>
    </div>
}

export default HomePage;
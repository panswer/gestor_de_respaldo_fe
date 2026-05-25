import { useCallback } from "react";
import { Outlet, useNavigate } from "react-router";
import Button from "../../atoms/Button";

function AuthTemplate() {
    const navigate = useNavigate();

    const handleSignOut = useCallback(() => {
        sessionStorage.removeItem('token');
        navigate('/', { replace: true });
    }, [navigate]);

    return <>
        <nav className="navbar bg-body-tertiary px-3">
            <span className="navbar-brand mb-0 h1">Gestor de Respaldo</span>
            <Button onClick={handleSignOut}>Cerrar sesión</Button>
        </nav>
        <main className="container mt-4">
            <Outlet />
        </main>
    </>
}

export default AuthTemplate

import { useCallback } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import Button from "../../atoms/Button";

function AuthTemplate() {
    const navigate = useNavigate();

    const handleSignOut = useCallback(() => {
        sessionStorage.removeItem('token');
        navigate('/', { replace: true });
    }, [navigate]);

    const linkClass = useCallback(({ isActive }: { isActive: boolean }) =>
        `nav-link ${isActive ? 'active fw-bold' : ''}`,
    []);

    return <>
        <nav className="navbar navbar-expand bg-body-tertiary px-3">
            <span className="navbar-brand mb-0 h1 me-4">Gestor de Respaldo</span>
            <ul className="navbar-nav me-auto">
                <li className="nav-item">
                    <NavLink to="/home" className={linkClass} end>Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/users" className={linkClass}>Usuarios</NavLink>
                </li>
            </ul>
            <Button onClick={handleSignOut}>Cerrar sesión</Button>
        </nav>
        <main className="container mt-4">
            <Outlet />
        </main>
    </>
}

export default AuthTemplate

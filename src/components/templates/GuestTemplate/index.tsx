import { Outlet } from "react-router";
import ThemeToggle from "../../atoms/ThemeToggle";

function GuestTemplate() {
    return <>
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1056 }}>
            <ThemeToggle />
        </div>
        <section className="container min-vh-100 d-flex justify-content-center align-items-center">
            <Outlet />
        </section>
    </>
}

export default GuestTemplate

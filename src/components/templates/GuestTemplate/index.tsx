import { Outlet } from "react-router";

function GuestTemplate() {
    return <section className="container min-vh-100 d-flex justify-content-center align-items-center">
        <Outlet />
    </section>
}

export default GuestTemplate

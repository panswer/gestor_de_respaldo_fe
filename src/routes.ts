import { createBrowserRouter } from "react-router";
import GuestTemplate from "./components/templates/GuestTemplate";
import AuthTemplate from "./components/templates/AuthTemplate";
import SignInPage from "./components/pages/sign-in";
import SignUpPage from "./components/pages/sign-up";
import HomePage from "./components/pages/home";
import UsersPage from "./components/pages/users";
import { validateSession } from "./middlewares/auth";

export const router = createBrowserRouter([{
    Component: GuestTemplate,
    children: [{
        Component: SignInPage,
        path: "/",
    }, {
        Component: SignUpPage,
        path: "/sign-up",
    }],
}, {
    Component: AuthTemplate,
    children: [{
        Component: HomePage,
        path: "/home",
        middleware: [validateSession],
    }, {
        Component: UsersPage,
        path: "/users",
        middleware: [validateSession],
    }],
}]);

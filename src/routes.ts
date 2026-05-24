import { createBrowserRouter } from "react-router";
import SignInPage from "./components/pages/sign-in";
import SignUpPage from "./components/pages/sign-up";
import HomePage from "./components/pages/home";
import { validateSession } from "./middlewares/auth";

export const router = createBrowserRouter([{
    Component: SignInPage,
    path: "/",
}, {
    Component: SignUpPage,
    path: "/sign-up",
}, {
    Component: HomePage,
    path: "/home",
    middleware: [validateSession]
}]);

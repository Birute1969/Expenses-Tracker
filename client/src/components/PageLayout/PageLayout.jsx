import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/UserContextWrapper";

export const PageLayout = () => {
    //čia užsetinama informacija po sėkmingo logino:
    const { user } = useContext(UserContext);

    if (!user) {
        return <Navigate to="/login" />
    }

    return (
        <div>
            <Outlet />
        </div>
    )
};
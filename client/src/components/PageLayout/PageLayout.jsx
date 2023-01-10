import { Navigate, Outlet } from "react-router-dom";

export const PageLayout = ({user}) => {
    if (!user) {
        return <Navigate to="/login"></Navigate>
    }
    return (
        <div>
            < Outlet />
        </div>
    )
};
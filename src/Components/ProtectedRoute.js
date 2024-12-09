import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { DashboardContext } from "../store/dashboardContext";


export default function ProtectedRoute({children}){

    const {isAuth} = useContext(DashboardContext);

    if(!isAuth){
        return <Navigate to='/login' replace/>
    }
    return children;
}
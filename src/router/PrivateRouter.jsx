import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Context from "../context/AuthContext";
const PrivateRouter=()=>{
    const {user} = useContext(Context);
    const navigate=useNavigate();
    return(<>
    {user?.email ? <Outlet/> : <Navigate to="/login"/>}</>)
}

export default PrivateRouter;
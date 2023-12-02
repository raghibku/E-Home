import { Navigate, useLocation } from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "../provider/AuthProvider";
import useAgent from "../hooks/useAgent";



const AgentRoute = ({children}) => {
    
    const {user, loading,logOut } = useContext(AuthContext);
    const [isAgent, isAgentLoading] = useAgent();

    const location = useLocation();

    if(loading || isAgentLoading){
        return <progress className="progress w-56"></progress>
    }

    else if (user && isAgent) {
        return children;
    }
    else{
        logOut();
        return <Navigate to="/login" state={{from: location}} replace></Navigate>
    }
    
};

export default AgentRoute;
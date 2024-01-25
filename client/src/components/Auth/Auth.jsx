import { Navigate } from "react-router-dom";

const Auth = ({ children }) => {
    const loggedIn = window.sessionStorage.getItem('loggedIn') || false;

    if (loggedIn === false) {
        return <Navigate to='/login' />
    } else {
        return children;
    }

}

export default Auth
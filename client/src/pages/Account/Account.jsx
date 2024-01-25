import { useContext, useState } from "react";

import { Navigate, useParams } from "react-router-dom";

import axios from "axios";

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import "./Account.css";

import { UserContext } from "../../userContext";
import Profile from "../../components/Profile/Profile";
import Places from "../../components/Places/Places";
import AccountNav from "../../components/AccountNav/AccountNav";


const Account = () => {
  const [redirect, setRedirect] = useState(false);
  const { user, ready, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (!subpage) {
    subpage = "profile";
  }

  async function logout() {
    try {
      await axios.post('/user/logout');
      setRedirect(true);
      setUser(null);
      window.sessionStorage.removeItem('loggedIn');
    } catch (error) {
      let errorMessage = error.response.data.errors
        ? error.response.data.errors['errors'][0].msg
        : error.response.data.message;
      toast.error(errorMessage, {
        position: "top-right",
        theme: 'light'
      });
    }
  }
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }
  if (redirect) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" ?
        <Profile logout={logout} />
        :
        null}
      {subpage === "places" ?
        <Places />
        :
        null}
    </div>
  );
};

export default Account;

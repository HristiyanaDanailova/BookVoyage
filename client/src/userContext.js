import { createContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext({});

function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!user) {
            axios.get('/user/profile-info').then(({ data }) => {
                if (data.user) {
                    setUser(data.user);
                    setReady(true);
                }
            });
        }
    });

    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>

    )
}

export {
    UserContext,
    UserContextProvider
}

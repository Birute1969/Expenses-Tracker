import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextWrapper = ({ children }) => {
    //turime value:
    const [user, setUser] = useState(null);
    //turime f-ją, per kurią galime keisti value:
    const handleSetUser = (data) => setUser(data);

    return (
        //čia apwrapinam visą savo aplikaciją į Context
        //paduodame values ir padarome juos pasiekiamus visai aplikacijai:
        <UserContext.Provider value={{ user, setUser: handleSetUser }}>
            {children}
        </UserContext.Provider>
    );
}
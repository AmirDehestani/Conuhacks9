import { createContext, useState } from 'react';

export const UsersContext = createContext();

export function UsersProvider({ children }) {
    const [usersList, setUsersList] = useState([]);

    return (
        <UsersContext.Provider value={{ usersList, setUsersList }}>
            {children}
        </UsersContext.Provider>
    );
}

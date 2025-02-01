import { createContext, useState } from 'react';

export const LobbyContext = createContext();

export function LobbyProvider({ children }) {
    const [lobbyCode, setLobbyCode] = useState('');

    return (
        <LobbyContext.Provider value={{ lobbyCode, setLobbyCode }}>
            {children}
        </LobbyContext.Provider>
    );
}

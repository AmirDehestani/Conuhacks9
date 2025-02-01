import { useNavigate } from 'react-router-dom';
import { socket } from './LobbySetup';

function Lobby() {
    const navigate = useNavigate();

    const leaveLobby = () => {
        socket.disconnect();
        navigate('/');
    };

    return (
        <div>
            <h1>Lobby Page</h1>
            <button onClick={leaveLobby}>Leave Lobby</button>
            <hr />
            <button onClick={() => navigate('/game')}>Start game</button>
        </div>
    );
}

export default Lobby;

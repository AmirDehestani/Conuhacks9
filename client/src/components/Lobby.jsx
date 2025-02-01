import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

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
        </div>
    );
}

export default Lobby;

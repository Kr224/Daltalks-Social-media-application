import React from 'react';
import FriendRequestComponent from './components/FriendRequestComponent';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>DalTalks</h1>
            </header>
            <main>
                <FriendRequestComponent />
            </main>
        </div>
    );
}

export default App;
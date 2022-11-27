import React from 'react';
import Navbar from './components/layouts/Navbar';
import { Router } from './routes';

function App() {
    return (
        <section class='min-h-screen bg-gray-200 p-5'>
            <div className='container'>
                <Navbar />
                <Router />
            </div>
        </section>
    );
}

export default App;

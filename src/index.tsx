import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './pages/admin';
import CheckIn from './pages/checkIn';
import CompleteCheckIn from './pages/others/completeCheckIn';
import SingleEvent from './components/SingleEvent';
import SingleEventAdmin from './components/SingleEventAdmin';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <div>
        <BrowserRouter >
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/admin" element={<Admin />} />
                <Route
                    path="/admin/event/:event"
                    element={<SingleEventAdmin />}
                />
                <Route path="/event/:event" element={<SingleEvent />} />
                <Route path="/checkIn/:event" element={<CheckIn />} />
                <Route
                    path="/checkIn/completed/:event"
                    element={<CompleteCheckIn />}
                />
            </Routes>
        </BrowserRouter>
    </div>
);

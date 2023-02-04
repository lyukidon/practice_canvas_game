import React from "react";
import { Routes, Route } from "react-router-dom";

import InitialPage from "./pages/InitialPage";
import BomberMan from './pages/BomberMan'

function Router() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<InitialPage />} />
                <Route path="/bomberMan" element={<BomberMan />} />
            </Routes>
        </div>
    );
}

export default Router;

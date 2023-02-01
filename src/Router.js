import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import InitialPage from "./pages/InitialPage";

function Router() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<InitialPage />} />
                <Route path="/bomberMan" element={<App />} />
            </Routes>
        </div>
    );
}

export default Router;

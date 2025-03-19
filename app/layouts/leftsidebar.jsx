import { Outlet, useLocation } from "react-router-dom";
import "./leftsidebar.css";

const LeftSidebar = () => {
    const location = useLocation();
    const table = location.state || { name: "Select a table" };

    return (
        <div className="app-layout">
            <div className="leftsidebar">
                <h1>{table.name}</h1>
            </div>
            <main className="app-main">
                <Outlet />
            </main>
            <div className="leftsidebar">
                <h1>{table.name}</h1>
            </div>
        </div>
    );
};

export default LeftSidebar;


import { Outlet, useLocation } from "react-router-dom";
import "./leftsidebar.css";
import "./rightsidebar.css";


const LeftSidebar = () => {
    const location = useLocation();
    const table = location.state || { name: "Select a table" };



    return (
        <div className="app-layout">
            <div className="leftsidebar">
                <h1 className="table--name">{table.name}</h1>
            </div>
            <main className="app-main">
                <Outlet />
            </main>
            <div className="rightsidebar">
                <h1>order:</h1>
            </div>
        </div>
    );
};

export default LeftSidebar;

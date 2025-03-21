import { Outlet, useLocation } from "react-router-dom";
import "./leftsidebar.css";
import "./rightsidebar.css";
import { useState } from "react";

const LeftSidebar = () => {
    const location = useLocation();
    const table = location.state || { name: "Select a table", id: 0 };
    const [items, setItems] = useState({});

    const predefinedItems = [
        { id: 1, name: "Coca Cola" },
        { id: 2, name: "Sprite" },
        { id: 3, name: "Fanta" },
        { id: 4, name: "Ice Tea" },
    ];

    const updateItemCount = (itemId) => {
        setItems((prevItems) => ({
            ...prevItems,
            [table.id]: {
                ...prevItems[table.id],
                [itemId]: (prevItems[table.id]?.[itemId] || 0) + 1,
            },
        }));
    };

    const tableItems = items[table.id] || {};

    return (
        <div className="app-layout">
            <div className="leftsidebar">
                <h1 className="table--name">{table.name}</h1>
                <div className="item-buttons">
                    {predefinedItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => updateItemCount(item.id)}
                        >
                            {item.name}
                            <span>
                                {" "}
                                {tableItems[item.id] || 0}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
            <main className="app-main">
                <Outlet />
            </main>
            <div className="rightsidebar">
                <h1>Order:</h1>
            </div>
        </div>
    );
};

export default LeftSidebar;

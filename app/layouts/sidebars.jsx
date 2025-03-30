import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import "./leftsidebar.css";
import "./rightsidebar.css";

const Sidebars = () => {
    const location = useLocation();
    const table = location.state || { name: "Select a table", id: 0 };
    const [items, setItems] = useState({});
    const [dropShadowState, setDropShadowState] = useState({});

    const predefinedItems = [
        { id: 1, name: "Coca Cola", price: 1.5 },
        { id: 2, name: "Sprite", price: 1.5 },
        { id: 3, name: "Fanta", price: 1.5 },
        { id: 4, name: "Ice Tea", price: 1.5 },
        { id: 5, name: "Coffee", price: 2 },
        { id: 6, name: "Latté", price: 2.5 },
        { id: 7, name: "Spaghetti", price: 17.99 },
        { id: 8, name: "Vol-Au-Vent", price: 18.99 },
        { id: 9, name: "House Burger", price: 20.99 },
        { id: 10, name: "Spare Ribs", price: 24.99 },
        { id: 11, name: "Pasta Salmon", price: 23.99 },
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

    const resetItemCount = () => {
        setItems((prevItems) => {
            const updatedItems = { ...prevItems };
            delete updatedItems[table.id];
            return updatedItems;
        });

        setDropShadowState((prevState) => {
            const updatedDropShadow = { ...prevState };
            delete updatedDropShadow[table.id];
            return updatedDropShadow;
        });
    };

    const handleShadowChange = () => {
        setDropShadowState((prev) => ({
            ...prev,
            [table.id]: !prev[table.id],
        }));
    };

    const tableItems = items[table.id] || {};

    const calculateTotalPrice = () => {
        let total = Object.entries(tableItems).reduce((combineNumbers, [id, count]) => {
            const item = predefinedItems.find((i) => i.id === Number(id));
            return combineNumbers + (item ?
                item.price * count
                : 0);
        }, 0);

        return dropShadowState[table.id] ? total * 0.9 : total;
    };

    const totalPrice = calculateTotalPrice().toFixed(2);

    return (
        <div className="app-layout">
            <div className="leftsidebar">
                <h1 className="table--name">{table.name}</h1>
                {table.id !== 0 && (
                    <>
                        <label>
                            Dresscode
                            <input
                                type="checkbox"
                                checked={Boolean(dropShadowState[table.id])}
                                onChange={handleShadowChange}
                            />
                        </label>

                        <ul className="item-list">
                            <span className="item-list-title">Menu</span>
                            {predefinedItems.map((item) => (
                                <li key={item.id} className="item">
                                    <span>{item.name}</span>
                                    <button
                                        className="add-button"
                                        onClick={() => updateItemCount(item.id)}
                                    >
                                        +
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>

            <main className="app-main">
                <Outlet context={{ items, dropShadowState }} />
            </main>

            {table.id !== 0 && (
                <div className="rightsidebar">
                    <h1>Order:</h1>
                    <ul className="order-list">
                        {Object.entries(tableItems).map(([id, count]) => {
                            const item = predefinedItems.find((i) => i.id === Number(id));
                            return item && count > 0 ? (
                                <li key={id}>
                                    <div>{count}x</div> <div>{item.name}</div> <div>€{(item.price * count).toFixed(2)}</div>
                                </li>
                            ) : null;
                        })}
                    </ul>

                    {dropShadowState[table.id] && (
                        <h3 className="discount-label">-10% Dresscode</h3>
                    )}
                    <h2>
                        Total: €{totalPrice}
                    </h2>
                    {Object.keys(tableItems).length > 0 && (
                        <button className="reset-button" onClick={resetItemCount}>
                            PAY
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Sidebars;

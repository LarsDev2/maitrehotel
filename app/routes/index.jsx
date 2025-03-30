import { useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { Hourglass, Shirt, CircleX, HandCoins } from "lucide-react";
import "./index.css";

const tables = [
  { id: 1, name: "Table 1" },
  { id: 2, name: "Table 2" },
  { id: 3, name: "Table 3" },
  { id: 4, name: "Table 4" },
  { id: 5, name: "Table 5" },
  { id: 6, name: "Table 6" },
  { id: 7, name: "Table 7" },
  { id: 8, name: "Table 8" },
  { id: 9, name: "Table 9" },
  { id: 10, name: "Table 10" },
  { id: 11, name: "Table 11" },
  { id: 12, name: "Table 12" },
  { id: 13, name: "Table 13" },
];

const Home = () => {
  const navigate = useNavigate();
  const { items, dropShadowState } = useOutletContext();
  const [waitingTables, setWaitingTables] = useState({}); 
  const [orders, setOrders] = useState({}); 

  useEffect(() => {
    const updatedOrders = {};
    tables.forEach((table) => {
      if (items[table.id] && Object.values(items[table.id]).some(count => count > 0)) {
        updatedOrders[table.id] = true; 
      }
    });
    setOrders(updatedOrders);
  }, [items]);

  const handleTableClick = (table) => {
    if (!waitingTables[table.id]) { 
      const confirm = window.confirm("People waiting?");
      if (!confirm) return;
      setWaitingTables(prev => ({ ...prev, [table.id]: true }));
    }
    navigate(".", { state: table });
  };

  const getTableClassName = (table) => {
    const hasItems = items[table.id] && Object.values(items[table.id]).some(count => count > 0);
    const shadowClass = dropShadowState[table.id] ? "drop-shadow" : "";
    return `table-item table-${table.id} ${waitingTables[table.id] ? "active-table" : ""} ${hasItems ? "active-items" : ""} ${shadowClass}`;
  };

  const getTableIcon = (table) => {
    const icons = [];
 
    if (waitingTables[table.id]) {
      icons.push(<Hourglass key="hourglass" size={18} strokeWidth={1.75} />);
    }

    if (orders[table.id]) {
      icons.push(<HandCoins key="handcoins" size={18} strokeWidth={1.75} />); 
      const hourglassIndex = icons.findIndex(icon => icon.key === "hourglass");
      if (hourglassIndex !== -1) {
        icons.splice(hourglassIndex, 1);
      }
    }

    if (dropShadowState[table.id]) {
      icons.push(<Shirt key="shirt" size={18} strokeWidth={1.75} />); 
    }

    if (!waitingTables[table.id] && !orders[table.id] && !dropShadowState[table.id]) {
      icons.push(<CircleX key="circlex" size={18} strokeWidth={1.75} />); 
    }

    return <div>{icons}</div>; 
  };

  return (
    <div className="table-layout">
      <h1>Tables</h1>
      <ul className="legend-list">
        <li><CircleX size={18} strokeWidth={1.75} /> No customers</li>
        <li><Hourglass size={18} strokeWidth={1.75} /> Waiting</li>
        <li><HandCoins size={18} strokeWidth={1.75} /> Not paid</li>
        <li><Shirt size={18} strokeWidth={1.75} /> Dresscode</li>
      </ul>
      <div className="grid">
        {tables.map((table) => (
          <div
            key={table.id}
            className={getTableClassName(table)} 
            onClick={() => handleTableClick(table)}
          >
            <div>{getTableIcon(table)}</div>
            {table.name}
          </div>
        ))}
      </div>
    </div>
  );

};

export default Home;

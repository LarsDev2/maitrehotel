import { useNavigate } from "react-router-dom";
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

  return (
    <div className="table-layout">
      <h1>Tables</h1>
      <div className="grid">
        {tables.map((table) => (
          <div
            key={table.id}
            className={`table-item table-${table.id}`} 
            onClick={() => navigate(".", { state: table })}
          >
            {table.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

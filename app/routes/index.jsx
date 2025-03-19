import { useNavigate } from "react-router-dom";
import "./index.css";

const tables = [
  { id: 1, name: "Table 1" },
  { id: 2, name: "Table 2" },
  { id: 3, name: "Table 3" },
  { id: 4, name: "Table 4" },
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
            className="table-item"
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

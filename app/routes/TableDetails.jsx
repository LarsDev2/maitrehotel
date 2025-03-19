import { useLocation } from "react-router-dom";

const TableDetails = () => {
    const location = useLocation();
    const table = location.state || { name: "Select a table" };

    return (
        <div className="table-details">
            <h2>{table.name}</h2>
        </div>
    );
};

export default TableDetails;

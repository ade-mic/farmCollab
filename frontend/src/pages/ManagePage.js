import React, { useState, useEffect } from "react";
import {
  getUserProjects,
  getUserInventory,
  getUserFarms,
  createFarm,
  createProject,
  createInventory,
  updateProject,
  updateInventory,
  updateFarm,
  deleteProject,
  deleteInventory,
  deleteFarm,
} from "../api";
import CurrencyInput from "../components/CurrencyInput";
import FarmInput from "../components/FarmInput";
import currency from "../utils/currency";
import DashBoardButton from "../components/DashBoardButton";

const ManagePage = () => {
  const [entity, setEntity] = useState("projects");
  const [data, setData] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, [entity]);

  const fetchData = async () => {
    try {
      let response;
      switch (entity) {
        case "projects":
          response = await getUserProjects();
          setData(response.data.projects || []);
          break;
        case "inventory":
          response = await getUserInventory();
          setData(response.data.inventory || []);
          break;
        case "farms":
          response = await getUserFarms();
          setData(response.data.farms || []);
          break;
        default:
          throw new Error("Invalid entity");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFormToggle = () => {
    setFormVisible(!formVisible);
    setFormData({});
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        switch (entity) {
          case "projects":
            await updateProject(selectedItemId, formData);
            break;
          case "inventory":
            await updateInventory(selectedItemId, formData);
            break;
          case "farms":
            await updateFarm(selectedItemId, formData);
            break;
          default:
            throw new Error("Invalid entity");
        }
      } else {
        switch (entity) {
          case "projects":
            await createProject(formData);
            break;
          case "inventory":
            await createInventory(formData);
            break;
          case "farms":
            await createFarm(formData);
            break;
          default:
            throw new Error("Invalid entity");
        }
      }
      setFormVisible(false);
      fetchData();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (itemId) => {
    const selectedItem = data.find((item) => item._id === itemId);
    setFormData(selectedItem);
    setEditMode(true);
    setSelectedItemId(itemId);
    setFormVisible(true);
  };

  const handleDelete = async (itemId) => {
    try {
      switch (entity) {
        case "projects":
          await deleteProject(itemId);
          break;
        case "inventory":
          await deleteInventory(itemId);
          break;
        case "farms":
          await deleteFarm(itemId);
          break;
        default:
          throw new Error("Invalid entity");
      }
      fetchData();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>
        Manage {entity.charAt(0).toUpperCase() + entity.slice(1)}
      </h1>

      <div style={styles.nav}>
        <button
          style={entity === "projects" ? styles.activeButton : styles.button}
          onClick={() => setEntity("projects")}
        >
          Projects
        </button>
        <button
          style={entity === "inventory" ? styles.activeButton : styles.button}
          onClick={() => setEntity("inventory")}
        >
          Inventory
        </button>
        <button
          style={entity === "farms" ? styles.activeButton : styles.button}
          onClick={() => setEntity("farms")}
        >
          Farms
        </button>
      </div>

      {formVisible && (
        <form onSubmit={handleSubmit} style={styles.form}>
          {entity === "projects" && (
            <>
              <input
                name="title"
                placeholder="Project Name"
                onChange={handleInputChange}
                style={styles.input}
                required
                value={formData.title || ""}
              />
              <input
                name="description"
                placeholder="Description"
                onChange={handleInputChange}
                style={styles.input}
                required
                value={formData.description || ""}
              />
              <CurrencyInput
                currencyName="currency"
                name="goalAmount"
                placeholder="Goal Amount"
                handleInputChange={handleInputChange}
                value={formData.goalAmount || ""}
              />
            </>
          )}
          {entity === "inventory" && (
            <>
              <input
                name="itemName"
                placeholder="Item Name"
                onChange={handleInputChange}
                style={styles.input}
                required
                value={formData.itemName || ""}
              />
              <input
                name="quantity"
                type="number"
                placeholder="Quantity"
                onChange={handleInputChange}
                style={styles.input}
                required
                value={formData.quantity || ""}
              />
              <select
                style={styles.input}
                name="unit"
                onChange={handleInputChange}
                required
                value={formData.unit || ""}
              >
                <option value="">Select Unit</option>
                <option value="kg">Kg</option>
                <option value="liter">Litre</option>
                <option value="ton">Tones</option>
                <option value="piece">Pieces</option>
              </select>
              <FarmInput
                onChange={handleInputChange}
                value={formData.farm || ""}
              />
              <CurrencyInput
                currencyName="currency"
                name="pricePerUnit"
                placeholder="Price Per Unit"
                handleInputChange={handleInputChange}
                value={formData.pricePerUnit || ""}
              />
            </>
          )}
          {entity === "farms" && (
            <>
              <input
                name="name"
                placeholder="Farm Name"
                onChange={handleInputChange}
                style={styles.input}
                required
                value={formData.name || ""}
              />
              <input
                name="location"
                placeholder="Location (Coordinates)"
                onChange={handleInputChange}
                style={styles.input}
                required
                value={formData.location || ""}
              />
              <input
                name="size"
                type="number"
                placeholder="Size (in acres)"
                onChange={handleInputChange}
                style={styles.input}
                required
                value={formData.size || ""}
              />
            </>
          )}
          <div style={styles.formActions}>
            <button type="submit" style={styles.submitButton}>
              {editMode ? "Update" : "Submit"}
            </button>
            <button
              type="button"
              onClick={handleFormToggle}
              style={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <button onClick={handleFormToggle} style={styles.addButton}>
        {formVisible ? "Close Form" : `Add New ${entity}`}
      </button>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Name</th>
            <th style={{ ...styles.tableHeader}}>Details</th>
            {data.some((item) => item.goalAmount !== undefined) && (
              <th style={styles.tableHeader}>Goal Amount</th>
            )}
            {data.some((item) => item.hasOwnProperty("currentAmount")) && (
              <th style={styles.tableHeader}>Current Amount</th>
            )}
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item._id}>
                <td style={styles.tableCell}>
                  {item.name || item.itemName || item.title || "N/A"}
                </td>
                <td style={styles.tableCell}>
                  {item.description || item.quantity || item.location || "N/A"}
                  {item.unit ? ` (${item.unit})` : ""}
                </td>
                {item.goalAmount !== undefined && (
                  <td style={styles.tableCell}>
                    {item.goalAmount ? `${currency[item.currency]|| ""} ${item.goalAmount} ` : ""}
                  </td>
                )}
                {item.hasOwnProperty("currentAmount") && (
                  <td style={styles.tableCell}>
                    {item.currentAmount !== undefined
                      ? `${currency[item.currency] || ""} ${item.currentAmount} `
                      : ""}
                  </td>
                )}
                <td style={{...styles.tableCell}}>
                  <button onClick={() => handleEdit(item._id)} style={{...styles.editButton}}>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    style={{...styles.deleteButton, marginTop: "20px"}}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={
                  2 +
                  (data.some((item) => item.goalAmount !== undefined) ? 1 : 0) +
                  (data.some((item) => item.hasOwnProperty("currentAmount")) ? 1 : 0) +
                  1
                }
                style={styles.tableCell}
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.returnButton}>
        <DashBoardButton to={"/user-home"} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "900px",
    margin: "150px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "20px",
  },
  nav: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#91AC8F",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  activeButton: {
    padding: "10px 20px",
    backgroundColor: "#4B5945",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  addButton: {
    display: "block",
    margin: "20px auto",
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  form: {
    marginBottom: "20px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  formActions: {
    display: "flex",
    justifyContent: "space-between",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#4B5945",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  tableHeader: {
    textAlign: "left",
    padding: "10px",
    borderBottom: "2px solid #ddd",
    backgroundColor: "#f1f1f1",
  },
  tableCell: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: "20px",
  },
  editButton: {
    padding: "5px 10px",
    backgroundColor: "#ffc107",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "10px",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  returnButton: {
    textAlign: "center",
    marginTop: "20px",
  },

};

export default ManagePage;

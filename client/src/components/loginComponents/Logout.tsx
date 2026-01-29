import { LogoutOutlined } from "@ant-design/icons";
import API from "../../api/API";
import { message } from "antd";
export function Logout() {
  const handleLogout = async () => {
    try {
      await API.post("/users/logout");
      message.success("Logged out successfuly")
    } catch (err) {
      console.log("Logout error: ", err);
    }
  };
  return (
    <LogoutOutlined
      onClick={handleLogout}
      style={{ cursor: "pointer" }}
      title="Logout"
    />
  );
}

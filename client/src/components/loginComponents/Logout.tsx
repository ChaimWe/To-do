import { LogoutOutlined } from "@ant-design/icons";
import API from "../../api/API";
import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";

export default function Logout() {
  const queryClient = useQueryClient();
  const handleLogout = async () => {
    try {
      await API.post("/users/logout");
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      message.success("Logged out successfuly");
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

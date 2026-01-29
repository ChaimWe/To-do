import API from "./API";

export const fetchUsers = ()=> API.get("/admin/users");
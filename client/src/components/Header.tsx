import { Button, Radio } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import AddTask from "./taskComponents/AddTask";
import Register from "./loginComponents/UserAuth";
import React from "react";
import { StatusFilter } from "../enums/StatusFilter";
import { Logout } from "./loginComponents/Logout";

function Header({
  dateSort,
  dataSorting,
  statusFilter,
}: {
  dateSort: boolean;
  dataSorting: () => void;
  statusFilter: (value: StatusFilter) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: "150px",
        marginRight: "150px",
      }}
    >
      <h1 style={{ margin: 0 }}>ToDo List</h1>

      <Radio.Group
        defaultValue={StatusFilter.All}
        onChange={(e) => statusFilter(e.target.value)}
        buttonStyle="solid"
      >
        <Radio.Button value={StatusFilter.All}>All</Radio.Button>
        <Radio.Button value={StatusFilter.Completed}>Completed</Radio.Button>
        <Radio.Button value={StatusFilter.Incomplete}>Incomplete</Radio.Button>
      </Radio.Group>
      <Button
        type="default"
        onClick={dataSorting}
        icon={dateSort ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
      >
        Sort by Date
      </Button>
      <AddTask />
      <Register />
      <Logout/>
    </div>
  );
}
export default React.memo(Header);

import { Button, Radio } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import AddTask from "./AddTask";
import React from "react";

function Header({
  dateSort,
  dataSorting,
  statusFilter,
}: {
  dateSort: boolean;
  dataSorting: () => void;
  statusFilter: (e: string) => void;
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
        defaultValue="all"
        onChange={(e) => statusFilter(e.target.value)}
        buttonStyle="solid"
      >
        <Radio.Button value='all'>All</Radio.Button>
        <Radio.Button value="true">Completed</Radio.Button>
        <Radio.Button value="false">Incomplete</Radio.Button>
      </Radio.Group>
      <Button
        type="default"
        onClick={dataSorting}
        icon={dateSort ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
      >
        Sort by Date
      </Button>
      <AddTask />
    </div>
  );
};
export default React.memo(Header);
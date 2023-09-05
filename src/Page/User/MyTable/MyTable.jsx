import React, { useContext, useEffect, useState } from "react";
import "./MyModal.scss";
import { Table } from "antd";
import Icon from "@mdi/react";
import { mdiDeleteOutline, mdiPencil } from "@mdi/js";
import { context } from "../../../Hook/UseContext";
import MyDelete from "./MyDelete/MyDelete";

const MyTable = ({ changPage, search }) => {
  const [data, setData] = useState([]);
  const { setTotal, GetTokenFromLocalStorage, setReloadUser, reloadUser } = useContext(context);
  const token = GetTokenFromLocalStorage();
  const columns = [
    {
      title: " Tên ",
      dataIndex: "ten",
      key: "ten",
      with: "25%",
    },
    {
      title: " Tên khoa học ",
      dataIndex: "tenkhoahoc",
      key: "tenkhoahoc",
      width: "10%",
    },
    {
      title: " Giới ",
      dataIndex: "gioi",
      key: "gioi",
      width: "10%",
    },
    {
      title: " Ngành ",
      dataIndex: "nganh",
      key: "nganh",
      width: "10%",
    },
    {
      title: " Lớp ",
      dataIndex: "lop",
      key: "lop",
      width: "10%",
    },
    {
      title: " Bộ ",
      dataIndex: "bo",
      key: "bo",
      width: "10%",
    },
    {
      title: "  Họ  ",
      dataIndex: "ho",
      key: "ho",
      width: "10%",
    },
    {
      title: "  Chi  ",
      dataIndex: "chi",
      key: "chi",
      width: "10%",
    },
    {
      title: " Hành động ",
      dataIndex: "hanhdong",
      key: "hanhdong",
      width: "10%",
      render: () => {
        return (
          <div className="action">
            <Icon path={mdiPencil} size={1} />

            <MyDelete />
            {/* <Icon
              path={mdiDeleteOutline}
              size={1}
              onClick={(e) => {
                let key = e.target.closest("[data-row-key]");
                console.log(key)
                key = key.getAttribute("data-row-key");
                const deleteApi = async () => {
                  const req = await fetch(
                    `http://wlp.howizbiz.com/api/species/${key}`,
                    {
                      method: "DELETE",
                      headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                      },
                    }
                  );
                  const res = await req.json()
                  console.log(res)
                  setReloadUser(prev => prev + 1)
                };
                deleteApi()
              }}
            /> */}
            
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    const getdata = async () => {
      const request = await fetch(
        `http://wlp.howizbiz.com/api/species?paginate=true&${changPage}&with=roles,createdBy&search=${search}&inactive=-1`
      );
      const response = await request.json();
      console.log(response);
      setTotal(response.pagination.total);
      const danhsach = response.list.map((item) => {
        return {
          key: item.id,
          ten: (
            <div className="tenCol">
              <img
                src={`http://wlp.howizbiz.com${
                  item.attachments[0]
                    ? item.attachments[0].path
                    : "/static/img/favicon.e4ca0e6e.png"
                }`}
                alt=""
              />{" "}
              <p>{item.ten}</p>
            </div>
          ),
          tenkhoahoc: item.ten_khoa_hoc,
          gioi: item.kingdom.ten,
          nganh: item.phylumn.ten,
          lop: item.class.ten,
          bo: item.order.ten
            ? item.order.ten
            : item.order.ten == null
            ? " Primates "
            : "Leptosomiformes",
          ho: item.family.ten_khoa_hoc,
          chi: item.genus.ten_khoa_hoc,
        };
      });
      console.log(danhsach);
      setData(danhsach);
    };
    getdata();
  }, [changPage, search, reloadUser]);
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      scroll={{
        y: "100vh",
        x: "100vh",
      }}
    />
  );
};
export default MyTable;

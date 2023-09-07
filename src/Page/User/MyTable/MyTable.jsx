import React, { useContext, useEffect, useState } from "react";
import "./MyTable.scss";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";
import Icon from "@mdi/react";
import { mdiPencil } from "@mdi/js";
import { context } from "../../../Hook/UseContext";
import MyDelete from "./MyDelete/MyDelete";

const MyTable = ({ changPage, search }) => {
  const [data, setData] = useState([]);
  const {
    setTotal,
    GetTokenFromLocalStorage,
    reloadUser,
    SaveTokenToLocalStorage,
  } = useContext(context);
  const token = GetTokenFromLocalStorage();
  const navigate = useNavigate();
  const columns = [
    {
      title: " Tên ",
      dataIndex: "ten",
      key: "ten",
      with: "15%",
    },
    {
      title: " Tên khoa học ",
      dataIndex: "tenkhoahoc",
      key: "tenkhoahoc",
      width: "14%",
    },
    {
      title: " Giới ",
      dataIndex: "gioi",
      key: "gioi",
      width: "8%",
    },
    {
      title: " Ngành ",
      dataIndex: "nganh",
      key: "nganh",
      width: "12%",
    },
    {
      title: " Lớp ",
      dataIndex: "lop",
      key: "lop",
      width: "12%",
    },
    {
      title: " Bộ ",
      dataIndex: "bo",
      key: "bo",
      width: "12%",
    },
    {
      title: "  Họ  ",
      dataIndex: "ho",
      key: "ho",
      width: "11%",
    },
    {
      title: "  Chi  ",
      dataIndex: "chi",
      key: "chi",
      width: "9%",
    },
    {
      title: " Hành động ",
      dataIndex: "hanhdong",
      key: "hanhdong",
      width: "7%",
      render: () => {
        return (
          <div className="action">
            <Icon
              path={mdiPencil}
              size={1}
              onClick={(e) => {
                let key = e.target.closest("[data-row-key]");
                key = key.getAttribute("data-row-key");
                console.log(key);
                const getdataOld = async () => {
                  const req = await fetch(
                    `https://wlp.howizbiz.com/api/species/${key}`,
                    {
                      method: "GET",
                      headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                      },
                    }
                  );
                  const res = await req.json();
                  const jsonString = JSON.stringify(res);
                  SaveTokenToLocalStorage("userEdit", jsonString);
                };
                getdataOld();
                navigate("/loai/chi-tiet");
              }}
            />
            <MyDelete />
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    const getdata = async () => {
      const request = await fetch(
        `https://wlp.howizbiz.com/api/species?paginate=true&${changPage}&with=roles,createdBy&search=${search}&inactive=-1`
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
                src={`https://wlp.howizbiz.com${
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
          nganh:
            item.phylumn.ten == null
              ? item.phylumn.ten_khoa_hoc
              : item.phylumn.ten,
          lop:
            item.class.ten == null ? item.class.ten_khoa_hoc : item.class.ten,
          bo:
            item.order.ten == null || item.order.ten === ""
              ? item.order.ten_khoa_hoc
              : item.order.ten,
          ho:
            item.family.ten == null || item.family.ten === ""
              ? item.family.ten_khoa_hoc
              : item.family.ten,
          chi:
            item.genus.ten == null || item.genus.ten === ""
              ? item.genus.ten_khoa_hoc
              : item.genus.ten,
        };
      });
      console.log(danhsach);
      setData(danhsach);
    };
    getdata();
  }, [changPage, search, reloadUser]);
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{
          y: "380px",
          x: "100vh",
        }}
      />
    </>
  );
};
export default MyTable;

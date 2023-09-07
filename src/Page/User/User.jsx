import "./User.scss";
import { Col, Input, Pagination, Row } from "antd";
import { useContext, useEffect, useState } from "react";
import MyModal from "../../Component/Modal/Modal";
import Icon from "@mdi/react";
import { mdiMagnify, mdiSheep } from "@mdi/js";
import MyTable from "./MyTable/MyTable";
import { context } from "../../Hook/UseContext";
import Header from "../../Component/Header/Header";
import Sidebar from "../../Component/Sidebar/Sidebar";

function User() {
  const { total } = useContext(context);
  const [changPage, setChangePage] = useState("page=1&perpage=10");
  const [search, setSearch] = useState("");
  const [resetCurrentPage, setCurrentPage] = useState(1);
  const [perpage, setPerpage] = useState(10);
  useEffect(() => {
    const item = document.querySelectorAll(".sidebar .item");
    item.forEach((i) => {
      i.addEventListener("click", () => {
        item.forEach((i) => {
          const hasClass = i.classList.contains("active");
          if (hasClass) {
            i.classList.remove("active");
          }
        });
        i.classList.add("active");
      });
    });
  }, []);

  return (
    <>
      <Header />
      <div id="container">
        <Row>
          {/* Left */}
          <Sidebar />
          {/* Right  */}
          <Col id="content" flex="auto">
            {/* <MyModal /> */}
            <div className="header">
              <div className="top">
                <Icon path={mdiSheep} size={1} /> <p> Loài nguy cấp quý hiếm</p>
              </div>
              <div className="bottom">
                <div className="search">
                  <Input
                    placeholder="Tìm kiếm theo tên"
                    prefix={<Icon path={mdiMagnify} size={1} />}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setChangePage(`page=1&perpage=${perpage}`);
                      setCurrentPage(1);
                    }}
                  />
                </div>
                <div className="addNew">
                  <MyModal />
                </div>
              </div>
            </div>
            <div className="table">
              <MyTable changPage={changPage} search={search} />
              <Pagination
                className="footer"
                total={total}
                showSizeChanger
                showTotal={(total, range) => `${range[0]}-${range[1]}/${total}`}
                defaultPageSize={10}
                pageSizeOptions={["5", "10", "25", "50"]}
                defaultCurrent={1}
                current={resetCurrentPage}
                onChange={(page, perpage) => {
                  console.log(page + "    " + perpage);
                  setCurrentPage(page);
                  setPerpage(perpage);
                  setChangePage(`page=${page}&perpage=${perpage}`);
                }}
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default User;

import { Col, Row } from "antd";
import Header from "../Header/Header";
import { AppstoreOutlined, BookOutlined, CaretDownOutlined, EditOutlined, ExceptionOutlined, FallOutlined, ProjectOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";

function Sidebar() {
    const [true1, setTrue1] = useState(false);
    const [true2, setTrue2] = useState(false);
  return (
    <>

          <Col className="sidebar" >
            <div className="listItem">
              <div className="item">
                <AppstoreOutlined /> <p>Bảng điều khiển</p>
              </div>
              <div className="item ">
                <UserOutlined /> <p>Quản lý người dùng</p>
              </div>
              <div className="item">
                <ProjectOutlined /> <p>Phân loại học</p>
              </div>
              <div className="item active">
                <FallOutlined /> <p>Loài nguy cấp quý hiếm</p>
              </div>
              <div className="item">
                <EditOutlined /> <p>Bài viết</p>
              </div>

              <div
                className="item true1"
                onClick={() => setTrue1((prev) => !prev)}
              >
                <div className="left">
                  <ExceptionOutlined /> <p>Phiếu đề xuất</p>
                </div>
                <CaretDownOutlined />
              </div>
              {true1 && (
                <div className="sub">
                  <div className="item">
                    <FallOutlined /> <p> Đưa loài vào </p>
                  </div>
                  <div className="item">
                    <EditOutlined /> <p> Đưa loài ra </p>
                  </div>
                  <div className="item">
                    <EditOutlined /> <p> Phiếu thông tin </p>
                  </div>
                </div>
              )}
              <div
                className="item true2"
                onClick={() => setTrue2((prev) => !prev)}
              >
                <div className="left">
                  <BookOutlined />
                  <p> Danh mục</p>
                </div>
                <CaretDownOutlined />
              </div>
              {true2 && (
                <div className="sub">
                  <div className="item">
                    <FallOutlined /> <p> Danh mục tĩnh </p>
                  </div>
                  <div className="item">
                    <EditOutlined /> <p> Danh mục động </p>
                  </div>
                </div>
              )}
            </div>
          </Col>

    </>
  );
}

export default Sidebar;

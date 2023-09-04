import {
  AppstoreOutlined,
  BookOutlined,
  CaretDownOutlined,
  EditOutlined,
  ExceptionOutlined,
  FallOutlined,
  MenuOutlined,
  ProjectOutlined,
  UserOutlined,
} from "@ant-design/icons";

import "./User.scss";
import { Button, Col, Popover, Row } from "antd";
import { useContext, useEffect, useState } from "react";
import MyModal from "../../Component/Modal/Modal";
import { useNavigate } from "react-router-dom";

function User() {
  const [true1, setTrue1] = useState(false);
  const [true2, setTrue2] = useState(false);

  const navigate = useNavigate()
  // const {showModal} = useContext(context)

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

  const content = (
    <div className="inforUser">
      <div className="infor">
        <div className="letter">B</div>
        <div className="name">Ban quản lý dự án</div>
        <div className="subname">Ban quản lý dự án</div>
      </div>
      <div className="switch">
        <div className="left">Hồ sơ</div>
        <div className="right" onClick={() => {
          localStorage.removeItem('accessToken');
          navigate("/")
        }}>Đăng xuất</div>
      </div>
    </div>
  );
  return (
    <>
      <header id="user">
        <div className="icon">
          <MenuOutlined />
        </div>
        <div className="img">
          <img
            src="http://wlp.howizbiz.com/static/img/logoColor.e5de23ce.png"
            alt=""
          />
        </div>
        <div className="title">
          HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM ĐƯỢC ƯU TIÊN
          BẢO VỆ
        </div>

        <div className="user">
          <Popover className="hihi" content={content} trigger="click">
            <button>
              <span>B</span>
              <span>Ban quản lý dự án </span>
            </button>
          </Popover>
        </div>
      </header>
      <div id="container">
        <Row>
          {/* Left */}
          <Col className="sidebar" flex="300px">
            <div className="listItem">
              <div className="item">
                <AppstoreOutlined /> <p>Bảng điều khiển</p>
              </div>
              <div className="item active">
                <UserOutlined /> <p>Quản lý người dùng</p>
              </div>
              <div className="item">
                <ProjectOutlined /> <p>Phân loại học</p>
              </div>
              <div className="item">
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
          {/* Right  */}
          <Col className="content" flex="auto">
            <MyModal />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default User;

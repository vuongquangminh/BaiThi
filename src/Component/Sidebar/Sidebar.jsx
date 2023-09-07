import { Col } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { useState } from "react";
import Icon from "@mdi/react";
import {
  mdiAccount,
  mdiBookMinusOutline,
  mdiBookOutline,
  mdiBookPlusOutline,
  mdiBookSettingsOutline,
  mdiCodeNotEqual,
  mdiLeadPencil,
  mdiSheep,
  mdiSortAscending,
  mdiViewDashboard,
} from "@mdi/js";

function Sidebar() {
  const [true1, setTrue1] = useState(false);
  const [true2, setTrue2] = useState(false);
  return (
    <>
      <Col className="sidebar">
        <div className="listItem">
          <div className="item">
            <Icon path={mdiViewDashboard} size={1} /> <p>Bảng điều khiển</p>
          </div>
          <div className="item ">
            <Icon path={mdiAccount} size={1} /> <p>Quản lý người dùng</p>
          </div>
          <div className="item">
            <Icon path={mdiSortAscending} size={1} /> <p>Phân loại học</p>
          </div>
          <div className="item active">
            <Icon path={mdiSheep} size={1} /> <p>Loài nguy cấp quý hiếm</p>
          </div>
          <div className="item">
            <Icon path={mdiLeadPencil} size={1} /> <p>Bài viết</p>
          </div>

          <div className="item true1" onClick={() => setTrue1((prev) => !prev)}>
            <div className="left">
              <Icon path={mdiCodeNotEqual} size={1} /> <p>Phiếu đề xuất</p>
            </div>
            <CaretDownOutlined />
          </div>
          {true1 && (
            <div className="sub">
              <div className="item">
                <Icon path={mdiBookPlusOutline} size={1} />{" "}
                <p> Đưa loài vào </p>
              </div>
              <div className="item">
                <Icon path={mdiBookMinusOutline} size={1} />{" "}
                <p> Đưa loài ra </p>
              </div>
              <div className="item">
                <Icon path={mdiBookOutline} size={1} /> <p> Phiếu thông tin </p>
              </div>
            </div>
          )}
          <div className="item true2" onClick={() => setTrue2((prev) => !prev)}>
            <div className="left">
              <Icon path={mdiBookSettingsOutline} size={1} />
              <p> Danh mục</p>
            </div>
            <CaretDownOutlined />
          </div>
          {true2 && (
            <div className="sub">
              <div className="item">
                <Icon path={mdiBookPlusOutline} size={1} />{" "}
                <p> Danh mục tĩnh </p>
              </div>
              <div className="item">
                <Icon path={mdiBookMinusOutline} size={1} />{" "}
                <p> Danh mục động </p>
              </div>
            </div>
          )}
        </div>
      </Col>
    </>
  );
}

export default Sidebar;

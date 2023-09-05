import { MenuOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const content = (
    <div className="inforUser">
      <div className="infor">
        <div className="letter">B</div>
        <div className="name">Ban quản lý dự án</div>
        <div className="subname">Ban quản lý dự án</div>
      </div>
      <div className="switch">
        <div className="left">Hồ sơ</div>
        <div
          className="right"
          onClick={() => {
            localStorage.removeItem("accessToken");
            navigate("/");
          }}
        >
          Đăng xuất
        </div>
      </div>
    </div>
  );
  return (
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
        HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM ĐƯỢC ƯU TIÊN BẢO
        VỆ
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
  );
}

export default Header;

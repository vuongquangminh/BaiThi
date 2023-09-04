import { Fragment, useContext, useState } from "react";
import { context } from "../../Hook/UseContext";
import { useNavigate } from "react-router-dom";
import { Button, Input, message, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./Login.scss";

function Login() {
  // localStorage.removeItem('accessToken');
  const { SaveTokenToLocalStorage, setAuthentication, error, contextHolder } =
    useContext(context);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [passError, setPassError] = useState("");
  const navigate = useNavigate();

  const HandleLogin = async () => {
    const url = "http://wlp.howizbiz.com/api/web-authenticate";
    let userData = {
      password: password,
      username: username,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log(data);
    if (data.access_token) {
      const accessToken = data.access_token;
      SaveTokenToLocalStorage("accessToken", accessToken);
      MeData(accessToken);
    } else {
      if (data.errors) {
        data.errors.password && setPassError(data.errors.password[0]);
        data.errors.username && setUserError(data.errors.username[0]);
      } else {
        error(data.message);
      }
    }
  };

  async function MeData(token) {
    const url = "http://wlp.howizbiz.com/api/me";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data.user) {
      setAuthentication(true);
      navigate("/user");
    } else {
      alert("Tài khoản đã hết hạn truy cập!");
    }
  }
  return (
    <Fragment>
      {contextHolder}
      <div id="login">
        <header id="wrapperLogin">
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
        </header>

        <div id="container">
          <div className="form">
            <header>
              <div className="img">
                <img
                  src="http://wlp.howizbiz.com/static/img/logoColor.e5de23ce.png"
                  alt=""
                />
              </div>
              <h3> Đăng nhập </h3>
            </header>
            <div className="username">
              <Input
                placeholder="Tên đăng nhập"
                prefix={<UserOutlined />}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUserError("");
                }}
              />

              <p>{userError}</p>
            </div>
            <div className="password">
              <Input
                type="password"
                placeholder="Mật khẩu"
                prefix={<LockOutlined />}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPassError("");
                }}
              />
              <p>{passError}</p>
            </div>
            <Button type="primary" block onClick={HandleLogin}>
              Đăng nhập
            </Button>
            <Button type="link" block>
              Quên mật khẩu
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;

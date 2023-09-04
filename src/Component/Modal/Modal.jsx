import React, { useContext, useState } from "react";
import { Button, Modal } from "antd";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";

import "./Modal.scss";
import Input from "../Input/Input";
import { context } from "../../Hook/UseContext";

const MyModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultValue, setDefaultValue] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [type, setType] = useState("password");

  const [mobile, setMobile] = useState("");

  const [usernameErrors, setUsernameErrors] = useState("");
  const [emailErrors, setEmailErrors] = useState("");
  const [passwordErrors, setPasswordErrors] = useState("");
  const [mobileErrors, setMobileErrors] = useState("");

  const { GetTokenFromLocalStorage,  passwordsMatch } =
    useContext(context);
  const token = GetTokenFromLocalStorage();

  // data post
  const inforPost = {
    username: username,
    password: password,
    name: "Minh12a33",
    password_confirmation: passwordConfirm,
    email: email,
    mobile: mobile,
    role_ids: [2, 3],
  };
  console.log(inforPost);

  // response Errors
  const inforErrors = {
    usernameErrors: usernameErrors,
    passwordErrors: passwordErrors,
    emailErrors: emailErrors,
    mobileErrors: mobileErrors,
  };

  const showModal = () => {
    setIsModalOpen(true);
    setDefaultValue("");
  };

  //   Demo
  // const dataTest = {
  //   username: "Minhqsdaa12asdasssd3",
  //   name: "Minh123dasdasdssd12",
  //   password: "Minh@123",
  //   password_confirmation: "Minh@123",
  //   email: "minh22a02adasdas22@gmail.com",
  //   mobile: "0982239032",
  //   role_ids: [2, 3],
  // };
  const handleOk = () => {
    const postApi = async () => {
      const req = await fetch("http://wlp.howizbiz.com/api/users", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inforPost),
      });
      const res = await req.json();
      console.log(res);
      if (res.errors) {
        !passwordsMatch && setPasswordErrors("Mật khẩu không trùng khớp")
        // warning Error
        if (res.errors.username) {
          setUsernameErrors(res.errors.username[0]);
        }
        if (res.errors.password) {
          setPasswordErrors(res.errors.password[0]);
        }
        if (res.errors.email) {
          setEmailErrors(res.errors.email[0]);
        }
        if (res.errors.mobile) {
          setMobileErrors(res.errors.mobile[0]);
        }
        // setIsModalOpen(true)
      } else {
        setIsModalOpen(() => {
          // Reset value & errors\
          setUsername("");
          setEmail("");
          setPassword("");
          setpasswordConfirm("");
          setMobile("");

          setUsernameErrors("");
          setPasswordErrors("");
          setEmailErrors("");
          setMobileErrors("");
          return false;
        });
      }
    };
    

    postApi()

    // passwordsMatch ? postApi() : setPasswordErrors("Mật khẩu không trùng khớp");
  };
  const handleCancel = () => {
    setIsModalOpen(() => {
      // Reset value & errors
      setUsername("");
      setEmail("");
      setPassword("");
      setpasswordConfirm("");
      setMobile("");

      setUsernameErrors("");
      setPasswordErrors("");
      setEmailErrors("");
      setMobileErrors("");
      return false;
    });
  };
  return (
    <>
      <Button className="buttonAdd" type="primary" onClick={showModal}>
        <PlusOutlined /> Thêm mới
      </Button>
      <Modal
        className="modalAdd"
        open={isModalOpen}
        closeIcon={null}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={
          <div type="primary" className="confirm">
            <PlusOutlined /> Thêm mới
          </div>
        }
        cancelText="Hủy"
      >
        <p>Thêm mới người dùng</p>
        <div className="content">
          <Input
            label={"username"}
            defaultValue={defaultValue}
            eventSet={setUsername}
            value={username}
            error={inforErrors.usernameErrors}
            onChangeErrors = {setUsernameErrors}
          />
          <Input
            label={"E-Mail"}
            defaultValue={defaultValue}
            eventSet={setEmail}
            value={email}
            error={inforErrors.emailErrors}
            onChangeErrors = {setEmailErrors}

          />
          <Input
            label={"password"}
            defaultValue={defaultValue}
            eventSet={setPassword}
            value={password}
            type={type}
            setType={setType}
            icon={
              <EyeOutlined
                onClick={() => {
                  if (type === "password") {
                    setType("text");
                  } else {
                    setType("password");
                  }
                }}
              />
            }
            setPasswordErrors={setPasswordErrors}
            passwordConfirm={passwordConfirm}
            error={inforErrors.passwordErrors}
            onChangeErrors = {setPasswordErrors}

          />
          <Input
            label={"confirm Password"}
            defaultValue={defaultValue}
            eventSet={setpasswordConfirm}
            value={passwordConfirm}
            type={type}
            setType={setType}
            icon={
              <EyeOutlined
                onClick={() => {
                  if (type === "password") {
                    setType("text");
                  } else {
                    setType("password");
                  }
                }}
              />
            } 
            setPasswordErrors={setPasswordErrors}
            passwordConfirm={password}
            error={inforErrors.passwordErrors}
            onChangeErrors = {setPasswordErrors}

          />
          <Input
            label={"Mobile"}
            defaultValue={defaultValue}
            eventSet={setMobile}
            value={mobile}
            error={inforErrors.mobileErrors}
            onChangeErrors = {setMobileErrors}
          />
        </div>
      </Modal>
    </>
  );
};
export default MyModal;

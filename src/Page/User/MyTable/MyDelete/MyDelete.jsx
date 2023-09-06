import React, { useContext, useState } from "react";
import { Button, Modal } from "antd";
import Icon from "@mdi/react";
import { mdiDeleteOutline } from "@mdi/js";
import "./MyDelete.scss";
import { context } from "../../../../Hook/UseContext";
const MyDelete = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [key, setKey] = useState('')
  const [text, setText] = useState('')
  const { setTotal, GetTokenFromLocalStorage, setReloadUser, reloadUser } =
    useContext(context);
  const token = GetTokenFromLocalStorage("accessToken");
  const showModal = (e) => {
    setIsModalOpen(true);
    let key = e.target.closest("[data-row-key]");
    
    setText(key.querySelector('.tenCol p').textContent)
    key = key.getAttribute("data-row-key");
    setKey(key)
    //
  };
  const handleOk = (e) => {
    setIsModalOpen(false);
    const deleteApi = async () => {
      const req = await fetch(`https://wlp.howizbiz.com/api/species/${key}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const res = await req.json();
      console.log(res);
      setReloadUser((prev) => prev + 1);
    };
    deleteApi();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Icon path={mdiDeleteOutline} size={1} onClick={showModal} />
      <Modal
        className="modaldelete"
        title=" Bạn có chắc chắn không? "
        open={isModalOpen}
        onOk={handleOk}
        okText=" Áp dụng "
        cancelText=" Không "
        onCancel={handleCancel}
      >
        <p>
          Bạn có chắc muốn xóa <b>{text}</b>? Điều này hoàn toàn không thế hoàn
          tác!
        </p>
      </Modal>
    </>
  );
};
export default MyDelete;

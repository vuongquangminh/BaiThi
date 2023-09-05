import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import "./Modal.scss";
import { useNavigate } from "react-router-dom";

const MyModal = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        className="buttonAdd"
        type="primary"
        onClick={() => {
          navigate("/loai/them-moi");
        }}
      >
        <PlusOutlined /> Thêm mới
      </Button>
    </>
  );
};
export default MyModal;

import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Pagination,
  QRCode,
  Row,
  Select,
  Switch,
} from "antd";
import Header from "../../Component/Header/Header";
import Sidebar from "../../Component/Sidebar/Sidebar";
import Icon from "@mdi/react";
import { mdiArrowLeft, mdiMagnify, mdiSheep } from "@mdi/js";

import "./AddNew.scss";
import { useContext, useEffect, useState } from "react";
import { context } from "../../Hook/UseContext";
import { useNavigate } from "react-router-dom";

function AddNew() {
  const [gioi, setGioi] = useState([]);
  const [nganh, setNganh] = useState([]);
  const [lop, setLop] = useState([]);
  const [bo, setBo] = useState([]);
  const [ho, setHo] = useState([]);
  const [chi, setChi] = useState([]);
  const [sachDo, setSachdo] = useState([]);
  const [UICN, setUICN] = useState([]);

  const [Errten, setErrTen] = useState('')
  const [Errtenkhoahoc, setErrTenkhoahoc] = useState(false)

  const [tenkhoahoc, setTenkhoahoc] = useState('');

  const [valueGioi, setValueGioi] = useState([]);
  const [valueNganh, setValueNganh] = useState([]);
  const [valueLop, setValueLop] = useState([]);
  const [valueBo, setValueBo] = useState([]);
  const [valueHo, setValueHo] = useState([]);
  const [valueChi, setValueChi] = useState([]);

  const navigate = useNavigate()
  const nam = [
    { nam: "2023" },
    { nam: "2022" },
    { nam: "2021" },
    { nam: "2020" },
    { nam: "2019" },
    { nam: "2018" },
    { nam: "2017" },
    { nam: "2016" },
    { nam: "2015" },
    { nam: "2014" },
    { nam: "2013" },
    { nam: "2012" },
    { nam: "2011" },
    { nam: "2010" },
    { nam: "2009" },
    { nam: "2008" },
    { nam: "2007" },
    { nam: "2006" },
    { nam: "2005" },
    { nam: "2004" },
    { nam: "2003" },
    { nam: "2002" },
    { nam: "2001" },
    { nam: "2000" },
    { nam: "1999" },
    { nam: "1998" },
    { nam: "1997" },
  ];

  const { GetTokenFromLocalStorage, succes } = useContext(context);
  const token = GetTokenFromLocalStorage();
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  const handeSubmit = (value) => {
    console.log(value)
    const dataPost = {
      ten: value.ten,
      ten_khoa_hoc: tenkhoahoc,
      ten_tac_gia: value.ten_tac_gia,
      ten_dia_phuong: value.ten_dia_phuong,
      nguon_du_lieu: value.nguon_du_lieu,
      kingdom_id: value.kingdom_id,
      phylum_id: value.phylumn_id,
      class_id: value.class_id,
      order_id: value.order_id,
      family_id: value.family_id,
      genus_id: value.genus_id,
      iucns: [{ nam: value.nam_of_iucns, id: value.UICN }],
      sach_dos: [{ nam: value.nam_of_sachdo, id: value.sach_do }],
      toa_dos: []
    };
    console.log(dataPost);
    const PostApi = async () => {
      const req = await fetch("http://wlp.howizbiz.com/api/species", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataPost),
      });
      const res = await req.json()
      console.log(res)
      if(res.errors) {
        setErrTenkhoahoc(true)
      }
      else {
        navigate('/user')
        setErrTenkhoahoc(false)
      }
    //   if(res.errors) {
    //     succes()
    //   } else {
    //     res.errors.ten && setErrTen(res.errors.ten[0])
    //     res.errors.ten_khoa_hoc && setErrTenkhoahoc(res.errors.ten_khoa_hoc[0])
    //     res.errors.kingdom_id && setErrGioi(res.errors.kingdom_id[0])
    //     res.errors.phylum_id && setErrNganh(res.errors.phylum_id[0])
    //     res.errors.class_id && setErrLop(res.errors.class_id[0])
    //     res.errors.order_id && setErrBo(res.errors.order_id[0])
    //     res.errors.family_id && setErrHo(res.errors.family_id[0])
    //     res.errors.genus_id && setErrChi(res.errors.genus_id[0])

        
    //   }
    };
    PostApi();
  };
  useEffect(() => {
    const getGioi = async () => {
      const req = await fetch(
        "http://wlp.howizbiz.com/api/phanloaihoc?ranks[]=Kingdom",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const res = await req.json();
      setGioi(res);
    };
    getGioi();
    const getNganh = async () => {
      const req = await fetch(
        "http://wlp.howizbiz.com/api/phanloaihoc?ranks[]=Phylum",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const res = await req.json();
      const data = res.filter((item) => item.parent_id === valueGioi);
      setNganh(data);
    };
    getNganh();
    const getLop = async () => {
      const req = await fetch(
        "http://wlp.howizbiz.com/api/phanloaihoc?ranks[]=Class",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const res = await req.json();
      const data = res.filter((item) => item.parent_id === valueNganh);

      setLop(data);
    };
    getLop();
    const getBo = async () => {
      const req = await fetch(
        "http://wlp.howizbiz.com/api/phanloaihoc?ranks[]=Order",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const res = await req.json();
      const data = res.filter((item) => item.parent_id === valueLop);

      setBo(data);
    };
    getBo();
    const getHo = async () => {
      const req = await fetch(
        "http://wlp.howizbiz.com/api/phanloaihoc?ranks[]=Family",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const res = await req.json();
      const data = res.filter((item) => item.parent_id === valueBo);

      setHo(data);
    };
    getHo();
    const getChi = async () => {
      const req = await fetch(
        "http://wlp.howizbiz.com/api/phanloaihoc?ranks[]=Genus",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const res = await req.json();
      const data = res.filter((item) => item.parent_id === valueHo);
      setChi(data);
    };
    getChi();

    const getSachDo = async () => {
      const req = await fetch(
        "http://wlp.howizbiz.com/api/danhmuccha?ma_danh_mucs[]=REDBOOK"
      );
      const res = await req.json();
      setSachdo(res[0].childs);
    };
    getSachDo();
    const getUICN = async () => {
      const req = await fetch(
        "http://wlp.howizbiz.com/api/danhmuccha?ma_danh_mucs[]=IUCN"
      );
      const res = await req.json();
      setUICN(res[0].childs);
      // console.log(res)
    };
    getUICN();
  }, [valueGioi, valueNganh, valueLop, valueBo, valueHo, valueChi]);
  return (
    <>
      <Header />
      <div id="container">
        <Row>
          {/* Left */}
          <Sidebar />
          {/* Right  */}
          <Col id="contentAdd" flex="auto">
            <div className="headerAdd">
              <div className="topAdd">
                <Icon path={mdiArrowLeft} size={1.5} />{" "}
                <p>
                  {" "}
                  THÔNG TIN VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM CẦN ĐƯỢC ƯU
                  TIÊN BẢO VỆ{" "}
                </p>
              </div>
              <p>I. Thông tin chung về loài</p>
            </div>
            <Form
              onFinish={handeSubmit}
              name="wrap"
              layout="vertical"
              wrapperCol={{
                flex: 1,
              }}
            >
              <div className="formAdd1">
                <div className="wrapForm">
                  <div className="left">
                    <Form.Item
                      label="Tên"
                      name="ten"
                      rules={[
                        {
                          required: true,
                          message: 'Trường tên không được bỏ trống.',

                        },
                      ]}
                    >
                      <Input  placeholder="Tên"/>
                    </Form.Item>

                    <Row>
                      <Col span={12}>
                        <Form.Item
                          label="Tên khoa học "
                          name="ten_khoa_hoc"
                          rules={[
                            {
                              required: true,
                              message: 'Trường tên khoa học không được bỏ trống.',
                            },
                          ]}
                        >
                          <Input placeholder="Tên khoa học" onChange={(e) => setTenkhoahoc(e.target.value)}/>
                          {Errtenkhoahoc && <span style={{color: 'red'}}>Trường tên khoa học đã có trong hệ thống.</span>}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label=" Tên tác giả  " name="ten_tac_gia">
                          <Input placeholder="Tên tác giả"/>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item label=" Tên địa phương " name="ten_dia_phuong">
                      <Input placeholder="Tên địa phương"/>
                    </Form.Item>
                    <Form.Item label=" Nguồn dữ liệu " name="nguon_du_lieu">
                      <Input placeholder="Nguồn dữ liệu"/>
                    </Form.Item>
                  </div>
                  <div className="right">
                    <Form.Item label="Trang thai">
                      <Switch defaultChecked onChange={(e) => e.checked} />;
                    </Form.Item>
                    <div className="bottom">
                      <QRCode
                        type="canvas"
                        value="http://wlp.howizbiz.com/loai/them-moi"
                      />
                      <div className="bottomRight">
                        <Form.Item label="QRCode">
                          <Switch
                            defaultChecked
                            onChange={(e) => console.log(e)}
                          />
                          ;
                        </Form.Item>
                        <Form.Item>
                          <Checkbox onChange={onChange}>Checkbox</Checkbox>;
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="formAdd2">
                <p>II. Phân loại học</p>
                <div className="body2">
                  <Form.Item
                    label=" Giới  "
                    name="kingdom_id"
                    rules={[
                      {
                        required: true,
                        message: 'Trường giới không được bỏ trống.'
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      onChange={(value) => {
                        setValueGioi(value);
                      }}
                      placeholder="Giới"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      // filterSort={(optionA, optionB) =>
                      //   (optionA?.label ?? "")
                      //     .toLowerCase()
                      //     .localeCompare((optionB?.label ?? "").toLowerCase())
                      // }
                      options={gioi.map((item) => {
                        return {
                          value: item.uuid,
                          label: `${item.ten_khoa_hoc} - ${item.ten}`,
                        };
                      })}
                    />
                  </Form.Item>
                  <Form.Item
                    label=" Ngành  "
                    name="phylumn_id"
                    rules={[
                      {
                        required: true,
                        message: 'Trường ngành không được bỏ trống.',
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      onChange={(value) => {
                        setValueNganh(value);
                      }}
                      placeholder="Ngành"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      // filterSort={(optionA, optionB) =>
                      //   (optionA?.label ?? "")
                      //     .toLowerCase()
                      //     .localeCompare((optionB?.label ?? "").toLowerCase())
                      // }
                      options={nganh.map((item) => {
                        return {
                          value: item.uuid,
                          parent_id: item.parent_id,
                          label: `${item.ten_khoa_hoc} - ${item.ten}`,
                        };
                      })}
                    />
                  </Form.Item>
                  <Form.Item
                    label=" Lớp  "
                    name="class_id"
                    rules={[
                      {
                        required: true,
                        message: 'Trường lớp không được bỏ trống.'
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      onChange={(value) => {
                        setValueLop(value);
                      }}
                      placeholder="Lớp"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      // filterSort={(optionA, optionB) =>
                      //   (optionA?.label ?? "")
                      //     .toLowerCase()
                      //     .localeCompare((optionB?.label ?? "").toLowerCase())
                      // }
                      options={lop.map((item) => {
                        return {
                          value: item.uuid,
                          parent_id: item.parent_id,
                          label: `${item.ten_khoa_hoc} - ${item.ten}`,
                        };
                      })}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Bộ  "
                    name="order_id"
                    rules={[
                      {
                        required: true,
                        message: 'Trường bộ không được bỏ trống.'
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      onChange={(value) => {
                        setValueBo(value);
                      }}
                      placeholder="Bộ"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      // filterSort={(optionA, optionB) =>
                      //   (optionA?.label ?? "")
                      //     .toLowerCase()
                      //     .localeCompare((optionB?.label ?? "").toLowerCase())
                      // }
                      options={bo.map((item) => {
                        return {
                          value: item.uuid,
                          parent_id: item.parent_id,
                          label: `${item.ten_khoa_hoc} - ${item.ten}`,
                        };
                      })}
                    />
                  </Form.Item>
                  <Form.Item
                    label=" Họ  "
                    name="family_id"
                    rules={[
                      {
                        required: true,
                        message: 'Trường họ không được bỏ trống.'
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      onChange={(value) => {
                        setValueHo(value);
                      }}
                      placeholder="Họ"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      // filterSort={(optionA, optionB) =>
                      //   (optionA?.label ?? "")
                      //     .toLowerCase()
                      //     .localeCompare((optionB?.label ?? "").toLowerCase())
                      // }
                      options={ho.map((item) => {
                        return {
                          value: item.uuid,
                          parent_id: item.parent_id,
                          label: `${item.ten_khoa_hoc} - ${item.ten}`,
                        };
                      })}
                    />
                  </Form.Item>
                  <Form.Item
                    label=" Chi  "
                    name="genus_id"
                    rules={[
                      {
                        required: true,
                        message: 'Trường chi không được bỏ trống.'
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      onChange={(value) => {
                        setValueChi(value);
                      }}
                      placeholder="Chi"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      // filterSort={(optionA, optionB) =>
                      //   (optionA?.label ?? "")
                      //     .toLowerCase()
                      //     .localeCompare((optionB?.label ?? "").toLowerCase())
                      // }
                      options={chi.map((item) => {
                        return {
                          value: item.uuid,
                          label: `${item.ten_khoa_hoc} - ${item.ten}`,
                        };
                      })}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="formAdd3">
                <p> III. Tình trạng bảo tồn </p>
                <div className="body3">
                  <div className="left3">
                    <div className="head3"> Sách đỏ </div>
                    <div className="bottom3">
                      <Form.Item label="  Năm   " name="nam_of_sachdo">
                        <Select
                          showSearch
                          onChange={(value) => {
                            // setValueGioi(value);
                            console.log(value);
                          }}
                          placeholder="Search to Select"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            (option?.label ?? "").includes(input)
                          }
                          // filterSort={(optionA, optionB) =>
                          //   (optionA?.label ?? "")
                          //     .toLowerCase()
                          //     .localeCompare((optionB?.label ?? "").toLowerCase())
                          // }
                          options={nam.map((item) => {
                            return {
                              value: item.nam,
                              //   label: `${item.ten_khoa_hoc} - ${item.ten}`,
                            };
                          })}
                        />
                      </Form.Item>
                      <Form.Item label="  Hiện trạng   " name="sach_do">
                        <Select
                          showSearch
                          onChange={(value) => {
                            // setValueGioi(value);
                            console.log(value);
                          }}
                          placeholder="Search to Select"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            (option?.label ?? "").includes(input)
                          }
                          // filterSort={(optionA, optionB) =>
                          //   (optionA?.label ?? "")
                          //     .toLowerCase()
                          //     .localeCompare((optionB?.label ?? "").toLowerCase())
                          // }
                          options={sachDo.map((item) => {
                            return {
                              value: item.id,
                              label: `${item.ma_danh_muc} - ${item.ten}`,
                            };
                          })}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="right3">
                    <div className="head3"> IUCN </div>
                    <div className="bottom3">
                      <Form.Item label=" Năm  " name="nam_of_iucns">
                        <Select
                          showSearch
                          onChange={(value) => {
                            // setValueGioi(value);
                            console.log(value);
                          }}
                          placeholder="Search to Select"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            (option?.label ?? "").includes(input)
                          }
                          // filterSort={(optionA, optionB) =>
                          //   (optionA?.label ?? "")
                          //     .toLowerCase()
                          //     .localeCompare((optionB?.label ?? "").toLowerCase())
                          // }
                          options={nam.map((item) => {
                            return {
                              value: item.nam,
                            };
                          })}
                        />
                      </Form.Item>
                      <Form.Item label="  Hiện trạng   " name="UICN">
                        <Select
                          showSearch
                          onChange={(value) => {
                            // setValueGioi(value);
                            console.log(value);
                          }}
                          placeholder="Search to Select"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            (option?.label ?? "").includes(input)
                          }
                          // filterSort={(optionA, optionB) =>
                          //   (optionA?.label ?? "")
                          //     .toLowerCase()
                          //     .localeCompare((optionB?.label ?? "").toLowerCase())
                          // }
                          options={UICN.map((item) => {
                            return {
                              value: item.id,
                              label: `${item.ma_danh_muc} - ${item.ten}`,
                            };
                          })}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
              <Form.Item label="">
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AddNew;

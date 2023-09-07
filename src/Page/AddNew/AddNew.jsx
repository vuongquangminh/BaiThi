import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Input, QRCode, Row, Select, Switch } from "antd";
import Icon from "@mdi/react";
import { mdiArrowLeft, mdiClose } from "@mdi/js";

import Header from "../../Component/Header/Header";
import Sidebar from "../../Component/Sidebar/Sidebar";
import { context } from "../../Hook/UseContext";
import "./AddNew.scss";

function AddNew() {
  const { GetTokenFromLocalStorage, success, contextHolder, nam } = useContext(context);
  const token = GetTokenFromLocalStorage("accessToken");
  const userEdit = GetTokenFromLocalStorage("userEdit");
  console.log("jkkkkkk", JSON.parse(userEdit));

  // InitValue Phan loai
  const [initKingdom, setInitKingdom] = useState("");
  const [initPhylumn, setInitPhylumn] = useState("");
  const [initClass, setInitClass] = useState("");
  const [initOrder, setInitOrder] = useState("");
  const [initFamily, setInitFamily] = useState("");
  const [initGunes, setInitGunes] = useState("");
  const [initTen, setInitTen] = useState("");
  const [initTendiaphuong, setInitTendiaphuong] = useState("");
  const [initTentacgia, setInitTentacgia] = useState("");
  const [initTenkhoahoc, setInitTenkhoahoc] = useState("");
  const [initNguondulieu, setInitNguondulieu] = useState("");

  // InitValue phan 3
  const [initSachdoNam, setInitSachdoNam] = useState("");
  const [initSachdoTen, setInitSachdoTen] = useState("");
  const [initUicnsNam, setInitUicnsNam] = useState("");
  const [initUicnsTen, setInitUicnsTen] = useState("");
  const [initUicnsId, setInitUicnsId] = useState("");
  const [initSachdoId, setInitSachdosId] = useState("");

  // Errors
  const [errTen, setErrTen] = useState(false);
  const [errTenkhoahoc, setErrTenkhoahoc] = useState("");
  const [errKingdom, setErrKingdom] = useState("");
  const [errPhylumn, setErrPhylumn] = useState("");
  const [errClass, setErrClass] = useState("");
  const [errOrder, setErrOrder] = useState("");
  const [errFamily, setErrFamily] = useState("");
  const [errGenus, setErrGenus] = useState("");

  // List option
  const [gioi, setGioi] = useState([]);
  const [nganh, setNganh] = useState([]);
  const [lop, setLop] = useState([]);
  const [bo, setBo] = useState([]);
  const [ho, setHo] = useState([]);
  const [chi, setChi] = useState([]);
  const [sachDo, setSachdo] = useState([]);
  const [UICN, setUICN] = useState([]);

  //ValueID
  const [valueGioi, setValueGioi] = useState([]);
  const [valueNganh, setValueNganh] = useState([]);
  const [valueLop, setValueLop] = useState([]);
  const [valueBo, setValueBo] = useState([]);
  const [valueHo, setValueHo] = useState([]);
  const [valueChi, setValueChi] = useState([]);

  const navigate = useNavigate();

  const handeSubmit = () => {
    const dataPost = {
      ten: initTen,
      ten_khoa_hoc: initTenkhoahoc,
      ten_tac_gia: initTentacgia,
      ten_dia_phuong: initTendiaphuong,
      nguon_du_lieu: initNguondulieu,
      kingdom_id: valueGioi,
      phylum_id: valueNganh,
      class_id: valueLop,
      order_id: valueBo,
      family_id: valueHo,
      genus_id: valueChi,
      iucns: [{ nam: initUicnsNam, id: initUicnsId }],
      sach_dos: [{ nam: initSachdoNam, id: initSachdoId }],
      toa_dos: [],
    };
    console.log(dataPost);
    const PostApi = async () => {
      const req = await fetch(`https://wlp.howizbiz.com/api/species`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataPost),
      });
      const res = await req.json();
      console.log(res);
      if (res.errors || res.debug) {
        if (res.errors.ten) {
          setErrTen(res.errors.ten);
        }
        if (res.errors.ten_khoa_hoc) {
          setErrTenkhoahoc(res.errors.ten_khoa_hoc[0]);
        }
        if (res.errors.kingdom_id) {
          setErrKingdom(res.errors.kingdom_id[0]);
        }
        if (res.errors.phylum_id) {
          setErrPhylumn(res.errors.phylum_id[0]);
        }
        if (res.errors.class_id) {
          setErrClass(res.errors.class_id[0]);
        }
        if (res.errors.order_id) {
          setErrOrder(res.errors.order_id[0]);
        }
        if (res.errors.family_id) {
          setErrFamily(res.errors.family_id[0]);
        }
        if (res.errors.genus_id) {
          setErrGenus(res.errors.genus_id[0]);
        }
      } else {
        success(res.message);
        setTimeout(() => {
          navigate("/user");
        }, 2000);
        setErrTenkhoahoc(false);
      }
    };
    PostApi();
  };
  useEffect(() => {
    const getGioi = async () => {
      const req = await fetch(
        "https://wlp.howizbiz.com/api/phanloaihoc?ranks[]=Kingdom",
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
        "https://wlp.howizbiz.com/api/phanloaihoc?ranks[]=Phylum",
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
        "https://wlp.howizbiz.com/api/phanloaihoc?ranks[]=Class",
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
        "https://wlp.howizbiz.com/api/phanloaihoc?ranks[]=Order",
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
        "https://wlp.howizbiz.com/api/phanloaihoc?ranks[]=Family",
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
        "https://wlp.howizbiz.com/api/phanloaihoc?ranks[]=Genus",
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
        "https://wlp.howizbiz.com/api/danhmuccha?ma_danh_mucs[]=REDBOOK"
      );
      const res = await req.json();
      setSachdo(res[0].childs);
    };
    getSachDo();
    const getUICN = async () => {
      const req = await fetch(
        "https://wlp.howizbiz.com/api/danhmuccha?ma_danh_mucs[]=IUCN"
      );
      const res = await req.json();
      setUICN(res[0].childs);
    };
    getUICN();
  }, [valueGioi, valueNganh, valueLop, valueBo, valueHo, valueChi]);
  return (
    <>
      {contextHolder}
      <Header />
      <div id="container">
        <Row>
          {/* Left */}
          <Sidebar />
          {/* Right  */}
          <Col id="contentAdd" flex="auto">
            <div className="headerAdd">
              <div className="topAdd">
                <Icon
                  path={mdiArrowLeft}
                  size={1.5}
                  onClick={() => {
                    navigate("/user");
                  }}
                />{" "}
                <p>
                  {" "}
                  THÔNG TIN VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM CẦN ĐƯỢC ƯU
                  TIÊN BẢO VỆ{" "}
                </p>
              </div>
              <p>I. Thông tin chung về loài</p>
            </div>

            <div className="formAdd1">
              <div className="wrapForm">
                <div className="left">
                  <p>Tên</p> <span className="warning">*</span>
                  <Input
                    value={initTen}
                    placeholder="Tên"
                    onChange={(e) => {
                      setInitTen(e.target.value);
                      setErrTen(false);
                    }}
                  />
                  <span>{errTen}</span>
                  <Row>
                    <Col span={12}>
                      <p>Tên khoa học</p> <span className="warning">*</span>
                      <Input
                        value={initTenkhoahoc}
                        placeholder="Tên khoa học"
                        onChange={(e) => {
                          setInitTenkhoahoc(e.target.value);
                          setErrTenkhoahoc(false);
                        }}
                      />
                      <span>{errTenkhoahoc}</span>
                    </Col>
                    <Col span={12}>
                      <p>Tên tác giả</p>

                      <Input
                        value={initTentacgia}
                        placeholder="Tên tác giả"
                        onChange={(e) => {
                          setInitTentacgia(e.target.value);
                        }}
                      />
                    </Col>
                  </Row>
                  <p>Tên địa phương</p>
                  <Input
                    value={initTendiaphuong}
                    placeholder="Tên địa phương"
                    onChange={(e) => {
                      setInitTendiaphuong(e.target.value);
                    }}
                  />
                  <p>Nguồn dữ liệu</p>
                  <Input
                    value={initNguondulieu}
                    placeholder="Nguồn dữ liệu"
                    onChange={(e) => {
                      setInitNguondulieu(e.target.value);
                    }}
                  />
                </div>
                <div className="right">
                  <div className="bottom">
                    <QRCode
                      type="canvas"
                      value="https://wlp.howizbiz.com/loai/them-moi"
                    />
                    <div className="bottomRight">
                      <span>Trang Thai</span>
                      <Switch defaultChecked onChange={(e) => console.log(e)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="formAdd2">
              <p>II. Phân loại học</p>
              <div className="body2">
                <div className="inputPhanloai">
                  <div className="sub">
                    <p>Giới</p> <span className="warning">*</span>
                  </div>

                  <div className="bodyInput">
                    <Select
                      showSearch
                      value={initKingdom}
                      suffixIcon=""
                      onChange={(value, option) => {
                        setValueGioi(value);
                        setInitKingdom(option.label);
                        setInitPhylumn("");
                        setInitClass("");
                        setInitOrder("");
                        setInitFamily("");
                        setInitGunes("");
                        setErrKingdom("");

                        setValueNganh("");
                        setValueLop("");
                        setValueBo("");
                        setValueHo("");
                        setValueChi("");
                      }}
                      placeholder="Giới"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      options={gioi.map((item) => {
                        return {
                          value: item.uuid,
                          label: `${item.ten_khoa_hoc} ${
                            item.ten === null || item.ten === ""
                              ? ""
                              : "- " + item.ten
                          }`,
                        };
                      })}
                    />
                    <Icon
                      path={mdiClose}
                      size={1}
                      onClick={() => {
                        setValueGioi("");
                        setValueNganh("");
                        setValueLop("");
                        setValueBo("");
                        setValueHo("");
                        setValueChi("");

                        setInitKingdom("");
                        setInitPhylumn("");
                        setInitClass("");
                        setInitOrder("");
                        setInitFamily("");
                        setInitGunes("");
                        setErrKingdom("");
                      }}
                    />
                  </div>
                  <span>{errKingdom}</span>
                </div>
                <div className="inputPhanloai">
                  <div className="sub">
                    <p>Ngành </p> <span className="warning">*</span>
                  </div>
                  <div className="bodyInput">
                    <Select
                      showSearch
                      value={initPhylumn}
                      suffixIcon=""
                      onChange={(value, option) => {
                        setValueNganh(value);
                        setInitPhylumn(option.label);
                        setValueLop("");
                        setValueBo("");
                        setValueHo("");
                        setValueChi("");

                        setInitClass("");
                        setInitOrder("");
                        setInitFamily("");
                        setInitGunes("");
                        setErrPhylumn("");
                      }}
                      placeholder="Ngành"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      options={nganh.map((item) => {
                        return {
                          value: item.uuid,
                          parent_id: item.parent_id,
                          label: `${item.ten_khoa_hoc} ${
                            item.ten === null || item.ten === ""
                              ? ""
                              : "- " + item.ten
                          }`,
                        };
                      })}
                    />
                    <Icon
                      path={mdiClose}
                      size={1}
                      onClick={() => {
                        setValueNganh("");
                        setValueLop("");
                        setValueBo("");
                        setValueHo("");
                        setValueChi("");

                        setInitPhylumn("");
                        setInitClass("");
                        setInitOrder("");
                        setInitFamily("");
                        setInitGunes("");
                        setErrKingdom("");
                      }}
                    />
                  </div>
                  <span>{errPhylumn}</span>
                </div>
                <div className="inputPhanloai">
                  <div className="sub">
                    <p>Lớp </p> <span className="warning">*</span>
                  </div>
                  <div className="bodyInput">
                    <Select
                      showSearch
                      value={initClass}
                      suffixIcon=""
                      onChange={(value, option) => {
                        setValueLop(value);
                        setInitClass(option.label);

                        setValueBo("");
                        setValueHo("");
                        setValueChi("");

                        setInitOrder("");
                        setInitFamily("");
                        setInitGunes("");
                        setErrClass("");
                      }}
                      placeholder="Lớp"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      options={lop.map((item) => {
                        return {
                          value: item.uuid,
                          parent_id: item.parent_id,
                          label: `${item.ten_khoa_hoc} ${
                            item.ten === null || item.ten === ""
                              ? ""
                              : "- " + item.ten
                          }`,
                        };
                      })}
                    />
                    <Icon
                      path={mdiClose}
                      size={1}
                      onClick={() => {
                        setValueLop("");
                        setValueBo("");
                        setValueHo("");
                        setValueChi("");

                        setInitClass("");
                        setInitOrder("");
                        setInitFamily("");
                        setInitGunes("");
                        setErrKingdom("");
                      }}
                    />
                  </div>
                  <span>{errClass}</span>
                </div>
                <div className="inputPhanloai">
                  <div className="sub">
                    <p>Bộ </p> <span className="warning">*</span>
                  </div>
                  <div className="bodyInput">
                    <Select
                      showSearch
                      value={initOrder}
                      suffixIcon=""
                      onChange={(value, option) => {
                        setValueBo(value);
                        setInitOrder(option.label);
                        setValueHo("");
                        setValueChi("");

                        setInitFamily("");
                        setInitGunes("");
                        setErrOrder("");
                      }}
                      placeholder="Bộ"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      options={bo.map((item) => {
                        return {
                          value: item.uuid,
                          parent_id: item.parent_id,
                          label: `${item.ten_khoa_hoc} ${
                            item.ten === null || item.ten === ""
                              ? ""
                              : "- " + item.ten
                          }`,
                        };
                      })}
                    />
                    <Icon
                      path={mdiClose}
                      size={1}
                      onClick={() => {
                        setValueBo("");
                        setValueHo("");
                        setValueChi("");

                        setInitOrder("");
                        setInitFamily("");
                        setInitGunes("");
                        setErrOrder("");
                      }}
                    />
                  </div>
                  <span>{errOrder}</span>
                </div>
                <div className="inputPhanloai">
                  <div className="sub">
                    <p> Họ </p> <span className="warning">*</span>
                  </div>
                  <div className="bodyInput">
                    <Select
                      showSearch
                      value={initFamily}
                      suffixIcon=""
                      onChange={(value, option) => {
                        setValueHo(value);
                        setInitFamily(option.label);
                        setValueChi("");
                        setInitGunes("");
                        setErrFamily("");
                      }}
                      placeholder="Họ"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      options={ho.map((item) => {
                        return {
                          value: item.uuid,
                          parent_id: item.parent_id,
                          label: `${item.ten_khoa_hoc} ${
                            item.ten === null || item.ten === ""
                              ? ""
                              : "- " + item.ten
                          }`,
                        };
                      })}
                    />
                    <Icon
                      path={mdiClose}
                      size={1}
                      onClick={() => {
                        setValueHo("");
                        setValueChi("");
                        setInitFamily("");
                        setInitGunes("");
                        setErrFamily("");
                      }}
                    />
                  </div>
                  <span>{errFamily}</span>
                </div>
                <div className="inputPhanloai">
                  <div className="sub">
                    <p>Chi </p> <span className="warning">*</span>
                  </div>
                  <div className="bodyInput">
                    <Select
                      showSearch
                      value={initGunes}
                      suffixIcon=""
                      onChange={(value, option) => {
                        setValueChi(value);
                        setInitGunes(option.label);
                        setErrGenus("");
                      }}
                      placeholder="Chi"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      options={chi.map((item) => {
                        return {
                          value: item.uuid,
                          label: `${item.ten_khoa_hoc} ${
                            item.ten === null || item.ten === ""
                              ? ""
                              : "- " + item.ten
                          }`,
                        };
                      })}
                    />
                    <Icon
                      path={mdiClose}
                      size={1}
                      onClick={() => {
                        setValueChi("");
                        setInitGunes("");
                        setErrGenus("");
                      }}
                    />
                  </div>
                  <span>{errGenus}</span>
                </div>
              </div>
            </div>
            <div className="formAdd3">
              <p> III. Tình trạng bảo tồn </p>
              <div className="body3">
                <div className="left3">
                  <div className="head3"> Sách đỏ </div>
                  <div className="bottom3">
                    <div className="bodyInput">
                      <Select
                        showSearch
                        value={initSachdoNam}
                        suffixIcon=""
                        onChange={(value, option) => {
                          setInitSachdoNam(value);
                        }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "").includes(input)
                        }
                        options={nam.map((item) => {
                          return {
                            value: item.nam,
                          };
                        })}
                      />
                      <Icon
                        path={mdiClose}
                        size={1}
                        onClick={() => {
                          setInitSachdoNam("");
                        }}
                      />
                    </div>
                    <div className="bodyInput">
                      <Select
                        showSearch
                        value={initSachdoTen}
                        suffixIcon=""
                        onChange={(value, option) => {
                          setInitSachdoTen(option.label);
                          setInitSachdosId(option.value);
                        }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "").includes(input)
                        }
                        options={sachDo.map((item) => {
                          return {
                            value: item.id,
                            label: `${item.ma_danh_muc} ${
                              item.ten === null || item.ten === ""
                                ? ""
                                : "- " + item.ten
                            }`,
                          };
                        })}
                      />
                      <Icon
                        path={mdiClose}
                        size={1}
                        onClick={() => {
                          setInitSachdoTen("");
                          setInitSachdosId("");
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="right3">
                  <div className="head3"> IUCN </div>
                  <div className="bottom3">
                    <div className="bodyInput">
                      <Select
                        showSearch
                        value={initUicnsNam}
                        suffixIcon=""
                        onChange={(value) => {
                          setInitUicnsNam(value);
                        }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "").includes(input)
                        }
                        options={nam.map((item) => {
                          return {
                            value: item.nam,
                          };
                        })}
                      />
                      <Icon
                        path={mdiClose}
                        size={1}
                        onClick={() => {
                          setInitUicnsNam("");
                        }}
                      />
                    </div>
                    <div className="bodyInput">
                      <Select
                        showSearch
                        value={initUicnsTen}
                        suffixIcon=""
                        onChange={(value, option) => {
                          setInitUicnsTen(option.label);
                          setInitUicnsId(option.value);
                        }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "").includes(input)
                        }
                        options={UICN.map((item) => {
                          return {
                            value: item.id,
                            label: `${item.ma_danh_muc} ${
                              item.ten === null || item.ten === ""
                                ? ""
                                : "- " + item.ten
                            }`,
                          };
                        })}
                      />
                      <Icon
                        path={mdiClose}
                        size={1}
                        onClick={() => {
                          setInitUicnsTen("");
                          setInitUicnsId("");
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="buttonAdd">
              <Button type="primary" htmlType="submit" onClick={handeSubmit}>
                Thêm mới
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AddNew;

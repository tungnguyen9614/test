import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  datVeAction,
  layChiTietPhongVeAction,
} from "../../redux/actions/QuanLyDatVeActions";
import style from "./Checkout.module.css";
import "./Checkout.css";
import { CloseOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { DAT_VE } from "../../redux/actions/types/QuanLyDatVeType";
import _ from "lodash";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { Tabs } from "antd";
import { layThongTinNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungAction";

const Checkout = (props) => {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { chiTietPhongVe, danhSachGheDangDat } = useSelector(
    (state) => state.QuanLyDatVeReducer
  );
  const dispatch = useDispatch();
  const { danhSachGhe, thongTinPhim } = chiTietPhongVe;

  useEffect(() => {
    dispatch(layChiTietPhongVeAction(props.match.params.id));
  }, [dispatch, props.match.params]);

  const renderSeats = () => {
    return danhSachGhe.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let classGheDaDat = ghe.daDat === true ? "gheDaDat" : "";

      //Kiểm tra từng ghế render xem có trong mảng ghế đang đặt ko
      let classGheDangDat = "";
      let indexGheDD = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );

      let classGheDaDuocDat = "";
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = "gheDaDuocDat";
      }

      if (indexGheDD !== -1) {
        classGheDangDat = "gheDangDat";
      }

      return (
        <Fragment key={ghe.maGhe}>
          {/* {ghe.loaiGhe === 'Vip' ? <button className={`${style['ghe']} ${style['gheVip']}`}>{ghe.stt}</button> : <button className={`${style['ghe']}`}>{ghe.stt}</button>} */}
          <button
            onClick={() => {
              dispatch({
                type: DAT_VE,
                gheDuocChon: ghe,
              });
            }}
            disabled={ghe.daDat}
            className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} text-center`}
          >
            {ghe.daDat ? (
              classGheDaDuocDat !== "" ? (
                <UserDeleteOutlined />
              ) : (
                <CloseOutlined />
              )
            ) : (
              ghe.stt
            )}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  return (
    <div className="min-h-screen">
      <div
        style={{
          backgroundImage: `url(${thongTinPhim.hinhAnh})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
          backgroundPosition: "center",
        }}
      >
        <div className="upper-layer">
          <div className="grid grid-cols-12 ">
            <div className="col-span-9">
              <div className="flex flex-col items-center mt-5">
                <div
                  className="bg-orange-400 w-full"
                  style={{ width: "80%", height: "10px" }}
                ></div>
                <div className={`${style["trapezoid"]} text-center`}>
                  <h3 className="mt-3 text-black font-bold">Màn hình</h3>
                </div>
                <div>{renderSeats()}</div>
              </div>

              <div className="mt-5 flex justify-center">
                <table className="w-2/3 divide-y divide-gray-700">
                  <thead className="bg-gray-500 ">
                    <tr>
                      <th className="py-2">Ghế chưa đặt</th>
                      <th>Ghế người khác đặt</th>
                      <th>Ghế đang đặt</th>
                      <th>Ghế VIP</th>
                      <th>Ghế đã được bạn đặt</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-600 divide-gray-700">
                    <tr>
                      <td className="text-center">
                        <button className="ghe">00</button>
                      </td>

                      <td className="text-center">
                        <button className="ghe gheDaDat">00</button>
                      </td>

                      <td className="text-center">
                        <button className="ghe gheDangDat">00</button>
                      </td>

                      <td className="text-center">
                        <button className="ghe gheVip">00</button>
                      </td>

                      <td className="text-center">
                        <button className="ghe gheDaDuocDat">
                          <UserDeleteOutlined />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div
              className="col-span-3 mr-3"
              style={{
                border: "1px solid black",
                borderRadius: "10px",
                padding: "5px 10px 10px 5px",
                marginTop: "10px",
                backgroundColor: `rgb(0 0 0 / 58%)`,
                height: "fit-content",
              }}
            >
              <div className="py-3">
                <h3 className="text-4xl text-center font-semibold text-yellow-500">
                  {thongTinPhim.tenPhim}
                </h3>
              </div>
              <hr />
              <div className="pt-2 px-1 flex justify-between">
                <p className="text-white">Ngày chiếu - Giờ chiếu:</p>
                <p className="text-yellow-400">
                  {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}
                </p>
              </div>
              <hr />
              <div className="pt-2 px-1">
                <p className="text-white">
                  Cụm rạp: {thongTinPhim.tenCumRap} - ({thongTinPhim.diaChi})
                </p>
              </div>
              <hr />
              <div className="pt-2 px-1 flex justify-between">
                <p className="text-white">Rạp: </p>
                <p className="text-yellow-400">{thongTinPhim.tenRap}</p>
              </div>
              <hr />
              <div className="py-3">
                <span className="text-white font-bold">Ghế:</span>

                {_.sortBy(danhSachGheDangDat, ["stt"]).map((gheDD, index) => {
                  return (
                    <span
                      key={gheDD.maGhe}
                      className="text-green-500 ml-1 p-1 border border-green-500"
                    >
                      {gheDD.stt}
                    </span>
                  );
                })}
              </div>
              <hr />
              {/* <div className="py-2">
                <i className="text-gray-400">Email</i>
                <br />
                {userLogin.email}
            </div>
            <hr />
            <div className="py-2">
                <i className="text-gray-400">Phone</i>
                <br />
                {userLogin.soDT}
            </div> */}
              <hr />
              <div className="mt-5">
                <div className="text-yellow-400 font-bold text-xl flex justify-between px-2">
                  <span>Tổng tiền: </span>
                  <div className="text-right">
                    {danhSachGheDangDat
                      .reduce((tongTien, ghe) => {
                        return (tongTien += ghe.giaVe);
                      }, 0)
                      .toLocaleString()}{" "}
                    đồng
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div
                  onClick={() => {
                    const thongTinDatVe = new ThongTinDatVe();
                    thongTinDatVe.maLichChieu = props.match.params.id;
                    thongTinDatVe.danhSachVe = danhSachGheDangDat;

                    console.log(thongTinDatVe);

                    dispatch(datVeAction(thongTinDatVe));
                  }}
                  className="cursor-pointer text-2xl rounded-lg bg-green-400 text-white w-full text-center py-2"
                >
                  ĐẶT VÉ
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

export default function (props) {
  return (
    <div>
      <Tabs className="pt-20" defaultActiveKey="1" centered onChange={callback}>
        <TabPane tab="01 CHỌN GHẾ & THANH TOÁN" key="1">
          <Checkout {...props} />
        </TabPane>
        <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
          <KetQuaDatVe {...props}/>
        </TabPane>
      </Tabs>
    </div>
  );
}

function KetQuaDatVe(props) {

  const { userLogin, thongTinNguoiDung } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const dispatch = useDispatch()

  console.log('thongTinNguoiDung',thongTinNguoiDung);

  useEffect(()=>{
    dispatch(layThongTinNguoiDungAction())
  }, [])

  return (
    <div className="p-5">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-purple-600">
              Lịch sử đặt vé
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Chúc bạn xem phim vui vẻ
            </p>
          </div>
          <div className="flex flex-wrap -m-2">
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src='https://lumiere-a.akamaihd.net/v1/images/p_disneymovies_avatarthewayofwater_1710_b7d39b03.jpeg'
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Avatar
                  </h2>
                  <p className="text-gray-500">10:30 Rạp 5, Hệ thống rạp BHD</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://lumiere-a.akamaihd.net/v1/images/p_disneymovies_avatarthewayofwater_1710_b7d39b03.jpeg"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Henry Letham
                  </h2>
                  <p className="text-gray-500">CTO</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/88x88"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Oskar Blinde
                  </h2>
                  <p className="text-gray-500">Founder</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/90x90"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    John Doe
                  </h2>
                  <p className="text-gray-500">DevOps</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/94x94"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Martin Eden
                  </h2>
                  <p className="text-gray-500">Software Engineer</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/98x98"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Boris Kitua
                  </h2>
                  <p className="text-gray-500">UX Researcher</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/100x90"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Atticus Finch
                  </h2>
                  <p className="text-gray-500">QA Engineer</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/104x94"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Alper Kamu
                  </h2>
                  <p className="text-gray-500">System</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/108x98"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Rodrigo Monchi
                  </h2>
                  <p className="text-gray-500">Product Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

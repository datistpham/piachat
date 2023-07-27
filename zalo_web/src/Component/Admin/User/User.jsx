import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import get_user from "../../../api/admin/get_user";
import swal from "sweetalert";
import delete_user from "../../../api/admin/delete_user";
import AddNewUser from "./AddUser";
import { BiBlock } from "react-icons/bi";
import block_user from "../../../api/admin/block_user";
import {CgUnblock } from "react-icons/cg"
import unblock_user from "../../../api/admin/unblock_user";

const User = () => {
  const [data, setData] = useState([]);
  const [change, setChange] = useState(false);
  useEffect(() => {
    (async () => {
      const result = await get_user();
      return setData(result);
    })();
  }, [change]);
  const columns = [
    // { field: "book_id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "Tên người dùng",
      flex: 1,
      height: 50,
    },
    { field: "email", headerName: "Email", flex: 1, height: 50 },
    { field: "phoneNumber", headerName: "Tên tài khoản", flex: 1, height: 50 },
    // { field: "address", headerName: "Địa chỉ", flex: 1, height: 50 },
    {
      field: "action",
      headerName: "Hành động",
      flex: 1,
      height: 50,
      renderCell: (params) => {
        return (
          <div style={{}}>
            {/* <Book setChange={setChange} props={params.row} bookId={params.row.book_id} fetchData={fetchData} /> */}
            <MdDeleteOutline
              title={"Xóa ngừoi dùng"}
              size={24}
              className="bookListDelete"
              onClick={() => {
                swal("Thông báo", "Bạn có muốn xóa người dùng này không ?", {
                  buttons: {
                    ok: "Xóa",
                    cancel: "Hủy",
                  },
                }).then(async (value) => {
                  if (value === "ok") {
                    const result = await delete_user({
                      idUser: params.row._id,
                    });
                    if (result?.delete === true) {
                      swal(
                        "Thông báo",
                        "Đã xóa người dùng thành công",
                        "success"
                      ).then(() => setChange(!change));
                    } else {
                      swal("Thông báo", "Lỗi không xác định", "error");
                    }
                  } else {
                    return null;
                  }
                });
              }}
            />
            {/*  */}
            {
              params.row.is_block=== false ? 
              <BiBlock 
                title={"Block người dùng"}
                style={{marginLeft: 12}}
                size={24}
                className="bookListDelete"
                onClick={() => {
                  swal("Thông báo", "Bạn có muốn block người dùng này không ?", {
                    buttons: {
                      ok: "Block",
                      cancel: "Hủy",
                    },
                  }).then(async (value) => {
                    if (value === "ok") {
                      const result = await block_user({
                        idUser: params.row._id,
                      });
                      if (result?.ok === true) {
                        swal(
                          "Thông báo",
                          "Đã block người dùng thành công",
                          "success"
                        ).then(() => setChange(!change));
                      } else {
                        swal("Thông báo", "Lỗi không xác định", "error");
                      }
                    } else {
                      return null;
                    }
                  });
                }}
              />
              : 
              <CgUnblock title={"Hủy chặn người dùng"}
                style={{marginLeft: 12}}
                size={24}
                className="bookListDelete"
                onClick={() => {
                  swal("Thông báo", "Bạn có muốn hủy chặn người dùng này không ?", {
                    buttons: {
                      ok: "Block",
                      cancel: "Hủy",
                    },
                  }).then(async (value) => {
                    if (value === "ok") {
                      const result = await unblock_user({
                        idUser: params.row._id,
                      });
                      if (result?.ok === true) {
                        swal(
                          "Thông báo",
                          "Đã hủy chặn người dùng thành công",
                          "success"
                        ).then(() => setChange(!change));
                      } else {
                        swal("Thông báo", "Lỗi không xác định", "error");
                      }
                    } else {
                      return null;
                    }
                  });
                }} />
            }
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ height: 500 }}>
      <div style={{margin: "12px 0"}}>
        <AddNewUser />
      </div>
      <DataGrid
        rows={data}
        rowHeight={40}
        columns={columns}
        disableSelectionOnClick
        pageSize={8}
        getRowId={(row) => row._id}
        getRowHeight={({ id, densityFactor }) => {
          if (id % 2 === 0) {
            return 100 * densityFactor;
          }
          return null;
        }}
        
      />
    </div>
  );
};

export default User;

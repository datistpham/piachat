import React from "react";
import LockIcon from "@mui/icons-material/Lock";
import moment from "moment";
// import { Link } from "react-router-dom";
import swal from "sweetalert";
import logout from "../../api/logout";

const BlockPage = (props) => {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f2f0f5",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 600,
            height: "auto",
            borderRadius: 10,
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <img
            draggable={false}
            src="https://www.pngitem.com/pimgs/m/20-202249_lock-protect-safety-secure-safe-security-password-svg.png"
            alt="open"
            style={{ width: 150, height: 150, objectFit: "cover" }}
          />
          <br />
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              textTransform: "capitalize",
              textAlign: "center",
            }}
          >
            {props.firstname}, tài khoản của bạn đã bị khóa
          </div>
          <br />
          <div style={{ fontSize: 16, textAlign: "center" }}>
            Chúng tôi đã thấy hoạt động bất thường trên tài khoản của bạn. Điều này có thể có nghĩa là ai đó đã sử dụng tài khoản của bạn mà bạn không biết
          </div>
          <br />
          <div
            style={{
              backgroundColor: "#f2f0f5",
              borderRadius: 10,
              padding: 10,
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 6,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                backgroundColor: "#2e89ff",
                width: 28,
                height: 28,
              }}
            >
              <LockIcon style={{ color: "#fff", width: 20, height: 20 }} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {parseInt(props.status) > 10000 && (
                <div style={{ fontSize: 18, fontWeight: 600 }}>
                  Your account will be locked temporary to{" "}
                  {moment(parseInt(props.status)).format("HH:mm DD/MM/YYYY")}
                </div>
              )}
              <div>Tài khoản của bạn đã bị khóa bởi admin</div>
            </div>
          </div>
          <br />
          <div
            className="fgljdfadfd"
            style={{
              width: "100%",
              height: 40,
              color: "#fff",
              background: "#2e89ff",
              borderRadius: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <a
              href="/help"
              target={"_blank"}
              style={{ textDecoration: "none", color: "#fff", width: "100%", textAlign: "center" }}
              onClick={(e)=> {
                e.preventDefault()
                swal("", "Bạn hãy liên hệ với admin để mở khóa tài khoản")
              }}
            >
              Hỗ trợ
            </a>
          </div>
          <br />
          <div
            className="fgljdfadfd"
            style={{
              width: "100%",
              height: 40,
              color: "#555",
              background: "#f2f0f5",
              borderRadius: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <a
              href="/help"
              target={"_blank"}
              style={{ textDecoration: "none", color: "#3a3b3c", width: "100%", textAlign: "center" }}
              onClick={(e)=> {
                e.preventDefault()
                logout()
              }}
            >
              Đăng xuất
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlockPage;

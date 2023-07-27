import React, { useState, useEffect } from "react";
import { AiTwotoneLock } from "react-icons/ai";
import { BsPhoneFill } from "react-icons/bs";
import { BiShowAlt, BiHide } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert"; // Import thư viện sweetalert
import Background from "../Background/Background";
import styles from "../Signup/Signup.module.sass";
import login from "../../api/login";
import { useSnackbar } from "notistack";
import logo from "../../assets/splash.png";

const Login = (props) => {
   // eslint-disable-next-line
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [saveAccount, setSaveAccount] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false); // State để theo dõi trạng thái đang đăng nhập
  const { enqueueSnackbar } = useSnackbar();

  // Load saved login information from localStorage on component mount
  useEffect(() => {
    const savedPhoneNumber = localStorage.getItem("savedPhoneNumber");
    const savedPassword = localStorage.getItem("savedPassword");
    const savedSaveAccount = localStorage.getItem("savedSaveAccount");

    if (savedSaveAccount === "true") {
      setPhoneNumber(savedPhoneNumber || "");
      setPassword(savedPassword || "");
      setSaveAccount(true);
    }
  }, []);

  // Save login information to localStorage when the "saveAccount" state changes
  useEffect(() => {
    if (saveAccount) {
      localStorage.setItem("savedPhoneNumber", phoneNumber);
      localStorage.setItem("savedPassword", password);
      localStorage.setItem("savedSaveAccount", "true");
    } else {
      localStorage.removeItem("savedPhoneNumber");
      localStorage.removeItem("savedPassword");
      localStorage.removeItem("savedSaveAccount");
    }
  }, [saveAccount, phoneNumber, password]);

  // Xử lý khi người dùng nhấn nút "Quên mật khẩu"
  const handleForgotPassword = () => {
    swal("Vui lòng liên hệ admin để khôi phục mật khẩu");
  };

  // Xử lý đăng nhập
  const handleLogin = async () => {
    try {
      
    } catch (error) {
      
    }
    // Kiểm tra nếu đang đăng nhập thì không cho thực hiện thao tác đăng nhập tiếp
    if (loggingIn) return;

    // Bắt đầu quá trình đăng nhập
    setLoggingIn(true);

    const result = await login(phoneNumber, password);

    // Kết thúc quá trình đăng nhập
    setLoggingIn(false);

    if (parseInt(result?.status) === 400 || parseInt(result?.status) === 500) {
      enqueueSnackbar(result?.msg, {
        variant: "error",
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.register}>
        <div className={styles["formxx"]} action="#">
          <img alt={`can't open`} src={logo} style={{ width: 200, marginBottom: 20 }} />
          <div className={styles.register_form_input}>
            <input
              type="text"
              placeholder="Số điện thoại hoặc email"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              autoComplete={"off"}
            />
            <span>
              <BsPhoneFill />
            </span>
          </div>
          <div
            style={{ position: "relative" }}
            className={styles.register_form_input}
          >
            <input
              type={showPassword === true ? "text" : "password"}
              placeholder="Mật khẩu"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={"off"}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
            />
            <span>
              {" "}
              <AiTwotoneLock />
            </span>
            <span
              style={{
                position: "absolute",
                left: "100%",
                top: "50%",
                transform: "translate(-100%, -50%)",
              }}
            >
              {showPassword === false && (
                <BiHide onClick={() => setShowPassword(true)} />
              )}
              {showPassword === true && (
                <BiShowAlt onClick={() => setShowPassword(false)} />
              )}
            </span>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
          >
            <input
              type="checkbox"
              checked={saveAccount}
              onChange={(e) => setSaveAccount(e.target.checked)}
              style={{ marginRight: 8, width: "auto" }}
            />
            <label>Lưu tài khoản</label>
          </div>
          <button
            onClick={handleLogin}
            className={styles.btn}
            style={{
              fontSize: 16,
              backgroundColor: "orange",
              borderRadius: 10,
              cursor: loggingIn ? "not-allowed" : "pointer",
              opacity: loggingIn ? 0.6 : 1,
            }}
            disabled={loggingIn}
          >
            {loggingIn ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
          <div
            onClick={handleForgotPassword}
            style={{
              width: "100%",
              textAlign: "right",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Quên mật khẩu
          </div>
          {/* {
            <div style={{fontSize: 14, width: "100%", textAlign: "left", color: "#f00 "}}>{data?.msg}</div>
          } */}
          {/* <div className={styles.toLogin}>
            <Link style={{ fontSize: 16 }} to="/signup">Đăng ký</Link>
          </div> */}
        </div>
      </div>
      <Background />
    </div>
  );
};

export default Login;

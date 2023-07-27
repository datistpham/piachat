import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Sử dụng icon từ react-icons thay thế

import axios from 'axios';
import { SERVER_URL } from '../../../config/config';
import swal from 'sweetalert';

export default function AddNewUser() {
  const [open, setOpen] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [account, setAccount] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false); // State để theo dõi trạng thái hiển thị mật khẩu

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Tạo người dùng mới
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Tạo người dùng mới"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ width: 400 }}>
            <TextField
              placeholder="Tên tài khoản"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              style={{ height: 40, padding: 10, marginBottom: 12 }}
              fullWidth
            />
            <div></div>
            <br />
            <div></div>
            <TextField
              placeholder="Tên người dùng"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={{ height: 40, padding: 10, marginBottom: 12 }}
              fullWidth
            />
            <div></div>
            <br />
            <div></div>
            <TextField
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'} // Ẩn/hiện mật khẩu tùy thuộc vào trạng thái showPassword
              style={{ height: 40, padding: 10, marginBottom: 12 }}
              fullWidth
              InputProps={{
                // Icon để ẩn/hiện mật khẩu
                endAdornment: (
                  <span
                    onClick={handleShowPassword}
                    style={{
                      cursor: 'pointer',
                      pointerEvents: 'all',
                      userSelect: 'none',
                    }}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </span>
                ),
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Đóng</Button>
          <Button onClick={async () => {
            try {
              const res = await axios({
                url: SERVER_URL + "/api/admin/user",
                method: "post",
                data: {
                  username: userName,
                  password,
                  phoneNumber: account
                }
              });
              const result = await res.data;
              if (result.ok === true) {
                swal("Thông báo", "Tạo người dùng thành công", "success")
                  .then(() => handleClose())
                  .then(() => {
                    setUserName("");
                    setPassword("");
                  });
              } else {
                swal("Thông báo", "Tạo người dùng thất bại", "failed")
                  .then(() => handleClose());
              }
              return result;
            } catch (e) {
              swal("Thông báo", "Tạo người dùng thất bại", "failed")
                .then(() => handleClose());
            }
          }} autoFocus>
            Tạo
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
    
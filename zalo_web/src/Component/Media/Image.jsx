import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import get_detail_image from '../../api/message/get_detail_image';
import Blur from 'react-blur';
import { FaArrowLeft } from 'react-icons/fa';

const Image = () => {
  const [data, setData] = useState();
  const { image_id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const canGoBack = location.state && location.state.from;
  const handleGoBack = () => {
    navigate(-1); // Quay lại trang trước đó
  };
  useEffect(() => {
    (async () => {
      const result = await get_detail_image(image_id);
      setData(result);
    })();
  }, [image_id]);


  return (
    <div style={{ position: 'fixed', width: '100%', height: '100%', top: 0, left: 0 }}>
      {/* Nếu không phải trang đầu tiên thì hiển thị nút quay lại */}
      {canGoBack && (
        <div onClick={handleGoBack}  style={{ position: "absolute", top: "20px", left: "20px", fontSize: "20px", color: "white", textDecoration: "none", zIndex: 999, padding: 15, borderRadius: 100, backgroundColor: "#f2f0f5", width: 50, height: 50, display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}>
        <FaArrowLeft style={{color: "#555"}} />
        </div>
      )}

      {data?.message && (
        <Blur className={'blur-image-1'} shouldResize={true} enableStyles={true} img={data?.message} blurRadius={50}>
          <img
            style={{ height: '90%', objectFit: 'contain', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', aspectRatio: 16 / 9 }}
            src={data?.message}
            alt=""
          />
        </Blur>
      )}
    </div>
  );
};

export default Image;

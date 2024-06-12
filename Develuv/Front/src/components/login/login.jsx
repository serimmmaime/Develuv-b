import React, { useState } from "react";
import Modal from "react-modal";
import google from "../.././img/google.png";
import kakao from "../.././img/kakao.png";
import naver from "../.././img/naver.png";
import axios from "axios";
import '../login.css';
import "./lb.css";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPwModalOpen, setIsPwModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [foundId, setFoundId] = useState("");  // 아이디 찾기 결과를 저장하는 상태
  const [foundPw, setFoundPw] = useState("");  // 비밀번호 찾기 결과를 저장하는 상태
  const url = "http://localhost:8080/";

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("id:", id);
    console.log("pw:", password);
  };

  const findId = async () => {
    try {
      const response = await axios.get(url + "findId?user_email=" + email);
      console.log(response.data);
      if (response.data && typeof response.data === "object" && response.data !== null) {
        setFoundId(Object.values(response.data).join(', '));  // foundId 상태에 설정
      } else {
        setFoundId(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const findPw = async () => {
    const id = document.getElementById("pw-id").value;  // 비밀번호 찾기 모달의 ID 필드
    const email = document.getElementById("pw-email").value;  // 비밀번호 찾기 모달의 Email 필드
    try {
      const response = await axios.get(url + "findPw?user_id=" + id + "&user_email=" + email);
      console.log(response.data);
      if (response.data && response.data.비번) {
        setFoundPw(response.data.비번);  // foundPw 상태에 설정
      } else {
        setFoundPw("비밀번호를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error(error);
      setFoundPw("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleNaverLogin = async () => {
    const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
    const redirectUri = encodeURI("http://localhost:8080/Callback");
    const state = Math.random().toString(36).substr(2, 11);
    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
    window.location.href = naverAuthUrl;
  };

  const handleGoogleLogin = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = encodeURI("http://localhost:8080/login/oauth2/code/google");
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=email profile`;
    window.location.href = googleAuthUrl;
  };

  const handleKakaoLogin = () => {
    const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const redirectUri = encodeURI("http://localhost:8080/Callback");
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenPwModal = () => {
    setIsPwModalOpen(true);
  };

  const handleClosePwModal = () => {
    setIsPwModalOpen(false);
  };

  return (
    <div>
      <h2>Login</h2>
      <p>Please enter your ID and Password.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            placeholder="ID"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>
        <div>
          <button type="submit" className="login-button">
            Login
          </button>
        </div>
      </form>
      <div className="link-container">
        <a href="#" className="link" onClick={handleOpenModal}>
          아이디 찾기
        </a>{" "}
        |
        <a href="#" className="link" onClick={handleOpenPwModal}>
          비밀번호 찾기
        </a>{" "}
        |
        <a href="#" className="link"> {/*클릭하면 Quiz.jsx로 넘어가게*/}
          회원가입
        </a>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="modal-body">
          <h3>아이디 찾기</h3>          
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </div>
          <p>ID: {foundId}</p>  {/* 아이디 찾기 결과를 표시 */}
          <div className="button-container">
            <button onClick={findId}>OK</button>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isPwModalOpen}
        onRequestClose={handleClosePwModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="modal-body">
          <h3>비밀번호 찾기</h3>
          <div className="form-group">
            <input
              type="text"
              id="pw-id"
              required
              placeholder="ID"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              id="pw-email"
              required
              placeholder="Email"
            />
          </div>
          <p>Password: {foundPw}</p>  {/* 비밀번호 찾기 결과를 표시 */}
          <div className="button-container">
            <button onClick={findPw}>OK</button>
            <button onClick={handleClosePwModal}>Close</button>
          </div>
        </div>
      </Modal>

      <div className="divider">
        <span>or continue with</span>
      </div>
      <br></br>
      <div className="image-container">
        <img
          className="google"
          src={google}
          alt="Google"
          onClick={handleGoogleLogin}
        />
        <img
          className="naver"
          src={naver}
          alt="Naver"
          onClick={handleNaverLogin}
        />
        <img
          className="kakao"
          src={kakao}
          alt="Kakao"
          onClick={handleKakaoLogin}
        />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <p>
        By logging in,<br></br>you agree to our Terms of Service and Privacy
        Policy
      </p>
    </div>
  );
}

export default Login;

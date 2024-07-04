import "./Regi3Form.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DaumPostCode from "./DaumPostCode.jsx";

function Regi3Form({
  progress,
  setProgress,
  formData,
  setFormData,
  imgPreview,
  setImgPreview,
  setImage,
  setCity,
}) {
  const navigate = useNavigate();

  const genders = [
    { type: "male", title: "남자" },
    { type: "female", title: "여자" },
  ];

  const [selGen, setSelGen] = useState("");

  const onChangeName = (e) => {
    setFormData({ ...formData, user_name: e.target.value });
  };

  const onChangeJob = (e) => {
    setFormData({ ...formData, user_job: e.target.value });
  };

  const onChangeAddr = (e) => {
    setFormData({ ...formData, user_address: e.target.value });
  };

  const genClicked = (type) => {
    setSelGen(type);
    setFormData({ ...formData, user_gender: type });
  };

  const regi3Submit = () => {
    setProgress(progress + 1);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setImgPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="Register3Form">
      <div className={"up_opt"}>
        <div className={"pro_bar_container"} style={{ marginBottom: "20px" }}>
          <div className={"pro_bar"} style={{ width: "250px" }}></div>
          <div className={"circle5"}>3</div>
          <div className={"pro_bar"} style={{ width: "205px" }}></div>
          <div className={"circle5"}>5</div>
        </div>
      </div>
      <div>
        <div className="tt" style={{ marginTop: "0px" }}>
          Essential Information
        </div>
        <div className="gray_font">Please enter the information</div>
        <div className="sub_title">변경이 불가능하니 정확하게 입력해주세요</div>

        {/* Name */}
        {/*<div className="form_label">이름</div>*/}
        {/*<input*/}
        {/*  className="regi3_in"*/}
        {/*  onChange={onChangeName}*/}
        {/*  value={formData.user_name}*/}
        {/*  placeholder="이름 입력"*/}
        {/*/>*/}

        {/* Gender */}
        <div className="form_label">성별</div>
        <div className="gbtn_div">
          {genders.map((gender, index) => (
            <button
              key={index}
              onClick={() => genClicked(gender.type)}
              className={"gender_btn" + (selGen === gender.type ? "_sel" : "")}
            >
              {gender.title}
            </button>
          ))}
        </div>

        <hr className="half_hr" />

        <div className="sub_title">
          언제든지 변경이 가능하며 매칭을 위해 필요한 정보입니다.
        </div>

        {/* Job */}
        <div className="form_label">직업</div>
        <input
          className="regi3_in"
          onChange={onChangeJob}
          value={formData.user_job}
          type="text"
          placeholder="직업 입력"
        />

        {/* Address */}
        <div className="form_label">주소</div>
        <div style={{ display: "flex" }}>
          <input
            className="regi3_in"
            onChange={onChangeAddr}
            value={formData.user_address}
            type="text"
            placeholder="주소 입력"
            style={{
              marginBottom: "0px",
              borderRadius: "5px 0 0 5px",
            }}
            readOnly="true"
          />
          <DaumPostCode
            formData={formData}
            setFormData={setFormData}
            setCity={setCity}
          />
        </div>

        {/* Image Upload */}
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
          <input type="file" onChange={handleImageUpload} />
          {imgPreview && (
            <img
              src={imgPreview}
              alt="Preview"
              style={{ width: "50px", height: "auto", marginLeft: "10px" }}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className={"reg3_ba_btn"} style={{ marginTop: "20px" }}>
          <button
            type="button"
            onClick={() => setProgress(progress - 1)}
            className="before_btn"
          >
            이전
          </button>
          <button type="button" onClick={regi3Submit} className="after_btn">
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

export default Regi3Form;

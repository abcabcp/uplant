import { dbService, storageService } from "fbase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import Container from "components/Container";
import MyButton from "components/Button";
import MyInput from "components/Input";
import styles from "css/plantplus.module.scss";

const PlantPlus = () => {
  const [attachment, setAttachment] = useState("");
  const [inputs, setInputs] = useState({
    kind: "",
    nickname: "",
    birthDate: "",
  });

  const { kind, nickname, birthDate } = inputs;

  const onChange = (event) => {
    const { name, value} = event.target;
    setInputs({
      ...inputs,
      [name] : value
    });
  };

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;
  const history = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService.ref().child(`${uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }

    await dbService.collection("plants").add({
      p_kind: kind,
      p_nickname: nickname,
      p_birthDate: birthDate,
      p_auth: uid,
      //초기 물준 날짜를 오늘로 등록 -> 물주기 버튼 클릭시 새로 업데이트
      p_nowwaterday: new Date(),
      createAt: Date.now(),
      attachmentUrl,
    });

    setInputs({
      kind: "",
      nickname: "",
      birthDate: ""
    });

    setAttachment("");

    history("/PlantList");
  };

  const onClearAttachment = () => setAttachment("");

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const imgReader = new FileReader();
    imgReader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    imgReader.readAsDataURL(theFile);
  };

  return (
    <Container textAlign={true}>
      <h1>새 식물을 등록해주세요!🌹</h1>
      <form onSubmit={onSubmit}>
        <div className={styles.imgbox}>
        <div className={styles.wrap}>
            {attachment && (
              <img src={attachment} alt="나의 식물" className={styles.image}/>
            )}
        </div>
        </div>
          <label className={styles.filebtn} for="img-input" >업로드</label>
          <input type="file" id="img-input" accept="image/*" onChange={onFileChange} style={{display:"none"}} required/>
          <MyButton onClick={onClearAttachment} width={"145px"} color={"var(--black)"} className={styles.rebtn} backgroundColor={"var(--gray400)"}>다시 올리기</MyButton>
        <MyInput
          value={kind}
          name="kind"
          type="text"
          placeholder="식물의 종류를 입력해주세요"
          onChange={onChange}
          maxLength={30}
          backgroundColor={"var(--white)"}
          required
        />
        <MyInput
          value={nickname}
          name="nickname"
          onChange={onChange}
          type="text"
          placeholder="식물의 애칭을 입력해주세요"
          maxLength={30}
          backgroundColor={"var(--white)"}
          required
        />
        <MyInput
          value={birthDate}
          name="birthDate"
          onChange={onChange}
          type="date"
          placeholder="식물의 생일을 입력해주세요"
          maxLength={30}
          backgroundColor={"var(--white)"}
          required
        />
        <MyInput type="submit" value="등록 완료" backgroundColor={"var(--green)"} fontcolor={"var(--black)"}/>
      </form>
    </Container>
  );
};

export default PlantPlus;

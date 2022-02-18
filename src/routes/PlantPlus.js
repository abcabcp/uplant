import { dbService, storageService } from "fbase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import Container from "components/Container";
import MyButton from "components/Button";
import MyInput from "components/Input";
import styles from "css/plantplus.module.scss";

const PlantPlus = ({ userObj }) => {
  const [attachment, setAttachment] = useState("");
  const [kind, setKind] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [waterday, setWaterday] = useState("");
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
      //물주는 날짜 카운트
      p_waterday: waterday,
      //초기 물준 날짜를 오늘로 등록 -> 물주기 버튼 클릭시 새로 업데이트
      p_nowwaterday: new Date(),
      createAt: Date.now(),
      attachmentUrl,
    });

    setKind("");
    setNickname("");
    setBirthDate("");
    setWaterday("");
    setAttachment("");

    history("/PlantList");
  };

  const getListAsc = async () => {
    const listAsc = await dbService
      .collection("plants")
      .orderBy("createAt", "desc")
      .get();

    console.log(listAsc.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getListAsc();
  }, []);

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

  const onKindChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setKind(value);
  };

  const onNicknameChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setNickname(value);
  };

  const onBirthDateChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setBirthDate(value);
  };

  const onWaterdayChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setWaterday(value);
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
          <input type="file" id="img-input" accept="image/*" onChange={onFileChange} style={{display:"none"}}/>
          <MyButton onClick={onClearAttachment} width={"145px"} color={"#1c1c1c"} className={styles.rebtn} backgroundColor={"#e5e5e5"}>다시 올리기</ MyButton>
        <MyInput
          value={kind}
          onChange={onKindChange}
          type="text"
          placeholder="식물의 종류를 입력해주세요"
          maxLength={30}
          bgcolor={"#ffffff"}
          required
        />
        <MyInput
          value={nickname}
          onChange={onNicknameChange}
          type="text"
          placeholder="식물의 애칭을 입력해주세요"
          maxLength={30}
          bgcolor={"#ffffff"}
          required
        />
        <MyInput
          value={birthDate}
          onChange={onBirthDateChange}
          type="date"
          placeholder="식물의 생일을 입력해주세요"
          maxLength={30}
          bgcolor={"#ffffff"}
          required
        />
        <MyInput
          value={waterday}
          onChange={onWaterdayChange}
          type="number"
          placeholder="며칠마다 물을 마시나요? (숫자만 입력)"
          maxLength={500}
          bgcolor={"#ffffff"}
          required
        />
        <MyInput type="submit" value="등록 완료" bgcolor={"#b9e3c6"} fontcolor={"#000000"}/>
      </form>
    </Container>
  );
};

export default PlantPlus;

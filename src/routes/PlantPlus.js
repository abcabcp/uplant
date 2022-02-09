import { dbService } from "fbase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PlantPlus = () => {
  const [photo, setPhoto] = useState("");
  const [kind, setKind] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [waterday, setWaterday] = useState("");
  const history = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    await dbService.collection("plants").add({
      p_kind: kind,
      p_nickname: nickname,
      p_birthDate: birthDate,
      p_waterday: waterday,
      createdAt: Date.now(),
    });

    setKind("");
    setNickname("");
    setBirthDate("");
    setWaterday("");
    history.push("/PlantList");
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
    <>
      <h1>새 식물을 등록해주세요!🌹</h1>
      <form onSubmit={onSubmit}>
        <div>
          <button value={photo}>사진 등록</button>
        </div>
        <input
          value={kind}
          onChange={onKindChange}
          type="text"
          placeholder="식물의 종류를 입력해주세요"
          maxLength={30}
          required
        />
        <input
          value={nickname}
          onChange={onNicknameChange}
          type="text"
          placeholder="식물의 애칭을 입력해주세요"
          maxLength={30}
          required
        />
        <input
          value={birthDate}
          onChange={onBirthDateChange}
          type="date"
          placeholder="식물의 애칭을 입력해주세요"
          maxLength={30}
          required
        />
        <input
          value={waterday}
          onChange={onWaterdayChange}
          type="number"
          placeholder="며칠마다 물을 마시나요? (숫자만 입력)"
          maxLength={500}
          required
        />
        <input type="submit" value="등록 완료" />
      </form>
    </>
  );
};

export default PlantPlus;

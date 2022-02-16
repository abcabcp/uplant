import { dbService, storageService } from "fbase";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import MyButton from "components/Button";
import Card from "components/Card";
import plant from "css/plantcard.module.scss";



const Plant = ({ PlantObj }) => {
  const [edit, setEdit] = useState(false);
  const [attachment, setAttachment] = useState(PlantObj.attachmentUrl);
  const [newKind, setNewKind] = useState(PlantObj.p_kind);
  const [newNickname, setNewNickname] = useState(PlantObj.p_nickname);
  const [newWaterday, setNewWaterday] = useState(PlantObj.p_waterday);
  const [newBirthday, setNewBirthday] = useState(PlantObj.p_birthday);

  const [newNowWaterday, setNewNowWaterday] = useState(
    PlantObj.p_nowwaterday.toDate()
  );

  const date = PlantObj.p_nowwaterday.toDate();
  const dateFormet = date.getMonth() + 1 + "월" + date.getDate() + "일";

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;


  console.log(newNowWaterday);
  const onDeleteClick = async () => {
    const confirm = window.confirm("삭제하실거에요? 😿");
    if (confirm) {
      await dbService.doc(`plants/${PlantObj.id}`).delete();
      if (PlantObj.attachmentUrl !== "") {
        await storageService.refFromURL(PlantObj.attachmentUrl).delete();
      }
    }
  };

  const toggleEdit = () => setEdit((prev) => !prev);

  const newAttachmentChange = (event) => {
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

  const onNewKindChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewKind(value);
  };

  const onNewNicknameChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNickname(value);
  };

  const onNewWaterdayChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewWaterday(value);
  };

  const onNewBirthdayChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewBirthday(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService.ref().child(`${uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }

    await dbService.doc(`plants/${PlantObj.id}`).update({
      p_kind: newKind,
      p_nickname: newNickname,
      p_waterday: newWaterday,
      p_birthday: newBirthday,
      attachmentUrl,
    });
    setEdit(false);
  };

  const onNewNowWaterClick = async (event) => {
    const confirm = window.confirm("지금 물을 주셨나요?");
    if (confirm) {
      await dbService.doc(`plants/${PlantObj.id}`).update({
        p_nowwaterday: new Date(),
      });
    }
  };

  return (
    <div>
      {edit ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="file"
              accept="image/*"
              onChange={newAttachmentChange}
            />
            {attachment && (
              <img
                src={attachment}
                width="60px"
                height="60px"
                alt="나의 식물"
              />
            )}
            <input
              value={newKind}
              type="text"
              placeholder="식물의 종류를 입력해주세요"
              maxLength={30}
              onChange={onNewKindChange}
              required
            />
            <input
              value={newNickname}
              type="text"
              placeholder="식물의 애칭을 입력해주세요"
              onChange={onNewNicknameChange}
              maxLength={30}
              required
            />
            <input
              value={newBirthday}
              type="date"
              placeholder="식물의 생일을 입력해주세요"
              onChange={onNewBirthdayChange}
              required
            />

            <input
              value={newWaterday}
              required
              type="number"
              placeholder="며칠마다 물을 마시나요? (숫자만 입력)"
              onChange={onNewWaterdayChange}
            />
            <input type="submit" value="수정 완료" />
          </form>
          <button onClick={toggleEdit}>취소</button>
        </>
      ) : (
        <Card className={plant.contents}>
          <MyButton onClick={onNewNowWaterClick} className={plant.water} width={"35px"} height={"35px"} hover={true}>💧</MyButton>
            <div>
              {PlantObj.attachmentUrl && (
                <img
                  src={PlantObj.attachmentUrl}
                  width="100px"
                  height="100px"
                  alt="식물 이미지"
                />
              )}
              <h2 className={plant.name}>{PlantObj.p_nickname}</h2>
              <div className={plant.kind}>종류: {PlantObj.p_kind}</div>
              <div className={plant.helloday}>분양 날짜 : {PlantObj.p_birthDate}</div>
              <div className={plant.lastwaterday}><span className={plant.date}>{dateFormet}</span>에 마지막으로 물을 줬어요~🌼</div>
            </div>
             <div className={plant.handleBtn}>
              <MyButton onClick={toggleEdit} handleBtn={true}>△</MyButton>
              <MyButton onClick={onDeleteClick} handleBtn={true}>x</MyButton>
            </div>
          </Card>
        )}
    </div>
  );
};

export default Plant;

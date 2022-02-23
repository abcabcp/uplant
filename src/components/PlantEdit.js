import { dbService, storageService } from "fbase";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import MyButton from "components/Button";
import MyInput from "components/Input";
import Card from "components/Card";
import plant from "css/plantcard.module.scss";
import styles from "css/edit.module.scss";



const Plant = ({ PlantObj }) => {
  const [edit, setEdit] = useState(false);
  const [attachment, setAttachment] = useState(PlantObj.attachmentUrl);
  const [newKind, setNewKind] = useState(PlantObj.p_kind);
  const [newNickname, setNewNickname] = useState(PlantObj.p_nickname);
  const [newBirthdate, setNewBirthdate] = useState(PlantObj.p_birthDate);

  const [newNowWaterday, setNewNowWaterday] = useState(
    PlantObj.p_nowwaterday.toDate()
  );

  const date = PlantObj.p_nowwaterday.toDate();
  const dateFormet = date.getMonth() + 1 + "월" + date.getDate() + "일";

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;

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

  const onNewBirthdateChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewBirthdate(value);
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
      p_birthDate: newBirthdate,
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
        <Card backgroundColor="#F6F6F6">
          <form onSubmit={onSubmit}>
          <label for="img-input" >업로드</label>
            <input
              type="file"
              accept="image/*"
              id="img-input"
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

            <MyInput
              value={newKind}
              type="text"
              placeholder="식물의 종류를 입력해주세요"
              maxLength={30}
              onChange={onNewKindChange}
              backgroundColor={"var(--white)"}
              required
            />
            <MyInput
              value={newNickname}
              type="text"
              placeholder="식물의 애칭을 입력해주세요"
              onChange={onNewNicknameChange}
              maxLength={30}
              backgroundColor={"var(--white)"}
              required
            />
            <MyInput
              value={newBirthdate}
              type="date"
              placeholder="식물의 생일을 입력해주세요"
              onChange={onNewBirthdateChange}
              backgroundColor={"var(--white)"}
              required
            />
            <div className={styles.editBtns}>
              <MyButton onClick={toggleEdit} width={"145px"} backgroundColor={"var(--gray400)"}>취소</MyButton>
              <MyInput type="submit" value="수정 완료" backgroundColor={"var(--green)"} width={"145px"}/>
            </div>
          </form>
        </Card>
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

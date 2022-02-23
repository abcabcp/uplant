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
  const [change, setChange] = useState(false);
  const [attachment, setAttachment] = useState(PlantObj.attachmentUrl);
  const [newAttachment, setNewAttachment] = useState(PlantObj.attachmentUrl);
  
  const [inputs, setInputs] = useState({
    newKind: PlantObj.p_kind,
    newNickname: PlantObj.p_nickname,
    newBirthdate: PlantObj.p_birthDate
  });

  const {newKind, newNickname, newBirthdate} = inputs;

  const onChange = (event) => {
    const { name, value} = event.target;
    setInputs({
      ...inputs,
      [name] : value
    });
  };

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

  const toggleChange = () => setChange((prev) => !prev);
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
      setNewAttachment(result);
    };
    imgReader.readAsDataURL(theFile);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    let attachmentUrl = "";
    if (attachment !== newAttachment) {
      const attachmentRef = storageService.ref().child(`${uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(newAttachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
      await dbService.doc(`plants/${PlantObj.id}`).update({
        p_kind: newKind,
        p_nickname: newNickname,
        p_birthDate: newBirthdate,
        attachmentUrl
      });
  } else {
      await dbService.doc(`plants/${PlantObj.id}`).update({
        p_kind: newKind,
        p_nickname: newNickname,
        p_birthDate: newBirthdate,
      });
  }
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
          <div>
            </div>
              <img
                className={styles.img}
                src={newAttachment}
                alt="나의 식물"
              />
              <input
                type="file"
                accept="image/*"
                id="img-input"
                className={styles.imgPlus}
                onChange={newAttachmentChange}
                onClick={toggleChange}
              />
              <label for="img-input" className={styles.uploadBtn}>혹시 더 예쁜사진을 찍으셨나요~?</label>
            <MyInput
              value={newKind}
              name="newKind"
              type="text"
              placeholder="식물의 종류를 입력해주세요"
              maxLength={30}
              onChange={onChange}
              backgroundColor={"var(--white)"}
              required
            />
            <MyInput
              value={newNickname}
              name="newNickname"
              type="text"
              placeholder="식물의 애칭을 입력해주세요"
              onChange={onChange}
              maxLength={30}
              backgroundColor={"var(--white)"}
              required
            />
            <MyInput
              value={newBirthdate}
              name="newBirthdate"
              type="date"
              placeholder="식물의 생일을 입력해주세요"
              onChange={onChange}
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

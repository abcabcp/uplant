import { dbService, storageService } from "fbase";
import { useState } from "react";

const Plant = ({ PlantObj }) => {
  const [edit, setEdit] = useState(false);
  const [newKind, setNewKind] = useState(PlantObj.p_kind);
  const [newNickname, setNewNickname] = useState(PlantObj.p_nickname);
  const [newWaterday, setNewWaterday] = useState(PlantObj.p_waterday);
  const [newBirthday, setNewBirthday] = useState(PlantObj.p_birthday);

  //console.log(PlantObj.p_nowwaterday.toDate());

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
    await dbService.doc(`plants/${PlantObj.id}`).update({
      p_kind: newKind,
      p_nickname: newNickname,
      p_waterday: newWaterday,
      p_birthday: newBirthday,
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
        <>
          <button onClick={onDeleteClick}>🗑</button>
          <button onClick={toggleEdit}>✏</button>
          <div>
            {PlantObj.attachmentUrl && (
              <img
                src={PlantObj.attachmentUrl}
                width="50px"
                height="50px"
                alt="식물 이미지"
              />
            )}
            <h2>{PlantObj.p_kind}</h2>
            <div>{PlantObj.p_nickname}</div>
            <div>물주는 날이 {PlantObj.p_waterday}일 남았습니다</div>
            <button onClick={onNewNowWaterClick}>💧</button>
            <div>{PlantObj.p_birthDate}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Plant;

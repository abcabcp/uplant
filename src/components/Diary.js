import { dbService, storageService } from "fbase";
import { useState } from "react";
import Card from "components/Card";
import MyButton from "components/Button";
import diary from "css/diarycard.module.scss";

const Diary = ({ DiaryObj }) => {
  const [edit, setEdit] = useState(false);
  const [newDiaryTitle, setNewDiaryTitle] = useState(DiaryObj.d_title);
  const [newDiaryText, setNewDiaryText] = useState(DiaryObj.d_text);

  const onDeleteClick = async () => {
    const confirm = window.confirm("삭제하실거에요? 😿");
    if (confirm) {
      await dbService.doc(`diarys/${DiaryObj.id}`).delete();
      if (DiaryObj.attachmentUrl !== "") {
        await storageService.refFromURL(DiaryObj.attachmentUrl).delete();
      }
    }
  };

  const toggleEdit = () => setEdit((prev) => !prev);

  const onNewDiaryTitleChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDiaryTitle(value);
  };

  const onNewDiaryTextChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDiaryText(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`diarys/${DiaryObj.id}`).update({
      d_title: newDiaryTitle,
      d_text: newDiaryText,
    });
    setEdit(false);
  };

  return (
    <div>
      {edit ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              value={newDiaryTitle}
              type="text"
              placeholder="일기 제목을 입력해주세요."
              onChange={onNewDiaryTitleChange}
              required
            />
            <input
              value={newDiaryText}
              type="text"
              onChange={onNewDiaryTextChange}
              placeholder="내일은 더 큰 행복이 올거야"
              required
            />
            <input type="submit" value="수정 완료" />
          </form>
          <button onClick={toggleEdit}>취소</button>
        </>
      ) : (
        <Card className={diary.contents}>
            <h2 className={diary.title}>{DiaryObj.d_title}</h2>
            <div className={diary.text}>{DiaryObj.d_text}</div>
             <div className={diary.handleBtn}>
              <MyButton onClick={toggleEdit} handleBtn={true}>△</MyButton>
              <MyButton onClick={onDeleteClick} handleBtn={true}>x</MyButton>
            </div>
        </Card>
      )}
    </div>
  );
};

export default Diary;

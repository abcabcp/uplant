import { dbService, storageService } from "fbase";
import { useState } from "react";
import Card from "components/Card";
import MyButton from "components/Button";
import MyInput from "components/Input";
import TextArea from "components/TextArea";
import diary from "css/diarycard.module.scss";
import styles from "css/edit.module.scss";

const Diary = ({ DiaryObj }) => {
  const [edit, setEdit] = useState(false);
  const [newDiaryTitle, setNewDiaryTitle] = useState(DiaryObj.d_title);
  const [newDiaryText, setNewDiaryText] = useState(DiaryObj.d_text);

  //const dateFormet = date.getMonth() + 1 + "월" + date.getDate() + "일";
  const writeDate = new Date(DiaryObj.createAt);


  const dateFormat =
    writeDate.getFullYear() +
    "년 " +
    (writeDate.getMonth() + 1) +
    "월 " +
    writeDate.getDate() +
    "일";

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
        <Card backgroundColor="#F6F6F6">
          <form onSubmit={onSubmit}>
            <MyInput
              value={newDiaryTitle}
              type="text"
              placeholder="일기 제목을 입력해주세요."
              onChange={onNewDiaryTitleChange}
              backgroundColor={"var(--white)"}
              required
            />
             <label for="diarytext"></label>
            <TextArea id="diarytext" onChange={onNewDiaryTextChange} placeholder="내용을 입력해주세요." height={"auto"}>
            {newDiaryText}
            </TextArea>
            <div className={styles.editBtns}>
            <MyButton onClick={toggleEdit}  width={"145px"} backgroundColor={"var(--gray400)"}>취소</MyButton>
            <MyInput type="submit" value="수정 완료" backgroundColor={"var(--green)"} width={"145px"}/>
            </div>
          </form>
          </Card>
      ) : (
        <div>
          <div className={diary.writedate}>{dateFormat}</div>
          <Card className={diary.contents}>
            <h2 className={diary.title}>{DiaryObj.d_title}</h2>
            <div className={diary.text}>{DiaryObj.d_text}</div>
            <div className={diary.handleBtn}>
              <MyButton onClick={toggleEdit} handleBtn={true}>
                △
              </MyButton>
              <MyButton onClick={onDeleteClick} handleBtn={true}>
                x
              </MyButton>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Diary;

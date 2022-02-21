import { dbService } from "fbase";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Container from "components/Container";
import MyInput from "components/Input";
import TextArea from 'components/TextArea';
import styles from "css/diaryplus.module.scss";

const DiaryPlus = () => {
  const [diaryTitle, setDiaryTitle] = useState("");
  const [diaryText, setDiaryText] = useState("");
  const uid = getAuth().currentUser.uid;

  const history = useNavigate();

  const onDiaryTitleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDiaryTitle(value);
  };

  const onDiaryTextChange = (event) => {
    const {
      target: { value },
    } = event;
    setDiaryText(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    await dbService.collection("diarys").add({
      d_title: diaryTitle,
      d_text: diaryText,
      d_auth: uid,
      createAt: Date.now(),
    });

    setDiaryTitle("");
    setDiaryTitle("");

    history("/DiaryList");
  };

  return (
    <Container textAlign={true}>
      <div>
        <h2 className={styles.diarytitle}>오늘의 하루는 어땠나요? ☘</h2>
        <form onSubmit={onSubmit}>
          <MyInput
            value={diaryTitle}
            type="text"
            placeholder="일기 제목을 입력해주세요."
            onChange={onDiaryTitleChange}
            maxLength={100}
            bgcolor={"#ffffff"}
            width={"400px"}
            required
          />
          <label for="diarytext"></label>
          <TextArea id="diarytext" onChange={onDiaryTextChange} width={"400px"} placeholder="내용을 입력해주세요.">
            {diaryText}
          </TextArea>
          <MyInput type="submit" value="등록완료" bgcolor={"#b9e3c6"} width={"400px"} fontcolor={"#1c1c1c"}/>
        </form>
      </div>
    </Container>
  );
};

export default DiaryPlus;

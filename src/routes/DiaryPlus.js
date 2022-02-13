import { dbService } from "fbase";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h2>오늘의 하루는 어땠나요? ☘</h2>
      <form onSubmit={onSubmit}>
        <input
          value={diaryTitle}
          type="text"
          placeholder="일기 제목을 입력해주세요."
          onChange={onDiaryTitleChange}
          maxLength={100}
          required
        />
        <input
          value={diaryText}
          type="text"
          onChange={onDiaryTextChange}
          placeholder="내일은 더 큰 행복이 올거야"
          required
        />
        <input type="submit" value="등록완료" />
      </form>
    </div>
  );
};

export default DiaryPlus;

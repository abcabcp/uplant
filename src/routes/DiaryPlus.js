import { dbService } from "fbase";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Container from "components/Container";
import MyInput from "components/Input";
import TextArea from 'components/TextArea';
import styles from "css/diaryplus.module.scss";

const DiaryPlus = () => {
  const [inputs, setInputs] = useState({
    diaryTitle: "",
    diaryText: ""
  });
  const { diaryTitle, diaryText } = inputs;

  const uid = getAuth().currentUser.uid;
  const history = useNavigate();

  const onChange = (event) => {
    const {name, value} = event.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    await dbService.collection("diarys").add({
      d_title: diaryTitle,
      d_text: diaryText,
      d_auth: uid,
      createAt: Date.now(),
    });

    setInputs({
      diaryTitle: "",
      diaryText: ""
    });

    history("/DiaryList");
  };

  return (
    <Container textAlign={true}>
      <div>
        <h2 className={styles.diarytitle}>오늘의 하루는 어땠나요? ☘</h2>
        <form onSubmit={onSubmit}>
          <MyInput
            value={diaryTitle}
            name="diaryTitle"
            type="text"
            placeholder="일기 제목을 입력해주세요."
            onChange={onChange}
            maxLength={100}
            backgroundColor={"var(--white)"}
            width={"300px"}
            required
          />
          <label for="diarytext"></label>
          <TextArea id="diarytext" name="diaryText" onChange={onChange} width={"300px"} placeholder="내용을 입력해주세요.">
            {diaryText}
          </TextArea>
          <MyInput type="submit" value="등록완료" backgroundColor={"var(--green)"} width={"300px"} fontcolor={"var(--black)"}/>
        </form>
      </div>
    </Container>
  );
};

export default DiaryPlus;

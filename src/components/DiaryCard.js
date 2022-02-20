import { dbService } from "fbase";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import Diary from "components/DiaryEdit";

const DiaryCard = ({ userObj }) => {
  const [diarys, setDiarys] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;

  useEffect(() => {
    dbService.collection("diarys").onSnapshot((snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setDiarys(newArray);
    });
  }, []);

  const ID_CHECK = diarys.filter((diary) => diary.d_auth === uid);

  const sortingField = "createAt";

  ID_CHECK.sort((a,b) => {
    return b[sortingField] -a[sortingField];
  });


  return (
    <>
      {ID_CHECK.map((diary) => (
        <Diary key={diary.id} DiaryObj={diary} />
      ))}
    </>
  );
};

export default DiaryCard;

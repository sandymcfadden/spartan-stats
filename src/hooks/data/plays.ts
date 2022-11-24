import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { StatType } from "./game";

export type Play = {
  id?: string;
  gameId: string;
  message: string;
  dateCreated: string;
  type: PlayTypes;
  value: number;
  playerId?: string;
  stat?: StatType;
};

export type PlayTypes =
  | "action"
  | "quarter"
  | "gameEnd"
  | "theirs"
  | "points"
  | "foul";

const COL_NAME = "plays";

export const usePlays = (gameId: string) => {
  const [plays, setPlays] = useState<Play[]>([]);

  const q = query(
    collection(db, COL_NAME),
    where("gameId", "==", gameId),
    orderBy("dateCreated", "desc")
  );

  useEffect(() => {
    return onSnapshot(q, (snapshot) =>
      setPlays(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Play))
      )
    );
  }, []);

  return { plays };
};

export const addPlay = async (play: Play, id: string) => {
  return await setDoc(doc(db, COL_NAME, id), play);
};

export const deletePlay = async (play: Play) => {
  if (!play.id) {
    return;
  }
  return await deleteDoc(doc(db, COL_NAME, play.id));
};

export const usePlay = (id: string) => {
  const [play, setPlay] = useState<Play>({
    gameId: "",
    message: "",
    dateCreated: new Date().toISOString(),
    type: "action",
    value: 0,
  });

  useEffect(() => {
    return onSnapshot(doc(db, COL_NAME, id), (doc) =>
      setPlay({ ...doc.data(), id: doc.id } as Play)
    );
  }, []);

  const updatePlay = async (play: Play) => {
    const docRef = doc(db, COL_NAME, id);
    return await setDoc(docRef, play);
  };

  return {
    play,
    updatePlay,
  };
};

import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

export type Season = {
  id?: string;
  name: string;
  dateCreated: string;
  team?: Team;
};

export type Team = {
  name: string;
  dateCreated: string;
  players: Player[];
};

export type Player = {
  firstName: string;
  lastName: string;
  number: number;
};

const COL_NAME = "seasons";

export const addSeason = async (season: Season) => {
  return await addDoc(collection(db, COL_NAME), season);
};

export const updateSeason = async (season: Season, id: string) => {
  const docRef = doc(db, COL_NAME, id);
  return await setDoc(docRef, season);
};

export const getSeason = async (id: string) => {
  return (await getDoc(doc(db, COL_NAME, id))).data();
};

export const getAllSeasons = (callback) => {
  return onSnapshot(collection(db, COL_NAME), (snapshot) =>
    callback(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  );
};

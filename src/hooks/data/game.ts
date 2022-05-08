import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

export type Game = {
  id?: string;
  opponentName: string;
  location: string;
  seasonId: string;
  gameDate: string;
  dateCreated: string;
  gameEndDate?: string;
};

const COL_NAME = "games";

export const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    return onSnapshot(collection(db, COL_NAME), (snapshot) =>
      setGames(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Game))
      )
    );
  }, []);

  return { games };
};

export const useGamesBySeason = (seasonId: string) => {
  const [games, setGames] = useState<Game[]>([]);

  const q = query(collection(db, COL_NAME), where("seasonId", "==", seasonId));

  useEffect(() => {
    return onSnapshot(q, (snapshot) =>
      setGames(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Game))
      )
    );
  }, []);

  return { games };
};

export const addGame = async (game: Game) => {
  return await addDoc(collection(db, COL_NAME), game);
};

export const useGame = (id: string) => {
  const [game, setGame] = useState<Game>({
    dateCreated: "",
    seasonId: "",
    gameDate: new Date().toISOString(),
    opponentName: "",
    location: "",
  });
  useEffect(() => {
    return onSnapshot(doc(db, COL_NAME, id), (doc) =>
      setGame(doc.data() as Game)
    );
  }, []);

  const updateGame = async (game: Game) => {
    const docRef = doc(db, COL_NAME, id);
    return await setDoc(docRef, game);
  };

  return {
    game,
    updateGame,
  };
};

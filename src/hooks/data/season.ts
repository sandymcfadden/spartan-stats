import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  setDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

export type Season = {
  id?: string;
  name: string;
  dateCreated: string;
  team?: Team;
};

export type Team = {
  name?: string;
  short?: string;
  players: Player[];
};

export type Player = {
  id: string;
  firstName: string;
  lastName: string;
  number: number;
  gamesPlayed: number;
};

const COL_NAME = "seasons";

export const useSeasons = () => {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const q = query(collection(db, COL_NAME), orderBy("dateCreated", "desc"));

  useEffect(() => {
    return onSnapshot(q, (snapshot) => {
      setSeasons(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Season))
      );
      setIsLoading(false);
    });
  }, []);

  return { seasons, isLoading };
};

export const addSeason = async (season: Season) => {
  return await addDoc(collection(db, COL_NAME), season);
};

export const useSeason = (id: string) => {
  const [season, setSeason] = useState<Season>({ name: "", dateCreated: "" });
  useEffect(() => {
    return onSnapshot(doc(db, COL_NAME, id), (doc) =>
      setSeason(doc.data() as Season)
    );
  }, []);

  const updateSeason = async (season: Season) => {
    const docRef = doc(db, COL_NAME, id);
    return await setDoc(docRef, season);
  };

  const addPlayer = async (player: Player) => {
    updateSeason({
      ...season,
      team: {
        ...season.team,
        players: [...(season.team?.players || []), player],
      },
    });
  };

  const editPlayer = async (id: Player["id"], newPlayer: Player) => {
    const newPlayerList =
      season.team?.players.filter((player: Player) => player.id !== id) || [];
    newPlayerList.push(newPlayer);
    updateSeason({
      ...season,
      team: {
        ...season.team,
        players: newPlayerList,
      },
    });
  };

  const getPlayerById = (id: Player["id"]) => {
    const player =
      season.team?.players.find((player) => player.id === id) ||
      ({
        firstName: "",
        lastName: "",
        number: 0,
        gamesPlayed: 0,
        id: "",
      } as Player);
    return player;
  };

  const updateTeam = async (team: Team) => {
    updateSeason({
      ...season,
      team,
    });
  };

  return {
    season,
    updateSeason,
    addPlayer,
    updateTeam,
    editPlayer,
    getPlayerById,
  };
};

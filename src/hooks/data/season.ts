import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  setDoc,
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
  firstName: string;
  lastName: string;
  number: number;
};

const COL_NAME = "seasons";

export const useSeasons = () => {
  const [seasons, setSeasons] = useState<Season[]>([]);

  useEffect(() => {
    return onSnapshot(collection(db, COL_NAME), (snapshot) =>
      setSeasons(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Season))
      )
    );
  }, []);

  return { seasons };
};

export const addSeason = async (season: Season) => {
  return await addDoc(collection(db, COL_NAME), season);
};

// export const updateSeason = async (season: Season, id: string) => {
//   const docRef = doc(db, COL_NAME, id);
//   return await setDoc(docRef, season);
// };

// export const addPlayer = async (player: Player, season: Season) => {
//   updateSeason(
//     {
//       ...season,
//       team: {
//         ...season.team,
//         players: [...(season.team?.players || []), player],
//       },
//     },
//     season?.id
//   );
// };

// export const updateTeam = async (team: Team, season: Season) => {
//   updateSeason(
//     {
//       ...season,
//       team,
//     },
//     season?.id
//   );
// };

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

  const updateTeam = async (team: Team) => {
    updateSeason({
      ...season,
      team,
    });
  };

  return { season, updateSeason, addPlayer, updateTeam };
};

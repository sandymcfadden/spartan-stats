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
  quarter?: number;
  ourPoints: Points;
  theirPoints: Points;
  notes?: string;
  gameEndDate?: string;
  stats?: Stats[];
};

export type Points = {
  quarters: number[];
  total: number;
};

export type Stats = {
  playerId: string;
  points: number;
  fgm: number;
  fga: number;
  tpm: number;
  tpa: number;
  ftm: number;
  fta: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
};

export type StatType =
  | "points"
  | "fgm"
  | "fga"
  | "fgp"
  | "tpm"
  | "tpa"
  | "ftm"
  | "fta"
  | "rebounds"
  | "assists"
  | "steals"
  | "blocks"
  | "turnovers";

export type Modifier = "+" | "-";

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
    ourPoints: {
      quarters: [],
      total: 0,
    },
    theirPoints: {
      quarters: [],
      total: 0,
    },
  });

  useEffect(() => {
    return onSnapshot(doc(db, COL_NAME, id), (doc) =>
      setGame({ ...doc.data(), id: doc.id } as Game)
    );
  }, []);

  const updateGame = async (game: Game) => {
    const docRef = doc(db, COL_NAME, id);
    return await setDoc(docRef, game);
  };

  const updatePlayerStats = (
    playerId: string,
    stat: StatType,
    modifier: Modifier = "+"
  ) => {
    const currentStats =
      game.stats?.filter((s) => s.playerId !== playerId) || [];
    const currentPlayerStats = game.stats?.find(
      (s) => s.playerId === playerId
    ) || {
      playerId,
      points: 0,
      fgm: 0,
      fga: 0,
      tpm: 0,
      tpa: 0,
      ftm: 0,
      fta: 0,
      rebounds: 0,
      assists: 0,
      steals: 0,
      blocks: 0,
      turnovers: 0,
    };
    if (!game.ourPoints) {
      game.ourPoints = {
        quarters: [],
        total: 0,
      };
    }
    if (!game.theirPoints) {
      game.theirPoints = {
        quarters: [],
        total: 0,
      };
    }
    if (modifier === "+") {
      switch (stat) {
        case "fgm":
          currentPlayerStats.fgm++;
          currentPlayerStats.fga++;
          currentPlayerStats.points += 2;
          game.ourPoints.total += 2;
          break;
        case "fga":
          currentPlayerStats.fga++;
          break;
        case "tpm":
          currentPlayerStats.tpm++;
          currentPlayerStats.tpa++;
          currentPlayerStats.points += 3;
          game.ourPoints.total += 3;
          break;
        case "tpa":
          currentPlayerStats.tpa++;
          break;
        case "ftm":
          currentPlayerStats.ftm++;
          currentPlayerStats.fta++;
          currentPlayerStats.points += 1;
          game.ourPoints.total += 1;
          break;
        case "fta":
          currentPlayerStats.fta++;
          break;
        case "assists":
          currentPlayerStats.assists++;
          break;
        case "rebounds":
          currentPlayerStats.rebounds++;
          break;
        case "steals":
          currentPlayerStats.steals++;
          break;
        case "blocks":
          currentPlayerStats.blocks++;
          break;
        case "turnovers":
          currentPlayerStats.turnovers++;
          break;
      }
    } else {
      switch (stat) {
        case "fgm":
          currentPlayerStats.fgm--;
          currentPlayerStats.fga--;
          currentPlayerStats.points -= 2;
          game.ourPoints.total -= 2;
          break;
        case "fga":
          currentPlayerStats.fga--;
          break;
        case "tpm":
          currentPlayerStats.tpm--;
          currentPlayerStats.tpa--;
          currentPlayerStats.points -= 3;
          game.ourPoints.total -= 3;
          break;
        case "tpa":
          currentPlayerStats.tpa--;
          break;
        case "ftm":
          currentPlayerStats.ftm--;
          currentPlayerStats.fta--;
          currentPlayerStats.points -= 1;
          game.ourPoints.total -= 1;
          break;
        case "fta":
          currentPlayerStats.fta--;
          break;
        case "assists":
          currentPlayerStats.assists--;
          break;
        case "rebounds":
          currentPlayerStats.rebounds--;
          break;
        case "steals":
          currentPlayerStats.steals--;
          break;
        case "blocks":
          currentPlayerStats.blocks--;
          break;
        case "turnovers":
          currentPlayerStats.turnovers--;
          break;
      }
    }
    currentStats.push(currentPlayerStats);
    return updateGame({ ...game, stats: currentStats });
  };

  return {
    game,
    updateGame,
    updatePlayerStats,
  };
};

import { GameScore } from "./GameScore";
import { GameTabs } from "./GameTabs";

export type GameProps = {
  gameId: string;
  seasonId: string;
};

export const Game = ({ gameId, seasonId }: GameProps) => {
  return (
    <>
      <GameScore gameId={gameId} seasonId={seasonId} />
      <GameTabs gameId={gameId} seasonId={seasonId} />
    </>
  );
};

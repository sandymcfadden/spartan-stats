import { GameScore } from "./GameScore";
import { GameTabs } from "./GameTabs";

export type GameProps = {
  seasonId?: string;
  gameId?: string;
};

export const Game = ({ seasonId, gameId }: GameProps) => {
  return (
    <>
      <GameScore seasonId={seasonId} gameId={gameId} />
      <GameTabs />
    </>
  );
};

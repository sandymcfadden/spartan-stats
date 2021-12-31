import { GameScore } from "./gameScore";
import { GameTabs } from "./gameTabs";

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

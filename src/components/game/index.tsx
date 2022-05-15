import { ErrorBoundary } from "../../components/ErrorBoundary";
import { GameScore } from "./GameScore";
import { GameTabs } from "./GameTabs";

export type GameProps = {
  gameId: string;
  seasonId: string;
};

export const Game = ({ gameId, seasonId }: GameProps) => {
  return (
    <ErrorBoundary>
      <GameScore gameId={gameId} seasonId={seasonId} />
      <GameTabs gameId={gameId} seasonId={seasonId} />
    </ErrorBoundary>
  );
};

'use client';

import React, { useState } from 'react';
import { Game } from '../components/Game';
import { Leaderboard } from '../components/Leaderboard';
import { NameInput } from '../components/NameInput';

export default function Home() {
  const [showNameInput, setShowNameInput] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [gameKey, setGameKey] = useState(0); // Force remount on new game

  const handleGameOver = (score: number) => {
    setCurrentScore(score);
    if (score > 0) {
      setShowNameInput(true);
    }
  };

  const handleScoreSubmit = () => {
    setShowNameInput(false);
    setGameKey(prev => prev + 1); // Remount game for fresh start
  };

  const handleCancel = () => {
    setShowNameInput(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex flex-col items-center justify-center p-4 gap-8 overflow-x-hidden">
      {/* Background particles/animation */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent),radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent)] opacity-75 animate-pulse" />
      </div>

      <header className="text-center z-10">
        <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-2xl mb-4 animate-bounce [animation-duration:3s]">
          FLAPPY BIRD
        </h1>
        <p className="text-xl md:text-2xl text-white/80 font-light drop-shadow-lg">
          Beat the pipes. Climb the leaderboard.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 items-center justify-center max-w-7xl w-full px-4">
        {/* Game */}
        <div className="flex flex-col items-center">
          <Game 
            key={gameKey}
            canvasWidth={420}
            canvasHeight={640}
            onGameOver={handleGameOver}
            className="shadow-2xl"
          />
        </div>

        {/* Leaderboard */}
        <div className="lg:max-w-sm w-full">
          <Leaderboard />
        </div>
      </div>

      {/* Mobile leaderboard below */}
      <div className="lg:hidden w-full max-w-md mx-auto">
        <Leaderboard />
      </div>

      {showNameInput && (
        <NameInput
          score={currentScore}
          onSubmit={handleScoreSubmit}
          onCancel={handleCancel}
        />
      )}

      {/* Footer */}
      <footer className="text-center text-white/60 text-sm mt-12 z-10">
        <p>Built with ❤️ and React Canvas • Waiting for backend APIs</p>
      </footer>
    </main>
  );
}
</xai:function_call ><xai:function_call name="kb_write">
<parameter name="key">registry
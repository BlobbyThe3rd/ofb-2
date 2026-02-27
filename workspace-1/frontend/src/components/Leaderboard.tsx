import React, { useState, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';

interface LeaderboardEntry {
  name: string;
  score: number;
}

export function Leaderboard() {
  const { leaderboard, fetchLeader } = useSocket();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLeader();
    setLoading(false);
  }, [fetchLeader]);

  // TODO: Backend not ready - replace with real data from socket/useSocket
  const placeholderData: LeaderboardEntry[] = [
    { name: 'BirdMaster', score: 42 },
    { name: 'FlappyPro', score: 38 },
    { name: 'SkyKing', score: 35 },
    { name: 'PipeDodger', score: 31 },
    { name: 'Wingman', score: 28 },
    { name: 'CloudSurfer', score: 25 },
    { name: 'FeatherWeight', score: 22 },
    { name: 'AirAce', score: 19 },
    { name: 'BeakBreaker', score: 16 },
    { name: 'You?', score: 0 },
  ];

  return (
    <div className="w-full max-w-md p-6 bg-gradient-to-b from-gray-900 to-gray-800 rounded-3xl shadow-2xl border border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
          🏆
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Leaderboard</h2>
          <p className="text-gray-400 text-sm">Top 10 scores</p>
        </div>
      </div>

      <div className="space-y-2">
        {(loading ? placeholderData : leaderboard).slice(0, 10).map((entry, index) => (
          <div
            key={`${entry.name}-${entry.score}`}
            className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-200 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform">
                {index + 1}
              </div>
              <span className="font-mono text-lg font-bold text-white truncate flex-1">{entry.name}</span>
            </div>
            <span className="font-mono text-2xl font-bold bg-black/20 px-4 py-2 rounded-xl text-white shadow-md">
              {entry.score}
            </span>
          </div>
        ))}
      </div>

      {error && (
        <p className="mt-4 p-3 bg-red-500/20 border border-red-400 text-red-200 rounded-2xl text-center text-sm">
          {error}
        </p>
      )}

      <div className="mt-6 pt-6 border-t border-white/10">
        <p className="text-gray-400 text-xs text-center">
          {/* TODO: Live updates via socket when backend ready */}
          Updates every 30s
        </p>
      </div>
    </div>
  );
}
</xai:function_call ><xai:function_call name="kb_write">
<parameter name="key">registry
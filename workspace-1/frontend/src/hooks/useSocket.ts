// TODO: Backend socket.io server not ready (check registry). 
// Install socket.io-client: npm i socket.io-client @types/socket.io-client
// Then uncomment and implement:

import { useState, useEffect, useCallback } from 'react';
// import io, { Socket } from 'socket.io-client';

interface LeaderboardEntry {
  name: string;
  score: number;
}

export function useSocket() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  // const [socket, setSocket] = useState<Socket | null>(null);

  const fetchLeader = useCallback(() => {
    // TODO: socket?.emit('join_leaderboard');
    console.log('TODO: emit join_leaderboard');
  }, []);

  useEffect(() => {
    // TODO: Backend ready
    /*
    const newSocket = io('http://localhost:8000');
    newSocket.on('leaderboard_update', (data: LeaderboardEntry[]) => {
      setLeaderboard(data);
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
    */
  }, []);

  return { leaderboard, fetchLeader };
}
</xai:function_call ><xai:function_call name="kb_write">
<parameter name="key">registry
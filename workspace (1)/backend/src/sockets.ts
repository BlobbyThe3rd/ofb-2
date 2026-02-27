import { PrismaClient, Score } from '@prisma/client';
import { Socket } from 'socket.io';

const prisma = new PrismaClient();

export async function getTop10(): Promise<Score[]> {
  return prisma.score.findMany({
    take: 10,
    orderBy: { score: 'desc' },
    select: { name: true, score: true }
  });
}

export function handleConnection(socket: Socket) {
  socket.on('join_leaderboard', async () => {
    const top10 = await getTop10();
    socket.emit('leaderboard_update', top10);
  });
}
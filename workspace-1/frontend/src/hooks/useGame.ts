import { useRef, useCallback, useEffect, useState } from 'react';

interface Pipe {
  x: number;
  topHeight: number;
  bottomY: number;
  passed: boolean;
}

export function useGame(canvasWidth: number = 400, canvasHeight: number = 600) {
  const [birdY, setBirdY] = useState(150);
  const [vel, setVel] = useState(0);
  const [pipes, setPipes] = useState<Pipe[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const frameRef = useRef(0);
  const animationRef = useRef<number>();

  const BIRD_SIZE = 30;
  const PIPE_WIDTH = 80;
  const GAP = 200;
  const PIPE_SPEED = 2;
  const GRAVITY = 0.5;
  const JUMP_VEL = -8;

  const update = useCallback(() => {
    frameRef.current += 1;

    // Update bird
    setVel((v) => v + GRAVITY);
    setBirdY((y) => y + vel);

    // Move pipes
    setPipes((pipes) =>
      pipes.map((pipe) => ({
        ...pipe,
        x: pipe.x - PIPE_SPEED,
      }))
    );

    // Add new pipe every 90 frames
    if (frameRef.current % 90 === 0) {
      const minTop = 50;
      const maxTop = canvasHeight - GAP - minTop - 50;
      const topHeight = minTop + Math.random() * (maxTop - minTop);
      setPipes((pipes) => [
        ...pipes,
        {
          x: canvasWidth,
          topHeight,
          bottomY: topHeight + GAP,
          passed: false,
        },
      ]);
    }

    // Remove off-screen pipes
    setPipes((pipes) => pipes.filter((pipe) => pipe.x + PIPE_WIDTH > 0));

    // Score when bird passes pipe
    setPipes((pipes) =>
      pipes.map((pipe) => {
        if (!pipe.passed && pipe.x + PIPE_WIDTH < canvasWidth / 2 - BIRD_SIZE / 2) {
          setScore((s) => s + 1);
          return { ...pipe, passed: true };
        }
        return pipe;
      })
    );

    // Collision detection
    const birdRect = {
      left: canvasWidth / 2 - BIRD_SIZE / 2,
      right: canvasWidth / 2 + BIRD_SIZE / 2,
      top: birdY - BIRD_SIZE / 2,
      bottom: birdY + BIRD_SIZE / 2,
    };

    const collided = pipes.some((pipe) => {
      const topPipe = {
        left: pipe.x,
        right: pipe.x + PIPE_WIDTH,
        top: 0,
        bottom: pipe.topHeight,
      };
      const bottomPipe = {
        left: pipe.x,
        right: pipe.x + PIPE_WIDTH,
        top: pipe.bottomY,
        bottom: canvasHeight,
      };
      return (
        (birdRect.right > topPipe.left &&
         birdRect.left < topPipe.right &&
         birdRect.bottom > topPipe.top &&
         birdRect.top < topPipe.bottom) ||
        (birdRect.right > bottomPipe.left &&
         birdRect.left < bottomPipe.right &&
         birdRect.bottom > bottomPipe.top &&
         birdRect.top < bottomPipe.bottom) ||
        birdRect.top < 0 ||
        birdRect.bottom > canvasHeight
      );
    });

    if (collided) {
      setGameOver(true);
      setIsPlaying(false);
      return;
    }

    animationRef.current = requestAnimationFrame(update);
  }, [canvasWidth, canvasHeight, vel]);

  const jump = useCallback(() => {
    setVel(JUMP_VEL);
  }, []);

  const reset = useCallback(() => {
    setBirdY(150);
    setVel(0);
    setPipes([]);
    setScore(0);
    setGameOver(false);
    setIsPlaying(false);
    frameRef.current = 0;
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  const startGame = useCallback(() => {
    setIsPlaying(true);
    frameRef.current = 0;
    animationRef.current = requestAnimationFrame(update);
  }, [update]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return {
    birdY,
    vel,
    pipes,
    score,
    gameOver,
    isPlaying,
    jump,
    reset,
    startGame,
  };
}
</xai:function_call ><xai:function_call name="kb_write">
<parameter name="key">registry
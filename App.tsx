import React, { useEffect, useCallback, useState } from 'react';
import { MainScene } from './components/Scene';
import { useGameLogic } from './hooks/useGameLogic';
import { useSound } from './hooks/useSound';
import Controls from './components/Controls';
import { Header } from './components/UI';
import { GameStatus } from './types';
import { Play } from 'lucide-react';

const App: React.FC = () => {
  const { initAudio, playBGM, playMove, playRotate, playDrop, playClear, playGameOver } = useSound();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { 
    grid, 
    player, 
    status, 
    score, 
    level, 
    nextPiece, 
    clearingRows,
    comboMessage,
    resetGame, 
    togglePause,
    movePlayer, 
    playerRotate, 
    dropPlayer,
  } = useGameLogic({
      playMove,
      playRotate,
      playDrop,
      playClear,
      playGameOver
  });

  const handleStart = () => {
      initAudio();
      playBGM();
      
      if (status === GameStatus.INTRO) {
          // Trigger transition animation
          setIsTransitioning(true);
          
          // Wait for blocks to fall before resetting/starting real game
          setTimeout(() => {
              setIsTransitioning(false);
              resetGame();
          }, 1500);
      } else {
          resetGame();
      }
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Space to Toggle Pause
    if (e.code === 'Space') {
        if (status === GameStatus.INTRO) {
            handleStart();
        } else {
            togglePause();
        }
        return;
    }

    // Q to Restart
    if (e.key.toLowerCase() === 'q') {
        handleStart();
        return;
    }

    if (status !== GameStatus.PLAYING) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        movePlayer(-1);
        break;
      case 'ArrowRight':
        movePlayer(1);
        break;
      case 'ArrowDown':
        dropPlayer();
        break;
      case 'ArrowUp':
        playerRotate();
        break;
    }
  }, [status, movePlayer, dropPlayer, playerRotate, togglePause, handleStart]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="w-full h-full bg-white relative flex justify-center items-center overflow-hidden font-sans">
        {/* Aspect Ratio Container: 9:16 or Full Height on Mobile */}
        <div 
            className="relative w-full h-full max-w-[56.25vh] bg-white shadow-2xl overflow-hidden"
            style={{ maxHeight: '100vh', aspectRatio: '9/16' }}
        >
            {/* 3D Scene Layer */}
            <div className="absolute inset-0 z-0">
                <MainScene 
                    grid={grid} 
                    player={player} 
                    clearingRows={clearingRows} 
                    status={status} 
                    isTransitioning={isTransitioning}
                />
            </div>

            {/* UI Layer - Only show Header if NOT in Intro */}
            {status !== GameStatus.INTRO && (
                <Header score={score} level={level} nextPiece={nextPiece} />
            )}

            {/* Combo Popup */}
            {comboMessage && (
                <div className="absolute top-1/4 left-0 right-0 flex justify-center pointer-events-none z-20">
                     <div className="bg-black/80 backdrop-blur-md text-white px-8 py-2 rounded-full text-2xl font-black tracking-widest uppercase shadow-2xl animate-bounce">
                         {comboMessage}
                     </div>
                </div>
            )}

            {/* Controls Layer - Invisible Touch Zones & Start Button */}
            <Controls 
                isPlaying={status === GameStatus.PLAYING || status === GameStatus.CLEARING}
                isPaused={status === GameStatus.PAUSED}
                isIntro={status === GameStatus.INTRO}
                onStart={handleStart}
                onPause={togglePause}
                onMove={movePlayer}
                onRotate={playerRotate}
                onDrop={dropPlayer}
            />
            
            {/* Paused Overlay with Instructions */}
            {status === GameStatus.PAUSED && (
                 <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/40 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-white/40 flex flex-col items-center max-w-[80%] text-center">
                        <div className="text-3xl font-bold tracking-widest text-black mb-8 uppercase">Paused</div>
                        
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-left mb-8 text-sm text-gray-600">
                            <div className="font-bold text-black text-right">SPACE</div>
                            <div>Resume</div>
                            
                            <div className="font-bold text-black text-right">Q</div>
                            <div>Restart</div>
                            
                            <div className="font-bold text-black text-right">ARROWS</div>
                            <div>Move / Rotate</div>
                        </div>

                        <button 
                            onClick={togglePause}
                            className="bg-black text-white px-10 py-4 rounded-full flex items-center gap-2 hover:scale-105 transition-transform shadow-xl font-bold tracking-wider text-sm"
                        >
                            <Play size={16} fill="currentColor" /> RESUME
                        </button>
                    </div>
                 </div>
            )}
            
            {/* Game Over Modal */}
            {status === GameStatus.GAME_OVER && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-md animate-in fade-in duration-500">
                    <div className="bg-white/90 backdrop-blur-3xl p-8 rounded-[2.5rem] shadow-2xl text-center border border-white w-3/4 max-w-sm">
                        <h2 className="text-3xl font-light mb-2 text-gray-800 tracking-tighter">Game Over</h2>
                        <div className="my-8 py-6 border-y border-gray-100">
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Final Score</p>
                            <p className="text-6xl font-light text-gray-900 tabular-nums tracking-tighter">{score}</p>
                        </div>
                        <button 
                            onClick={handleStart}
                            className="bg-black text-white w-full py-4 rounded-full text-xs font-bold tracking-[0.25em] hover:bg-gray-800 transition-colors shadow-xl"
                        >
                            RESTART
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default App;
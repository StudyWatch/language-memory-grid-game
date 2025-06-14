
import { useState, useEffect, useCallback } from 'react';
import MemoryCard from '@/components/MemoryCard';
import { targetLangCards, sourceLangCards, wordPairs } from '@/data/words';
import { Github, BookOpen, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type Card = {
  id: number; // This is the pair ID
  lang: string;
  word: string;
};

const shuffle = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Index = () => {
  const [gameCards, setGameCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const startGame = useCallback(() => {
    const allCards = shuffle([...targetLangCards, ...sourceLangCards]);
    setGameCards(allCards);
    setSelectedCards([]);
    setMatchedPairs([]);
    setScore(0);
    setGameWon(false);
    setIsChecking(false);
    toast.info('New game started. Good luck!');
  }, []);

  useEffect(() => {
    startGame();
  }, [startGame]);

  const handleCardClick = (card: Card) => {
    if (gameWon || isChecking || selectedCards.length >= 2) return;
    
    const isAlreadySelected = selectedCards.some(c => c.id === card.id && c.lang === card.lang);
    if (isAlreadySelected || matchedPairs.includes(card.id)) return;

    const newSelectedCards = [...selectedCards, card];
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
      setIsChecking(true);
      const [firstCard, secondCard] = newSelectedCards;

      if (firstCard.id === secondCard.id) { // Match
        setScore(prev => prev + 10);
        setMatchedPairs(prev => {
          const newMatchedPairs = [...prev, firstCard.id];
          if (newMatchedPairs.length === wordPairs.length) {
            setGameWon(true);
            toast.success("Congratulations! You've matched all the pairs!", {
              duration: 5000,
            });
          }
          return newMatchedPairs;
        });
        setSelectedCards([]);
        setIsChecking(false);
      } else { // No match
        setScore(prev => Math.max(0, prev - 2));
        setTimeout(() => {
          setSelectedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  const renderCard = (card: Card) => {
    const isFlipped =
      selectedCards.some((c) => c.id === card.id && c.lang === card.lang) ||
      matchedPairs.includes(card.id);
    const isMatched = matchedPairs.includes(card.id);

    return (
      <MemoryCard
        key={`${card.lang}-${card.id}`}
        word={card.word}
        isFlipped={isFlipped}
        isMatched={isMatched}
        onClick={() => handleCardClick(card)}
      />
    );
  };
  
  const spanishCards = gameCards.filter(c => c.lang === 'es');
  const englishCards = gameCards.filter(c => c.lang === 'en');

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3">
            <BookOpen className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              Language Memory Game
            </h1>
          </div>
          <p className="text-slate-500 mt-2">Match the words to improve your vocabulary!</p>
        </header>

        <main>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <div className="text-center bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold">
                Score: <span className="text-blue-600 w-16 inline-block text-left">{score}</span>
              </h2>
            </div>
            <Button onClick={startGame} variant="outline" className="bg-white/70">
              <RefreshCw className="mr-2 h-4 w-4" />
              New Game
            </Button>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-2 gap-x-8 gap-y-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center text-slate-700 pb-2 border-b-2 border-slate-300">
                Spanish
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {spanishCards.map(renderCard)}
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center text-slate-700 pb-2 border-b-2 border-slate-300">
                English
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {englishCards.map(renderCard)}
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="grid grid-cols-5 gap-2 md:hidden">
            {gameCards.map(renderCard)}
          </div>
        </main>

        <footer className="text-center mt-12 text-slate-500">
            <a 
              href="https://github.com/gpt-engineer-org/lovable-vite" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-blue-600 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>View on GitHub</span>
            </a>
        </footer>
      </div>
    </div>
  );
};

export default Index;

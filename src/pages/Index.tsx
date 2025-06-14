
import { useState } from 'react';
import MemoryCard from '@/components/MemoryCard';
import { targetLangCards, sourceLangCards } from '@/data/words';
import { Github, BookOpen } from 'lucide-react';

const Index = () => {
  // The state logic here is purely for demonstrating the UI.
  // In a real application, this would be handled by props and game logic.
  const [selectedCards, setSelectedCards] = useState([
    { id: 2, lang: 'es', word: 'Perro' },
    { id: 3, lang: 'en', word: 'House' },
  ]);
  const [matchedPairs, setMatchedPairs] = useState([1]);
  const [score, setScore] = useState(10); // Example score

  // Dummy click handler for demonstration
  const handleCardClick = (card: { id: number; lang: string; word: string }) => {
    console.log('Clicked card:', card);
    // In a real game, you would implement selection and matching logic here.
  };

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
          <div className="text-center mb-8 bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-sm inline-block mx-auto">
            <h2 className="text-2xl font-bold">
              Score: <span className="text-blue-600 w-12 inline-block">{score}</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
            {/* Target Language Column */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center text-slate-700 pb-2 border-b-2 border-slate-300">
                Spanish
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {targetLangCards.map((card) => {
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
                })}
              </div>
            </div>

            {/* Source Language Column */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center text-slate-700 pb-2 border-b-2 border-slate-300">
                English
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {sourceLangCards.map((card) => {
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
                })}
              </div>
            </div>
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

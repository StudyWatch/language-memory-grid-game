
import { cn } from '@/lib/utils';
import { Check, HelpCircle } from 'lucide-react';

interface MemoryCardProps {
  word: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const MemoryCard = ({ word, isFlipped, isMatched, onClick }: MemoryCardProps) => {
  return (
    <div className="perspective" onClick={onClick}>
      <div
        className={cn(
          'relative w-full h-28 preserve-3d rounded-lg shadow-md transition-transform duration-500 cursor-pointer',
          { '[transform:rotateY(180deg)]': isFlipped }
        )}
      >
        {/* Back of the card (default view) */}
        <div className="absolute w-full h-full backface-hidden rounded-lg bg-blue-500 hover:bg-blue-600 flex items-center justify-center">
          <HelpCircle className="w-12 h-12 text-white" />
        </div>
        {/* Front of the card (flipped view) */}
        <div
          className={cn(
            'absolute w-full h-full backface-hidden rounded-lg flex items-center justify-center p-2 [transform:rotateY(180deg)]',
            {
              'bg-white': !isMatched,
              'bg-green-400 text-white border-2 border-green-500': isMatched,
            }
          )}
        >
          <span className="text-xl font-bold text-center">{word}</span>
          {isMatched && <Check className="absolute top-2 right-2 w-6 h-6 text-white" />}
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;

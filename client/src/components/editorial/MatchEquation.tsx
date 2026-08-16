import React from 'react';
import { Handshake } from 'lucide-react';

export interface MatchEquationProps {
  userAImage?: string;
  userBImage?: string;
}

export const MatchEquation: React.FC<MatchEquationProps> = ({
  userAImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuC2qhnAw2K1jdV0Qx7NwUSht3QwoACQKPkRrbO5hw5XXTPMblV64Q7u-DtG01Q63aQpM2L8nX9YkzDtEL221JkwBIzUkVvMSVDQfDhKUa2Z6MhkqhNmu6CFTnIuYS0CHw9gwyQYbozPclSBAvlSjlPAzOdVlbteG2aV_HWr7wK7Rq0l0UPweH6jLaTPlazlNPcKNLOaN6fAQCjE-KW3eEf5PgNGEEEjYJC9jMsQT0DxR8VovXpsD2fikQ",
  userBImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuC6uUHeNOARurbUhbnCZ4wzzKxMQPrwtSQoL_6AX1J2fyvaG5EdF9ecW8XH7pjOkzlSeDthL1-n4QPO9_eiU2mr_ccS0c7Qy1yULt7hFNm0AHnlbMCgiseS8Q1nKRjITbY-4tkruriUmc582xCSllY4zdK2uKMhJSHJw7HcEXVnOY0fZNEFvv-yVlfLHlguR5AXLs_tIlb8YKmYWLST2VuKSYPlNlfxHH4cIi6XrkSv57Q8N6WelLX7HA",
}) => {
  return (
    <div className="flex justify-center items-center gap-4 sm:gap-10 md:gap-14 my-10">
      {/* User A */}
      <div className="flex flex-col items-center group">
        <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-clay shadow-lg mb-3 transition-transform group-hover:scale-105">
          <img
            src={userAImage}
            alt="Your Lifestyle DNA"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <span className="font-sans text-label-caps font-bold text-earth-indigo">YOU</span>
      </div>

      {/* Math Plus */}
      <span className="text-3xl sm:text-4xl text-outline-variant font-light select-none">+</span>

      {/* User B */}
      <div className="flex flex-col items-center group">
        <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-clay shadow-lg mb-3 transition-transform group-hover:scale-105">
          <img
            src={userBImage}
            alt="Roommate Profile"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <span className="font-sans text-label-caps font-bold text-earth-indigo">THEM</span>
      </div>

      {/* Math Equals */}
      <span className="text-3xl sm:text-4xl text-outline-variant font-light select-none">=</span>

      {/* Mutual Match Result */}
      <div className="flex flex-col items-center group">
        <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-earth-indigo flex items-center justify-center text-clay shadow-xl mb-3 border-4 border-earth-indigo/20 transition-transform group-hover:scale-110">
          <Handshake className="w-8 h-8 sm:w-12 sm:h-12 text-vitality-coral" />
        </div>
        <span className="font-sans text-label-caps font-bold text-earth-indigo tracking-wider">
          MUTUAL MATCH
        </span>
      </div>
    </div>
  );
};

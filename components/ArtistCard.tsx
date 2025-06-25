'use client';

import { useState } from "react";
import { QuoteModal } from "@/components/QuoteModal";

interface Artist {
  name: string;
  category: string[];
  location: string;
  priceRange: string;
}

export const ArtistCard = ({ name, category, location, priceRange }: Artist) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requested, setRequested] = useState(false);

  const handleRequestComplete = () => {
    setRequested(true);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-slate-800 rounded-xl border border-slate-700 shadow hover:shadow-md transition space-y-2">
      <h3 className="text-lg font-bold text-white">{name}</h3>
      <p className="text-sm text-slate-400">{category} • {location}</p>
      <p className="text-sm text-slate-300">Fee: {priceRange}</p>

      <button
        onClick={() => setIsModalOpen(true)}
        disabled={requested}
        className={`mt-3 text-white text-sm px-4 py-2 rounded-full transition
          ${requested ? 'bg-green-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
        `}
      >
        {requested ? "Requested" : "Ask for Quote"}
      </button>

      <QuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        artistName={name}
        onSubmitComplete={handleRequestComplete}
      />
    </div>
  );
};

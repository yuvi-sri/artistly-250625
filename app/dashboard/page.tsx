'use client';

import { useEffect, useState } from "react";

interface Artist {
  name: string;
  category: string[];
  location: string;
  priceRange: string;
  onboarded?: boolean;
}

export default function ManagerDashboard() {
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("artists");
    if (stored) {
      setArtists(JSON.parse(stored));
    }
  }, []);

  const handleClear = () => {
    localStorage.removeItem("artists");
    setArtists([]);
  };

  const toggleOnboard = (i: number) => {
    const updated = [...artists];
    updated[i].onboarded = !updated[i].onboarded;
    setArtists(updated);
    localStorage.setItem("artists", JSON.stringify(updated));
  };

  const deleteArtist = (i: number) => {
    const updated = artists.filter((_, idx) => idx !== i);
    setArtists(updated);
    localStorage.setItem("artists", JSON.stringify(updated));
  };

  const viewArtist = (i: number) => {
    alert(JSON.stringify(artists[i], null, 2));
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white px-4 py-12">
      <div className="max-w-5xl mx-auto bg-slate-800 p-6 rounded-xl border border-slate-700 shadow space-y-6">
        <h1 className="text-2xl font-bold text-center mb-6">🎛️ Manager Dashboard</h1>

        {artists.length === 0 ? (
          <p className="text-center text-slate-400">No artist submissions yet.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] table-auto border-collapse">
                <thead>
                  <tr className="bg-slate-700 text-left">
                    <th className="p-3 border-b border-slate-600">Name</th>
                    <th className="p-3 border-b border-slate-600">Category</th>
                    <th className="p-3 border-b border-slate-600">City</th>
                    <th className="p-3 border-b border-slate-600">Fee</th>
                    <th className="p-3 border-b border-slate-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {artists.map((artist, index) => (
                    <tr key={index} className="hover:bg-slate-700/40">
                      <td className="p-3 border-b border-slate-700">{artist.name}</td>
                      <td className="p-3 border-b border-slate-700">{artist.category.join(", ")}</td>
                      <td className="p-3 border-b border-slate-700">{artist.location}</td>
                      <td className="p-3 border-b border-slate-700">{artist.priceRange}</td>
                      <td className="p-3 border-b border-slate-700">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => toggleOnboard(index)}
                            className={`px-3 py-1 text-sm rounded ${
                              artist.onboarded ? "bg-green-600" : "bg-gray-600"
                            } hover:opacity-90`}
                          >
                            {artist.onboarded ? "Onboarded" : "Mark Onboarded"}
                          </button>

                          <button
                            onClick={() => viewArtist(index)}
                            className="bg-blue-600 hover:bg-blue-700 text-sm px-3 py-1 rounded"
                          >
                            View
                          </button>

                          <button
                            onClick={() => deleteArtist(index)}
                            className="bg-red-600 hover:bg-red-700 text-sm px-3 py-1 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-right">
              <button
                onClick={handleClear}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Clear All
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { ArtistCard } from "@/components/ArtistCard";
import { FilterBlock } from "@/components/FilterBlock";
import { mockArtists } from "@/lib/artists";

const unique = (arr: string[]) => [...new Set(arr)];

interface Artist {
  id: string;
  name: string;
  category: string[];
  location: string;
  priceRange: string;
  onboarded?: boolean;
}

export function ArtistsFilterContent() {
  const searchParams = useSearchParams();

  const [allArtists, setAllArtists] = useState<Artist[]>([]);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const local = localStorage.getItem("artists");
    const onboarded: Artist[] = local
      ? JSON.parse(local).filter((a: Artist) => a.onboarded)
      : [];

    const mockWithStatus = mockArtists.filter((a) => a.onboarded !== false);

    const combined = [...mockWithStatus, ...onboarded].map((artist, index) => ({
      ...artist,
      id: String(artist.id || artist.name || index),
      category: Array.isArray(artist.category) ? artist.category : [artist.category],
    }));

    setAllArtists(combined);
  }, []);

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, [searchParams]);

  const filtered = allArtists.filter((artist) => {
    return (
      (category === "" || artist.category.includes(category)) &&
      (location === "" || artist.location === location) &&
      (price === "" || artist.priceRange === price)
    );
  });

  const allCategories = unique(
    allArtists.flatMap((a) =>
      Array.isArray(a.category) ? a.category : [a.category]
    ).filter(Boolean)
  );

  const allLocations = unique(
    allArtists.map((a) => a.location).filter(Boolean)
  );

  const allPrices = unique(
    allArtists.map((a) => a.priceRange).filter(Boolean)
  );

  return (
    <main className="min-h-screen bg-[#0f172a] text-white py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-12">
        🎭 Discover Performing Artists
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        <aside className="space-y-6 bg-slate-800 p-6 rounded-xl border border-slate-700">
          <FilterBlock filter="Category" options={allCategories} value={category} onChange={setCategory} />
          <FilterBlock filter="Location" options={allLocations} value={location} onChange={setLocation} />
          <FilterBlock filter="Price Range" options={allPrices} value={price} onChange={setPrice} />
        </aside>

        <section className="lg:col-span-3 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.length > 0 ? (
            filtered.map((a) => <ArtistCard key={a.id} {...a} />)
          ) : (
            <p className="col-span-full text-center text-slate-400">No artists found with selected filters.</p>
          )}
        </section>
      </div>
    </main>
  );
}

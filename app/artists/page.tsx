'use client';

import { Suspense } from "react";
import { ArtistsFilterContent } from "./ArtistsFilterContent";

export default function ArtistsPage() {
  return (
    <Suspense fallback={<p className="text-white text-center py-12">Loading artists...</p>}>
      <ArtistsFilterContent />
    </Suspense>
  );
}

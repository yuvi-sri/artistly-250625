import { CategoryCard } from "@/components/CategoryCard";
import { categories } from "@/lib/data";
import Link from "next/link";


export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-100 to-purple-100 py-24 text-center px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl font-extrabold leading-tight text-gray-800">
            Discover and Book the <span className="text-blue-600">Perfect Talent</span>
          </h1>
          <p className="text-lg text-gray-600">
            Artistly connects event planners with talented singers, dancers, DJs, and speakers.
          </p>
         <div className="flex justify-center gap-4 flex-wrap">
  <Link
    href="/artists"
    className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-full font-medium shadow-lg"
  >
    Explore Artists
  </Link>
  <Link
    href="/dashboard"
    className="bg-slate-800 hover:bg-slate-900 transition text-white px-6 py-3 rounded-full font-medium shadow-lg"
  >
    Manager Dashboard
  </Link>
</div>

        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800">
          Browse by Category
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((c) => (
            <CategoryCard key={c.name} label={c.name} icon={c.icon} />
          ))}
        </div>
      </section>
    </main>
  );
}

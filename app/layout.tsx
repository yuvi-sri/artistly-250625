import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Artistly | Book Performing Artists",
  description: "Connect with singers, dancers, speakers and DJs.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="p-4 bg-white shadow">
          <nav className="container mx-auto flex justify-between items-center py-4 px-2">
  <Link href="/" className="text-2xl font-bold text-blue-700">
    Artistly
  </Link>
  <div className="flex gap-6 text-gray-600 font-medium">
    <Link href="/artists" className="hover:text-blue-600 transition">Artists</Link>
    <Link href="/onboard" className="hover:text-blue-600 transition">Onboard</Link>
  </div>
</nav>

        </header>
        {children}
      </body>
    </html>
  );
}

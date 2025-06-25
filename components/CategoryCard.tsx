'use client';
import Link from "next/link";

interface Props {
  label: string;
  icon: string;
}

export const CategoryCard = ({ label, icon }: Props) => (
  <Link
    href={`/artists?category=${encodeURIComponent(label.slice(0, -1))}`}
    className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl shadow hover:shadow-lg hover:bg-blue-50 transition duration-300 text-center"
  >
    <span className="text-5xl">{icon}</span>
    <p className="text-lg font-semibold text-gray-700">{label}</p>
  </Link>
);

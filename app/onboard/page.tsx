'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MultiSelectCheckbox } from "@/components/MultiSelectCheckbox";
import { categories, feeRanges, languages } from "@/lib/constants";
import * as z from "zod";
import { useState } from "react";

// Zod schema for validation
const schema = z.object({
  name: z.string().min(2),
  bio: z.string().min(10),
  category: z.array(z.string()).min(1, "Select at least one category"),
  languages: z.array(z.string()).min(1),
  location: z.string().min(2),
  priceRange: z.string().nonempty(),
  image: z.any().optional(),
});

type FormData = z.infer<typeof schema>;

export default function OnboardPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: [],
      languages: [],
    },
  });

  const categoriesSelected = watch("category");
  const languagesSelected = watch("languages");

  const onSubmit = (data: FormData) => {
    const existing = JSON.parse(localStorage.getItem("artists") || "[]");
    const updated = [...existing, { ...data, onboarded: false }];
    localStorage.setItem("artists", JSON.stringify(updated));

    setSubmitted(true);     
    reset();                

    setTimeout(() => {
      setSubmitted(false);  
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white px-4 py-12">
      <div className="max-w-2xl mx-auto bg-slate-800 p-6 rounded-xl border border-slate-700 shadow space-y-6">
        <h1 className="text-2xl font-bold text-center mb-6">Artist Onboarding Form</h1>

        {submitted ? (
          <div className="bg-green-600 text-white py-3 px-4 rounded text-center">
            🎉 Artist Onboarding form successfully registered !
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block mb-1">Name</label>
              <input {...register("name")} className="w-full px-3 py-2 rounded bg-slate-700 text-white" />
              {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
            </div>

            {/* Bio */}
            <div>
              <label className="block mb-1">Bio</label>
              <textarea {...register("bio")} rows={4} className="w-full px-3 py-2 rounded bg-slate-700 text-white" />
              {errors.bio && <p className="text-red-400 text-sm">{errors.bio.message}</p>}
            </div>

            {/* Categories */}
            <MultiSelectCheckbox
              label="Artist Categories"
              options={categories}
              selected={categoriesSelected}
              onChange={(val) => setValue("category", val, { shouldValidate: true })}
            />
            {errors.category && <p className="text-red-400 text-sm">{errors.category.message}</p>}

            {/* Languages */}
            <MultiSelectCheckbox
              label="Languages Spoken"
              options={languages}
              selected={languagesSelected}
              onChange={(val) => setValue("languages", val, { shouldValidate: true })}
            />
            {errors.languages && <p className="text-red-400 text-sm">{errors.languages.message}</p>}

            {/* Fee Range */}
            <div>
              <label className="block mb-1">Fee Range</label>
              <select {...register("priceRange")} className="w-full bg-slate-700 text-white px-3 py-2 rounded">
                <option value="">Select...</option>
                {feeRanges.map((fee) => (
                  <option key={fee} value={fee}>
                    {fee}
                  </option>
                ))}
              </select>
              {errors.priceRange && <p className="text-red-400 text-sm">{errors.priceRange.message}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="block mb-1">Location</label>
              <input {...register("location")} className="w-full px-3 py-2 rounded bg-slate-700 text-white" />
              {errors.location && <p className="text-red-400 text-sm">{errors.location.message}</p>}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block mb-1">Profile Image (optional)</label>
              <input type="file" {...register("image")} className="block w-full text-sm text-gray-300" />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium"
            >
              Submit Artist
            </button>
          </form>
        )}
      </div>
    </main>
  );
}

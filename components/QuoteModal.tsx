'use client';

import { Dialog } from '@headlessui/react';
import { useState } from 'react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  artistName: string;
  onSubmitComplete?: () => void;
}


export function QuoteModal({ isOpen, onClose, artistName, onSubmitComplete }: QuoteModalProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    date: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
  console.log("Quote Request Submitted:", { artist: artistName, ...form });
  alert("🎉 Quote request submitted!");
  onSubmitComplete?.();

};


  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white text-black max-w-md w-full rounded-lg p-6 shadow-xl">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Request a Quote for {artistName}
          </Dialog.Title>
          
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full mb-3 p-2 border border-gray-300 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full mb-3 p-2 border border-gray-300 rounded"
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full mb-3 p-2 border border-gray-300 rounded"
          />

          <textarea
            name="message"
            placeholder="Message (optional)"
            value={form.message}
            onChange={handleChange}
            className="w-full mb-3 p-2 border border-gray-300 rounded"
          />

          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Send Request</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

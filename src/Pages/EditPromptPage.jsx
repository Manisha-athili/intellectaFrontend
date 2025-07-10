// src/pages/EditPromptPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PromptForm from '../Components/PromptForm';
import { getPromptById, updatePrompt } from '../services/PromptService';
import { useDarkMode } from '../Components/CommonUI/DarkModeContext';
import { toast } from 'react-toastify';

export default function EditPromptPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const res = await getPromptById(id);
        setPrompt(res.data);
      } catch (err) {
        setError('Failed to load prompt',err);
        toast.error('Failed to load prompt');
      } finally {
        setLoading(false);
      }
    };
    fetchPrompt();
  }, [id]);

  const handleSubmit = async (updatedData) => {
    try {
      await updatePrompt(id, updatedData);
      toast.success('Prompt updated successfully!');
      navigate(`/prompt`);
    } catch (err) {
      console.error('Update failed:', err);
      toast.error('Failed to update prompt');
    }
  };

  if (loading) return <div className="text-white pt-24 px-4">Loading...</div>;
  if (error) return <div className="text-red-500 pt-24 px-4">{error}</div>;

  return (
    <div className={`min-h-screen pt-24 px-4 ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
      <div className="max-w-3xl mx-auto">
        <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
          Edit Prompt
        </h1>
        <PromptForm
          initialData={prompt}
          onSubmit={handleSubmit}
          submitLabel="Update Prompt"
          loading={loading}
        />
      </div>
    </div>
  );
}

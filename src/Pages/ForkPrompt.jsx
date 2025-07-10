// src/pages/ForkPrompt.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PromptForm from "../Components/PromptForm";
import { getPromptById, forkPrompt } from "../services/PromptService";
import { useDarkMode } from "../Components/CommonUI/DarkModeContext";

export default function ForkPrompt() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const res = await getPromptById(id);
        const {data} = res 
        setInitialData({
          title: `${data.title} (Forked)`,
          description: data.description,
          systemPrompt: data.systemPrompt,
          userMessages: data.userMessages,
          assistantMessages: data.assistantMessages,
          categories: data.categories,
          isPrivate: false,
        });
      } catch (err) {
        console.error("Failed to load original prompt:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompt();
  }, [id]);
  const handleForkSubmit = async (formData) => {
    try {
      const newPrompt = await forkPrompt(id, formData);
      // console.log(newPrompt)
      navigate(`/prompt/${newPrompt.data._id}`);
    } catch (err) {
      console.error("Failed to fork prompt:", err);
    }
  };

  if (loading)
    return (
      <div
        className={`text-center py-10 ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        Loading…
      </div>
    );

  if (!initialData)
    return (
      <div className="text-red-500 text-center mt-10">
        Prompt not found.
      </div>
    );

  return (
    <div
      className={`relative overflow-hidden mx-auto pt-24 px-4 sm:px-6 md:px-10 lg:px-16 transition-colors duration-300 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          Fork this Prompt
        </h1>
        <PromptForm
          initialData={initialData}
          onSubmit={handleForkSubmit}
          submitLabel="Fork Prompt"
        />
      </div>
    </div>
  );
}

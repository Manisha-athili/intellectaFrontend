import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PromptForm from "../Components/PromptForm";
import { toast } from "react-toastify";
import { createPrompt } from "../services/PromptService"; 

export default function CreatePrompt() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (formData) => {
    setLoading(true);
    const loadingId = toast.loading("Creating prompt...");

    try {
      const { data: newPrompt } = await createPrompt(formData);

      toast.update(loadingId, {
        render: "Prompt created successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      navigate(`/`);
    } catch (err) {
      console.error("CreatePrompt error:", err);
      toast.update(loadingId, {
        render: `Error: ${err?.response?.data?.error || err.message}`,
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
          Create New Prompt
        </h1>
        <p className="text-gray-800 dark:text-white pb-10">
          Share your AI prompt with the community. Be descriptive and provide context to help others understand its purpose and usage.
        </p>
        <PromptForm onSubmit={handleCreate} submitLabel="Submit Prompt" loading={loading} />
      </div>
    </div>
  );
}

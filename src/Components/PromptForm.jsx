import { useState, useEffect } from "react";
import { useDarkMode } from "./CommonUI/DarkModeContext";

export default function PromptForm({
  initialData = {},
  onSubmit,
  submitLabel = "Submit Prompt",
  maxCategories = 5,
  loading = false,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [conversation, setConversation] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { darkMode } = useDarkMode();

  const predefinedCategories = [
    "Business", "RepoPrompt", "Writing", "Programming", "Marketing", "Design",
    "Productivity", "Cursor Rules", "MetaPrompting", "Personal Growth", "Deep Research", "Veo 3",
  ];

  useEffect(() => {
    if (initialData.title) setTitle(initialData.title);
    if (initialData.description) setDescription(initialData.description);
    if (initialData.systemPrompt) setSystemPrompt(initialData.systemPrompt);
    if (Array.isArray(initialData.categories)) {
      setCategories(initialData.categories.slice(0, maxCategories));
    }
    if (typeof initialData.isPrivate === "boolean") {
      setIsPrivate(initialData.isPrivate);
    }

    const combined = [];
    if (Array.isArray(initialData.userMessages)) {
      initialData.userMessages.forEach((text) =>
        combined.push({ role: "user", content: text })
      );
    }
    if (Array.isArray(initialData.assistantMessages)) {
      initialData.assistantMessages.forEach((text) =>
        combined.push({ role: "assistant", content: text })
      );
    }
    setConversation(combined);
  }, []);

  const handleAddMessage = (role) => {
    setConversation((prev) => [...prev, { role, content: "" }]);
  };

  const handleMessageChange = (index, value) => {
    setConversation((prev) => {
      const copy = [...prev];
      copy[index].content = value;
      return copy;
    });
  };

  const handleCategoryToggle = (cat) => {
    setCategories((prev) => {
      if (prev.includes(cat)) {
        return prev.filter((c) => c !== cat);
      } else if (prev.length < maxCategories) {
        return [...prev, cat];
      }
      return prev;
    });
  };

  const handleCategoryAdd = () => {
    const trimmed = newCategory.trim();
    if (trimmed && !categories.includes(trimmed)) {
      setCategories((prev) => {
        if (prev.length >= maxCategories) return prev;
        return [...prev, trimmed];
      });
      setNewCategory("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!title.trim() || !description.trim() || !systemPrompt.trim()) {
      setErrorMessage("Title, description, and system prompt are required.");
      return;
    }

    const userMessages = conversation
      .filter((m) => m.role === "user" && m.content.trim() !== "")
      .map((m) => m.content.trim());

    const assistantMessages = conversation
      .filter((m) => m.role === "assistant" && m.content.trim() !== "")
      .map((m) => m.content.trim());

    const payload = {
      title: title.trim(),
      description: description.trim(),
      systemPrompt: systemPrompt.trim(),
      userMessages,
      assistantMessages,
      categories,
      isPrivate,
    };

    if (typeof onSubmit === "function") {
      onSubmit(payload);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMessage && (
        <div className="bg-red-700 text-white p-2 rounded">{errorMessage}</div>
      )}

      {/* Title */}
      <div>
        <label className={`block font-semibold ${darkMode ? "text-white" : "text-black"}`}>Title *</label>
        <input
          type="text"
          className={`w-full mt-1 p-2 rounded border ${
            darkMode ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-zinc-300 text-black"
          }`}
          placeholder="Give your prompt a descriptive title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className={`block font-semibold ${darkMode ? "text-white" : "text-black"}`}>Description *</label>
        <textarea
          className={`w-full mt-1 p-2 rounded border ${
            darkMode ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-zinc-300 text-black"
          }`}
          placeholder="Describe what your prompt does and how it should be used"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* Prompt Area */}
      <div>
        <label className={`block font-semibold mb-1 ${darkMode ? "text-white" : "text-black"}`}>Prompt *</label>
        <div
          className={`rounded p-3 space-y-4 border ${
            darkMode ? "bg-zinc-800 border-zinc-700" : "bg-gray-100 border-gray-300"
          }`}
        >
          {/* System Prompt */}
          <div>
            <span className={`text-sm font-bold ${darkMode ? "text-purple-400" : "text-purple-700"}`}>
              SYSTEM PROMPT
            </span>
            <textarea
              className={`w-full mt-1 p-2 rounded border ${
                darkMode ? "bg-zinc-900 border-zinc-700 text-white" : "bg-white border-zinc-300 text-black"
              }`}
              placeholder="Enter your system prompt here..."
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              required
            />
          </div>

          {/* Conversation */}
          <div>
            <span className={`text-sm font-bold ${darkMode ? "text-purple-400" : "text-purple-700"}`}>
              CONVERSATION
            </span>
            {conversation.map((msg, idx) => (
              <div key={idx} className="mt-2">
                <label className={`text-sm block ${darkMode ? "text-white" : "text-black"}`}>
                  {msg.role === "user" ? "User Message" : "Assistant Message"}
                </label>
                <textarea
                  className={`w-full mt-1 p-2 rounded border ${
                    darkMode ? "bg-zinc-900 border-zinc-700 text-white" : "bg-white border-zinc-300 text-black"
                  }`}
                  value={msg.content}
                  onChange={(e) => handleMessageChange(idx, e.target.value)}
                />
              </div>
            ))}
            <div className="flex gap-4 mt-2">
              <button
                type="button"
                onClick={() => handleAddMessage("user")}
                className="px-3 py-1 bg-blue-700 text-white rounded"
              >
                + Add User Message
              </button>
              <button
                type="button"
                onClick={() => handleAddMessage("assistant")}
                className="px-3 py-1 bg-purple-700 text-white rounded"
              >
                + Add Assistant Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div>
        <label className={`block font-semibold ${darkMode ? "text-white" : "text-black"}`}>Categories</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {predefinedCategories.map((cat) => (
            <span
              key={cat}
              onClick={() => handleCategoryToggle(cat)}
              className={`cursor-pointer px-3 py-1 rounded-full text-sm border ${
                categories.includes(cat)
                  ? darkMode
                    ? "bg-purple-600 border-purple-700 text-white"
                    : "bg-purple-300 border-purple-600 text-black"
                  : darkMode
                  ? "bg-zinc-700 border-zinc-600 text-zinc-200"
                  : "bg-gray-200 border-gray-300 text-gray-800"
              }`}
            >
              {cat}
            </span>
          ))}
        </div>
        <div className="flex mt-3 gap-2">
          <input
            type="text"
            placeholder="Add or type and Enter to create a category"
            className={`flex-1 p-2 rounded border ${
              darkMode ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-zinc-300 text-black"
            }`}
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleCategoryAdd();
              }
            }}
          />
          <button
            type="button"
            onClick={handleCategoryAdd}
            className={`px-4 rounded ${
              darkMode ? "bg-zinc-700 text-white" : "bg-gray-300 text-black"
            }`}
          >
            Add
          </button>
        </div>
        <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-gray-500"}`}>
          Choose up to {maxCategories} categories, or add a new one.
        </p>
      </div>

      {/* Private Toggle */}
      <div className="mt-4">
        <label className={`flex items-center gap-2 ${darkMode ? "text-white" : "text-black"}`}>
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={() => setIsPrivate((prev) => !prev)}
            className="accent-purple-500"
          />
          Make this prompt private
        </label>
        <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-gray-500"}`}>
          Private prompts are available with a Basic subscription or higher.
        </p>
      </div>

      {/* Advanced Settings */}
      <details className="mt-4">
        <summary className={`cursor-pointer ${darkMode ? "text-purple-400" : "text-purple-700"}`}>
          Advanced Model Settings (Optional)
        </summary>
        <p className={`${darkMode ? "text-zinc-500" : "text-gray-600"} text-sm mt-2`}>Coming soon…</p>
      </details>

      {/* Submit */}
      <button
        type="submit"
        className={`mt-6 w-full py-2 font-semibold rounded ${
          darkMode ? "bg-white text-black" : "bg-black text-white"
        }`}
        disabled={loading}
      >
        {loading ? "Submitting..." : submitLabel}
      </button>
    </form>
  );
}

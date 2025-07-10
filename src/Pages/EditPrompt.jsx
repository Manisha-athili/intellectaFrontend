// // src/pages/Page_EditPrompt.jsx
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import PromptForm from "../Components/PromptForm";

// export default function EditPrompt() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [initialData, setInitialData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 1) Fetch existing prompt data
//   useEffect(() => {
//     async function loadPrompt() {
//       try {
//         const resp = await fetch(`/api/prompts/${id}`, {
//           credentials: "include",
//         });
//         if (!resp.ok) throw new Error("Failed to fetch prompt");
//         const data = await resp.json();
//         setInitialData(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadPrompt();
//   }, [id]);

//   const handleUpdate = async (formData) => {
//     try {
//       const resp = await fetch(`/api/prompts/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify(formData),
//       });
//       if (!resp.ok) {
//         const body = await resp.json();
//         throw new Error(body.error || "Failed to update prompt");
//       }
//       navigate(`/prompt`);
//     } catch (err) {
//       console.error("UpdatePrompt error:", err);
//     }
//   };

//   if (loading)
//     return <div className="text-center text-white py-10">Loading…</div>;
//   if (!initialData) return <div className="text-red-500">Prompt not found.</div>;

//   return (
//     <div className="max-w-3xl mx-auto mt-8">
//       {alert("hello")}
//       <PromptForm
//         initialData={initialData}
//         onSubmit={handleUpdate}
//         submitLabel="Update Prompt"
//       />
//     </div>
//   );
// }

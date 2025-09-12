import React, { useState } from "react";

const AIGenerator = () => {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!idea.trim()) {
      setError("Please enter a business idea.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const apiKey = "YOUR_API_KEY"; // 🔑 put your Gemini API key here
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const systemPrompt =
        "You are a creative branding expert. A user will provide a business idea. Generate a creative business name, a catchy tagline, and three key features with brief descriptions. Return the response as a JSON object with the keys: 'businessName', 'tagline', and 'features' (an array of objects, each with 'title' and 'description').";

      const payload = {
        contents: [{ parts: [{ text: `My business idea is: ${idea}` }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: { responseMimeType: "application/json" },
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const apiResult = await response.json();
      const candidate = apiResult.candidates?.[0];
      if (candidate?.content?.parts?.[0]?.text) {
        setResult(JSON.parse(candidate.content.parts[0].text));
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (err) {
      console.error(err);
      setError(`An error occurred: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="generator" className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 ">
            Generate Your Next Big Idea ✨
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-500 text-lg sm:text-xl">
            Describe your business concept and let our AI create a name,
            tagline, and key features for you.
          </p>
        </div>

        {/* Generator Card */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 sm:p-8 flex flex-col gap-4">
          <textarea
            rows="3"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="e.g., A subscription box for eco-friendly cleaning products"
            className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Generating..." : "Generate Idea"}
          </button>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="mt-6 text-center text-gray-500">Generating...</div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-6 text-center text-red-600 dark:text-red-400 font-medium">
            {error}
          </div>
        )}

        {/* Results Container */}
        {result && (
          <div className="mt-8 space-y-6">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {result.businessName}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300 italic">
                "{result.tagline}"
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {result.features?.map((f, i) => (
                <div
                  key={i}
                  className="p-4 bg-gray-100 dark:bg-zinc-700 rounded-lg shadow-sm hover:shadow-md transition duration-200"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {f.title}
                  </h4>
                  <p className="mt-1 text-gray-700 dark:text-gray-300 text-sm">
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AIGenerator;

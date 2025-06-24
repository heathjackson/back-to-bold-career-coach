export default function GPTForm() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          AI Career Assistant
        </h2>
        
        {/* User Input Section */}
        <div className="mb-6">
          <label htmlFor="user-input" className="block text-sm font-medium text-gray-700 mb-2">
            Describe what you need help with:
          </label>
          <textarea
            id="user-input"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
            placeholder="e.g., Help me write a compelling summary for my resume..."
          />
          <button className="mt-3 bg-cyan-600 text-white px-6 py-2 rounded-md hover:bg-cyan-700 transition-colors">
            Get AI Response
          </button>
        </div>

        {/* GPT Response Section */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">AI Response</h3>
          <div className="bg-gray-50 rounded-md p-4 min-h-[200px]">
            <p className="text-gray-500 italic">
              Your AI response will appear here...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
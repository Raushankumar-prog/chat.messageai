export default function Sidebar() {
    return (
      <div className="w-72 h-screen bg-gray-900 text-gray-300 flex flex-col justify-between p-4">
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Gemini</h2>
          {/* Recent Chats */}
          <div>
            <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
              Recent
            </h3>
            <ul>
              {[
                "Managing Intrusive Thoughts",
                "Global E-commerce Business",
                "50% Return in 6 Months",
                "Split Array Solution",
                "From Tech to Impact",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="block mb-2 p-2 rounded hover:bg-gray-800"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Footer */}
        
      </div>
    );
  }
  
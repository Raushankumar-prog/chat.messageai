import React from "react";

const QAPage: React.FC = () => {
  const qaData = {
    question: "How to earn 50% return on 60,000 amount in 6 months?",
    answer:
      "Earning a 50% return on a 60,000 amount in 6 months is a very ambitious goal, as it implies a monthly compounded return of over 7%. While there are no guaranteed methods to achieve such high returns in such a short timeframe, here are some potential avenues to explore, along with the associated risks:",
    sections: [
      {
        title: "High-Risk Investments:",
        content: [
          {
            method: "Day Trading",
            description:
              "This involves buying and selling assets like stocks, cryptocurrencies, or commodities within a single day. While it can lead to significant profits, it also carries a high risk of substantial losses.",
          },
          {
            method: "Options Trading",
            description:
              "Options contracts give the buyer the right, but not the obligation, to buy or sell an asset at a specific price within a certain timeframe. This can be highly profitable but also extremely risky if not managed carefully.",
          },
          {
            method: "Cryptocurrency Trading",
            description:
              "The cryptocurrency market is known for its volatility, which can lead to both rapid gains and losses.",
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 px-6 py-12 flex flex-col items-center">
      {/* Question Section */}
      <div className="bg-gray-800 text-sky-300 p-6 shadow-lg mb-10 ml-96" style={{ borderRadius: '1.5rem' }}>
        <h1 className="text-lg">{qaData.question}</h1>
      </div>

      {/* Answer Section */}
      <div className="w-full max-w-4xl  p-6 rounded-lg shadow-lg">
        <div className="mb-6 flex">
          <span className="text-yellow-400 text-xl py-1 ">★</span>
          <p className="text-lg leading-relaxed mt-2 pl-1">{qaData.answer}</p>
        </div>

        {qaData.sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mt-6">
            <h4 className="text-xl font-semibold text-sky-400 mb-3">
              {section.title}
            </h4>
            <ul className="list-disc ml-5">
              {section.content.map((item, itemIndex) => (
                <li key={itemIndex} className="mb-4">
                  <strong className="text-lg text-gray-100">
                    {item.method}:
                  </strong>{" "}
                  <span className="text-gray-300">{item.description}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QAPage;

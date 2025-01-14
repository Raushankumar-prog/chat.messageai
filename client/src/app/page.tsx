import ChatInput from "./components/ChatInput";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="bg-gray-900 text-gray-300 min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center mt-20">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
          Hello, Raushan
        </h1>
      </div>
      <ChatInput />
    </div>
  );
}

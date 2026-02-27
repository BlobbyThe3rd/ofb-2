function App() {
  return (
    &lt;div className="min-h-screen bg-gradient-to-b from-blue-400 to-purple-600 flex items-center justify-center"&gt;
      &lt;div className="text-center text-white"&gt;
        &lt;h1 className="text-6xl font-bold mb-8 drop-shadow-lg"&gt;🪶 Flappy Bird&lt;/h1&gt;
        &lt;p className="text-xl mb-8"&gt;Multiplayer Online Game&lt;/p&gt;
        &lt;div className="space-x-4"&gt;
          &lt;button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-3 rounded-full text-xl font-bold shadow-lg transform hover:scale-105 transition-all"&gt;
            Play Now
          &lt;/button&gt;
          &lt;button className="bg-green-400 hover:bg-green-500 text-gray-900 px-8 py-3 rounded-full text-xl font-bold shadow-lg transform hover:scale-105 transition-all"&gt;
            Leaderboard
          &lt;/button&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  )
}

export default App
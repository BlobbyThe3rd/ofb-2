import React, { useState } from 'react';

interface NameInputProps {
  score: number;
  onSubmit: () => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

interface ScoreSubmission {
  name: string;
  score: number;
}

export function NameInput({ score, onSubmit, onCancel, isSubmitting = false }: NameInputProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    setError('');
    // TODO: Backend /api/scores POST not ready (check registry/imports_backend)
    try {
      isSubmitting;
      const response = await fetch('http://localhost:8000/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), score }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit score');
      }

      onSubmit();
    } catch (err) {
      console.error('Submit error:', err);
      setError('Failed to submit score. Backend not ready?');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-b from-blue-500 to-blue-600 text-white p-8 rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold text-center mb-2">Great Game!</h2>
        <p className="text-xl text-center mb-6 opacity-90">Your score: <span className="font-mono text-2xl">{score}</span></p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Enter your name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              maxLength={50}
              className="w-full p-4 text-lg bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:border-white focus:outline-none focus:bg-white/30 transition-all duration-200 text-black placeholder-gray-400"
              autoFocus
            />
          </div>

          {error && (
            <p className="p-3 bg-red-500/20 border border-red-400 text-red-200 rounded-xl text-sm">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="flex-1 p-4 font-bold rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/30 transition-all duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !name.trim()}
              className="flex-1 p-4 font-bold bg-white text-blue-600 rounded-xl hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Score'}
            </button>
          </div>
        </form>

        <p className="text-xs text-center mt-4 opacity-75">
          Max 50 characters
        </p>
      </div>
    </div>
  );
}
</xai:function_call ><xai:function_call name="kb_write">
<parameter name="key">registry
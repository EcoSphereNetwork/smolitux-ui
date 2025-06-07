import React, { useState, useEffect } from 'react';
import { ModelTrainer, TrainingOptions } from './ModelTrainer';

const ModelTrainingComponent: React.FC = () => {
  const [trainer, setTrainer] = useState<ModelTrainer | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [customWords, setCustomWords] = useState<string[]>([]);
  const [exampleCounts, setExampleCounts] = useState<{ [word: string]: number }>({});
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);

  useEffect(() => {
    const init = async () => {
      const t = new ModelTrainer();
      await t.init();
      setTrainer(t);
    };
    init();
  }, []);

  const handleAddWord = () => {
    if (currentWord && !customWords.includes(currentWord)) {
      setCustomWords([...customWords, currentWord]);
    }
  };

  const handleRecordExample = async (word: string) => {
    if (!trainer) return;
    setIsRecording(true);
    await trainer.collectExample(word);
    setExampleCounts(trainer.getExampleCounts());
    setIsRecording(false);
  };

  const handleTrain = async () => {
    if (!trainer) return;
    setIsTraining(true);
    setTrainingProgress(0);
    const options: TrainingOptions = {
      epochs: 50,
      callbacks: {
        onEpochEnd: (epoch) => setTrainingProgress((epoch + 1) / 50),
      },
    };
    await trainer.train(options);
    await trainer.save('indexeddb', 'my-custom-model');
    setIsTraining(false);
  };

  return (
    <div className="model-training">
      <h2>Train Custom Speech Model</h2>
      <div className="add-word">
        <input
          type="text"
          value={currentWord}
          onChange={(e) => setCurrentWord(e.target.value)}
          placeholder="Enter a new command word"
          disabled={isRecording || isTraining}
        />
        <button onClick={handleAddWord} disabled={!currentWord || isRecording || isTraining}>
          Add Word
        </button>
      </div>
      <div className="word-list">
        <h3>Custom Words</h3>
        {customWords.length === 0 ? (
          <p>No custom words added yet.</p>
        ) : (
          <ul>
            {customWords.map((word) => (
              <li key={word}>
                {word} ({exampleCounts[word] || 0} examples)
                <button onClick={() => handleRecordExample(word)} disabled={isRecording || isTraining}>
                  {isRecording && currentWord === word ? 'Recording...' : 'Record Example'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="training">
        <button onClick={handleTrain} disabled={customWords.length === 0 || isRecording || isTraining}>
          {isTraining ? 'Training...' : 'Train Model'}
        </button>
        {isTraining && (
          <div className="progress-bar">
            <div className="progress" style={{ width: `${trainingProgress * 100}%` }} />
            <span>{Math.round(trainingProgress * 100)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelTrainingComponent;

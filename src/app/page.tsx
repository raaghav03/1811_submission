"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea";

export default function ToneChanger() {
  const [inputText, setInputText] = useState('');
  const [selectedTone, setSelectedTone] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleToneChange = async () => {
    if (!inputText || !selectedTone) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/change-tone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText, tone: selectedTone }),
      });

      if (!response.ok) {
        throw new Error('Failed to change tone');
      }

      const data = await response.json();
      setOutputText(data.modifiedText);
    } catch (error) {
      console.error('Error changing tone:', error);
     
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 h-screen justify-center items-center">
      <div className="flex flex-col gap-4 items-start">
        <Textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your text here"
        />
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => { setSelectedTone("funny") }} >
            Funny
          </Button>
          <Button onClick={() => { setSelectedTone("neutral") }} >
            neutral
          </Button>
          <Button onClick={() => { setSelectedTone("Professional") }} >
            Professional
          </Button>
          <Button onClick={() => { setSelectedTone("funny") }} >
            Casual
          </Button>
        </div>
      </div>
      <button onClick={handleToneChange} disabled={isLoading || !inputText || !selectedTone}>
        Change Tone
      </button>
      {isLoading && <p>Changing tone...</p>}
      {outputText && (
        <div>
          <h3>Modified Text:</h3>
          <p>{outputText}</p>
        </div>
      )}
    </div>
  );
}




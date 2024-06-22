"use client"
import { Logo } from "./assets/icons"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
} from "@/components/ui/card"

type Tone = "funny" | "neutral" | "Professional" | "Casual"; // Define a union type for possible tone values


export default function ToneChanger() {

  const handleTabClick = (value: Tone) => {
    setSelectedTone(value);
  };
  const [inputText, setInputText] = useState('');
  const [selectedTone, setSelectedTone] = useState<Tone>('funny');
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
  const handleTabChange = (value: Tone) => {
    setSelectedTone(value);
  };
  return (


    <div className="flex flex-col gap-4 h-screen justify-center items-center w-full">
      <div className="items-start flex flex-col gap-4">
        <div className="flex justify-center items-center gap-2 ">
          <Logo />

        </div>

        <div className="flex flex-col gap-8 items-start">
          <Tabs defaultValue="funny" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="funny" onClick={() => handleTabClick("funny")}>
                Funny
              </TabsTrigger>
              <TabsTrigger value="neutral" onClick={() => handleTabClick("neutral")}>
                Neutral
              </TabsTrigger>
              <TabsTrigger value="Professional" onClick={() => handleTabClick("Professional")}>
                Professional
              </TabsTrigger>
              <TabsTrigger value="Casual" onClick={() => handleTabClick("Casual")}>
                Casual
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your text here"
          />
        </div>
        <Button onClick={handleToneChange} disabled={isLoading || !inputText || !selectedTone}>
          Change Tone
        </Button>
        {isLoading && <p>Changing tone...</p>}
        {outputText && (
          <div>
            <Card>

              <CardContent> <p>{outputText}</p></CardContent>

            </Card>
          </div>
        )}

      </div>
    </div>
  );
}




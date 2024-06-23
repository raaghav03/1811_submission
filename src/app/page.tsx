"use client";
import { Logo } from "./assets/icons";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";

type Tone = "humorous" | "neutral" | "Professional" | "Casual";

export default function ToneChanger() {
  const [inputText, setInputText] = useState("");
  const [selectedTone, setSelectedTone] = useState<Tone>("humorous");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [temperature, setTemperature] = useState(0.5); // Default temperature

  const handleTabClick = (value: Tone) => {
    setSelectedTone(value);
  };

  const handleToneChange = async () => {
    if (!inputText || !selectedTone) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/change-tone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText, tone: selectedTone, temperature }),
      });

      if (!response.ok) {
        throw new Error("Failed to change tone");
      }

      const data = await response.json();
      setOutputText(data.modifiedText);
      console.log(`Using temperature: ${temperature}`);
    } catch (error) {
      console.error("Error changing tone:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const WordCounter = ({ text }: { text: string }) => {
    const wordCount = text.trim().split(/\s+/).length;
    const charCount = text.length;

    return (
      <div className="text-sm text-gray-500">
        {wordCount} words | {charCount} characters
      </div>
    );
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
              <TabsTrigger value="funny" onClick={() => handleTabClick("humorous")}>
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
        <Button
          onClick={handleToneChange}
          disabled={isLoading || !inputText || !selectedTone}
        >
          Change Tone
        </Button>
        {isLoading && <p>Changing tone...</p>}
        {outputText && (
          <div>
            <div className="w-80">
              <p>{outputText}</p>
              <WordCounter text={outputText} />
            </div>
          </div>
        )}

        <div className="w-80 mt-10">
          <p>Temperature: {temperature.toFixed(2)}</p>
          <Slider
            defaultValue={[temperature * 100]}
            max={100}
            step={1}
            onValueChange={(value) => setTemperature(value[0] / 100)}
          />
        </div>
      </div>
    </div>
  );
}
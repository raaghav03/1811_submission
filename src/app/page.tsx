"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Logo } from "../app/assets/icons"

type Tone = "persuasive" | "neutral" | "Professional" | "Casual";

export default function ToneChanger() {
  const [inputText, setInputText] = useState("");
  const [selectedTone, setSelectedTone] = useState<Tone>("persuasive");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [temperature, setTemperature] = useState(0.5);

  const handleToneChange = async () => {
    if (!inputText || !selectedTone) return;
    setIsLoading(true);
    try {
      const response = await fetch("/api/change-tone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputText,
          tone: selectedTone,
          temperature,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to change tone");
      }
      const data = await response.json();
      setOutputText(data.modifiedText);
    } catch (error) {
      console.error("Error changing tone:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-row items-center  gap-2 mb-12">
        <Logo />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Input Text</CardTitle>
          </CardHeader>̀
          <CardContent>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your text here"
              className="min-h-[200px]"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tone Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs
              value={selectedTone}
              onValueChange={(value) => setSelectedTone(value as Tone)}
              className="w-full"
            >
              <TabsList>

                <TabsTrigger value="neutral">Neutral</TabsTrigger>
                <TabsTrigger value="persuasive">Persuasive</TabsTrigger>
                <TabsTrigger value="Professional">Professional</TabsTrigger>
                <TabsTrigger value="Casual">Casual</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="mt-4">
              <p>Temperature: {temperature.toFixed(2)}</p>
              <Slider
                defaultValue={[temperature * 100]}
                max={100}
                step={1}
                onValueChange={(value) => setTemperature(value[0] / 100)}
              />
            </div>
            <Button
              onClick={handleToneChange}
              disabled={isLoading || !inputText || !selectedTone}
              className="mt-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Changing Tone...
                </>
              ) : (
                "Change Tone"
              )}
            </Button>
          </CardContent>
        </Card>
        {outputText && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Modified Text</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{outputText}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
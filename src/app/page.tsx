"use client";
import { useState } from "react";
import { CornerDownLeft, Mic, Paperclip } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Logo } from "../app/assets/icons";
import TemperatureControl from "@/components/tempcontrol"
import {
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
  TooltipContent,
} from "@/components/ui/tooltip";

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
      console.log(temperature)
    } catch (error) {
      console.error("Error changing tone:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="  lg:py-16 lg:px-20 flex flex-col gap-8 p-4">
      <div className="flex items-center w-full justify-between">
        <div className="flex flex-row items-center gap-2 ">
          <Logo />
        </div>
        <div className="text-gray-500 hover:underline text-xs md:text-lg">
          <a href="mailto:raghavnagpal2003@gmail.com">built by raghav nagpal</a>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-8 grid-cols-1">
        <Card className="h-[500px] ">
          <CardHeader className="flex-col gap-4">
            <CardTitle>Input Text</CardTitle>
            <Tabs
              value={selectedTone}
              onValueChange={(value) => setSelectedTone(value as Tone)}
              
            >
              <TabsList>
                <TabsTrigger value="neutral">Neutral</TabsTrigger>
                <TabsTrigger value="persuasive">Persuasive</TabsTrigger>
                <TabsTrigger value="Professional">Professional</TabsTrigger>
                <TabsTrigger value="Casual">Casual</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          ̀
          <CardContent className=" justify-between h-[360px] flex flex-col gap-4 ">
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your text here"
              className="flex-grow "
            />
            <Button
              onClick={handleToneChange}
              disabled={isLoading || !inputText || !selectedTone}
              className="w-fit"
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

        <Card className="h-[500px] flex flex-col">
          <CardHeader>
            <CardTitle>Modified Text</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-y-auto">
            {outputText ? (
              <p className="whitespace-pre-wrap text-xs md:text-sm lg:text-md">{outputText}</p>
            ) : (
              <p className="text-gray-400">
                Input some text to start changing the tone
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      <TemperatureControl temperature={temperature} setTemperature={setTemperature} />
    </div>
  );
}

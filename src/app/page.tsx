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
      // Handle error (e.g., show error message to user)
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





// // Import necessary libraries
// import { Button } from "@/components/ui/button";

// import { useState } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai"; // Import for Gemini API

// // Interface for API Key
// interface Environment {
//   GEMINI_API_KEY: string;
// }

// export default function Home() {
//   const [text, setText] = useState("");
//   const [generatedText, setGeneratedText] = useState("");
//   const [loading, setLoading] = useState(false); // State for loading indicator
//   const [error, setError] = useState(null); // State for error handling

//   // Get API key from environment variables
//   const apiKey = process.env.REACT_APP_GEMINI_API_KEY || "";

//   // Create a GoogleGenerativeAI instance on component mount
//   const genAI = new GoogleGenerativeAI(apiKey);

//   const handleToneChange = async (tone: string) => {
//     setLoading(true); // Set loading indicator while generating
//     setError(null); // Clear any previous errors

//     try {
//       const model = await genAI.getGenerativeModel({ model: "gemini-pro" }); // Get Gemini Pro model
//       const response = await model.generate({
//         prompt: `Rewrite the following text in a ${tone.toLowerCase()} tone:\n${text}`,
//         maxTokens: 128, // Maximum number of tokens for generated text (adjustable)
//         temperature: 0.7, // Controls creativity (0 for deterministic, 1 for random)
//       });

//       setGeneratedText(response.generatedText); // Set the generated text
//     } catch (err) {
//       console.error("Error generating text:", err);
//       setError("An error occurred while generating text. Please try again.");
//     } finally {
//       setLoading(false); // Clear loading indicator after generation
//     }
//   };

//   return (
//     <div className="flex flex-col gap-4 h-screen justify-center items-center">
//       <div className="flex flex-col gap-4 items-start">
//         <Textarea
//           onChange={(e) => setText(e.target.value)}
//           className="w-fill"
//           placeholder="Type your message here."
//         />
//         <div className="grid grid-cols-2 gap-2">
//           <Button className="w-fit" onClick={() => handleToneChange("Neutral")}>
//             Neutral
//           </Button>
//           <Button className="w-fit" onClick={() => handleToneChange("Funny")}>
//             Funny
//           </Button>
//           <Button className="w-fit" onClick={() => handleToneChange("Professional")}>
//             Professional
//           </Button>
//           <Button className="w-fit" onClick={() => handleToneChange("Casual")}>
//             Casual
//           </Button>
//         </div>
//         {generatedText && (
//           <p className="mt-4">
//             **Generated Text:** {generatedText}
//           </p>
//         )}
//         {loading && <p>Generating text...</p>}
//         {error && <p className="text-red-500">{error}</p>}
//       </div>
//     </div>
//   );
// }

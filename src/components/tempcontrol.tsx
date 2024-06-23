import React from 'react';
import { Slider } from './ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Info } from 'lucide-react';
interface TemperatureControlProps {
    temperature: number;
    setTemperature: (temperature: number) => void;
}

const TemperatureControl: React.FC<TemperatureControlProps> = ({ temperature, setTemperature }) => {
    // Ensure temperature is a number and within valid range
    const safeTemperature = typeof temperature === 'number' && temperature >= 0 && temperature <= 1
        ? temperature
        : 0.5; // Default to 0.5 if invalid

    const handleTemperatureChange = (value: number[]) => {
        if (typeof setTemperature === 'function') {
            setTemperature(value[0] / 100);
        }
    };

    return (
        <Card className="w-fill max-w-md">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium flex items-center justify-between">
                    Temperature
                    <TooltipProvider>
                        <Tooltip delayDuration={300}>
                            <TooltipTrigger asChild>
                                <button type="button" className="cursor-help">
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-xs">
                                <p>
                                    Controls randomness: lowering results in less random completions.
                                    As the temperature approaches zero, the model will become deterministic and repetitive.
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Value: {safeTemperature.toFixed(2)}</span>
                        <span className="text-sm text-muted-foreground">Range: 0 - 1</span>
                    </div>
                    <Slider
                        value={[safeTemperature * 100]}
                        max={100}
                        step={1}
                        onValueChange={handleTemperatureChange}
                        className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Deterministic</span>
                        <span>Balanced</span>
                        <span>Random</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default TemperatureControl;
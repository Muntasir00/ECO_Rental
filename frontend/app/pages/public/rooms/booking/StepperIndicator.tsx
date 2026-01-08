import {cn} from "~/lib/utils";

export const StepperIndicator = ({currentStep}: { currentStep: number }) => {
    const steps = [
        {id: 1, label: "Personal data"},
        {id: 2, label: "Booking info"},
        {id: 3, label: "Summary"},
    ];

    return (
        <div
            className="w-full md:w-auto flex items-center justify-center md:justify-end min-w-[300px] lg:min-w-[400px]">
            {steps.map((step, index) => {
                const isActive = currentStep >= step.id;
                const isCurrent = currentStep === step.id;
                const borderColor = isActive || isCurrent ? "border-black" : "border-gray-200";
                const textColor = isActive || isCurrent ? "text-black" : "text-gray-300";

                return (
                    <div key={step.id} className="flex-1 md:flex-none flex items-center relative">
                        <div className="flex flex-col items-center relative z-10 mx-2 lg:mx-4">
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center text-lg bg-white border transition-colors duration-300 mb-2",
                                    borderColor,
                                    textColor
                                )}
                            >
                                {step.id}
                            </div>
                            <span className={cn("text-xs md:text-sm font-medium whitespace-nowrap", textColor)}>
                {step.label}
              </span>
                        </div>
                        {index !== steps.length - 1 && (
                            <div
                                className={cn("flex-grow h-[1px] w-12 md:w-20 lg:w-24 mt-[-24px]", isActive ? "bg-black" : "bg-gray-200")}></div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
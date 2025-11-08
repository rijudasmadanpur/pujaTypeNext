declare module 'react-stepper-horizontal' {
    import { ComponentType } from 'react';

    interface Step {
        title: string | React.ReactNode;
        onClick?: () => void;
        icon?: React.ReactNode;
    }

    interface StepperProps {
        steps: Step[];
        activeStep: number;
        activeColor?: string;
        completeColor?: string;
        defaultColor?: string;
        activeTitleColor?: string;
        completeTitleColor?: string;
        defaultTitleColor?: string;
        size?: number;
        circleFontSize?: number;
        titleFontSize?: number;
        circleTop?: number;
        titleTop?: number;
        barStyle?: string;
        completeBarColor?: string;
        defaultBarColor?: string;
        lineMarginOffset?: number;
        onClick?: (stepIndex: number) => void;
    }

    const Stepper: ComponentType<StepperProps>;
    export default Stepper;
}
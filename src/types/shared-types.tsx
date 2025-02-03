import { Dispatch } from "react";
export interface QuestionType {
    question: string;
    options: string[];
    correctOption: number;
    points: number;
}

export type Action =
    | { type: "dataReceive"; payload: QuestionType[] }
    | { type: "dataFailed" }
    | { type: "start" }
    | { type: "newAnswer"; payload: string } // Payload is the selected answer
    | { type: "nextQuestion" }
    | { type: "finish" }
    | { type: "restart" }
    | { type: "tick" };

export interface MostCommonProps {
    dispatch: Dispatch<Action>;
    answer: number | null;
    index: number;
    numOfQuestions: number;
    points: number;
    question: QuestionType;
} 
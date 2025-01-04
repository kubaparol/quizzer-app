import { useEffect, useState } from "react";
import { FieldType } from "../pages/MainPage";
import { FAKE_QUESTIONS } from "../db/questions";

export interface Question {
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  shuffled_answers: string[];
}

export const useQuestions = (args: FieldType | null) => {
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (!args) return;

    const fetchQuestions = () => {
      const questions = FAKE_QUESTIONS.filter((question) => {
        return (
          question.category === args.category &&
          question.difficulty === args.difficulty
        );
      }).splice(0, Number(args.amount));

      const formattedQuestions = questions.map((question) => {
        const shuffledAnswers = [
          question.correct_answer,
          ...question.incorrect_answers,
        ].sort(() => Math.random() - 0.5);

        return {
          ...question,
          shuffled_answers: shuffledAnswers,
        };
      });

      setQuestions(formattedQuestions);
      setIsLoading(false);
    };

    fetchQuestions();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { questions, isLoading };
};

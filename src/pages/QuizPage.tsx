import { useState } from "react";
import { Button, Form, Progress, Radio, Space } from "antd";
import { shuffleArray } from "../utils";

export function QuizPage() {
  const [form] = Form.useForm();
  const [questions] = useState(EXAMPLE_RESPONSE.results);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [allAnswers, setAllAnswers] = useState<string[]>([]);

  const onFinish = () => {
    const currentAnswer = form.getFieldValue(["answers", currentQuestion]);
    const updatedAnswers = [...allAnswers];
    updatedAnswers[currentQuestion] = currentAnswer;
    setAllAnswers(updatedAnswers);

    if (hasNextQuestion) {
      setCurrentQuestion(currentQuestion + 1);
      return;
    }

    console.log("All answers:", updatedAnswers);
  };

  const hasNextQuestion = currentQuestion < questions.length - 1;

  return (
    <div className="grid gap-6 border-4 rounded-xl p-6 w-full max-w-3xl">
      <Progress
        percent={((currentQuestion + 1) / questions.length) * 100}
        format={() => `${currentQuestion + 1}/${questions.length}`}
        status="active"
        strokeColor={{
          from: "#108ee9",
          to: "#87d068",
        }}
      />

      <p className="text-xl font-bold text-center">
        {questions[currentQuestion].question}
      </p>

      <Form
        form={form}
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name={["answers", currentQuestion]}
          rules={[{ required: true, message: "Please select an answer" }]}
        >
          <Radio.Group>
            <Space direction="vertical" size="large">
              {questions[currentQuestion].shuffled_answers.map(
                (answer, index) => (
                  <Radio key={index} value={answer}>
                    {answer}
                  </Radio>
                )
              )}
            </Space>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full mt-6 bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            {hasNextQuestion ? "Next Question" : "Finish Quiz"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

const EXAMPLE_RESPONSE = {
  response_code: 0,
  results: [
    {
      type: "multiple",
      difficulty: "medium",
      category: "Art",
      question: "Who painted the epic mural Guernica?",
      correct_answer: "Pablo Picasso",
      incorrect_answers: [
        "Francisco Goya",
        "Leonardo da Vinci",
        "Henri Matisse",
      ],
    },
    {
      type: "multiple",
      difficulty: "medium",
      category: "Art",
      question:
        "Which artist&#039;s style was to use small different colored dots to create a picture?",
      correct_answer: "Georges Seurat",
      incorrect_answers: [
        "Paul C&eacute;zanne",
        "Vincent Van Gogh",
        "Henri Rousseau",
      ],
    },
    {
      type: "boolean",
      difficulty: "medium",
      category: "Art",
      question:
        "Pablo Picasso is one of the founding fathers of &quot;Cubism.&quot;",
      correct_answer: "True",
      incorrect_answers: ["False"],
    },
    {
      type: "multiple",
      difficulty: "hard",
      category: "Art",
      question: "What year was the Mona Lisa finished?",
      correct_answer: "1504",
      incorrect_answers: ["1487", "1523", "1511"],
    },
    {
      type: "multiple",
      difficulty: "hard",
      category: "Art",
      question:
        "Which of these is not an additional variation of the color purple?",
      correct_answer: "Kobicha",
      incorrect_answers: ["Byzantium", "Pomp and Power", "Palatinate"],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "Art",
      question: "Who sculpted the statue of David?",
      correct_answer: "Michelangelo",
      incorrect_answers: ["Gian Lorenzo Bernini", "Auguste Rodin", "Donatello"],
    },
    {
      type: "multiple",
      difficulty: "medium",
      category: "Art",
      question:
        "Which time signature is commonly known as &ldquo;Cut Time?&rdquo;",
      correct_answer: "2/2",
      incorrect_answers: ["4/4", "6/8", "3/4"],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "Art",
      question:
        "Which Van Gogh painting depicts the view from his asylum in Saint-R&eacute;my-de-Provence in southern France?",
      correct_answer: "The Starry Night",
      incorrect_answers: [
        "Wheatfields with Crows",
        "The Sower with Setting Sun",
        "The Church at Auvers",
      ],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "Art",
      question: "Who painted the Mona Lisa?",
      correct_answer: "Leonardo da Vinci",
      incorrect_answers: ["Pablo Picasso", "Claude Monet", "Vincent van Gogh"],
    },
    {
      type: "boolean",
      difficulty: "medium",
      category: "Art",
      question: "Vincent van Gogh cut off one of his ears.",
      correct_answer: "True",
      incorrect_answers: ["False"],
    },
  ].map((question) => ({
    ...question,
    shuffled_answers: shuffleArray([
      question.correct_answer,
      ...question.incorrect_answers,
    ]),
  })),
};

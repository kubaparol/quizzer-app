import { useState } from "react";
import { Button, Form, Progress, Radio, Space, Spin } from "antd";
import { useQuestions } from "../hooks";
import { useLocation } from "react-router-dom";
import { FieldType } from "./MainPage";

export function QuizPage() {
  const [form] = Form.useForm();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [allAnswers, setAllAnswers] = useState<string[]>([]);
  const location = useLocation();
  const values = location.state as FieldType;

  const { questions, isLoading } = useQuestions(values);

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

  if (isLoading) {
    return <Spin size="large" />;
  }

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

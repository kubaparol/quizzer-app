import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Button,
  Empty,
  Form,
  Progress,
  Radio,
  Space,
  Spin,
  Typography,
} from "antd";
import { useQuestions } from "../hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { FieldType } from "./MainPage";
import { SuccessModal } from "../components/ui/SuccessModal";
import { AppUrls } from "../router/urls";
import { NotEnoughQuestionsModal } from "../components/ui/NotEnoughQuestionsModal";

export function QuizPage() {
  const [form] = Form.useForm();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [allAnswers, setAllAnswers] = useState<string[]>([]);
  const location = useLocation();
  const values = location.state as FieldType | null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!values) {
      navigate(AppUrls.home, { replace: true });
    }
  }, [navigate, values]);

  const { questions, isLoading } = useQuestions(values);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [isNotEnoughQuestionsModalOpen, setIsNotEnoughQuestionsModalOpen] =
    useState(false);

  useEffect(() => {
    if (questions.length > 0 && questions.length < Number(values?.amount)) {
      setIsNotEnoughQuestionsModalOpen(true);
    }
  }, [questions, values?.amount]);

  const handleFinish = () => {
    const currentAnswer = form.getFieldValue(["answers", currentQuestion]);
    const updatedAnswers = [...allAnswers];
    updatedAnswers[currentQuestion] = currentAnswer;
    setAllAnswers(updatedAnswers);

    if (hasNextQuestion) {
      setCurrentQuestion(currentQuestion + 1);
      return;
    }

    setIsSuccessModalOpen(true);
  };

  const handleTryAgain = () => {
    setIsSuccessModalOpen(false);
    setCurrentQuestion(0);
    setAllAnswers([]);
    form.resetFields();
  };

  const handleClose = () => {
    setIsSuccessModalOpen(false);
    navigate(AppUrls.home, { replace: true });
  };

  const hasNextQuestion = currentQuestion < questions.length - 1;

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (questions.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center p-4">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <Space direction="vertical" size="large" className="text-center">
              <Typography.Title level={3} className="font-sans !mb-0">
                Sorry, no questions found
              </Typography.Title>

              <div className="space-y-2">
                <Typography.Text className="text-gray-600 text-lg block font-medium">
                  We couldn't find any questions matching:
                </Typography.Text>
                <Typography.Text className="text-gray-500 text-base block leading-relaxed">
                  Category:{" "}
                  <span className="font-semibold">
                    {values?.category || "Any"}
                  </span>
                  <br />
                  Difficulty:{" "}
                  <span className="font-semibold">
                    {values?.difficulty || "Any"}
                  </span>
                </Typography.Text>
              </div>

              <Typography.Text className="text-gray-500 text-base italic">
                Please try again with different options
              </Typography.Text>

              <Button
                type="primary"
                size="large"
                onClick={() => navigate(AppUrls.home, { replace: true })}
                className="mt-6"
              >
                Back to Home
              </Button>
            </Space>
          }
        />
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 p-8 w-full max-w-3xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20">
        <Progress
          percent={((currentQuestion + 1) / questions.length) * 100}
          format={() => `${currentQuestion + 1}/${questions.length}`}
          status="active"
          strokeColor={{
            from: "#108ee9",
            to: "#87d068",
          }}
        />

        <AnimatePresence mode="wait">
          <motion.p
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-xl font-bold text-center"
          >
            {questions[currentQuestion].question}
          </motion.p>
        </AnimatePresence>

        <Form
          form={form}
          name="basic"
          layout="vertical"
          onFinish={handleFinish}
          autoComplete="off"
        >
          <Form.Item
            name={["answers", currentQuestion]}
            rules={[{ required: true, message: "Please select an answer" }]}
          >
            <Radio.Group>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ staggerChildren: 0.1 }}
                >
                  <Space direction="vertical" size="large">
                    {questions[currentQuestion].shuffled_answers.map(
                      (answer, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Radio value={answer}>{answer}</Radio>
                        </motion.div>
                      )
                    )}
                  </Space>
                </motion.div>
              </AnimatePresence>
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

      <SuccessModal
        isOpen={isSuccessModalOpen}
        questions={questions}
        answers={allAnswers}
        onTryAgain={handleTryAgain}
        onClose={handleClose}
      />

      <NotEnoughQuestionsModal
        isOpen={isNotEnoughQuestionsModalOpen}
        selectedQuestionsLength={questions.length}
        onClose={() => setIsNotEnoughQuestionsModalOpen(false)}
      />
    </>
  );
}

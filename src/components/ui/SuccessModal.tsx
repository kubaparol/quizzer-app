import { Modal, Typography, Space, Divider, Tag, Button } from "antd";
import { Question } from "../../hooks";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  TrophyFilled,
} from "@ant-design/icons";

interface SuccessModalProps {
  isOpen: boolean;
  questions: Question[];
  answers: string[];
  onTryAgain: () => void;
  onClose: () => void;
}

export function SuccessModal(props: SuccessModalProps) {
  const { isOpen, questions, answers, onTryAgain, onClose } = props;

  const score = questions.reduce((score, question, index) => {
    return score + (question.correct_answer === answers[index] ? 1 : 0);
  }, 0);

  const percentage = Math.round((score / questions.length) * 100);

  return (
    <Modal
      title={
        <Typography.Title level={3} className="flex items-center gap-2 m-0">
          <TrophyFilled className="text-yellow-400" />
          Quiz Summary
        </Typography.Title>
      }
      closeIcon={null}
      open={isOpen}
      footer={null}
      width={700}
    >
      <Space direction="vertical" className="w-full" size="large">
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <Typography.Title level={2} className="m-0">
            You scored {score}/{questions.length} ({percentage}%)
          </Typography.Title>
          <Typography.Text className="text-gray-500">
            {percentage >= 80
              ? "Excellent work! 🎉"
              : percentage >= 60
              ? "Good job! 👍"
              : "Keep practicing! 💪"}
          </Typography.Text>
        </div>

        <Divider>Question Review</Divider>

        {questions.map((question, index) => (
          <div key={index} className="border p-4 rounded-lg">
            <Typography.Title level={4} className="m-0">
              Question {index + 1}
            </Typography.Title>
            <Typography.Paragraph className="mb-2">
              {question.question}
            </Typography.Paragraph>

            <Space direction="vertical" className="w-full">
              <div className="flex items-center gap-2">
                <Typography.Text strong>Your answer: </Typography.Text>
                {question.correct_answer === answers[index] ? (
                  <Tag color="success" icon={<CheckCircleFilled />}>
                    {answers[index]}
                  </Tag>
                ) : (
                  <Tag color="error" icon={<CloseCircleFilled />}>
                    {answers[index]}
                  </Tag>
                )}
              </div>

              {question.correct_answer !== answers[index] && (
                <div className="flex items-center gap-2">
                  <Typography.Text strong>Correct answer: </Typography.Text>
                  <Tag color="success">{question.correct_answer}</Tag>
                </div>
              )}
            </Space>
          </div>
        ))}

        <div className="flex justify-between">
          <Button type="default" onClick={onTryAgain}>
            Try Again
          </Button>

          <Button type="primary" onClick={onClose}>
            Finish
          </Button>
        </div>
      </Space>
    </Modal>
  );
}

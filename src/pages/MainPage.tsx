import { Button, Form, InputNumber, Modal, Select } from "antd";
import { useState } from "react";
import type { FormProps } from "antd";
import { useNavigate } from "react-router-dom";
import { AppUrls } from "../router/urls";

type FieldType = {
  amount: string;
  category: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  type: "BOOLEAN" | "MULTIPLE";
};

export function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm<FieldType>();
  const navigate = useNavigate();

  const handleClose = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    navigate(AppUrls.quiz);
  };

  return (
    <>
      <div className="grid place-items-center gap-4">
        <header className="grid gap-2">
          <h1 className="text-4xl font-bold text-center">
            Welcome to Quizzer!
          </h1>

          <p className="text-lg text-center">
            Test your knowledge with our exciting quizzes on various topics!
          </p>
        </header>

        <Button
          type="primary"
          size="large"
          onClick={() => setIsModalOpen(true)}
        >
          Start Quiz
        </Button>
      </div>

      <Modal
        title="Quiz Configuration"
        open={isModalOpen}
        footer={null}
        onCancel={handleClose}
      >
        <Form
          form={form}
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Number of Questions"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please input the number of questions!",
              },
              {
                type: "number",
                min: 1,
                message: "Minimum 1 question required!",
              },
            ]}
          >
            <InputNumber className="w-full" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please input the category!" }]}
          >
            <Select
              options={CATEGORIES.map((category) => ({
                ...category,
                label: <span>{category.label}</span>,
              }))}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Difficulty"
            name="difficulty"
            rules={[
              { required: true, message: "Please input the difficulty!" },
            ]}
          >
            <Select
              options={[
                { value: "easy", label: <span>Easy</span> },
                { value: "medium", label: <span>Medium</span> },
                { value: "hard", label: <span>Hard</span> },
              ]}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Type"
            name="type"
            rules={[{ required: true, message: "Please input the type!" }]}
          >
            <Select
              options={[
                { value: "multiple", label: <span>Multiple Choice</span> },
                { value: "boolean", label: <span>True / False</span> },
                { value: undefined, label: <span>Mixed</span> },
              ]}
            />
          </Form.Item>

          <Form.Item label={null} className="flex justify-end">
            <Button type="primary" htmlType="submit">
              Start
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

const CATEGORIES = [
  {
    value: "any",
    label: "Any Category",
  },
  {
    value: "9",
    label: "General Knowledge",
  },
  {
    value: "10",
    label: "Entertainment: Books",
  },
  {
    value: "11",
    label: "Entertainment: Film",
  },
  {
    value: "12",
    label: "Entertainment: Music",
  },
  {
    value: "13",
    label: "Entertainment: Musicals & Theatres",
  },
  {
    value: "14",
    label: "Entertainment: Television",
  },
  {
    value: "15",
    label: "Entertainment: Video Games",
  },
  {
    value: "16",
    label: "Entertainment: Board Games",
  },
  {
    value: "17",
    label: "Science & Nature",
  },
  {
    value: "18",
    label: "Science: Computers",
  },
  {
    value: "19",
    label: "Science: Mathematics",
  },
  {
    value: "20",
    label: "Mythology",
  },
  {
    value: "21",
    label: "Sports",
  },
  {
    value: "22",
    label: "Geography",
  },
  {
    value: "23",
    label: "History",
  },
  {
    value: "24",
    label: "Politics",
  },
  {
    value: "25",
    label: "Art",
  },
  {
    value: "26",
    label: "Celebrities",
  },
  {
    value: "27",
    label: "Animals",
  },
  {
    value: "28",
    label: "Vehicles",
  },
  {
    value: "29",
    label: "Entertainment: Comics",
  },
  {
    value: "30",
    label: "Science: Gadgets",
  },
  {
    value: "31",
    label: "Entertainment: Japanese Anime & Manga",
  },
  {
    value: "32",
    label: "Entertainment: Cartoon & Animations",
  },
];

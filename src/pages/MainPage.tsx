import { Button, Form, InputNumber, Modal, Select } from "antd";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FormProps } from "antd";
import { useNavigate } from "react-router-dom";
import { AppUrls } from "../router/urls";

export type FieldType = {
  amount: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
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
    navigate(AppUrls.quiz, { state: values });
  };

  return (
    <>
      <div className="grid place-items-center gap-4">
        <motion.header
          className="grid gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-center">
            Welcome to Quizzer!
          </h1>

          <motion.p
            className="text-lg text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Test your knowledge with our exciting quizzes on various topics!
          </motion.p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            type="primary"
            size="large"
            onClick={() => setIsModalOpen(true)}
            className="shadow-lg hover:shadow-xl transition-shadow"
          >
            Start Quiz
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            title="Quiz Configuration"
            open={isModalOpen}
            footer={null}
            onCancel={handleClose}
            modalRender={(modal) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                {modal}
              </motion.div>
            )}
          >
            <Form
              form={form}
              name="basic"
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              {[
                {
                  label: "Number of Questions",
                  name: "amount",
                  component: <InputNumber className="w-full" />,
                },
                {
                  label: "Category",
                  name: "category",
                  component: (
                    <Select
                      options={CATEGORIES.map((category) => ({
                        ...category,
                        label: <span>{category.label}</span>,
                      }))}
                    />
                  ),
                },
                {
                  label: "Difficulty",
                  name: "difficulty",
                  component: (
                    <Select
                      options={[
                        { value: "easy", label: <span>Easy</span> },
                        { value: "medium", label: <span>Medium</span> },
                        { value: "hard", label: <span>Hard</span> },
                      ]}
                    />
                  ),
                },
              ].map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Form.Item
                    label={field.label}
                    name={field.name}
                    rules={[
                      {
                        required: true,
                        message: `Please input the ${field.label.toLowerCase()}!`,
                      },
                    ]}
                  >
                    {field.component}
                  </Form.Item>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Form.Item label={null} className="flex justify-end">
                  <Button type="primary" htmlType="submit">
                    Start
                  </Button>
                </Form.Item>
              </motion.div>
            </Form>
          </Modal>
        )}
      </AnimatePresence>
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

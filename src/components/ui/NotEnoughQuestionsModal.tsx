import { Modal, Typography } from "antd";

interface NotEnoughQuestionsModalProps {
  isOpen: boolean;
  selectedQuestionsLength: number;
  onClose: () => void;
}

export function NotEnoughQuestionsModal(props: NotEnoughQuestionsModalProps) {
  const { isOpen, selectedQuestionsLength, onClose } = props;

  return (
    <Modal
      title="Not Enough Questions Available"
      open={isOpen}
      onOk={onClose}
      okText="Continue"
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Typography.Text>
        Sorry, we could only find {selectedQuestionsLength} questions for your
        selected criteria. The quiz will proceed with the available questions.
      </Typography.Text>
    </Modal>
  );
}

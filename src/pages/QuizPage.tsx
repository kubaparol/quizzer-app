import { Button, Typography } from "antd";
import { Link } from "react-router";
import { AppUrls } from "../router/urls";

export function QuizPage() {
  return (
    <div>
      <Typography.Title level={1}>Quiz Page!</Typography.Title>

      <Link to={AppUrls.home}>
        <Button type="primary">Go to Home</Button>
      </Link>
    </div>
  );
}

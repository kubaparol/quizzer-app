import { Button, Typography } from "antd";
import { Link } from "react-router";
import { AppUrls } from "../router/urls";

export function MainPage() {
  return (
    <div>
      <Typography.Title level={1}>Main Page!</Typography.Title>

      <Link to={AppUrls.quiz}>
        <Button type="primary">Start Quiz</Button>
      </Link>
    </div>
  );
}

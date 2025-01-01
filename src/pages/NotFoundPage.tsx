import { Button, Typography } from "antd";
import { Link } from "react-router";
import { AppUrls } from "../router/urls";

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <Typography.Title level={1}>404 Not Found</Typography.Title>

      <Link to={AppUrls.home}>
        <Button type="primary" size="large">
          Go to Home
        </Button>
      </Link>
    </div>
  );
}

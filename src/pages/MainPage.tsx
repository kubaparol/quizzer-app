import { Button, Typography } from "antd";

export function MainPage() {
  return (
    <div>
      <Typography.Title level={1}>Hello, world!</Typography.Title>
      <Typography.Title level={2}>Hello, world!</Typography.Title>
      <Typography.Title level={3}>Hello, world!</Typography.Title>
      <Typography.Title level={4}>Hello, world!</Typography.Title>
      <Typography.Title level={5}>Hello, world!</Typography.Title>

      <Typography.Text>Ant Design</Typography.Text>
      <Button type="primary">Button</Button>
    </div>
  );
}

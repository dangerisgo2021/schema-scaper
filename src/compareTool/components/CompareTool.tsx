import React from "react";
import dynamic from "next/dynamic";
import classnames from "classnames";
import { Button, Form, Input, Skeleton, Tabs } from "antd";
import { useCompareToolContainer } from "compareTool/hooks/useCompareToolContainer";
const { TabPane } = Tabs;
const BrowserReactJsonView = dynamic(() => import("react-json-view"), {
  ssr: false,
});
export const CompareTool = ({ className = "" }) => {
  const {
    form,
    loading,
    loaded,
    results,
    onFinish,
    onReset,
  } = useCompareToolContainer();

  return (
    <div
      style={{ margin: "1%" }}
      className={classnames(className, "CompareTool")}
    >
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="srcUrl"
          label="Source Url"
          initialValue="https://www.verywellmind.com"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="targetUrl"
          label="Target Url"
          initialValue="https://www.verywellhealth.com"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button style={{ margin: ".2%" }} type="primary" htmlType="submit">
            Submit
          </Button>
          <Button style={{ margin: ".2%" }} htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
      {!loaded && <Skeleton active={loading} />}
      {loaded && (
        <Tabs defaultActiveKey="1">
          <TabPane tab="Src Schema" key="1">
            <BrowserReactJsonView src={results.srcSchema} />
          </TabPane>
          <TabPane tab="Target Schema" key="2">
            <BrowserReactJsonView src={results.targetSchema} />
          </TabPane>
          <TabPane tab="Diff" key="3">
            <BrowserReactJsonView src={results.difference} />
          </TabPane>
          <TabPane tab="Detailed Diff" key="4">
            <BrowserReactJsonView src={results.detailedDifference} />
          </TabPane>
        </Tabs>
      )}
    </div>
  );
};

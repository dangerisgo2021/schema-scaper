import { Form } from "antd";
import axios from "axios";
import { useState } from "react";
export const useCompareToolContainer = () => {
  const [form] = Form.useForm();
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResult] = useState({
    srcSchema: undefined,
    targetSchema: undefined,
    difference: undefined,
    detailedDifference: undefined,
  });
  const onFinish = (values: any) => {
    console.log(values);
    setLoading(true);
    axios
      .post("/api/compare", values)
      .then(function (response) {
        console.log(response);
        setResult(response.data);
        setLoading(false);
        setLoaded(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onReset = () => {
    form.resetFields();
  };

  return {
    form,
    loaded,
    loading,
    results,
    onFinish,
    onReset,
  };
};

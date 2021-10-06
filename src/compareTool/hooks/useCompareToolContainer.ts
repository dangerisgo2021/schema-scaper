import { Form } from "antd";
import axios from "axios";
import { useState } from "react";

const initialResults = {
  srcSchema: undefined,
  targetSchema: undefined,
  difference: undefined,
  detailedDifference: undefined,
};
export const useCompareToolContainer = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResult] = useState(initialResults);
  const onFinish = (values: any) => {
    console.log(values);
    setLoading(true);
    setError(false)
    axios
      .post("/api/compare", values)
      .then(function (response) {
        console.log(response);
        setResult(response.data);
        setLoading(false);
        setLoaded(true);
      })
      .catch(function (error) {
        setError(true)
        console.log(error);
      });
  };

  const onReset = () => {
    form.resetFields();
    setLoaded(false);
    setLoading(false);
    setError(false);
    setResult(initialResults);
  };

  return {
    error,
    form,
    loaded,
    loading,
    results,
    onFinish,
    onReset,
  };
};

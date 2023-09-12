import { useState, useEffect, useCallback } from "react";
import { AnswerResponseType } from "../annotations";
import { API_ENDPOINT } from "../config";

type FetchProps = {
  callBack: (data: AnswerResponseType | undefined) => void;
  thread: string;
};

export const UseFetch = ({ thread, callBack }: FetchProps) => {
  const [data, setData] = useState<AnswerResponseType>();
  const [loading, setLoading] = useState(true);
  const [_, setError] = useState();

  const throwError = useCallback(
    (e: TypeError) => {
      setError(() => {
        throw e;
      });
    },
    [setError]
  );

  const requestPayload = { thread };
  const requestOptions = {
    method: "POST",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify(requestPayload),
  };
  const url = `${API_ENDPOINT}/answer`;

  async function FetchURL() {
    const response = await fetch(url, requestOptions);
    if (response.ok) {
      const data = await response.json();
      setData(data as AnswerResponseType);
      setLoading(false);
      return data;
    } else if (response.status === 404) {
      setLoading(false);
      return null;
    }
    return Promise.reject(response);
  }
  useEffect(() => {
    FetchURL().catch((e) => throwError(e));
  }, [thread]);

  useEffect(() => {
    if (!loading) {
      callBack(data);
    }
  }, [loading, data]);

  return null;
};

export default UseFetch;

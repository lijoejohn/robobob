import { useState, useEffect, useRef, useCallback } from "react";
import { AnswerResponseType } from "../annotations";

interface Cache<T> {
  [url: string]: T;
}

type FetchProps = {
  callBack: (data: AnswerResponseType) => void;
  messageKey: string;
};

export const UseFetch = ({ messageKey, callBack }: FetchProps) => {
  const cache = useRef<Cache<AnswerResponseType>>({});
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

  const requestPayload = { messageKey: messageKey };
  const requestOptions = {
    method: "POST",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify(requestPayload),
  };
  const url = "http://localhost:8000/answer";

  async function FetchURL() {
    if (cache.current[url]) {
      const data = cache.current[url];
      setData(data);
    } else {
      const response = await fetch(url, requestOptions);
      if (response.ok) {
        const data = await response.json();
        setData(data as AnswerResponseType);
        setLoading(false);
        cache.current[url] = data as AnswerResponseType;
        return data;
      } else if (response.status === 404) {
        setLoading(false);
        return null;
      }
      return Promise.reject(response);
    }
  }
  useEffect(() => {
    FetchURL().catch((e) => throwError(e));
  }, [messageKey]);

  useEffect(() => {
    if (!loading && data) {
      callBack(data);
    }
  }, [loading, data]);

  return null;
};

export default UseFetch;

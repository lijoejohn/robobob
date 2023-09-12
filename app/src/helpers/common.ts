import createDOMPurify from "dompurify";

export const DomPurify = (html: string): string => {
  const DOMPurify = createDOMPurify(window);
  return DOMPurify.sanitize(html).toString();
};

export const generateKey = (string: string): string => {
  return string.replace(/[^a-z0-9]/gi, "");
};

export const isMathExpression = (expression: string): boolean => {
  // Define a regular expression pattern for a valid arithmetic expression
  const pattern =
    /^(\s*[\+\-]?\s*\d+(\.\d+)?\s*[\+\-\*\/]\s*)+\s*[\+\-]?\s*\d+(\.\d+)?\s*$/;

  // Use the test method to check if the expression matches the pattern
  return pattern.test(expression);
};

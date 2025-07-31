
export const generateWithViVi = async (prompt: string): Promise<string> => {
  const response = await fetch("http://localhost:5000/api/vivi/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await response.json();
  return data.result;
};

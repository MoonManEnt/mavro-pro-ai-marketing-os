export const generateWithViVi = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch("/api/vivi/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.result || data.response || "Generated content would appear here";
  } catch (error) {
    console.warn("ViVi generation fallback:", error);
    return `AI-generated content for: "${prompt.slice(0, 50)}..."`;
  }
};
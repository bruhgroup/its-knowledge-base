"use server";

export default async function requestResponse(question: string) {
  const apiEndpoint = "http://localhost:8000/chain/invoke/";
  const data = { input: question };

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const result = await fetch(apiEndpoint, requestOptions);
  return await result.json();
}

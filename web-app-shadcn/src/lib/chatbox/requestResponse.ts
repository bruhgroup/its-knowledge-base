"use server";

export default async function requestResponse(question: string) {
  try {
    const apiEndpoint = "http://127.0.0.1:8000/chain/invoke/";
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
  } catch (e) {
    console.error("requestResponse", e);
  }
}

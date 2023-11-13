const fetchData = async () => {
    try {
      const apiEndpoint = 'http://localhost:8000/chain/invoke/';
      const data = { input: 'Help me reset my password' };

      const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      const result = await fetch(apiEndpoint, requestOptions);
        return await result.json();

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

fetchData().then(data => console.log(data.output));
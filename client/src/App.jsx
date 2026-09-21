import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:5001/")
      .then((response) => {
        console.log("Response status:", response.status);
        return response.text();
      })
      .then((data) => {
        console.log("Backend response:", data);
        setMessage(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setMessage("Could not connect to backend");
      });
  }, []);

  return (
    <div>
      <h1>Campus Hub</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
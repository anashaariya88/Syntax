import { useState } from "react";

function App() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");

  function analyzeCode() {
    if (code.trim() === "") {
      setResult("Please enter some code first.");
      return;
    }

    if (code.includes("for") && code.includes("for")) {  //check if 'for' comes more than once
      setResult(
        "⚠️ Possible inefficiency detected. Nested loops can increase computing work."
      );
    } else {
      setResult(
        "✅ No obvious inefficiency detected. Your code looks good!"
      );
    }
  }

  return (
    <div>
      <h1>SyntaxX</h1>
      <p>Code smarter. Use less computing power.</p>

      <div>
        <h2>🌱 Efficiency Score</h2>
        <p>100 / 100</p>
      </div>

      <div>
        <h2>Code Analyzer</h2>

        <textarea
          placeholder="Paste your code here..."
          rows="10"
          cols="50"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <br />

        <button onClick={analyzeCode}>
          Analyze Code
        </button>

        {result && (
          <div>
            <h3>Analysis Result</h3>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
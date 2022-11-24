import axios from "axios";
import { useState } from "react";
const baseURL = "http://localhost:3000";

function App() {
  const [url, setURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);

  const submit = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseURL}/scrape?url=${url}`);
      setResponse(() => res.data?.data?.keys);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg full-screen center-all">
      <div className="center-all">
        {response.length ? (
          <button className="reset" onClick={() => setResponse([])}>
            Reset
          </button>): null
        }
        <h1>{response.length ? "Your Files are Ready!!" : "Paste Your URL"}</h1>
        <h3> Get a screenshot and PDF </h3>
        {!response.length && !loading ? (
          <div className="form-input">
            <input onChange={(e) => setURL(e.target.value)} value={url} />
            <button onClick={submit}> Generate </button>
          </div>
        ) : (
          <div className="form-input pt-10 pb-10">
            { loading ? <div className="px-10"> LOADING.... </div> : null }
            {response.map((e, idx) => (
              <a download className="ready" href={`${baseURL}/d/${e}`} key={idx}>
                {e.split(".").reverse()[0]}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

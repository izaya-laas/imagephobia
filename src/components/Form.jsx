import { useState } from "preact/hooks";
import { validateURL } from "../../helpers/validateUrl";
import Error from "./Error";
import Loading from "./Loading";

const API_URL = "http://localhost:8080/prueba";

export default function Form({ setResponse }) {
  const [formData, setFormData] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendData = async (e, setResponse) => {
    e.preventDefault();
    setResponse(null);
    setError(null);
    const ieCompatibility = localStorage.getItem("ieCompatibility");

    const url = formData;
    //validamos url
    const responseValidation = validateURL(url);

    if (!responseValidation) {
      setError({ name: "The URL entered is not correct", status: 500 });

      setTimeout(() => {
        setError(null);
      }, 5000);

      return;
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Length": 0,
        "Content-Type": "application/json",
      },
      body: url,
    };

    setIsLoading(true);

    await fetch(`${API_URL}?ieCompatibility=${ieCompatibility}`, options)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => setResponse(json))
      .catch((err) => {
        const { statusText, status } = err;
        setError({ name: statusText, status });
      });

    setIsLoading(false);
  };

  return (
    <>
      <form
        className="flex font-code items-center gap-y-2 w-full max-w-xl mx-auto rounded-md text-white border bg-white"
        onSubmit={(e) => sendData(e, setResponse)}
      >
        <input
          className="block w-full py-4 rounded-l-sm text-2xl text-[#1d1d1d] text-center placeholder:text-[#dadce0] focus:outline-none"
          placeholder="find website"
          required
          type="text"
          id="for"
          value={formData}
          onChange={(e) => setFormData(e.target.value)}
        />
        <button className="block px-4 py-4 border-l rounded-r-sm font-bold">
          <img className="w-6" src="/public/find.svg" alt="find icon" />
        </button>
      </form>
      {error?.status && <Error error={error.name} />}
      {isLoading && <Loading />}
    </>
  );
}

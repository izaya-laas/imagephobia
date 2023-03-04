import { useState } from "preact/hooks";
import { validateURL } from "../../helpers/validateUrl";
import Error from "./Error";
import Loading from "./Loading";

const validationURL = (url) => {
  if (url === "") {
    return "You need to add a page";
  }

  if (!validateURL(url)) {
    return "The url page is not corrrect";
  }

  return null;
};

export default function Form({ setResponse }) {
  const [formData, setFormData] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log(error);

  const sendData = async (e, setResponse) => {
    e.preventDefault();
    setResponse(null);
    setError(null);

    const url = formData;
    const options = {
      method: "POST",
      headers: {
        "Content-Length": 0,
        "Content-Type": "application/json",
      },
      body: url,
    };
    const responseValidation = validationURL(url);
    setError(responseValidation);

    if (responseValidation) {
      setError({ name: "The URL entered is not correct", status: 500 });
      return;
    }

    setIsLoading(true);

    await fetch(`http://localhost:8080/prueba`, options)
      .then((res) => {
        console.log(res);

        return res.ok ? res.json() : Promise.reject(res);
      })
      .then(async (json) => {
        console.log("BIEN");
        console.log(json);
        setResponse(json);
      })
      .catch((err) => {
        console.log("ERROR");
        const { statusText, status } = err;

        const error = { name: statusText, status };

        setError(error);
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

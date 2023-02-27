import { signal } from "@preact/signals";

const valuePage = signal("");

export default function Form() {
  const sendData = async (e) => {
    e.preventDefault();
    const url = valuePage.value;

    if (url === "") return console.error("URL Vacia");

    const response = await fetch(`http://localhost:8080/prueba`, {
      method: "POST",
      headers: {
        "Content-Length": 0,
        "Content-Type": "application/json",
      },
      body: url,
    }).then((res) => res.json());

    console.log(response);
  };

  return (
    <form
      className="flex font-code items-center gap-y-2 w-full max-w-xl mx-auto rounded-md text-white border"
      onSubmit={sendData}
    >
      <input
        className="block w-full py-4 rounded-l-sm text-2xl text-[#1d1d1d] text-center placeholder:text-[#dadce0] focus:outline-none"
        placeholder="find website"
        type="text"
        id="for"
        value={valuePage}
        onChange={(e) => (valuePage.value = e.target.value)}
      />
      <button className="block px-4 py-4 border-l rounded-r-sm font-bold">
        <img className="w-6" src="/public/find.svg" alt="find icon" />
      </button>
    </form>
  );
}

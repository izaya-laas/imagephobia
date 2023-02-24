import { signal } from "@preact/signals";

const valuePage = signal("");

export default function Form() {
  const sendData = async (e) => {
    e.preventDefault();
    const url = valuePage.value;

    if (url === "") return console.error("URL Vacia");

    const xd = await fetch(`http://localhost:8080/prueba`, {
      method: "POST",
      headers: {
        "Content-Length": 0,
        "Content-Type": "application/json",
      },
      body: url,
    }).then((res) => res.json());

    console.log(xd);
  };

  return (
    <form
      className="flex flex-col items-center gap-y-2 w-60 mx-auto bg-[#0f172a] py-2 px-4 mt-6 rounded-md text-white"
      onSubmit={sendData}
    >
      <label className="text-sm" htmlFor="page">
        Pon la URL de una pagina web
      </label>
      <input
        className="w-full block rounded-sm text-sm px-2 py-1 text-black"
        placeholder="https://tupagina.com"
        type="text"
        id="for"
        value={valuePage}
        onChange={(e) => (valuePage.value = e.target.value)}
      />
      <button className="px-2 py-1 bg-sky-400 font-bold block w-full rounded-sm">
        Buscar
      </button>
    </form>
  );
}

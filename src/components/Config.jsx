import { useState } from "preact/hooks";

const initialIECompatibility = localStorage.getItem("ieCompatibility") || false;

export default function Config() {
  const [isActive, setIsActive] = useState(false);
  const [ieCompatibility, setIECompatibility] = useState(
    initialIECompatibility
  );

  function handleIsActive() {
    setIsActive(!isActive);
  }

  function changeIECompatibility() {
    setIECompatibility(!ieCompatibility);
    localStorage.setItem("ieCompatibility", !ieCompatibility);
  }

  return (
    <>
      <img
        onClick={handleIsActive}
        className={`top-4 right-2 sm:top-6 sm:right-6 w-12 ${
          isActive ? "animate-spin fixed" : "absolute"
        }`}
        src="/public/gear.svg"
        alt="Config Icon"
      />
      <aside
        className={`fixed top-20 right-0 pl-2 pr-1 sm:px-2 py-2 backdrop-blur-md bg-[white]/40 border border-y-black border-l-black rounded-l-sm transition-transform duration-700 before:contents before:w-2 before:bg-black before:h-2 before:absolute before:top-0 before:left-0 ${
          isActive ? "" : "translate-x-full"
        }`}
      >
        <div className="w-full">
          <label
            className="mr-2 font-code text-xs sm:text-sm"
            htmlFor="ie-compatibily"
          >
            IE compatibility
          </label>
          <input
            type="checkbox"
            name="dsadsadsadsa"
            id="ie-compatibily"
            onChange={changeIECompatibility}
          />
        </div>
      </aside>
    </>
  );
}

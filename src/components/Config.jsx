import { signal } from "@preact/signals";

const isActive = signal(false);
export const configImages = signal({
  ieCompatibility: localStorage.getItem("ieCompatibility") || false,
});

function handleIsActive() {
  isActive.value = !isActive.value;
}

function changeIECompatibility() {
  configImages.value.ieCompatibility = !configImages.value.ieCompatibility;
  localStorage.setItem("ieCompatibility", configImages.value.ieCompatibility);
}

export default function Config() {
  return (
    <>
      <img
        onClick={handleIsActive}
        className={`absolute top-4 right-2 sm:top-6 sm:right-6 w-12 ${
          isActive.value ? "animate-spin" : ""
        }`}
        src="/public/gear.svg"
        alt="Config Icon"
      />
      <aside
        className={`fixed top-20 right-0 pl-2 pr-1 sm:px-2 py-2 backdrop-blur-md bg-[white]/40 border border-y-black border-l-black rounded-l-sm transition-transform duration-700 before:contents before:w-2 before:bg-black before:h-2 before:absolute before:top-0 before:left-0 ${
          isActive.value ? "" : "translate-x-full"
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

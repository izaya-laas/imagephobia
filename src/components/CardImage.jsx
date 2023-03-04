export default function CardImage({
  url,
  urlDownload,
  kilobytesOld,
  kilobytesOptimized,
  percentajeInFavor,
}) {
  return (
    <div className="flex items-center justify-between w-full h-12 border px-2 py-2 text-xs sm:text-sm overflow-hidden font-code">
      <div className="w-1/4 flex justify-center">
        <img className="h-10 w-auto object-contain" src={url} alt="Bubble" />
      </div>
      <div className="flex items-center justify-center w-full">
        <p className="hidden sm:block w-10">{kilobytesOld}kb</p>
        <div className="py-1 px-2 w-32 sm:w-48 rounded-lg mx-6 bg-[#1a73e8]">
          <p className="text-center text-white text-sm sm:text-base">
            Finished
          </p>
        </div>
        <p className="hidden sm:block w-10">{kilobytesOptimized}kb</p>
      </div>
      <div className="text-right w-1/4 flex flex-col-reverse items-center sm:flex-row">
        <a className="text-[#1a73e8]" href={urlDownload}>
          Download
        </a>
        <span className="font-bold text-[#21c669] w-8">
          {percentajeInFavor}%
        </span>
      </div>
    </div>
  );
}

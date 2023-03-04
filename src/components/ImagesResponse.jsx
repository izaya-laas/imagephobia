import { byteToKilobyte } from "../../helpers/ByteToKilobyte.js";
import { calculatePercentaje } from "../../helpers/calculatePercentaje.js";
import ButtonDownloadAll from "./ButtonDownloadAll.jsx";
import CardImage from "./CardImage.jsx";

export default function ImagesResponse({ images }) {
  const imagesOptimized = images.map((image) => image.optimizedImage);

  return (
    <section>
      <h3 className="text-center text-lg font-code font-bold mt-4 mb-2">
        We found <span className="text-[#1a73e8]">{images.length}</span>{" "}
        unoptimized images
      </h3>
      {images.length > 0 && (
        <>
          <ButtonDownloadAll images={imagesOptimized} />
          <article className="flex flex-col gap-y-4 justify-center max-w-3xl px-2 sm:px-6 mx-auto">
            {images.map(({ optimizedImage, oldImage }) => {
              const { url, bytes: bytesOptimized } = optimizedImage;
              const { bytes: bytesOld } = oldImage;

              const percentajeInFavor = calculatePercentaje(
                bytesOld,
                bytesOptimized
              );

              const kilobytesOptimized = byteToKilobyte(bytesOptimized);
              const kilobytesOld = byteToKilobyte(bytesOld);

              const urlDownload = url.replace(
                "upload/",
                "upload/fl_attachment/"
              );

              return (
                <CardImage
                  kilobytesOld={kilobytesOld}
                  kilobytesOptimized={kilobytesOptimized}
                  url={url}
                  urlDownload={urlDownload}
                  percentajeInFavor={percentajeInFavor}
                />
              );
            })}
          </article>
        </>
      )}
    </section>
  );
}

import { saveAs } from "file-saver";
import JSZip from "jszip";

export default function ButtonDownloadAll({ images }) {
  async function dowloadImages(images) {
    const zip = new JSZip();

    const promises = images.map(async (image) => {
      const { url, publicId, format } = image;

      const response = await fetch(url);
      const blob = await response.blob();
      const fileName = `${publicId}.${format}`;

      zip.file(fileName, blob);
    });

    await Promise.all(promises);

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "imagephobia.zip");
  }

  return (
    <button
      onClick={() => dowloadImages(images)}
      className="block mb-8 bg-black py-1 px-2 w-32 sm:w-48 rounded-lg mx-auto text-white font-code text-sm sm:text-base"
    >
      Download All
    </button>
  );
}

import { useState } from "preact/hooks";
import Form from "./Form";
import ImagesResponse from "./ImagesResponse";

export default function WorkSection() {
  const [responseData, setResponseData] = useState(null);

  return (
    <article>
      <section>
        <Form setResponse={setResponseData} />
      </section>
      {responseData && <ImagesResponse images={responseData} />}
    </article>
  );
}

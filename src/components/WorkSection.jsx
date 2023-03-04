import { useState } from "preact/hooks";
import Form from "./Form";
import ImagesResponse from "./ImagesResponse";

export default function WorkSection() {
  const [responseData, useResponseData] = useState(null);

  return (
    <article>
      <section>
        <Form setResponse={useResponseData} />
      </section>
      {responseData && <ImagesResponse images={responseData} />}
    </article>
  );
}

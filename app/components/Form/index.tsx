"use client";
import { FormEvent, useState, useRef } from "react";
import { formatSizeUnits } from "./helpers";
import { Media, Validation } from "@/types/types";
import Formular from "./Formular";
import "./style.css";

const Form = () => {
  const [url, setUrl] = useState("https://play.pokemonshowdown.com/audio/");
  const [media, setMedia] = useState<Media>({ mp3: true, ogg: false });
  const [size, setSize] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [validation, setValidation] = useState<Validation>({ url: false });
  const linkWrapperRef = useRef<HTMLDivElement>(null);

  const mediaToSend = () => {
    return Object.keys(media)
      .map((el: string) => (media[el as keyof Media] ? el : false))
      .filter((el) => el);
  };

  const makeZipButton = (data: Blob) => {
    if (!linkWrapperRef.current || !data) return;

    const blobUrl = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "file.zip";
    link.text = "Download";
    link.classList.add(
      "bg-green-500",
      "hover:bg-green-700",
      "text-white",
      "font-bold",
      "py-2",
      "px-4",
      "rounded"
    );
    linkWrapperRef.current.append(link);

    setSize(formatSizeUnits(data.size));
  };

  const getZip = () => {
    setIsLoading(true);

    if (linkWrapperRef.current) {
      setSize("");
      linkWrapperRef.current.querySelector("a")?.remove();
    }

    fetch("/api/scrapper", {
      method: "POST",
      body: JSON.stringify({
        url: url,
        media: mediaToSend(),
      }),
    })
      .then((response) => response.blob())
      .then((data) => {
        makeZipButton(data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!url) {
      setValidation({ ...validation, url: true });
      return;
    }

    const newValidation = { ...validation };
    Object.keys(validation).forEach((key) => {
      newValidation[key as keyof typeof validation] = false;
    });
    setValidation({ ...newValidation });

    getZip();
  };

  return (
    <div>
      <Formular
        url={url}
        setUrl={setUrl}
        media={media}
        setMedia={setMedia}
        handleSubmit={handleSubmit}
        validation={validation}
      />
      <div className="py-6">
        {validation.url && <p>You must provide url</p>}
      </div>
      {isLoading && <div>Loading...</div>}
      <div>
        <span ref={linkWrapperRef} />
        {size && <span> - file.zip ({size})</span>}
      </div>
    </div>
  );
};

export default Form;

import { FormEvent, SetStateAction, Dispatch } from "react";
import { Media, Validation } from "@/types/types";

const Formular = ({
  url,
  setUrl,
  media,
  setMedia,
  handleSubmit,
  validation,
}: {
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
  media: Media;
  setMedia: Dispatch<SetStateAction<Media>>;
  handleSubmit: (e: FormEvent) => void;
  validation: Validation;
}) => {
  const handleUrlChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setUrl(target.value);
  };

  const handleCheckboxChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;

    const newMedia = { ...media };
    newMedia[target.name as keyof typeof media] = target.checked;

    setMedia({ ...newMedia });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="url" className="mb-1">
        Url
      </label>
      <input
        type="url"
        name="url"
        placeholder="https://play.pokemonshowdown.com/audio/cries/"
        value={url}
        onChange={handleUrlChange}
        className={validation.url ? "error" : ""}
      />
      <div className="mb-6">
        <p className="mb-2">Media type:</p>
        <div className="flex items-center mb-2">
          <input
            id="media-mp3"
            name="mp3"
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={media["mp3"]}
          />
          <label htmlFor="media-mp3">.mp3</label>
        </div>
        <div className="flex items-center">
          <input
            id="media-ogg"
            name="ogg"
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={media["ogg"]}
          />
          <label htmlFor="media-ogg">.ogg</label>
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Prepare Zip
      </button>
    </form>
  );
};

export default Formular;

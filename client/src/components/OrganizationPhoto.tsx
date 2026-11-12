import { useState } from "react";

type OrganizationPhotoProps = {
  src?: string;
  name: string;
  className?: string;
  imageClassName?: string;
  credit?: string;
};

const OrganizationPhoto = ({
  src,
  name,
  className = "",
  imageClassName = "",
  credit,
}: OrganizationPhotoProps) => {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#EDEFE5] ${className}`}>
      {src && !failed ? (
        <img
          src={src}
          alt={`${name} community service photograph`}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${imageClassName}`}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[#EDEFE5] text-[#124B39]">
          <div className="text-center px-3">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-lg font-bold">
              {name.trim().slice(0, 1).toUpperCase()}
            </div>
            <span className="text-xs font-semibold">Photo unavailable</span>
          </div>
        </div>
      )}
      {credit && src && !failed && (
        <a
          href={credit}
          target="_blank"
          rel="noreferrer"
          title="View photo source"
          className="absolute bottom-2 right-2 rounded bg-black/55 px-2 py-1 text-[10px] text-white opacity-90"
        >
          Photo source
        </a>
      )}
    </div>
  );
};

export default OrganizationPhoto;

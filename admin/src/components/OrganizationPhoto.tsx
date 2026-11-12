import { useState } from "react";

type OrganizationPhotoProps = {
  src?: string;
  name: string;
  className?: string;
};

const OrganizationPhoto = ({
  src,
  name,
  className = "",
}: OrganizationPhotoProps) => {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`overflow-hidden rounded-lg bg-[#EDEFE5] ${className}`}>
      {src && !failed ? (
        <img
          src={src}
          alt={`${name} photograph`}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-[#124B39]">
          {name.slice(0, 1).toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default OrganizationPhoto;

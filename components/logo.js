import Icon from "@/public/logo.svg";
import Image from "next/image";

const Logo = () => {
  return (
    <div
      style={{
        height: "2rem",
        width: "2rem",
        position: "relative",
      }}
    >
      <Image
        src={Icon}
        fill
        style={{
          objectFit: "cover",
        }}
        alt="Icon"
      />
    </div>
  );
};

export default Logo;

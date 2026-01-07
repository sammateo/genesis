import { Ring2 } from "ldrs/react";
import "ldrs/react/Ring2.css";
const StandardLoadingIcon = () => {
  return (
    <Ring2
      size="20"
      stroke="2"
      strokeLength="0.25"
      bgOpacity="0.1"
      speed="0.8"
      color="#1c398e"
    />
  );
};

export default StandardLoadingIcon;

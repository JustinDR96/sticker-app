import React, { useEffect, useState } from "react";
import { getStickerId } from "../../api/getStickerId";

function StickerCard({ stickerId }) {
  const [stickerData, setStickerData] = useState(null);
  useEffect(() => {
    const fetchStickerId = async () => {
      const stickerData = await getStickerId({ stickerId });
      setStickerData(stickerData);
    };

    fetchStickerId();
  }, [stickerId]); // Ajout de stickerId comme dépendance pour réexécuter si l'ID change

  return (
    <div className="sticker-container">
      <img
        className="sticker-image"
        src={stickerData?.image}
        alt={stickerData?.name}
      />
    </div>
  );
}

export default StickerCard;

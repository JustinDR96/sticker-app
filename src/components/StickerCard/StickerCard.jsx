import React, { useEffect, useState } from "react";
import { getStickerId } from "../../api/getStickerId";

function StickerCard({ stickerId }) {
  const [stickerData, setStickerData] = useState(null);
  useEffect(() => {
    const fetchStickerId = async () => {
      // Passage de l'ID du sticker à la fonction getStickerId
      const stickerData = await getStickerId({ stickerId });
      console.log(stickerData);
      setStickerData(stickerData);
    };

    fetchStickerId();
  }, [stickerId]); // Ajout de stickerId comme dépendance pour réexécuter si l'ID change

  return (
    <div>
      <p>{stickerData?.name}</p>
    </div>
  );
}

export default StickerCard;

import React, { useState, useEffect } from "react";
import { StickerCard } from "../../components";
import { getStickersUsers } from "../../api/getStickersUsers";

function CollectionUser() {
  const [stickersUsers, setStickersUsers] = useState([]);

  useEffect(() => {
    const fetchStickersUsers = async () => {
      const stickersUsers = await getStickersUsers();
      setStickersUsers(stickersUsers);
    };
    fetchStickersUsers();
  }, []);

  return (
    <div className="page_container">
      <div className="collection_container">
        {stickersUsers.map((stickerUser) => (
          <div className="sticker">
            <StickerCard
              key={stickerUser.sticker_id}
              stickerId={stickerUser.sticker_id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CollectionUser;

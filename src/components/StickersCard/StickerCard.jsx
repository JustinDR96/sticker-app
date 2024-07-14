function StickerCard({ sticker }) {
  return (
    <div>
      <h3>{sticker.name}</h3>
      {/* <img src={sticker.image} alt={sticker.name} /> */}
      <p>Description: {sticker.description}</p>
      <p>Rarity: {sticker.rarity}</p>
    </div>
  );
}

export default StickerCard;

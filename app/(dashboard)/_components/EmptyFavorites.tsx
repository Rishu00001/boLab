import Image from "next/image";

export const EmptyFavorites = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image
        src={"/no-bookmark.png"}
        height={140}
        width={140}
        alt="not found image"
      />
      <h2 className="text-2xl font-semibold mt-6">No Favorites!</h2>
      <p className="text-muted-foreground text-sm mt-2">Favorite boards will appear here</p>
    </div>
  );
};

import { Hint } from "@/components/hint";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserAvatarProps {
  src?: string;
  name?: string;
  fallback?: string;
  borderColor?: string;
}

export const UserAvatar = ({
  src,
  name,
  borderColor,
  fallback,
}: UserAvatarProps) => {
  return (
    <Hint label={name || "Team Member"} side="bottom" sideOffset={10}>
      <Avatar className="relative h-8 w-8">
        <AvatarImage
          src={src}
          alt={name}
          className="absolute inset-0 h-full w-full rounded-full border-2 object-cover"
          style={{ borderColor }}
        />

        <AvatarFallback
          className="
            absolute inset-0 flex items-center justify-center 
            text-xs font-semibold rounded-full border-2
          "
          style={{ borderColor }}
        >
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
};

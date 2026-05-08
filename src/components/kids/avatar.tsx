interface KidsAvatarProps {
  name?: string;
  color?: string;
  size?: number;
}

export function KidsAvatar({ name = 'L', color = '#6B46C1', size = 40 }: KidsAvatarProps) {
  const initials = name.slice(0, 1).toUpperCase();
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-extrabold shadow-md ring-2 ring-white"
      style={{
        width: size,
        height: size,
        background: color,
        fontSize: size * 0.42,
      }}
    >
      {initials}
    </div>
  );
}

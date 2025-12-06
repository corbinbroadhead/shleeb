export const avatarImages = {
  0: require("@/assets/avatars/0.png"),
  1: require("@/assets/avatars/1.png"),
  2: require("@/assets/avatars/2.png"),
  3: require("@/assets/avatars/3.png"),
  4: require("@/assets/avatars/4.png"),
  5: require("@/assets/avatars/5.png"),
};

export function getAvatarSource(avatarId: number) {
  return avatarImages[avatarId] || avatarImages[0];
}
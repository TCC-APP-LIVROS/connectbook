import { Avatar as NativeBaseAvatar, IAvatarProps, Center } from "native-base";

import DefaultAvatar from "@assets/Img/DefaultAvatar/Avatar.png";
import { PencilLine, PencilSimpleLine } from "phosphor-react-native";

type AvatarProps = IAvatarProps & {
  badge?: boolean;
};

export function Avatar({
  source,
  badge = false,
  ...rest
}: AvatarProps) {
  return (
    <NativeBaseAvatar
      borderWidth="1.5"
      borderColor={"blue.600"}
      source={source || DefaultAvatar}
      {...rest}
    >
      {badge ? (
        <NativeBaseAvatar.Badge
          bg={"blue.600"}
          size="10"
          justifyContent="center"
          alignItems="center"
        >
          <PencilSimpleLine size="16" color={"white"} />
        </NativeBaseAvatar.Badge>
      ) : null}
    </NativeBaseAvatar>
  );
}

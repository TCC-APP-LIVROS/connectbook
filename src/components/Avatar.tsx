import { Avatar as NativeBaseAvatar, IAvatarProps, Center } from "native-base";

import DefaultAvatar from "@assets/Img/DefaultAvatar/Avatar.png";
import { PencilLine, PencilSimpleLine } from "phosphor-react-native";

export function Avatar({ source, ...rest }: IAvatarProps) {
  return (
    <NativeBaseAvatar
      borderWidth="1.5"
      borderColor={"blue.600"}
      source={source || DefaultAvatar}
      size="22"
      {...rest}
    >
      {source ? null : (
        <NativeBaseAvatar.Badge
          bg={"blue.600"}
          size="10"
          justifyContent="center"
          alignItems="center"
        >
          <PencilSimpleLine size="16" color={"white"} />
        </NativeBaseAvatar.Badge>
      )}
    </NativeBaseAvatar>
  );
}

import { Box, Center, HStack, VStack,IBoxProps, Image } from "native-base";
import * as React from "react";
import { useState } from "react";
import { Dimensions, ImageSourcePropType, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RACarrousel from "react-native-reanimated-carousel";

type CarrouselProps = IBoxProps & {
  images: ImageSourcePropType[];
}

const Indicator = ({ count, currentIndex }: { count: number, currentIndex: number}) => {
  return (
    <HStack justifyContent="center" mt="-3" px={2}>
      {Array.from(Array(count).keys()).map((i) => (
        <Box
        flex={1}
          key={i}
          bg={"gray.100"}
          opacity={i === currentIndex ? "0.75" : "0.3"}
          height="1"
          borderRadius="full"
          mx="0.5"
        />
      ))}
    </HStack>
  );
};


export function Carrousel({images,...rest}: CarrouselProps) {
  const width = Dimensions.get("window").width;
  const data = [...new Array(6).keys()];
  let [index, setIndex] = useState(0);
  return (
    <Box {...rest} paddingBottom={2}>
      <GestureHandlerRootView>
      <RACarrousel
        loop
        width={width}
        height={width * 0.75}// 4:3 aspect ratio
        data={images}
        defaultIndex={0}
        autoPlay={false}
        scrollAnimationDuration={500}
        onSnapToItem={(index) => setIndex(index)}
        renderItem={({ index, item }) => (
          <Box flex={1} justifyContent="center" bgColor="gray.400">
            <Image alt="" flex={1} source={item} resizeMode="contain"/>
          </Box>
        )}
      />
      </GestureHandlerRootView>
        <Indicator count={images.length} currentIndex={index} />
    </Box>
  );
}
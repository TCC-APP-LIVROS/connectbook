import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, HStack, VStack } from "native-base";
import { ArrowLeft, ArrowRight } from "phosphor-react-native";

const data = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

const ITEMS_PER_PAGE = 10;

export const Paginator = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <VStack space={4} width={"100%"}>
      <HStack space={2} justifyContent="center" alignItems="center">
        <TouchableOpacity
          onPress={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <ArrowLeft size={20} color={"#000"} />
        </TouchableOpacity>
        <Text>
          Page {currentPage} of {totalPages}
        </Text>
        <TouchableOpacity
          onPress={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <ArrowRight size={20} color={"#000"} />
        </TouchableOpacity>
      </HStack>
    </VStack>
  );
};

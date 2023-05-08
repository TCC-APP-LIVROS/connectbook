import { useTheme } from "native-base";
import { CaretDown, CaretUp } from "phosphor-react-native";
import { useState } from "react";
import { Platform } from "react-native";
import SelectDropdown, { SelectDropdownProps} from "react-native-select-dropdown";


export function Select({ ...rest }: SelectDropdownProps) {
  const [isOnFocus, setIsOnFocus] = useState(false);
  const { colors, fonts } = useTheme();
  return (
    <SelectDropdown
      buttonStyle={{
        maxWidth: 110,
        height: "auto",
        borderWidth: 1,
        borderColor: isOnFocus ?  colors.gray[400] : colors.gray[300],
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingBottom: 12,
        paddingTop: 12,
      }}
      onFocus={() => {
        setIsOnFocus(true);
      }}
      onBlur={() => {
        setIsOnFocus(false);
      }}
      dropdownStyle={{
        backgroundColor: colors.gray[100],
        borderRadius: 6,
        marginTop: Platform.OS === "ios" ? 0 : -30,
        paddingHorizontal: 12,
      }}
      dropdownOverlayColor={"transparent"}
      rowStyle={{
        borderBottomWidth: 0,
      }}
      buttonTextStyle={{
        textAlign: "left",
        color: colors.gray[700],
        fontFamily: fonts.body,
        fontSize: 14,
      }}
      rowTextStyle={{
        textAlign: "left",
        color: colors.gray[600],
        fontFamily: fonts.body,
        fontSize: 14,
      }}
      selectedRowTextStyle={{
        textAlign: "left",
        color: colors.gray[600],
        fontFamily: fonts.heading,
        fontSize: 14,
      }}
      renderDropdownIcon={() => (
        isOnFocus ? <CaretUp size={16} color={colors.gray[500]} /> : <CaretDown size={16} color={colors.gray[500]} />
      )}
      dropdownIconPosition={"right"}
    //   onSelect={(selectedItem, index) => {
    //     console.log(selectedItem, index);
    //   }}
      buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
        }}
        { ...rest }
    />
  );
}

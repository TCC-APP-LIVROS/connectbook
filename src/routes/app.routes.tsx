import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import { Home } from "@screens/Home";
import { MyListing } from "@screens/MyListing";
import { ListingDetails } from "@screens/ListingDetails";
import { CreateListing } from "@screens/CreateListing";
import { PreviewListing } from "@screens/PreviewListing";

import { House, SignOut, Tag } from "phosphor-react-native";
import { useTheme } from "native-base";
import { useAuth } from "@hooks/useAuth";
import { ListingDTO } from "@dtos/ListingDTO";
import { ImageSourcePropType } from "react-native";
import { UserDTO } from "@dtos/UserDTO";

export type AppRoutes = {
  bottomTabsRoutes: { screen: "home" | "myListing" };
  createListing: undefined;
  listingDetails: undefined;
  previewListing: {
    seller : UserDTO;
    product: ListingDTO;
    productImages: ImageSourcePropType[];
  };
};

export type AppNavigationRouteProps = NativeStackNavigationProp<AppRoutes>;

function DummySignOutScreen() {
  return <></>;
}

function BottomTabsRoutes() {
  const { Navigator, Screen } = createBottomTabNavigator();
  const { colors } = useTheme();
  const { signOut } = useAuth();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[600],
        tabBarInactiveTintColor: colors.gray[400],
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <House
              color={color}
              weight={focused ? "bold" : "regular"}
              size={size}
            />
          ),
        }}
      />
      <Screen
        name="myListing"
        component={MyListing}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Tag
              color={color}
              size={size}
              weight={focused ? "bold" : "regular"}
            />
          ),
        }}
      />
      <Screen
        name="signOut"
        component={DummySignOutScreen}
        options={{
          tabBarIcon: ({ size }) => <SignOut color={"#E07878"} size={size} />,
        }}
        listeners={{
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
            signOut();
          },
        }}
      />
    </Navigator>
  );
}

export function AppRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator();
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="bottomTabsRoutes" component={BottomTabsRoutes} />
      <Screen name="createListing" component={CreateListing} />
      <Screen name="listingDetails" component={ListingDetails} />
      <Screen name="previewListing" component={PreviewListing} />
    </Navigator>
  );
}

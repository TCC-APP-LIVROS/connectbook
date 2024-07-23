import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import { Home } from "@screens/Home";
import { MyListing } from "@screens/MyListing";
import { ListingDetails } from "@screens/ListingDetails";
import { CreateListing } from "@screens/CreateListing";
import { PreviewListing } from "@screens/PreviewListing";
import { Settings } from "@screens/Settings";
import { Profile } from "@screens/Profile";
import { Notifications } from "@screens/Notifications";
import { Reply } from "@screens/Reply";
import { Address } from "@screens/Address";
import { EditAddress } from "@screens/EditAddress";
import { PaymentMethods } from "@screens/PaymentMethods";
import { Orders } from "@screens/Orders";
import { OrderDetails } from "@screens/OrderDetails";
import { EditPayment } from "@screens/EditPayment";

import { Bell, House, SignOut, ShoppingCart, Tag } from "phosphor-react-native";
import { useTheme } from "native-base";
import { useAuth } from "@hooks/useAuth";
import { ListingDTO } from "@dtos/ListingDTO";
import { UserDTO } from "@dtos/UserDTO";

export type AppRoutes = {
  bottomTabsRoutes: { screen: "home" | "myListing" };
  createListing: {
    mode: "create" | "edit";
    listingId?: string;
  };
  listingDetails: ListingDTO;
  previewListing: {
    mode: "create" | "edit";
    listingId?: string;
    seller: UserDTO;
    product: ListingDTO;
    productImages: {
      name: string;
      uri: string;
      type: string;
    }[];
  };
  settings: undefined;
  reply: undefined;
  notifications: undefined;
  profile: undefined;
  address: {
    address?: string;
    helper?: string;
  };
  editAddress: undefined;
  paymentMethods: undefined;
  Orders: undefined;
  OrderDetails: undefined;
  EditPayment: undefined;
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
        name="cart"
        component={MyListing}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <ShoppingCart
              color={color}
              size={size}
              weight={focused ? "bold" : "regular"}
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
        name="notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Bell
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
      <Screen name="settings" component={Settings} />
      <Screen name="reply" component={Reply} />
      <Screen name="profile" component={Profile} />
      <Screen name="address" component={Address} />
      <Screen name="editAddress" component={EditAddress} />
      <Screen name="paymentMethods" component={PaymentMethods} />
      <Screen name="Orders" component={Orders} />
      <Screen name="OrderDetails" component={OrderDetails} />
      <Screen name="EditPayment" component={EditPayment} />
    </Navigator>
  );
}

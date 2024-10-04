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
import { Address } from "@screens/Address/Address";
import { EditAddress } from "@screens/Address/EditAddress";
import { PaymentMethods } from "@screens/PaymentMethods";
import { Orders } from "@screens/Orders";
import { OrderDetails } from "@screens/OrderDetails";
import { EditPayment } from "@screens/EditPayment";

import { Bell, House, SignOut, ShoppingCart, Tag } from "phosphor-react-native";
import { useTheme } from "native-base";
import { useAuth } from "@hooks/useAuth";
import { ListingDTO } from "@dtos/ListingDTO";
import { UserDTO } from "@dtos/UserDTO";
import { Cart } from "@screens/Cart";
import { ConfirmOrder } from "@screens/Checkout/ConfirmOrder";
import { ShippingMethod } from "@screens/Checkout/ShippingMethod";
import { SelectAddress } from "@screens/Checkout/SelectAddress";
import { Shipping } from "@screens/Checkout/Shipping";
import { Payment } from "@screens/Checkout/Payment";
import { FinishedOrder } from "@screens/Checkout/FinishedOrder";
import { Sales } from "@screens/Sales";
import { SaleDetails } from "@screens/SaleDetails";

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
  Cart: undefined;
  ConfirmOrder: undefined;
  FinishedOrder: undefined;
  ShippingMethod: undefined;
  SelectAddress: undefined;
  Shipping: undefined;
  Payment: undefined;
  Sales: undefined;
  SaleDetails: undefined;
};

export type AppNavigationRouteProps = NativeStackNavigationProp<AppRoutes>;

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
        component={Cart}   
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
      <Screen name="Cart" component={Cart} />
      <Screen name="ConfirmOrder" component={ConfirmOrder} />
      <Screen name="FinishedOrder" component={FinishedOrder} />
      <Screen name="ShippingMethod" component={ShippingMethod} />
      <Screen name="SelectAddress" component={SelectAddress} />
      <Screen name="Shipping" component={Shipping} />
      <Screen name="Sales" component={Sales} />
      <Screen name="SaleDetails" component={SaleDetails} />
      <Screen name="Payment" component={Payment} />
    </Navigator>
  );
}

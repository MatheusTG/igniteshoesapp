import { useEffect } from "react";
import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { NotificationClickEvent, OneSignal } from "react-native-onesignal";

import { Routes } from "./src/routes";

import { THEME } from "./src/theme";
import { Loading } from "./src/components/Loading";

import { CartContextProvider } from "./src/contexts/CartContext";
import {
  tagUserEmailRemove,
  tagUserInfoCreate,
} from "./src/notifications/notificationsTags";

// O projeto está sendo usado para teste por isso a chave
// está sendo passada diretamente
OneSignal.initialize("d80c8672-e2ae-4359-8e02-803e0890e4eb");
OneSignal.Notifications.requestPermission(true);

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  // tagUserEmailRemove()
  tagUserInfoCreate();

  useEffect(() => {
    const handleNotificationClick = (event: NotificationClickEvent): void => {
      const { actionId } = event.result;

      switch (actionId) {
        case "1":
          console.log("Ver todos ");
          break;
        case "2":
          console.log("Ver pedido");
          break;
        default:
          console.log("Nenhum botão de ação selecionado");
          break;
      }
    };

    OneSignal.Notifications.addEventListener("click", handleNotificationClick);

    return () =>
      OneSignal.Notifications.removeEventListener(
        "click",
        handleNotificationClick
      );
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}

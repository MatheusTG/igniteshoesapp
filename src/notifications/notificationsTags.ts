import { OneSignal } from "react-native-onesignal";

export function tagUserEmailRemove(email: string) {
  OneSignal.User.removeTag("user_email");
}

export function tagUserInfoCreate() {
  OneSignal.User.addTags({
    user_name: "Rodrigo",
    user_email: "matheusteodorogarcia@gmail.com",
  });
}

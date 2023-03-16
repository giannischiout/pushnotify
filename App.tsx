
import { SafeAreaView, Text } from "react-native";
import { useEffect } from "react";
import messaging from '@react-native-firebase/messaging';


function App(): JSX.Element {


  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    console.log('start')
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log(remoteMessage)
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

      onAppBootstrap()

  }, []);

  async function onAppBootstrap() {
    // Register the device with FCM
    await messaging().registerDeviceForRemoteMessages();
  
    // Get the token
    const token = await messaging().getToken();
    console.log(token)
    // Save the token
   
  }

  return (
    <SafeAreaView>
        <Text>Notify</Text>
    </SafeAreaView>
  );
}


export default App;

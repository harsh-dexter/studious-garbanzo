import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from '../screens/ChatScreen';
import RoomSelection from '../screens/RoomSelection';
import FriendList from '../screens/FriendList';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="Rooms"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#3F51B5',
      },
      headerTintColor: '#fff',
    }}
  >
    <Stack.Screen
      name="Rooms"
      component={RoomSelection}
      options={{ title: 'Chat Rooms' }}
    />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={({ route }) => ({
        title: route.params.roomName || 'Anonymous Chat'
      })}
    />
    <Stack.Screen
      name="Friends"
      component={FriendList}
      options={{ title: 'Saved Conversations' }}
    />
  </Stack.Navigator>
);

import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import Organizers from './pages/organizers';
import Orders from './pages/orders';
import Home from './pages/dashboard';
import {firebase} from '../config';
import Categories from './pages/categories';
const Drawer = createDrawerNavigator();
function MainApp() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Categories" component={Categories} />
      <Drawer.Screen name="Orders" component={Orders} />
      <Drawer.Screen name="Organizers" component={Organizers} />
    </Drawer.Navigator>
  );
}
export default MainApp


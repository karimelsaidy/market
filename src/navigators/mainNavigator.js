import { createSwitchNavigator } from "react-navigation";
import { createAppContainer } from "react-navigation";
import drawerNavigator from "./drawerNavigator";
import authNav from "./authNav";
import splashScreen from "../screens/splashScreen";


const mainNav = createSwitchNavigator(({
splashScreen,
auth : authNav,
shop: drawerNavigator
}));

export default createAppContainer(mainNav);
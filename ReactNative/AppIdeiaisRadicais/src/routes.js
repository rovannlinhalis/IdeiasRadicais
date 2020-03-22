import {createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';


import Artigos from './pages/artigos';
import ViewArtigo from './pages/viewArtigo';

const Routes = createAppContainer(
    createStackNavigator({
         Artigos:{
screen: Artigos,
headerMode: 'none',
navigationOptions: ()=>({
 title :`Artigos`,
 }),

         },
        ViewArtigo,
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headershown: false,
        }
    }
    )
);

export default Routes;
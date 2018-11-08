import { createStackNavigator } from 'react-navigation';

import LoginPage from './pages/LoginPage';
import SeriesPage from './pages/SeriesPage';
import SerieDetailPage from './pages/SerieDetailPage';
import SerieFormPage from './pages/SerieFormPage';

export default createStackNavigator ({
  'Login' : {
    screen: LoginPage,
    navigationOptions: {
      title: 'Bem vindo!'
    }
  },
  'Main' : {
    screen: SeriesPage
  },
  'SerieForm' : {
    screen: SerieFormPage,
    navigationOptions: ({ navigation }) => {
      if (navigation.state.params && navigation.state.params.serieToEdit){
        return {
          title: navigation.state.params.serieToEdit.title,
        }
      }
      return {
        title: 'Nova série',
      };
    }
  },
  'SerieDetail' : {
    screen: SerieDetailPage,
    navigationOptions: ({ navigation }) => {
      const { serie } = navigation.state.params;
      return {
        title: serie.title
      }
    }
  }
},{
  navigationOptions: {
    title: 'Series!',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#6ca2f7',
      borderBottomWidth: 1,
      borderBottomColor: '#c5c5c5'
    },
    headerTitleStyle: {
      color: 'white',
      fontSize: 30,
      alignSelf: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  }
});
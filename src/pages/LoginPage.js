import React from 'react';
import { 
    View, 
    StyleSheet,
    Text, 
    TextInput, 
    Button, 
    ActivityIndicator,
    Alert
}  from 'react-native';
import firebase from 'firebase';

import {connect} from 'react-redux';

import {tryLogin} from '../actions';

import FormRow from '../components/FormRow'

class LoginPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            mail: '',
            password: '',
            isLoading: false,
            message: ''
        }
    }

    componentDidMount(){
        const config = {
            apiKey: "AIzaSyBbPSy4GCxIU0ikkr8i2jGjEJXkts2CQVA",
            authDomain: "series-42b05.firebaseapp.com",
            databaseURL: "https://series-42b05.firebaseio.com",
            projectId: "series-42b05",
            storageBucket: "series-42b05.appspot.com",
            messagingSenderId: "514209582001"
        };
        firebase.initializeApp(config);
    }

    onChangeHandler(field, value){
        this.setState({
            [field]: value
        });
    }

    tryLogin(){
        //console.log(this.state);
        this.setState({isLoading: true, message: ''});
        const { mail: email, password } = this.state;

        this.props
            .tryLogin({email, password})
            .then(user => {
                if (user) {
                    //this.setState({message: 'Sucesso!'});
                    return this.props.navigation.replace('Main');
                }

                this.setState({
                    isLoading: false, 
                    message: ''
                });

            }).catch(error => {
                console.log('caiu no catch', error.code);
                this.setState({
                    isLoading: false, 
                    message: this.getMessageByErrorCode(error.code)
                });
            });
    }

    getMessageByErrorCode(errorCode){
        switch(errorCode){
            case 'auth/wrong-password':
                return 'Senha incorreta';
            case 'auth/user-not-found':
                return 'Usuário não encontrado';
            default:
                return 'Erro desconhecido';
        }
    }

    renderButton(){
        if (this.state.isLoading)
            return <ActivityIndicator />

        return (
            <Button 
            title="Entrar" 
            onPress={() => this.tryLogin()} />
        );
    }

    renderMessage(){
        const { message } = this.state;
        if(!message){
            return null;
        }

        return (
            <View>
                <Text>{message}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <FormRow first>
                    <TextInput 
                        style={styles.input}
                        placeholder="user@mail.com"
                        value={this.state.mail}
                        onChangeText={value => this.onChangeHandler('mail', value)}                     
                    />
                </FormRow>
                <FormRow last>
                    <TextInput 
                        style={styles.input}                    
                        placeholder="******"
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={value => this.onChangeHandler('password', value)}
                    />
                </FormRow>
                { this.renderButton() }
                { this.renderMessage() }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        paddingLeft: 10,
        paddingRight: 10
    },
	input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,        
    }
});

export default connect(null,{ tryLogin })(LoginPage)
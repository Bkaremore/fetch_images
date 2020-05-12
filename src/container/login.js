import React,{Component} from 'react';
import {View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import firebase from 'react-native-firebase';
import {GoogleSignin} from "react-native-google-signin";
import NetInfo from "@react-native-community/netinfo";
//import * as Styles from '../style/style';

const {height, width} = Dimensions.get('window');

class Login extends Component{

    constructor(props) {
        super(props);
        this.state={
            email:'',
            password:'',
            errorEmail:'',
            errorPassword:'',
            isConnected:true
        }
    }

    componentWillMount() {
        NetInfo.fetch().then(state => {
            this.setState({isConnected:state.isConnected})
            console.log("Is connected?", state.isConnected);
        });

    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            console.log("user ==>",user)
            this.props.navigation.navigate(user ? 'Home' : 'Login')
        })
    }

    doLogin = async () =>{
        let allOk = true;

        if(this.state.email == null && this.state.email == ''){
            allOk = false
            this.setState({
                errorEmail:'enter email'
            })
        }
        if(this.state.password == null && this.state.password == ''){
            allOk = false
            this.setState({
                errorPassword:'enter password'
            })
        }

        if(this.state.isConnected){
            try{
                /*await GoogleSignin.hasPlayServices();
                console.log("await GoogleSignin.configure() =====>",GoogleSignin.hasPlayServices())
                const userInfo = await GoogleSignin.signIn();
                console.log("data =====>",data)

                // create a new firebase credential with the token
                const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
                // login with credential
                const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

                console.log(JSON.stringify(firebaseUserCredential.user.toJSON()));*/

                firebase
                    .auth()
                    .createUserWithEmailAndPassword(this.state.email, this.state.password)
                    .then(() => {
                        console.log("inside firebase block")
                        this.props.navigation.navigate('Home')})
                    .catch(error => console.log("error",error))
            } catch(e){
                console.log("error",e)
            }

        }
    }


    render() {
        let {email, errorEmail, password, errorPassword} = this.state;
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>

                <TextInput onChangeText={(text)=>{
                    this.setState({email:text})
                }}
                value={email}
                style={Styles.inputContainer}
                placeholder={'Enter email'}/>

                <TextInput onChangeText={(text)=>{
                    this.setState({password:text})
                }}
                value={password}
                style={Styles.inputContainer}
                placeholder={'Enter password'}/>

                <Text style={{color:'red'}}>{errorPassword}</Text>

                <TouchableOpacity style={Styles.loginBtn}
                                  onPress={()=>{
                                    this.doLogin()
                                }}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default Login;
const Styles = StyleSheet.create({
    inputContainer:{
        borderRadius:5,
        borderColor:'#000',
        borderWidth:1,
        width:"90%",
        margin:10
    },
    loginBtn:{
        width:'50%',
        justifyContent:'center',
        alignItems:'center',
        height:40,
        backgroundColor:'blue',
        marginVertical:20,
        borderRadius: 5
    }
})

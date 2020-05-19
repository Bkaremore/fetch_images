import React,{Component} from 'react';
import {View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ImageBackground,
    Image
} from 'react-native';
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
            isConnected:false,
            isPasswordVisible:false
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
        let {email, errorEmail, password, errorPassword,isPasswordVisible} = this.state;
        return(
            <ImageBackground style={{flex:1, justifyContent:'center', alignItems:'center'}}
            source={require('../images/background_login.jpg')}
            >

                <Text style={{color:'#fff', fontWeight:'bold', fontSize:32, marginVertical: 20}}>Login</Text>
                <View style={Styles.inputContainer}>

                    <TextInput onChangeText={(text)=>{
                        this.setState({email:text})
                    }}
                               value={email}
                               style={{fontSize:14}}
                               placeholder='Email'
                               keyboardType={'email-address'}
                    />
                    <Image source={require('../images/user.png')}
                           style={Styles.loginIcon}/>
                </View>
                {errorEmail !=null? <Text style={{color:'red'}}>{errorEmail}</Text>:null}


                <View style={Styles.inputContainer}>
                    <TextInput onChangeText={(text)=>{
                        this.setState({password:text})
                    }}
                               value={password}
                               style={{fontSize:14}}
                               placeholder={'Password'}
                               secureTextEntry={!isPasswordVisible ?true:false}/>
                        <TouchableOpacity onPress={()=>{
                            this.setState({isPasswordVisible:!isPasswordVisible})
                        }}>

                            <Image source={!isPasswordVisible ?require('../images/visible.png'):require('../images/hidden.png')}
                                   style={Styles.loginIcon}/>
                        </TouchableOpacity>
                </View>
                {errorPassword !=null? <Text style={{color:'red'}}>{errorPassword}</Text>:null}

                <TouchableOpacity style={Styles.loginBtn}
                                  onPress={()=>{
                                    this.doLogin()
                                }}>
                    <Text style={{color:'#fff', fontSize:18, fontWeight:'bold'}}>Login</Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}
export default Login;
const Styles = StyleSheet.create({
    inputContainer:{
        borderRadius:5,
        borderColor:'#fff',
        borderWidth:1,
        width:"75%",
        margin:10,
        backgroundColor: '#EFFBFB',
        alignItems: 'center',
        flexDirection:'row',
        justifyContent: 'space-between',
        height:45,
        padding:3
    },
    loginBtn:{
        width:'75%',
        justifyContent:'center',
        alignItems:'center',
        height:40,
        backgroundColor:'#0B2161',
        marginVertical:20,
        borderRadius: 5,

    },
    loginIcon:{
        height:25,
        width:25,
        padding: 5,
        tintColor:'#01A9DB'
    }

})

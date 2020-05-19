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
           // console.log("Is connected?", state.isConnected);
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
                console.log("this.state.email ==>",this.state.email)
                console.log("this.state.password ==>",this.state.password)

                let userAuth = firebase.auth();
                console.log("userAuth ==>",userAuth)
                firebase.auth()
                    .createUserWithEmailAndPassword(this.state.email, this.state.password)
                    .then(response => {
                        //console.log("inside firebase block==>",response)
                        this.props.navigation.navigate('Home')}
                        )
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
                               style={{fontSize:14,padding:5}}
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
                               style={{fontSize:14,padding:5}}
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
        height:40,
       // padding:4
    },
    loginBtn:{
        width:'75%',
        justifyContent:'center',
        alignItems:'center',
        height:40,
        backgroundColor:'#0B2161',
        marginVertical:20,
        borderRadius: 5
    },
    loginIcon:{
        height:25,
        width:25,
        margin: 8,
        tintColor:'#01A9DB'
    }

})

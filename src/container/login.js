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

    componentDidMount() {
        NetInfo.fetch().then(state => {
            this.setState({isConnected:state.isConnected})
            // console.log("Is connected?", state.isConnected);
        });

        firebase.auth().onAuthStateChanged(user => {
            console.log("user ==>",user)
            this.props.navigation.navigate(user ? 'Home' : 'Login')
        })
    }

    doLogin = async () =>{
        let allOk = true;
        let emailVal = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

        if (emailVal.test(this.state.email) === false) {
            allOk = false
            this.setState({
                errorEmail: 'Enter valid email id.'
            })
        }

        if(this.state.password == null || this.state.password == ''){
            allOk = false
            this.setState({
                errorPassword:'Enter password'
            })
        }

        if(this.state.email == null && this.state.password == null){
            allOk = false
           alert("please enter email and password.")
        }

        if(allOk && this.state.isConnected){
            try{
                let userAuth = firebase.auth();
                //console.log("userAuth ==>",userAuth)
                firebase.auth()
                    .createUserWithEmailAndPassword(this.state.email, this.state.password)
                    .then(response => {
                        this.props.navigation.navigate('Home')}
                        )
            } catch(e){
                alert(e)
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
                               onFocus={()=>{
                                   this.setState({errorEmail:''})
                               }}
                    />
                    <Image source={require('../images/user.png')}
                           style={Styles.loginIcon}/>
                </View>
                {errorEmail !=null? <Text style={{color:'#fff'}}>{errorEmail}</Text>:null}


                <View style={Styles.inputContainer}>
                    <TextInput onChangeText={(text)=>{
                        this.setState({password:text})
                    }}
                               value={password}
                               style={{fontSize:14,padding:5}}
                               placeholder={'Password'}
                               secureTextEntry={!isPasswordVisible ?true:false}
                               onFocus={()=>{
                                   this.setState({errorPassword:''})
                               }}/>
                        <TouchableOpacity onPress={()=>{
                            this.setState({isPasswordVisible:!isPasswordVisible})
                        }}>

                            <Image source={!isPasswordVisible ?require('../images/visible.png'):require('../images/hidden.png')}
                                   style={Styles.loginIcon}/>
                        </TouchableOpacity>
                </View>
                {errorPassword !=null? <Text style={{color:'#fff'}}>{errorPassword}</Text>:null}

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

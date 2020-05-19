import React,{Component} from 'react';
import  {View,Text,Image,FlatList,TouchableOpacity,StyleSheet} from 'react-native';
import NetInfo from "@react-native-community/netinfo";

class HomeScreen extends  Component{

    constructor(props) {
        super(props);
        this.state={
            ImageData:[],
            loading:false
        }
    }
    async UNSAFE_componentWillMount() {
                let json =[];
                let data=[];
                this.setState({loading:true})
                let response = await fetch('https://pixabay.com/api/?key=16439112-c86ab77c67df6a83a81b71a79&q=yellow+flowers&image_type=photo');
                json = await response.json();


                for(let i = 0; i< Object.keys(json.hits).length; i++){
                     if(i< 10){
                         data.push(json.hits[i])
                     }
                }

                this.setState({
                    ImageData:data,
                    loading:false
                },()=>{
                    console.log("ImageData ==>",JSON.stringify(this.state.ImageData))
                })

            }
       // });}

    _renderImage =(item, index)=>{
        //console.log("item ===>",item)
        return(
            <View>
                <Image source={{uri:item.userImageURL}}
                       style={{height:300, width:'95%', margin:10}}
                        //resizeMode={'contain'}
                />
            </View>
        )
    }

    renderLoadMore = async () =>{
        console.log("inside ImageData load more==>")
        let json =[];
        let data=[];
        let response = await fetch('https://pixabay.com/api/?key=16439112-c86ab77c67df6a83a81b71a79&q=yellow+flowers&image_type=photo');
        json = await response.json();

        this.setState({
            ImageData:json.hits
        })
    }


    render() {
        let {ImageData,loading} = this.state;
        return(
            <View style={{flex:1}}>
                <View style={Styles.header}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                        <Image source={require('../images/back_arrow.png')}
                               style={{height:30, width:30, marginHorizontal:15}}/>
                    </TouchableOpacity>
                    <Text style={{color:'#fff', paddingHorizontal:8, fontSize: 22, fontWeight: 'bold'}}>Home</Text>
                </View>
                <FlatList data={ImageData}
                extraData={ImageData}
                keyExtractor={(item)=>{
                    item.id
                }}
                renderItem={({item, index})=>(
                    this._renderImage(item, index)
                )
                }
                initialNumToRender={10}/>

                {!loading ? <TouchableOpacity style={Styles.loadMore}
                                             onPress={()=>{
                                                 this.renderLoadMore()
                                             }}>
                                <Text style={Styles.loadMoreTxt}>Load More</Text>
                             </TouchableOpacity>
                    :
                    <View/>
                }

            </View>
        );
    }
}
export default HomeScreen;

const Styles = StyleSheet.create({
    loadMore:{
        flexDirection:'column',
        backgroundColor:'#0B2161',
        height:40,
        width:'40%',
        margin:10,
        justifyContent:'center',
        alignSelf:'center'
    },
    loadMoreTxt:{
        color:'#fff',
        fontSize:15,
        fontWeight:'bold',
        textAlign:'center'
    },
    header:{
        flexDirection: 'row',
        backgroundColor:'#0B2161',
        height:50,
        width:'100%',
        alignItems: 'center',
        //justifyContent: 'space-around',
        elevation:35,
        //marginHorizontal:10
    }
})
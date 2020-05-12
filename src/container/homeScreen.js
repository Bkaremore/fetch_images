import React,{Component} from 'react';
import  {View,Text,Image,FlatList,TouchableOpacity,StyleSheet} from 'react-native';
import NetInfo from "@react-native-community/netinfo";

class HomeScreen extends  Component{

    constructor(props) {
        super(props);
        this.state={
            ImageData:[]
        }
    }
    async UNSAFE_componentWillMount() {
                let json =[];
                let data=[];
                let response = await fetch('https://pixabay.com/api/?key=16439112-c86ab77c67df6a83a81b71a79&q=yellow+flowers&image_type=photo');
                json = await response.json();


                for(let i = 0; i< Object.keys(json.hits).length; i++){
                     if(i< 10){
                         data.push(json.hits[i])
                     }
                }

                this.setState({
                    ImageData:data
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
        let {ImageData} = this.state;
        return(
            <View style={{flex:1}}>
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

                <TouchableOpacity style={Styles.loadMore}
                                    onPress={()=>{
                                        this.renderLoadMore()
                                    }}>
                    <Text style={Styles.loadMoreTxt}>Load More</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default HomeScreen;

const Styles = StyleSheet.create({
    loadMore:{
        flexDirection:'column',
        backgroundColor:'#000',
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
    }
})
import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    Main: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height:200,
        width:width/2-15,
        backgroundColor:'white',
        borderRadius:3,
        
    },
    TopMain: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height:230,
        width:width-10,
        backgroundColor:'white',
        borderRadius:3
    },
    TopcoverTextInform:{
        marginTop:5,
        marginLeft:20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    TopTitle:{
        fontSize:14,
        fontWeight: 'bold',
        color:'black',
        width:width-20
    },
    TopcoverNameAndRate:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    TopcoverIcon:{
        height:18,
        width:18,
        tintColor:'white',
        marginLeft:10
    },
    ToptextName:{
        fontSize:14,
        color:'white',
        marginLeft:10,
        fontWeight:'bold',
        width:width/3,
    },
    Toptext:{
        fontStyle:'normal',
        width:60,
        marginLeft:5,
        color:'white'
    },
    TopAddress:{
        fontSize:13,
        color:'gray',
        width:width-20
    },
    TopcoverimageType:{
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        position:"absolute",
        left:0,
        top:100,
        width:width,
        height:50,
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    CoverTopimageType:{
        height:40,
        width:40,
        borderRadius:20,
        marginLeft:20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth:1,
        borderColor:'white'
    },
    imageTypeTop:{
        height:30,
        width:30,
    },
    imagePromotion:{
        width:(width/2)-15,
        height:75
    },
    imageTopPromotion:{
        width:width,
        height:150
    },
    coverimageType:{
        //position:"absolute",
       // left:width/6-3,
       // top:50,
        width:50,
        height:50,
        borderRadius:25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(115, 115, 115, 0.9)',
        borderWidth:2,
        borderColor:'transparent'
    },
    coveMainType:{
        flexDirection:'row',
        position:"absolute",
        left:0,
        top:50,
        width:width/2-10,
        height:50,
        justifyContent: 'center',
        alignItems: 'center',
        
        borderWidth:2,
        borderColor:'transparent'
    },
    imageType:{
        height:25,
        width:25,
        tintColor:'white'
    },
    coverTextInform:{
        marginTop:30,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    coverNameAndRate:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStar:{
        height:20,
        width:20
    },
    coverOpenCloseDistanceRuration:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    coverOpenClose:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    coverTopOpenClose:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft:20,
        width,
    },
    topDistanceTime:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    distanceTime:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    coverDistance:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    coverTime:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    coverIcon:{
        height:15,
        width:15,
        tintColor:'silver',
        marginLeft:0
    },
    textName:{
        fontSize:16,
        color:'black',
        fontWeight:'bold',
        marginLeft:10,
        marginRight:10
    },
    text:{
        fontStyle:'normal',
        width:50,
        marginLeft:5
    },
    textOpenClose:{
        fontStyle:'normal',
        width:80,
        color:'gray',
        fontSize:13,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:5
    },
    textDayTopPromotion:{
        fontStyle:'normal',
        width:width/2-20,
        color:'gray',
        fontSize:13,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft:10
    },
    textTitle:{
        fontWeight:'bold',
        marginLeft: 10, 
        marginRight: 10
    }
});
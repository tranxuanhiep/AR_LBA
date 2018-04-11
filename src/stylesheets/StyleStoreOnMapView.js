import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../colors/Colors';
const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
    Main:{
        height:90,
        width:200,
        backgroundColor:'white',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius:3,
        borderWidth:1
    },
    imageDistance:{
        width:20,
        height:20,
        marginRight:3
    },
    coverDistance:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageDuration:{
        width:17,
        height:17,
        marginRight:4
    },
    coverDuration:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10 ,
    },
    coverInformationStore:{
        flex:3,
        margin:5,
    },
    coverDistanceAndDuration:{
        flexDirection: 'row',
    },
    coverViewOfIcon:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textNameOfStore:{
        fontWeight:'bold',
        fontSize:15,
        color:'black',
    },
    textAddress:{
        fontStyle:'italic',
        fontSize:13,
        color:'gray'
    },
    coverIconDetail:{
        height:40,
        width:40,
        //backgroundColor:'red'
    },
    coverRating:{
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        margin:2
    }
});
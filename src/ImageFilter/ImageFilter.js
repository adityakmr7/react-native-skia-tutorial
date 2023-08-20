import {Text, useWindowDimensions, View,StyleSheet} from "react-native";
import {Canvas, ColorMatrix, Fill, Image, Paint, RoundedRect, useImage, vec} from "@shopify/react-native-skia";
// https://kazzkiq.github.io/svg-color-filter/
const filters = {
    Juno: [
        1, 0, 0, 0, 0,
        -0.4, 1.3, -0.4, 0.2, -0.1,
        0, 0, 1, 0, 0,
        0, 0, 0, 1, 0,
    ],
    Sepia: [
        0.393, 0.769, 0.189, 0, 0,
        0.349, 0.686, 0.168, 0, 0,
        0.272, 0.534, 0.131, 0, 0,
        0,     0,     0,     1, 0,
    ],
    Greyscale: [
        0.2126, 0.7152, 0.0722, 0, 0,
        0.2126, 0.7152, 0.0722, 0, 0,
        0.2126, 0.7152, 0.0722, 0, 0,
        0,      0,      0,      1, 0,
    ],
    Gingham: [
        2, 0, 0, 0, 0,
        1, 1, 0, 0, 0,
        0.5, 0, 1, 0, 0,
        0, 0, 0, 1, 0,
    ],
    Mayfair: [
        1, 1, 0.5, 0, 0,
        0, 0.5, 1, 0, 0,
        0.5, 0.5, 1, 0, 0,
        0, 0, 0, 1, 0,
    ],
    Valencia: [
        1, 0, 0, 0, 0,
        -0.2, 1, 0, 0, 0,
        -0.8, 1.6, 1, 0, 0,
        0, 0, 0, 1, 0,
    ],
    'No Filter': [
        1, 0, 0, 0, 0,
        0, 1, 0, 0, 0,
        0, 0, 1, 0, 0,
        0, 0, 0, 1, 0,
    ]
};
const ImageFilter = () => {
    const {width,height} = useWindowDimensions();
    const center = vec(width/2,height/2);
    const image = useImage('https://picsum.photos/1920/1080');
    return (
        <View style={styles.container}>
            <Canvas style={{flex:1}}>
                <ColorMatrix matrix={filters.Juno}/>
                <Image
                    x={0}
                    y={0}
                    width={width}
                    height={height}
                    image={image}
                    fit="cover"
                />
                {/*<RoundedRect*/}
                {/*  height={180}*/}
                {/*  width={300}*/}
                {/*  x={center.x - 150}*/}
                {/*  y={ center.y - 90}*/}
                {/*  r={12}*/}
                {/*  color={"#eee"}*/}
                {/*/>*/}

            </Canvas>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    }
})
export default ImageFilter;

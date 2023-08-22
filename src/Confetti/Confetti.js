import {Dimensions, View, StyleSheet, Pressable, Text} from "react-native";
import {Canvas, Group, RoundedRect, runTiming, Skia, useComputedValue, useValue, vec} from "@shopify/react-native-skia";
import {useState} from "react";
import {processTransform3d, toMatrix3} from "react-native-redash";

const colors = ['#deb7ff','#c785ec','#8549a7', '#634087'];
const NUM_OF_CONFETTI  = 70;

const {height,width} = Dimensions.get('window');
const relativeSin  = (yPosition, offset) => {
    const rand = Math.sin((yPosition-500) * (Math.PI /540));
    const otherRand = Math.cos((yPosition - 500) * Math.PI / 540);
    return offset %2 ===0? rand:-otherRand;
}
const ConfettiPieces = ({startingXOffset,startingYOffset, offsetId,colorCode}) => {
    const CONFETTI_WIDTH = 10;
    const CONFETTI_HEIGHT = 30;
    const seed = Math.random() * 4;
    const yPosition = useValue(startingYOffset);
    const centerY = useValue(0);


    const origin = useComputedValue(() => {
        centerY.current = yPosition.current + CONFETTI_HEIGHT /2;
        const centerX = startingYOffset + CONFETTI_WIDTH /2;
        return vec(centerX,centerY.current)
    },[yPosition])


    const matrix = useComputedValue(() => {
        const rotateZ =
            relativeSin(yPosition.current, Math.round(Number(offsetId))) * seed * 2.5;
        const rotateY =
            relativeSin(yPosition.current, Math.round(Number(offsetId))) * seed * 1.5;
        const rotateX =
            relativeSin(yPosition.current, Math.round(Number(offsetId))) * seed * 1.5;
        const mat3  = toMatrix3(
            processTransform3d([
                {rotateY: rotateY},
                {rotateX:rotateX},
                {rotateZ: rotateZ}
            ])
        )
        return Skia.Matrix(mat3)


    },[yPosition])
    runTiming(yPosition,height*3,{
        duration:4000

    })
    return (
        <Group matrix={matrix} origin={origin}>
            <RoundedRect
                r={8}
                x={startingXOffset}
                y={yPosition}
                height = {30}
                width = {10}
                color={colors[colorCode]}
            />

        </Group>
    )
}
const Confetti = () => {
    const [confettiPieces,setConfettiPieces] = useState([]);
    const startAnimation = () => {
        const pieces = [];

        for (let i = 0; i < NUM_OF_CONFETTI; i++) {
            const startingXOffset = Math.random() * width;
            const startingYOffset = -Math.random() * (height * 3);
            const id = i + Math.random() + '';
            pieces.push({
                offsetId: id,
                startingXOffset,
                startingYOffset,
                colorCode: i % colors.length,
            });
        }

        setConfettiPieces(pieces);
    };
    return(
        <View style={styles.container}>
           <Canvas style={styles.canvas}>
               {confettiPieces.map((offset) => (

               <ConfettiPieces
                   key={offset.offsetId}
                   {...offset}

               />

               ))}
           </Canvas>
            <Pressable onPress={startAnimation} style={styles.button}>
                <Text style={styles.buttonText}>START</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,

    },
    canvas: {
        flex:1
    },
    button: {
        height: 60,
        backgroundColor: "purple",
        position: "absolute",
        left: 30,
        right: 30,
        bottom: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 20,
    },
})
export default Confetti;

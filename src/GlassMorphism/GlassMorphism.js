import {
    BackdropBlur,
    Canvas, Fill,
    Group,
    Image,
    mix,
    Paint, rect,
    Rect,
    RoundedRect, rrect,
    useImage, useLoop,
    vec,

} from "@shopify/react-native-skia";
import {useWindowDimensions} from "react-native";
import {useDerivedValue} from "react-native-reanimated";

const GlassMorphism = () => {
    const {width,height} = useWindowDimensions();
    const image = useImage('https://picsum.photos/1920/1080');
    const center = vec(width/2,height/2);
    const blurProgress = useLoop({duration:2000})
    const blurClipPath = rrect(rect(24, center.y, width - 48, 200), 12, 12);
    // const blur = useDerivedValue(() => mix(blurProgress.current, 0,10), [blurProgress.current])
    return (
        <Canvas style={{flex:1}}>
            <Group>

          <Rect x={0} y={0} width={width} height={height}/>
            <Image x={0} y={0} width={width} height={height} fit={"cover"} image={image}/>

            </Group>
            <Group>
                <RoundedRect
                    x={24}
                    y={center.y}
                    width={width -40}
                    height={200}
                    color={'#000000'}
                    r={12}
                >
                    <Paint
                    color={"rgba(255,255,255,0.8)"}
                    style={"stroke"}
                    strokeWidth={1}
                    />
                </RoundedRect>
                <BackdropBlur blur={4} clip={blurClipPath}>
                    <Fill color={"rgba(0,0,0,0.2)"}/>
                </BackdropBlur>
            </Group>
        </Canvas>
    )
}


export default GlassMorphism;

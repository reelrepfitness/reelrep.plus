import React, { useRef, useEffect } from 'react';
import { Animated, useWindowDimensions, StyleSheet, View } from 'react-native';
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';

interface ResponsiveWaveBackgroundProps {
  scrollY: Animated.Value;
}

export const ResponsiveWaveBackground: React.FC<ResponsiveWaveBackgroundProps> = ({ scrollY }) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const isLandscape = SCREEN_WIDTH > SCREEN_HEIGHT;

  // Parallax interpolation
  const translateY = scrollY.interpolate({
    inputRange: [0, SCREEN_HEIGHT],
    outputRange: [0, SCREEN_HEIGHT * 0.3], // Waves move at 30% speed of scroll
    extrapolate: 'clamp',
  });

  const wave1Anim = useRef(new Animated.Value(0)).current;
  const wave2Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
            Animated.timing(wave1Anim, { toValue: 10, duration: 4000, useNativeDriver: false }),
            Animated.timing(wave1Anim, { toValue: 0, duration: 4000, useNativeDriver: false })
        ]),
        Animated.sequence([
            Animated.timing(wave2Anim, { toValue: -15, duration: 5000, useNativeDriver: false }),
            Animated.timing(wave2Anim, { toValue: 0, duration: 5000, useNativeDriver: false })
        ])
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ translateY }] }]} pointerEvents="none">
       {/* Background Base Color */}
       <View style={[StyleSheet.absoluteFill, { backgroundColor: '#F9FAFB' }]} />
       
       {/* Wave 1 */}
       <Animated.View style={{ position: 'absolute', top: isLandscape ? SCREEN_HEIGHT * 0.4 : SCREEN_HEIGHT * 0.55, width: '100%', transform: [{ translateY: wave1Anim }] }}>
        <Svg height={SCREEN_HEIGHT * 0.6} width={SCREEN_WIDTH} viewBox="0 0 1440 320" preserveAspectRatio="none">
            <Path fill="rgba(31, 160, 155, 0.08)" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </Svg>
       </Animated.View>

       {/* Wave 2 */}
       <Animated.View style={{ position: 'absolute', top: isLandscape ? SCREEN_HEIGHT * 0.5 : SCREEN_HEIGHT * 0.65, width: '100%', transform: [{ translateY: wave2Anim }] }}>
        <Svg height={SCREEN_HEIGHT * 0.5} width={SCREEN_WIDTH} viewBox="0 0 1440 320" preserveAspectRatio="none">
            <Path fill="rgba(31, 160, 155, 0.15)" d="M0,96L48,128C96,160,192,224,288,240C384,256,480,224,576,192C672,160,768,128,864,144C960,160,1056,224,1152,240C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </Svg>
       </Animated.View>
    </Animated.View>
  );
};
import React, {useRef, useEffect} from 'react';
import { Text, TouchableOpacity, View, Animated } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FontFamily } from '../constants/font';

const styles = EStyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F4',
    borderRadius: 13,
    overflow: 'hidden',
    paddingVertical: 2
  },
  underlay: {
    position: 'absolute',
    top: 2,
    left: 2,
    height: '100%',
    width: '50%',
    overflow: 'hidden',
    paddingHorizontal: 2,
  },
  underlayInner: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    width: '100%',
    borderRadius: 12,
  },
  routeItemWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8
  },
  routeItemText: {
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    fontFamily: FontFamily.SFPRODISPLAY_REGULAR
  }
});

export const TapBarHeaderTop = ({activeRouteKey, tabBarRoutes, onPressTabBtn}) => {
  const findInitialActiveRouteIndex = tabBarRoutes.findIndex((route) => route.key === activeRouteKey)
  const underlayLeftOffset = useRef(new Animated.Value(findInitialActiveRouteIndex))
  useEffect(() => {
    const findActiveRouteIndex = tabBarRoutes.findIndex((route) => route.key === activeRouteKey)
    Animated.timing(underlayLeftOffset.current, {
      toValue: findActiveRouteIndex,
      duration: 200
    }).start()
  }, [activeRouteKey])
  const underlayLeftOffsetInterpolated = underlayLeftOffset.current.interpolate({
    inputRange: tabBarRoutes.map((route, index) => index),
    outputRange: tabBarRoutes.map((route, index) => `${index * (100/tabBarRoutes.length)}%`)
});
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.underlay, {left: underlayLeftOffsetInterpolated}]}>
        <View style={styles.underlayInner} />
      </Animated.View>
      {
        tabBarRoutes.map((route) => (
          <View style={styles.routeItemWrapper}>
            <TouchableOpacity onPress={() => onPressTabBtn(route.key)}>
              <Text style={styles.routeItemText}>
                {route.title}
              </Text>
            </TouchableOpacity>
          </View>
        ))
      }
    </View>
  )
}
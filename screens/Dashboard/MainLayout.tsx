import React from 'react';
import {
    View,
    Text,
    Animated
} from 'react-native';
import { COLORS, SIZES, FONTS, constants } from '../../constants';
import Home from './Home';
import Search from './Search';
import Profile from './Profile';
import { Shadow } from 'react-native-shadow-2';


const button_tabs = constants.bottom_tabs.map((item) => ({
    ...item,
    ref: React.createRef()
}))

const MainLayout = () => {

    const flatListRef = React.useRef(null);
    const scrollX = React.useRef(new Animated.Value(0)).current;

    function renderButtonTabs() {
        return (
            <View 
            style={{
                marginBottom: 20,
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.radius,
            }}>
                <Shadow
                    style={{ width: SIZES.width - SIZES.padding * 2, height: 85 }}
                >
                    <View
                    style={{
                        flex: 1,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.primary
                    }}>
                    </View>
                </Shadow>
            </View>
        )
    }


    function renderContent() {
        return (
            <View
                style={{
                    flex: 1,
                }}
            >
                <Animated.FlatList
                    ref={flatListRef}
                    horizontal
                    pagingEnabled
                    snapToAlignment='center'
                    snapToInterval={SIZES.width}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate='fast'
                    data={constants.bottom_tabs}
                    keyExtractor={item => `Main-${item.id}`}
                    onScroll={Animated.event(
                        [
                            {nativeEvent: {contentOffset: {x: scrollX}}}], {useNativeDriver: false})}
                    renderItem={({ item , index}) => {              return (
                        <View
                            style={{
                                width: SIZES.width,
                            }}
                        >
                            {item.label == constants.screens.home && <Home />}
                            {item.label == constants.screens.search && <Search />}
                            {item.label == constants.screens.profile && <Profile />}
                        </View>
                    )}
          
                    }
                ></Animated.FlatList>
            </View>
        )
    }

    return (
        <View
        style={{flex: 1, backgroundColor: COLORS.white}}
        >
            <Text>MainLayout</Text>
            {renderContent()}
            {renderButtonTabs()}
        </View>
    )
}

export default MainLayout;
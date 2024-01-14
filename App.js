import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image } from "react-native";
import Swiper from "react-native-deck-swiper";
import data from "./data";

const stackSize = 4;
const colors = {
  red: '#EC2379',
  blue: '#0070FF',
  gray: '#777777',
  white: '#ffffff',
  black: '#000000'
};
const ANIMATION_DURATION = 200;

export default function App() {
  const [index, setIndex] = React.useState(0);
  const swiperRef = React.createRef();

  const onSwiped = () => {
    setIndex((index + 1) % data.length);
  };

  const getCardColor = (cardIndex) => {
    // Return different colors based on the card index with adjusted opacity
    const colorsArray = ['#FFFF', '#FFB996', '#FFCF81', '#FDFFAB']; // Add more colors as needed
    const opacity = 0.9; // Adjust the opacity as needed (0 is fully transparent, 1 is fully opaque)
    const color = colorsArray[cardIndex % colorsArray.length];
    return color + Math.round(opacity * 255).toString(16).toUpperCase();
  };

  const Card = ({ card, zIndex }) => {
    const cardStyle = {
      ...styles.card,
      backgroundColor: getCardColor(zIndex), // Use zIndex instead of index for stacking
    };

    return (
      <View style={[cardStyle, { zIndex }]}>
        <Image source={{ uri: card.image }} style={styles.cardImage} />
      </View>
    );
  };

  const brightenOverlay = (source) => {
    return (
      <View style={[styles.overlayImage, styles.brightenOverlay]}>
        <Image source={source} style={styles.overlayImage} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        cards={data}
        cardIndex={index}
        renderCard={(card, index) => (
          <Card card={card} zIndex={data.length - index} />
        )}
        infinite
        onSwiped={onSwiped}
        onTapCard={() => swiperRef.current.swipeLeft()}
        cardVerticalMargin={50}
        stackSize={stackSize}
        stackScale={2}
        stackSeparation={14}
        animateOverlayLabelsOpacity
        animateCardOpacity
        disableTopSwipe
        disableBottomSwipe
        overlayLabels={{
          left: {
            element: brightenOverlay(require('./assets/correct.png')),
            style: {
              label: {
                backgroundColor: colors.red,
                borderColor: colors.red,
                color: colors.white,
                borderWidth: 1,
                fontSize: 24
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                marginTop: 20,
                marginLeft: -20
              }
            }
          },
          right: {
            element: brightenOverlay(require('./assets/cross.png')),
            style: {
              label: {
                backgroundColor: colors.blue,
                borderColor: colors.blue,
                color: colors.white,
                borderWidth: 1,
                fontSize: 24
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginTop: 20,
                marginLeft: 20
              }
            }
          }
        }}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flex: 0.9,
    shadowColor: "#000",
    shadowOpacity: "0.08",
    shadowOffset: { width: 0, height: 0 },
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  cardImage: {
    width: 160,
    flex: 1,
    resizeMode: "contain",
  },
  overlayImage: {
    // backgroundColor:'red',
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  brightenOverlay: {
    
    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
  },
});

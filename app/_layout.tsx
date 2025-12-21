import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import { View } from 'react-native';

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      <Head>
        <title>reel rep plus. | תזונה שהשליטה היא שלך</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content="השליטה בידיים שלך. בנק מזון עשיר, מעקב מאקרו חכם וסריקת ברקוד. נסו חינם!" />
        <meta property="og:title" content="Reel Rep Plus - אפליקציית תזונה עם AI" />
        <meta property="og:description" content="השליטה בידיים שלך. בנק מזון עשיר, מעקב מאקרו חכם וסריקת ברקוד. נסו חינם!" />
        <meta property="og:image" content="https://reelrep.plus/social-share.png" />
        <meta property="og:url" content="https://reelrep.plus" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Stack
        screenOptions={{
          headerShown: false, // זה מעלים את ה"הדר" ומאפשר לאתר להיראות נקי
        }}
      />
    </View>
  );
}
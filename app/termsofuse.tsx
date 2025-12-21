import { Rubik_400Regular, Rubik_600SemiBold, Rubik_700Bold, useFonts } from '@expo-google-fonts/rubik';
import { Feather } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  background: '#F9FAFB',
  primary: '#1FA09B',
  textDark: '#1c1c1c',
  textLight: '#555555',
  white: '#ffffff',
};

export default function TermsOfUse() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({ Rubik_400Regular, Rubik_600SemiBold, Rubik_700Bold });

  if (!fontsLoaded) return <View />;

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Feather name="arrow-right" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>תנאי שימוש</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>תנאי שימוש והצהרת בריאות – Reel Rep Plus</Text>

        <Text style={styles.sectionTitle}>1. הסרת אחריות רפואית (Medical Disclaimer)</Text>
        <Text style={styles.paragraph}>
          האפליקציה, התכנים, התפריטים ותוכניות האימון בה נועדו למטרות מידע כללי בלבד. הם אינם מהווים ייעוץ רפואי, אבחון או תחליף לטיפול מקצועי. השימוש באפליקציה אינו מחליף התייעצות עם רופא או דיאטן קליני.
        </Text>

        <Text style={styles.sectionTitle}>2. הצהרת בריאות</Text>
        <Text style={styles.paragraph}>
          המשתמש מצהיר בזאת כי מצבו הבריאותי תקין ומאפשר לו לבצע את הפעילות הגופנית והשינויים התזונתיים המוצעים. המשתמש מתחייב להפסיק כל פעילות ולפנות לרופא במידה והוא חש ברע או בכאב.
        </Text>

        <Text style={styles.sectionTitle}>3. הגבלת אחריות</Text>
        <Text style={styles.paragraph}>
          השימוש באפליקציה הוא על אחריות המשתמש בלבד ("Use at your own risk"). הבעלים, המפתחים והמאמנים של Reel Rep Plus לא ישאו באחריות לכל נזק גופני, בריאותי או כספי שייגרם למשתמש באופן ישיר או עקיף מהשימוש באפליקציה.
        </Text>

        <Text style={styles.sectionTitle}>4. גיל המשתמש</Text>
        <Text style={styles.paragraph}>
          השימוש באפליקציה מותר למשתמשים מעל גיל 16 בלבד (או בכפוף לאישור הורים).
        </Text>

        <View style={styles.divider} />

        <Text style={styles.agreement}>
          בעצם השימוש באפליקציית Reel Rep Plus, אתה מסכים לתנאי שימוש אלה והצהרת הבריאות.
        </Text>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 16,
    paddingBottom: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'Rubik_700Bold',
    fontSize: 20,
    color: COLORS.textDark,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontFamily: 'Rubik_700Bold',
    fontSize: 24,
    color: COLORS.textDark,
    marginBottom: 24,
    textAlign: 'center',
  },
  sectionTitle: {
    fontFamily: 'Rubik_700Bold',
    fontSize: 20,
    color: COLORS.textDark,
    marginTop: 24,
    marginBottom: 12,
    textAlign: 'right',
  },
  paragraph: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 16,
    color: COLORS.textLight,
    lineHeight: 26,
    marginBottom: 12,
    textAlign: 'right',
  },
  divider: {
    height: 2,
    backgroundColor: COLORS.primary,
    marginVertical: 32,
    borderRadius: 1,
  },
  agreement: {
    fontFamily: 'Rubik_600SemiBold',
    fontSize: 16,
    color: COLORS.textDark,
    textAlign: 'center',
    marginTop: 8,
  },
});

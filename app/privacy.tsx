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

export default function PrivacyPolicy() {
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
        <Text style={styles.headerTitle}>מדיניות פרטיות</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.lastUpdated}>עודכן לאחרונה: 26 בנובמבר 2025</Text>

        <Text style={styles.sectionTitle}>מבוא</Text>
        <Text style={styles.paragraph}>
          אפליקציית Reel Rep Plus ("אנחנו", "שלנו" או "אנו") מחויבת להגן על הפרטיות שלך. מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים ושומרים על המידע שלך בעת השימוש באפליקציה הניידת שלנו.
        </Text>

        <Text style={styles.sectionTitle}>המידע שאנו אוספים</Text>

        <Text style={styles.subSectionTitle}>מידע אישי</Text>
        <Text style={styles.bulletPoint}>• פרטי חשבון: כתובת אימייל, שם.</Text>
        <Text style={styles.bulletPoint}>• נתוני פרופיל: יעדים תזונתיים, מדדי גוף, העדפות תזונתיות.</Text>
        <Text style={styles.bulletPoint}>• נתוני בריאות: יומני ארוחות, יומני אימון, משקל גוף, תמונות התקדמות.</Text>
        <Text style={styles.bulletPoint}>• נתוני שימוש: אינטראקציות באפליקציה, שימוש בפיצ'רים השונים.</Text>

        <Text style={styles.subSectionTitle}>מידע שנאסף באופן אוטומטי</Text>
        <Text style={styles.bulletPoint}>• פרטי מכשיר (סוג מכשיר, גרסת מערכת הפעלה).</Text>
        <Text style={styles.bulletPoint}>• נתוני יומן (קריסות, שגיאות).</Text>
        <Text style={styles.bulletPoint}>• אסימוני התראות (Push Notification Tokens).</Text>

        <Text style={styles.sectionTitle}>כיצד אנו משתמשים במידע שלך</Text>
        <Text style={styles.paragraph}>אנו משתמשים במידע שלך כדי:</Text>
        <Text style={styles.bulletPoint}>• לספק מעקב תזונה וכושר מותאם אישית.</Text>
        <Text style={styles.bulletPoint}>• לאפשר תקשורת בין מאמן למתאמן וניהול תוכניות תזונה.</Text>
        <Text style={styles.bulletPoint}>• לשלוח התראות (Push Notifications) עבור תזכורות ועדכונים.</Text>
        <Text style={styles.bulletPoint}>• לשפר את פונקציונליות האפליקציה ואת חווית המשתמש.</Text>
        <Text style={styles.bulletPoint}>• לנתח דפוסי שימוש במטרה לשפר את הפיצ'רים.</Text>

        <Text style={styles.sectionTitle}>אחסון ואבטחת נתונים</Text>
        <Text style={styles.bulletPoint}>• כל הנתונים מאוחסנים בצורה מאובטחת באמצעות Supabase (מסד נתונים PostgreSQL).</Text>
        <Text style={styles.bulletPoint}>• הנתונים מוצפנים במעבר באמצעות HTTPS/TLS.</Text>
        <Text style={styles.bulletPoint}>• תהליך האימות (Authentication) מנוהל בצורה מאובטחת דרך Supabase Auth.</Text>
        <Text style={styles.bulletPoint}>• אנו מיישמים אמצעי אבטחה בסטנדרטים המקובלים בתעשייה.</Text>

        <Text style={styles.sectionTitle}>שיתוף נתונים</Text>
        <Text style={styles.paragraph}>
          אנו לא מוכרים את המידע האישי שלך. אנו עשויים לשתף נתונים עם:
        </Text>
        <Text style={styles.bulletPoint}>• המאמן שלך (במידה ואתה לקוח) – לצורך מתן שירותי אימון.</Text>
        <Text style={styles.bulletPoint}>• ספקי שירות (Supabase, Expo) – לצורך תפעול האפליקציה.</Text>
        <Text style={styles.bulletPoint}>• דרישות משפטיות – במידה ונידרש לכך על פי חוק.</Text>

        <Text style={styles.sectionTitle}>הזכויות שלך</Text>
        <Text style={styles.paragraph}>יש לך את הזכות:</Text>
        <Text style={styles.bulletPoint}>• לגשת לנתונים האישיים שלך.</Text>
        <Text style={styles.bulletPoint}>• לבקש מחיקת נתונים.</Text>
        <Text style={styles.bulletPoint}>• לעדכן או לתקן את המידע שלך.</Text>
        <Text style={styles.bulletPoint}>• לבטל את הרישום לקבלת התראות (Opt-out).</Text>
        <Text style={styles.bulletPoint}>• למחוק את החשבון שלך.</Text>

        <Text style={styles.sectionTitle}>פרטיות ילדים</Text>
        <Text style={styles.paragraph}>
          האפליקציה שלנו אינה מיועדת למשתמשים מתחת לגיל 16. איננו אוספים ביודעין מידע מילדים מתחת לגיל 16.
        </Text>

        <Text style={styles.sectionTitle}>שירותי צד שלישי</Text>
        <Text style={styles.paragraph}>אנו משתמשים בשירותים הבאים:</Text>
        <Text style={styles.bulletPoint}>• Supabase: מסד נתונים ואימות משתמשים.</Text>
        <Text style={styles.bulletPoint}>• Expo: תשתית אפליקציה והתראות.</Text>
        <Text style={styles.bulletPoint}>• Cloudinary: אחסון תמונות.</Text>

        <Text style={styles.sectionTitle}>שינויים במדיניות זו</Text>
        <Text style={styles.paragraph}>
          אנו עשויים לעדכן מדיניות פרטיות זו מעת לעת. אנו נודיע לך על שינויים משמעותיים באמצעות דואר אלקטרוני או התראה באפליקציה.
        </Text>

        <Text style={styles.sectionTitle}>צור קשר</Text>
        <Text style={styles.paragraph}>
          אם יש לך שאלות בנוגע למדיניות פרטיות זו, צור קשר בכתובת:
        </Text>
        <Text style={styles.bulletPoint}>• אימייל: ivan@reelrep.com</Text>
        <Text style={styles.bulletPoint}>• מפתח: Ivan Zaitsev</Text>

        <Text style={styles.sectionTitle}>שמירת נתונים</Text>
        <Text style={styles.paragraph}>
          אנו שומרים את הנתונים שלך כל עוד החשבון שלך פעיל. לאחר מחיקת החשבון, נמחק את הנתונים האישיים שלך תוך 30 יום, למעט במקרים בהם נדרש אחרת על פי חוק.
        </Text>

        <Text style={styles.sectionTitle}>העברת נתונים בינלאומית</Text>
        <Text style={styles.paragraph}>
          הנתונים שלך עשויים להיות מועברים ומאוחסנים בשרתים הממוקמים מחוץ למדינה שלך. אנו מבטיחים כי קיימים אמצעי הגנה מתאימים לכך.
        </Text>

        <View style={styles.divider} />

        <Text style={styles.agreement}>
          בעצם השימוש באפליקציית Reel Rep Plus, אתה מסכים למדיניות פרטיות זו.
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
  lastUpdated: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 24,
    textAlign: 'center',
  },
  sectionTitle: {
    fontFamily: 'Rubik_700Bold',
    fontSize: 22,
    color: COLORS.textDark,
    marginTop: 28,
    marginBottom: 12,
    textAlign: 'right',
  },
  subSectionTitle: {
    fontFamily: 'Rubik_600SemiBold',
    fontSize: 18,
    color: COLORS.textDark,
    marginTop: 16,
    marginBottom: 8,
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
  bulletPoint: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 15,
    color: COLORS.textLight,
    lineHeight: 24,
    marginBottom: 8,
    textAlign: 'right',
    paddingRight: 8,
  },
  divider: {
    height: 2,
    backgroundColor: COLORS.primary,
    marginVertical: 32,
    borderRadius: 1,
  },
  agreement: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 16,
    color: COLORS.textDark,
    textAlign: 'center',
    marginTop: 8,
  },
});

import { Rubik_400Regular, Rubik_600SemiBold, Rubik_700Bold, useFonts } from '@expo-google-fonts/rubik';

import { Feather } from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';

import React, { useEffect, useRef, useState } from 'react';

import {
    Alert,
    Animated,

    Image,
    KeyboardAvoidingView,

    Platform,
    ScrollView as RNScrollView,

    StyleSheet,

    Text,

    TextInput,

    TouchableOpacity,

    useWindowDimensions,

    View
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Stack, Link } from 'expo-router';



// --- Constants ---

const COLORS = {

  background: '#F9FAFB',

  primary: '#1FA09B',

  textDark: '#1c1c1c',

  textLight: '#555555',

  glassBorder: 'rgba(255, 255, 255, 0.5)',

  white: '#ffffff',

  inputBg: '#F0F2F5',

};



const AnimatedScrollView = Animated.createAnimatedComponent(RNScrollView);



// --- Animation Helper ---

const FadeInView = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {

  const animValue = useRef(new Animated.Value(0)).current;



  useEffect(() => {

    Animated.timing(animValue, {

      toValue: 1,

      duration: 800,

      delay,

      useNativeDriver: true,

    }).start();

  }, [animValue, delay]);



  const translateY = animValue.interpolate({

    inputRange: [0, 1],

    outputRange: [50, 0],

  });



  return (

    <Animated.View style={{ opacity: animValue, transform: [{ translateY }] }}>

      {children}

    </Animated.View>

  );

};



// --- Components ---



// Countdown Timer Component

const CountdownTimer = ({ compact = false }: { compact?: boolean }) => {

    // Initialize with 4 hours 34 min 11 sec (16451 seconds)

    const [timeLeft, setTimeLeft] = useState(16451);



    useEffect(() => {

        const timer = setInterval(() => {

            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));

        }, 1000);

        return () => clearInterval(timer);

    }, []);



    const hours = Math.floor(timeLeft / 3600);

    const minutes = Math.floor((timeLeft % 3600) / 60);

    const seconds = timeLeft % 60;



    return (

        <View style={compact ? styles.timerCompact : styles.timerContainer}>

            <Text style={compact ? styles.timerTextCompact : styles.timerText}>

                {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}

            </Text>

        </View>

    );

};



const Navbar = ({ onScrollToForm }: { onScrollToForm: () => void }) => (

    <View style={styles.fixedHeader}>

        <Image

            source={require('../assets/images/logo-reelrepplus-black.png')}

            style={styles.navbarLogo}

            resizeMode="contain"

        />

        <Text style={styles.navbarPromoText}>חודש ראשון מתנה לנרשמים עכשיו</Text>

        <View style={styles.navbarButtonRow}>

            <TouchableOpacity style={styles.navButton} onPress={onScrollToForm}>

                <Text style={styles.navButtonText}>הרשמה מוקדמת</Text>

            </TouchableOpacity>

            <View style={styles.navbarTimerBox}>

                <CountdownTimer compact />

            </View>

        </View>

    </View>

);



const HeroSection = ({ width, onScrollToForm }: { width: number, onScrollToForm: () => void }) => {

    const isMobile = width < 768;

    const floatAnim = useRef(new Animated.Value(0)).current;

    

    useEffect(() => {

        Animated.loop(

            Animated.sequence([

                Animated.timing(floatAnim, { toValue: -20, duration: 3500, useNativeDriver: true }),

                Animated.timing(floatAnim, { toValue: 0, duration: 3500, useNativeDriver: true }),

            ])

        ).start();

    }, [floatAnim]);



    return (

        <View style={styles.darkHeroContainer}>

            <LinearGradient

                colors={['#1c1c1c', '#152b2b', '#1c1c1c']}

                start={{ x: 0, y: 0 }}

                end={{ x: 1, y: 1 }}

                style={StyleSheet.absoluteFill}

            />

            <View style={styles.centeredContent}>

                <FadeInView delay={200}>

                    <View style={{ alignItems: 'center', paddingHorizontal: 20, width: '100%' }}>

                        <Image

                            source={require('../assets/images/logo-reelrepplus-white.png')}

                            style={{

                                width: isMobile ? 260 : 450,

                                height: isMobile ? 65 : 112.5,

                                resizeMode: 'contain',

                                marginBottom: 20,

                            }}

                        />

                        <Text style={[styles.heroSubtitle, { color: '#e0e0e0', textAlign: 'center', marginTop: 10 }]}>

                            {"אפליקציית תזונה חכמה למי שרוצה שליטה\nבלי להתעסק עם גרמים."}

                        </Text>

                        <TouchableOpacity 

                            style={[styles.ctaButtonLarge, { marginTop: 30, backgroundColor: '#1FA09B', borderColor: '#fff', borderWidth: 0 }]}

                            onPress={onScrollToForm}

                        >

                            <Text style={styles.ctaButtonTextLarge}>הרשמה מוקדמת</Text>

                        </TouchableOpacity>

                    </View>

                </FadeInView>

                <View style={{ marginTop: 40, alignItems: 'center', justifyContent: 'center' }}>

                    <FadeInView delay={400}>

                        <Animated.View style={{ transform: [{ translateY: floatAnim }] }}>

                            <Image 

                                source={require('../assets/images/hero.png')} 

                                style={{

                                    width: isMobile ? width * 0.85 : 380, 

                                    height: isMobile ? width * 0.85 * 1.3 : 750, 

                                    resizeMode: 'contain'

                                }}

                            />

                        </Animated.View>

                    </FadeInView>

                </View>

            </View>

        </View>

    );

};



// --- "Doing It Right" Section (Calm.com inspired) ---

const DoingItRightSection = ({ width }: { width: number }) => {

    const isDesktop = width >= 768;



    const principles = [

        {

            icon: require('../assets/images/scale-icon.png'),

            title: 'לא שוקלים אוכל',

            titleUnderline: 'לא',

            description: 'כל השקילות והחישובים נעשו מראש,\nכדי שלכם יהיה קל יותר.'

        },

        {

            icon: require('../assets/images/knowledge-icon.png'),

            title: ' זה לא מידע, זה ידע. ',

            description: 'אפלקציה שנבנתה ע״י דיאטנים קליניים\nובוגרי תואר ראשון בתזונה.'

        },

        {

            icon: require('../assets/images/timeless-icon.png'),

            title: 'זה לא דיאטה',

            description: 'דיאטה זה זמני.\nכאן נהפוך לך את זה לאורח חיים.'

        }

    ];



    return (

        <View style={styles.doingItRightContainer}>

            <FadeInView delay={0}>

                <Text style={styles.doingItRightTitle}>הפעם, עושים את זה נכון.</Text>

            </FadeInView>



            <View style={[

                styles.principlesGrid,

                isDesktop && {

                    flexDirection: 'row',

                    maxWidth: 1400,

                    gap: 60,

                    paddingHorizontal: 60,

                    alignSelf: 'center'

                }

            ]}>

                {principles.map((item, index) => (

                    <React.Fragment key={index}>

                        <FadeInView delay={100 + index * 100}>

                            <View style={[

                                styles.principleCard,

                                isDesktop && {

                                    flex: 1,

                                    maxWidth: 400,

                                    paddingHorizontal: 20

                                }

                            ]}>

                                <View style={styles.principleIconWrapper}>

                                    <Image
                                        source={item.icon}
                                        style={styles.principleIcon}
                                        resizeMode="contain"
                                    />

                                </View>

                                <Text style={styles.principleTitle}>
                                    {item.titleUnderline ? (
                                        <>
                                            <Text style={{ textDecorationLine: 'underline' }}>{item.titleUnderline}</Text>
                                            {item.title.replace(item.titleUnderline, '')}
                                        </>
                                    ) : (
                                        item.title
                                    )}
                                </Text>

                                <Text style={styles.principleDescription}>{item.description}</Text>

                            </View>

                        </FadeInView>



                        {/* Mobile divider - only between items, not after last */}

                        {!isDesktop && index < principles.length - 1 && (

                            <View style={styles.mobileDivider} />

                        )}

                    </React.Fragment>

                ))}

            </View>

        </View>

    );

};



const ValuePropositionSection = ({ width }: { width: number }) => {

    const macros = [

        { title: "מנת חלבון", badge: "כ-200 קלוריות למנה", examples: ["3 חתיכות חזה עוף", "גביע קוטג׳"], icon: require('../assets/images/protein.png') },

        { title: "מנת פחמימה", badge: "כ-120 קלוריות למנה", examples: ["5 כפות אורז אחרי בישול", "תפוח אדמה בינוני"], icon: require('../assets/images/carbs.png') },

        { title: "מנת שומן", badge: "כ-120 קלוריות למנה", examples: ["חצי אבוקדו", "כף שמן זית"], icon: require('../assets/images/fats.png') },

        { title: "מנת ירק", badge: "כ-35 קלוריות למנה", examples: ["מלפפון אחד", "10 עגבניות שרי"], icon: require('../assets/images/veg.png') },

        { title: "מנת פרי", badge: "כ-80 קלוריות למנה", examples: ["כוס אננס חתוך", "תפוח בינוני"], icon: require('../assets/images/fruit.png') },

    ];



    return (

        <View style={styles.cavedSection}>

            <LinearGradient

                colors={['#1c1c1c', '#152b2b', '#1c1c1c']}

                start={{ x: 0, y: 0 }}

                end={{ x: 1, y: 1 }}

                style={styles.cavedGradient}

            >

                {/* "Meet them" intro */}

                <FadeInView delay={0}>

                    <View style={styles.meetThemSection}>

                        <View style={styles.dividerLine} />

                        <Text style={[styles.meetThemText, { color: '#e0e0e0' }]}>תכירו אותם:</Text>

                    </View>

                </FadeInView>



                {/* Macro Cards */}

                <View style={{ gap: 24, paddingHorizontal: 20, marginTop: 30 }}>

                    {macros.map((item, index) => {

                        const isEven = index % 2 === 0;

                        return (

                            <FadeInView key={index} delay={300 + index * 100}>

                                <View style={[

                                    styles.macroCardContainer,

                                    { flexDirection: isEven ? 'row' : 'row-reverse' }

                                ]}>

                                    <View style={styles.macroImageWrapper}>

                                        <Image source={item.icon} style={styles.macroImage} />

                                    </View>

                                    <View style={styles.macroContentBox}>

                                        <Text style={styles.macroTitle}>{item.title}</Text>

                                        <Text style={styles.macroBadge}>{item.badge}</Text>

                                        <View style={styles.divider} />

                                        {item.examples.map((example, i) => (

                                            <View key={i} style={styles.checkItemRow}>

                                                <Feather name="check" size={14} color="#1FA09B" />

                                                <Text style={styles.checkItemText}>{example}</Text>

                                            </View>

                                        ))}

                                    </View>

                                </View>

                            </FadeInView>

                        );

                    })}

                </View>

            </LinearGradient>

        </View>

    );

};



// --- Testimonials Section ---

const TestimonialsSection = ({ width }: { width: number }) => {
    const isDesktop = width >= 768;

    const testimonials = [
        {
            text: 'סוף סוף אפליקציה שמבינה אותי. לא צריך לשקול כל דבר, הכל כבר מחושב.',
            author: 'שירה מתל אביב',
            rating: 5
        },
        {
            text: 'התחלתי להשתמש באפליקציה לפני חודשיים והיא שינתה לי את החיים. עכשיו אני יודעת בדיוק מה אני אוכלת.',
            author: 'דני מירושלים',
            rating: 5
        },
        {
            text: 'המדריכים והמתכונים עוזרים לי לשמור על המסלול. זה לא עוד דיאטה, זה באמת אורח חיים.',
            author: 'מיכל מחיפה',
            rating: 5
        }
    ];

    return (
        <View style={{ paddingVertical: 60, backgroundColor: COLORS.background }}>
            <FadeInView delay={0}>
                <Text style={[styles.sectionHeader, { fontSize: 32, fontWeight: '800', textAlign: 'center', marginBottom: 40 }]}>
                    מה המשתמשים שלנו אומרים?
                </Text>
            </FadeInView>

            <RNScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: isDesktop ? 60 : 20,
                    gap: 24
                }}
                style={{ marginTop: 20 }}
            >
                {testimonials.map((testimonial, index) => (
                    <FadeInView key={index} delay={100 + index * 100}>
                        <LinearGradient
                            colors={['rgba(31, 160, 155, 0.15)', 'rgba(31, 160, 155, 0.05)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.testimonialCard}
                        >
                            {/* Quote Icon */}
                            <Text style={styles.quoteIcon}>"</Text>

                            {/* Testimonial Text */}
                            <Text style={styles.testimonialText}>{testimonial.text}</Text>

                            {/* Bottom Section - Author and Stars */}
                            <View>
                                <Text style={styles.testimonialAuthor}>{testimonial.author}</Text>

                                {/* Star Rating */}
                                <View style={styles.starsContainer}>
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Feather key={i} name="star" size={16} color="#FFD700" style={{ marginLeft: 4 }} />
                                    ))}
                                </View>
                            </View>
                        </LinearGradient>
                    </FadeInView>
                ))}
            </RNScrollView>
        </View>
    );
};



// --- Feature Card (FIXED: Transparent Icons + Top Anchored Images) ---

const FeatureCard = ({ item, index, width }: { item: any, index: number, width: number }) => {

    const isDesktop = width >= 768;

    const isEven = index % 2 === 0;



    return (

        <View style={[

            styles.featureCardWrapper,

            isDesktop && {

                flexDirection: isEven ? 'row' : 'row-reverse',

                padding: 0,

                alignSelf: isEven ? 'flex-start' : 'flex-end',

                marginLeft: isEven ? 0 : 80,  // Push odd cards to the right

                marginRight: isEven ? 80 : 0  // Push even cards to the left

            }

        ]}>



            {/* TEXT SECTION */}

            <View style={[styles.featureTextWrapper, isDesktop ? { width: '45%', padding: 40 } : { width: '100%' }]}>

                {/* ICON: Rendered directly, ABSOLUTELY NO BOX */}

                <Image

                    source={item.icon}

                    style={styles.featureIcon}

                    resizeMode="contain"

                />

                <Text style={styles.featureTitleBig}>{item.title}</Text>

                <Text style={styles.featureDesc}>{item.desc}</Text>

            </View>



            {/* IMAGE SECTION (The Mask) */}

            <View style={[styles.imageMask, isDesktop ? { width: '50%', height: '100%' } : { width: '100%' }]}>

                <Image

                    source={item.image}

                    style={styles.featureImage}

                />

            </View>

        </View>

    );

};



// --- PreOrder Form (Telegram Connected) ---

const PreOrderForm = () => {

    const [name, setName] = useState('');

    const [phone, setPhone] = useState('');

    const [email, setEmail] = useState('');

    const [loading, setLoading] = useState(false);



    // Replace with your GOOGLE SCRIPT URL that sends to Telegram

    const GOOGLE_SCRIPT_URL = "[https://script.google.com/macros/s/AKfycbxuyB9w7ziZYlfaB5geXUe9LhfeeLmnJhuH4odnazEV_SgBiJ7kKGOQWLVxhoQRJzs/exec](https://script.google.com/macros/s/AKfycbxuyB9w7ziZYlfaB5geXUe9LhfeeLmnJhuH4odnazEV_SgBiJ7kKGOQWLVxhoQRJzs/exec)"; 



    const handleSubmit = async () => {

        if (!name || !phone || !email) {

            Alert.alert("חסרים פרטים", "אנא מלא שם, טלפון ואימייל כדי שנוכל לחזור אליך.");

            return;

        }



        setLoading(true);



        try {

            const response = await fetch(GOOGLE_SCRIPT_URL, {

                method: "POST",

                headers: { "Content-Type": "text/plain;charset=utf-8" },

                body: JSON.stringify({ name, phone, email }),

            });



            const result = await response.json();



            if (result.result === "success") {

                Alert.alert("איזה כיף! 🎉", "הפרטים נשמרו בהצלחה. שלחנו לך הפתעה למייל.");

                setName('');

                setPhone('');

                setEmail('');

            } else {

                Alert.alert("אופס", "הייתה בעיה בשמירה, נסה שוב.");

            }

        } catch (error) {

            console.error(error);

            Alert.alert("שגיאה", "לא הצלחנו להתחבר לשרת כרגע.");

        } finally {

            setLoading(false);

        }

    };



    return (

        <View style={styles.preOrderContainer}>

            <LinearGradient

                colors={['#1FA09B', '#15807B']}

                style={styles.preOrderGradient}

            >

                <Text style={styles.preOrderTitle}>הצטרפו למהפכה!</Text>

                <View style={styles.preOrderPromoBox}>

                    <Text style={styles.preOrderSubtitle}>

                        מי שנרשם להזמנה מוקדמת - מקבל חודש ראשון מתנה 🎁

                    </Text>

                    <View style={styles.preOrderTimerWrapper}>

                        <Text style={styles.preOrderTimerLabel}>הצעה מסתיימת בעוד:</Text>

                        <CountdownTimer />

                    </View>

                </View>

                <Text style={styles.preOrderLabel}>השאירו פרטים ונדאג לעדכן אתכם כשהאפליקציה באוויר</Text>



                <View style={styles.formInputs}>

                    <TextInput 

                        style={styles.input} 

                        placeholder="שם מלא" 

                        placeholderTextColor="#888"

                        value={name}

                        onChangeText={setName}

                        textAlign="right"

                        editable={!loading}

                    />

                    <TextInput 

                        style={styles.input} 

                        placeholder="טלפון נייד" 

                        placeholderTextColor="#888"

                        keyboardType="phone-pad"

                        value={phone}

                        onChangeText={setPhone}

                        textAlign="right"

                        editable={!loading}

                    />

                    <TextInput 

                        style={styles.input} 

                        placeholder="אימייל" 

                        placeholderTextColor="#888"

                        keyboardType="email-address"

                        value={email}

                        onChangeText={setEmail}

                        textAlign="right"

                        editable={!loading}

                    />

                    

                    <TouchableOpacity 

                        style={[styles.submitButton, { opacity: loading ? 0.7 : 1 }]} 

                        onPress={handleSubmit}

                        disabled={loading}

                    >

                        <Text style={styles.submitButtonText}>{loading ? "שומר..." : "שריינו לי מקום!"}</Text>

                    </TouchableOpacity>

                </View>

            </LinearGradient>

        </View>

    );

};



const Footer = () => (

    <View style={styles.footer}>

        <Text style={styles.footerText}>© Reel Rep Plus 2025</Text>

        <View style={styles.footerLinks}>

            <Text style={styles.footerLink}>צור קשר</Text>

            <Link href="/privacy" asChild>

                <TouchableOpacity>

                    <Text style={styles.footerLink}>פרטיות</Text>

                </TouchableOpacity>

            </Link>

        </View>

    </View>

);



// --- Main Page Component ---



export default function LandingPage() {

  const { width } = useWindowDimensions();

  const scrollY = useRef(new Animated.Value(0)).current;

  const scrollViewRef = useRef<RNScrollView>(null);

  const [fontsLoaded] = useFonts({ Rubik_400Regular, Rubik_600SemiBold, Rubik_700Bold });



  const scrollToForm = () => {

    if (scrollViewRef.current) {

      scrollViewRef.current.scrollToEnd({ animated: true });

    }

  };



 const features = [
     { 
       title: "ממשק ברור וקל להבנה", 
       desc: "צריכה קלורית יומית, מעקב מים וצעדים במסך אחד נקי.", 
       // התיקון: ../ במקום .. וגם הוספת screenshots
       image: require('../assets/images/screenshots/dashboard.png'),
       icon: require('../assets/images/dashbaord-icon.png')
     },
     { 
       title: "סרקו מוצרים עם ברקוד", 
       desc: "בלי לחפש ובלי להסתבך. סריקה מהירה והמוצר ביומן.", 
       image: require('../assets/images/screenshots/barcode.png'),
       icon: require('../assets/images/barcode-icon.png')
     },
     { 
       title: "ניתוח צלחת עם בינה מלאכותית", 
       desc: "צלמו את האוכל, וה-AI שלנו יפרק אותו למרכיבים וערכים.", 
       image: require('../assets/images/screenshots/ai_scan.png'), 
       icon: require('../assets/images/ai-scan-icon.png')
     },
     { 
       title: "בנק מזון עשיר ועצום", 
       desc: "אלפי מוצרים מהסופר, מסעדות ומאכלים ביתיים.", 
       image: require('../assets/images/screenshots/food_bank.png'),
       icon: require('../assets/images/food-bank-icon.png')
     },
     { 
       title: "מתכונים חדשים כל שבוע", 
       desc: "רעיונות לארוחות בריאות וטעימות שמתאימות ליעדים שלכם.", 
       image: require('../assets/images/screenshots/recipes.png'),
       icon: require('../assets/images/recepies-icon.png')
     },
     { 
       title: "מדריכים לתהליך ללא ספקות", 
       desc: "כל הידע שצריך כדי להצליח, כתוב בצורה פשוטה ופרקטית.", 
       image: require('../assets/images/screenshots/guides.png'),
       icon: require('../assets/images/guides-icon.png')
     },
  ];


  if (!fontsLoaded) return <View />;



  return (

    <SafeAreaView style={styles.container}>

      <Stack.Screen options={{ headerShown: false }} />



      <Navbar onScrollToForm={scrollToForm} />



      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>

          <AnimatedScrollView

            ref={scrollViewRef}

            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}

            scrollEventThrottle={16}

            contentContainerStyle={{ paddingBottom: 0 }}

            showsVerticalScrollIndicator={false}

          >

            <HeroSection width={width} onScrollToForm={scrollToForm} />



            {/* Doing It Right Section */}

            <DoingItRightSection width={width} />



            <ValuePropositionSection width={width} />



            <View style={styles.featuresHeaderSection}>

                 <Text style={[styles.sectionHeader, { fontSize: 32, fontWeight: '800', textAlign: 'center' }]}>מה אתם מקבלים?</Text>

            </View>



            <View style={styles.featuresList}>

                {features.map((item, index) => (

                    <FeatureCard key={index} item={item} index={index} width={width} />

                ))}

            </View>



            <TestimonialsSection width={width} />



            <PreOrderForm />



            <View style={{ backgroundColor: '#111', paddingBottom: 0 }}>

                <Footer />

            </View>

          </AnimatedScrollView>

      </KeyboardAvoidingView>

    </SafeAreaView>

  );

}



// --- Styles (The Fixes) ---



const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: COLORS.background,

  },

  contentWrapper: {

    width: '100%',

    alignSelf: 'center',

  },

  fixedHeader: {

    position: 'absolute',

    top: 0,

    left: 0,

    right: 0,

    flexDirection: 'column',

    justifyContent: 'center',

    alignItems: 'center',

    paddingHorizontal: 20,

    paddingTop: Platform.OS === 'ios' ? 50 : 16,

    paddingBottom: 20,

    backgroundColor: COLORS.background,

    borderBottomLeftRadius: 20,

    borderBottomRightRadius: 20,

    shadowColor: '#000',

    shadowOffset: { width: 0, height: 3 },

    shadowOpacity: 0.1,

    shadowRadius: 8,

    elevation: 5,

    zIndex: 9999,

  },

  navButton: {

    backgroundColor: COLORS.primary,

    paddingVertical: 10,

    paddingHorizontal: 24,

    borderRadius: 50,

    flex: 1,

    maxWidth: 150,

    alignItems: 'center',

  },

  navButtonText: {

    color: '#fff',

    fontFamily: 'Rubik_600SemiBold',

    fontSize: 14,

  },

  navbarLogo: {

    width: 200,

    height: 50,

    marginBottom: 12,

  },

  darkHeroContainer: {

    width: '100%',

    backgroundColor: '#1c1c1c',

    alignItems: 'center',

    justifyContent: 'flex-start',

    paddingTop: Platform.OS === 'ios' ? 170 : 136,

    paddingBottom: 40,

    borderBottomLeftRadius: 40,

    borderBottomRightRadius: 40,

    overflow: 'hidden',

    marginBottom: 20,

  },

  centeredContent: {

    width: '100%',

    alignItems: 'center',

    zIndex: 10,

  },

  heroSubtitle: {

    fontFamily: 'Rubik_400Regular',

    fontSize: 18,

    color: COLORS.textLight,

    marginBottom: 10,

    lineHeight: 28,

    paddingHorizontal: 20,

  },

  ctaButtonLarge: {

    backgroundColor: COLORS.primary,

    paddingVertical: 14,

    paddingHorizontal: 32,

    borderRadius: 50,

    alignSelf: 'center',

  },

  ctaButtonTextLarge: {

    color: '#fff',

    fontFamily: 'Rubik_700Bold',

    fontSize: 18,

  },

  sectionHeader: {

    fontFamily: 'Rubik_700Bold',

    fontSize: 36,

    color: COLORS.textDark,

  },



  // "Doing It Right" Section Styles (Calm.com inspired)

  doingItRightContainer: {

      backgroundColor: '#FAFBFC',

      paddingVertical: 80,

      paddingHorizontal: 20,

      alignItems: 'center',

      zIndex: 2,

      position: 'relative',

      marginBottom: -40,

      paddingBottom: 120,

      borderBottomLeftRadius: 40,

      borderBottomRightRadius: 40,

      shadowColor: '#000',

      shadowOffset: { width: 0, height: 15 },

      shadowOpacity: 0.2,

      shadowRadius: 25,

      elevation: 5,

  },

  doingItRightTitle: {

      fontFamily: 'Rubik_700Bold',

      fontSize: 40,

      color: COLORS.textDark,

      textAlign: 'center',

      marginBottom: 60,

      letterSpacing: -0.5,

  },

  principlesGrid: {

      width: '100%',

      justifyContent: 'center',

      alignItems: 'center',

  },

  principleCard: {

      padding: 20,

      alignItems: 'center',

  },

  mobileDivider: {

      height: 3,

      backgroundColor: 'rgba(31, 160, 155, 0.2)',

      marginVertical: 40,

      marginHorizontal: 40,

      borderRadius: 2,

  },

  principleIconWrapper: {

      alignItems: 'center',

      justifyContent: 'center',

      marginBottom: 24,

  },

  principleIcon: {

      width: 80,

      height: 80,

  },

  principleTitle: {

      fontFamily: 'Rubik_700Bold',

      fontSize: 22,

      color: COLORS.textDark,

      textAlign: 'center',

      marginBottom: 12,

      lineHeight: 30,

  },

  principleDescription: {

      fontFamily: 'Rubik_400Regular',

      fontSize: 16,

      color: COLORS.textLight,

      textAlign: 'center',

      lineHeight: 26,

      maxWidth: 280,

  },

  disclaimerBox: {

      padding: 16,

      marginHorizontal: 20,

      backgroundColor: 'rgba(31, 160, 155, 0.08)',

      borderColor: 'rgba(31, 160, 155, 0.2)',

  },

  disclaimerText: {

      fontFamily: 'Rubik_600SemiBold',

      fontSize: 15,

      color: COLORS.textDark,

      textAlign: 'center',

      lineHeight: 22,

  },



  // Modern Value Proposition Header Styles

  valuePropositionHeader: {

      marginHorizontal: 20,

      marginBottom: 20,

      borderRadius: 28,

      overflow: 'hidden',

      shadowColor: '#1FA09B',

      shadowOffset: { width: 0, height: 8 },

      shadowOpacity: 0.12,

      shadowRadius: 24,

      elevation: 8,

  },

  valuePropositionGradient: {

      padding: 40,

      paddingVertical: 50,

      alignItems: 'center',

  },

  headerBadge: {

      flexDirection: 'row-reverse',

      alignItems: 'center',

      gap: 8,

      backgroundColor: 'rgba(31, 160, 155, 0.15)',

      paddingHorizontal: 20,

      paddingVertical: 10,

      borderRadius: 50,

      marginBottom: 24,

      borderWidth: 1,

      borderColor: 'rgba(31, 160, 155, 0.3)',

  },

  headerBadgeText: {

      fontFamily: 'Rubik_700Bold',

      fontSize: 16,

      color: '#1FA09B',

      letterSpacing: 0.5,

  },

  valuePropositionMainText: {

      fontFamily: 'Rubik_700Bold',

      fontSize: 26,

      color: COLORS.textDark,

      textAlign: 'center',

      lineHeight: 38,

      marginBottom: 16,

  },

  valuePropositionSubText: {

      fontFamily: 'Rubik_600SemiBold',

      fontSize: 18,

      color: COLORS.textLight,

      textAlign: 'center',

      lineHeight: 28,

  },

  cavedSection: {

      marginHorizontal: 0,

      marginTop: 0,

      marginBottom: 0,

      overflow: 'hidden',

      shadowColor: '#000',

      shadowOffset: { width: 0, height: -4 },

      shadowOpacity: 0.3,

      shadowRadius: 15,

      elevation: 1,

      zIndex: 1,

      position: 'relative',

  },

  cavedGradient: {

      paddingTop: 100,

      paddingBottom: 100,

      paddingHorizontal: 0,

      borderRadius: 0,

  },

  featuresHeaderSection: {

      backgroundColor: COLORS.background,

      paddingTop: 50,

      paddingBottom: 20,

      marginTop: -50,

      borderTopLeftRadius: 40,

      borderTopRightRadius: 40,

      overflow: 'hidden',

      zIndex: 2,

      position: 'relative',

  },

  meetThemSection: {

      alignItems: 'center',

      marginTop: 0,

      marginBottom: 10,

  },

  dividerLine: {

      width: 60,

      height: 4,

      backgroundColor: '#1FA09B',

      borderRadius: 10,

      marginBottom: 20,

  },

  meetThemText: {

      fontFamily: 'Rubik_700Bold',

      fontSize: 22,

      color: COLORS.textDark,

      textAlign: 'center',

      letterSpacing: 0.5,

  },



  // Macro Cards

  macroCardContainer: {

      alignItems: 'center',

      justifyContent: 'center',

      marginBottom: 10,

      width: '100%',

  },

  macroImageWrapper: {

      width: '40%',

      alignItems: 'center',

      justifyContent: 'center',

  },

  macroImage: {

      width: 130,

      height: 130,

      resizeMode: 'contain',

  },

  macroContentBox: {

      width: '55%',

      padding: 16,

      backgroundColor: 'rgba(255, 255, 255, 0.15)',

      backdropFilter: 'blur(10px)',

      borderWidth: 1,

      borderColor: 'rgba(255, 255, 255, 0.25)',

      borderRadius: 24,

      shadowColor: '#000',

      shadowOpacity: 0.15,

      shadowRadius: 20,

      shadowOffset: { width: 0, height: 10 },

  },

  macroTitle: {

      fontFamily: 'Rubik_700Bold',

      fontSize: 20,

      color: '#ffffff',

      textAlign: 'right',

      marginBottom: 4,

  },

  macroBadge: {

      fontFamily: 'Rubik_600SemiBold',

      fontSize: 14,

      color: '#1FA09B',

      textAlign: 'right',

      marginBottom: 8,

  },

  divider: {

      height: 1,

      backgroundColor: 'rgba(255, 255, 255, 0.2)',

      width: '100%',

      marginVertical: 8,

  },

  checkItemRow: {

      flexDirection: 'row-reverse',

      alignItems: 'center',

      marginBottom: 6,

      gap: 6,

  },

  checkItemText: {

      fontFamily: 'Rubik_400Regular',

      fontSize: 14,

      color: 'rgba(255, 255, 255, 0.9)',

      textAlign: 'right',

  },

  

  // --- FEATURE CARDS (FIXED STYLES) ---

  featuresList: {

      paddingHorizontal: 20,

      paddingBottom: 40,

      backgroundColor: COLORS.background,

      alignItems: 'center',

  },

  featureCardWrapper: {

    backgroundColor: '#FFFFFF',

    borderRadius: 24,

    marginBottom: 30,

    shadowColor: "#1FA09B",

    shadowOffset: { width: 0, height: 8 },

    shadowOpacity: 0.25,

    shadowRadius: 20,

    elevation: 15,

    overflow: 'visible',

    padding: 0,

    maxWidth: 700,

    width: '100%',

    zIndex: 10,

    position: 'relative',

  },

  featureTextWrapper: {

      alignItems: 'center',

      paddingTop: 40,

      paddingHorizontal: 24,

      paddingBottom: 20,

      zIndex: 2,

  },

  // ICON: Rounded with glow effect, no background box

  featureIcon: {

      width: 90,

      height: 90,

      marginBottom: 20,

      backgroundColor: 'transparent',

      borderRadius: 24,

      shadowColor: "#1FA09B",

      shadowOffset: { width: 0, height: 0 },

      shadowOpacity: 0.8,

      shadowRadius: 30,

  },

  // IMAGE MASK: Top Anchor - Shows top 75% of iPhone mockup, crops bottom 25%

  imageMask: {

      width: '100%',

      aspectRatio: 0.55,   // Narrow, tall window (actual phone proportions)

      overflow: 'hidden',

      position: 'relative',

  },

  featureImage: {

      width: '100%',

      height: '110%',      // Slightly extends to crop bottom 25% only

      position: 'absolute',

      top: 0,              // Anchored Top - shows full top, hides bottom

      left: 0,

      resizeMode: 'contain',  // Changed to 'contain' to show full phone

  },

  featureTitleBig: {

    fontFamily: 'Rubik_700Bold',

    fontSize: 26,

    marginBottom: 8,

    color: COLORS.textDark,

    textAlign: 'center',

  },

  featureDesc: {

    fontFamily: 'Rubik_400Regular',

    fontSize: 16,

    lineHeight: 24,

    color: COLORS.textLight,

    textAlign: 'center',

  },



  // --- Pre Order Form ---

  preOrderContainer: {

      marginHorizontal: 20,

      marginBottom: 40,

      borderRadius: 30,

      overflow: 'hidden',

      elevation: 5,

      shadowColor: COLORS.primary,

      shadowOffset: { width: 0, height: 10 },

      shadowOpacity: 0.2,

      shadowRadius: 20,

  },

  preOrderGradient: {

      padding: 30,

      alignItems: 'center',

  },

  preOrderTitle: {

      fontFamily: 'Rubik_700Bold',

      fontSize: 28,

      color: '#fff',

      marginBottom: 8,

      textAlign: 'center',

  },

  preOrderSubtitle: {

      fontFamily: 'Rubik_600SemiBold',

      fontSize: 16,

      color: '#fff',

      marginBottom: 20,

      textAlign: 'center',

      backgroundColor: 'rgba(0,0,0,0.1)',

      paddingHorizontal: 15,

      paddingVertical: 5,

      borderRadius: 20,

  },

  preOrderLabel: {

      fontFamily: 'Rubik_400Regular',

      fontSize: 14,

      color: 'rgba(255,255,255,0.9)',

      marginBottom: 20,

      textAlign: 'center',

  },

  formInputs: {

      width: '100%',

      gap: 12,

  },

  input: {

      backgroundColor: '#fff',

      borderRadius: 12,

      paddingVertical: 14,

      paddingHorizontal: 20,

      fontSize: 16,

      fontFamily: 'Rubik_400Regular',

      color: COLORS.textDark,

      width: '100%',

  },

  submitButton: {

      backgroundColor: '#111',

      paddingVertical: 16,

      borderRadius: 12,

      alignItems: 'center',

      marginTop: 10,

  },

  submitButtonText: {

      color: '#fff',

      fontFamily: 'Rubik_700Bold',

      fontSize: 18,

  },



  // --- Footer ---

  footer: {

    padding: 20,

    backgroundColor: '#111',

    flexDirection: 'row-reverse',

    justifyContent: 'space-between',

    alignItems: 'center',

    width: '100%',

  },

  footerLinks: {

    flexDirection: 'row-reverse',

    gap: 20,

  },

  footerText: {

    color: '#666',

    fontFamily: 'Rubik_400Regular',

    fontSize: 12,

  },

  footerLink: {

    color: '#fff',

    fontFamily: 'Rubik_600SemiBold',

    fontSize: 14,

  },

  // --- Testimonials ---

  testimonialCard: {

    width: 380,

    height: 320,

    padding: 40,

    borderRadius: 24,

    justifyContent: 'space-between',

  },

  quoteIcon: {

    fontSize: 80,

    color: 'rgba(31, 160, 155, 0.2)',

    fontFamily: 'Rubik_700Bold',

    lineHeight: 80,

    marginBottom: -20,

  },

  testimonialText: {

    fontSize: 18,

    color: COLORS.textDark,

    fontFamily: 'Rubik_400Regular',

    lineHeight: 28,

    flex: 1,

    textAlign: 'right',

  },

  testimonialAuthor: {

    fontSize: 16,

    color: COLORS.textDark,

    fontFamily: 'Rubik_600SemiBold',

    marginBottom: 12,

    textAlign: 'right',

  },

  starsContainer: {

    flexDirection: 'row-reverse',

    alignItems: 'center',

  },



  // --- Navbar Promo & Timer ---

  navbarPromoText: {

    fontFamily: 'Rubik_600SemiBold',

    fontSize: 12,

    color: COLORS.textDark,

    marginBottom: 10,

    textAlign: 'center',

  },

  navbarButtonRow: {

    flexDirection: 'row-reverse',

    alignItems: 'center',

    justifyContent: 'center',

    gap: 12,

    width: '100%',

  },

  navbarTimerBox: {

    flex: 1,

    maxWidth: 150,

  },

  timerCompact: {

    backgroundColor: 'rgba(31, 160, 155, 0.1)',

    paddingVertical: 10,

    borderRadius: 50,

    borderWidth: 1,

    borderColor: COLORS.primary,

    alignItems: 'center',

    justifyContent: 'center',

  },

  timerTextCompact: {

    fontFamily: 'Rubik_700Bold',

    fontSize: 16,

    color: COLORS.primary,

    letterSpacing: 1,

  },

  timerContainer: {

    backgroundColor: 'rgba(0, 0, 0, 0.15)',

    paddingHorizontal: 20,

    paddingVertical: 8,

    borderRadius: 16,

    borderWidth: 2,

    borderColor: 'rgba(255, 255, 255, 0.3)',

    marginTop: 8,

  },

  timerText: {

    fontFamily: 'Rubik_700Bold',

    fontSize: 22,

    color: '#fff',

    letterSpacing: 2,

    textAlign: 'center',

  },



  // --- PreOrder Form Timer ---

  preOrderPromoBox: {

    alignItems: 'center',

    marginBottom: 16,

  },

  preOrderTimerWrapper: {

    alignItems: 'center',

    marginTop: 12,

  },

  preOrderTimerLabel: {

    fontFamily: 'Rubik_600SemiBold',

    fontSize: 14,

    color: 'rgba(255, 255, 255, 0.9)',

    marginBottom: 6,

    textAlign: 'center',

  },

});
import { Rubik_400Regular, Rubik_600SemiBold, Rubik_700Bold, useFonts } from '@expo-google-fonts/rubik';

import { Feather } from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';

import React, { useEffect, useRef, useState } from 'react';

import {
    Alert,
    Animated,

    Image,
    KeyboardAvoidingView,
    Linking,
    Modal,
    Platform,
    ScrollView as RNScrollView,

    StyleSheet,

    Text,

    TextInput,

    TouchableOpacity,

    useWindowDimensions,

    View
} from 'react-native';

import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Link, Stack } from 'expo-router';



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



// Spots Counter Component (Replaces Fake Countdown)

const SpotsCounter = ({ spotsLeft, totalSpots = 100 }: { spotsLeft: number, totalSpots?: number }) => {

    const spotsFilled = totalSpots - spotsLeft;

    const progress = spotsFilled / totalSpots;



    return (

        <View style={styles.spotsCounterContainer}>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>

                <Feather name="target" size={18} color="#fff" />

                <Text style={styles.spotsCounterText}>

                    נותרו {spotsLeft} מקומות בגל הראשון

                </Text>

            </View>

            <View style={styles.progressBarContainer}>

                <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />

            </View>

            <Text style={styles.spotsSubtext}>

                {spotsFilled} מתוך {totalSpots} הצטרפו כבר

            </Text>

        </View>

    );

};



const Navbar = ({ onScrollToForm, spotsLeft }: { onScrollToForm: () => void, spotsLeft: number }) => (

    <View style={styles.fixedHeader}>
        <LinearGradient
            colors={['#1c1c1c', '#2a2a2a', '#1c1c1c']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.navbarGradient}
        >
            <Image

                source={require('../assets/images/logo-reelrepplus-white.png')}

                style={styles.navbarLogo}

                resizeMode="contain"

            />

            {/* Tagline */}

            <Text style={styles.navbarTagline}>

                אפליקציית מעקב התזונה האחרונה שלך

            </Text>
        </LinearGradient>

    </View>

);



const HeroSection = ({ width, onScrollToForm }: { width: number, onScrollToForm: () => void }) => {

    const isMobile = width < 768;

    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    const fadeAnim = useRef(new Animated.Value(0)).current;



    useEffect(() => {

        // Entrance animation for image (no floating)

        Animated.parallel([

            Animated.timing(scaleAnim, {

                toValue: 1,

                duration: 1000,

                useNativeDriver: true

            }),

            Animated.timing(fadeAnim, {

                toValue: 1,

                duration: 800,

                useNativeDriver: true

            }),

        ]).start();

    }, [scaleAnim, fadeAnim]);



    return (

        <View style={styles.darkHeroContainer}>

            <View style={[StyleSheet.absoluteFill, { backgroundColor: '#1FA09B' }]} />



            <View style={[styles.heroContentCentered, !isMobile && {
                alignItems: 'flex-start',
                paddingLeft: 80,
                maxWidth: 700,
                paddingTop: 80,
                paddingBottom: 80
            }]}>

                {isMobile ? (
                    <>
                        {/* MOBILE: Button First */}
                        <FadeInView delay={300}>
                            <TouchableOpacity
                                style={[styles.ctaButtonLarge, {
                                    marginBottom: 20,
                                    backgroundColor: '#FFFFFF',
                                    borderColor: '#fff',
                                    borderWidth: 0,
                                    paddingVertical: 18,
                                    paddingHorizontal: 40,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.15,
                                    shadowRadius: 12,
                                    elevation: 8
                                }]}
                                onPress={onScrollToForm}
                            >
                                <Text style={[styles.ctaButtonTextLarge, { color: '#1FA09B', fontSize: 18 }]}>שריינו לי מקום בגל הראשון</Text>
                            </TouchableOpacity>
                        </FadeInView>

                        {/* Title Text */}
                        <FadeInView delay={600}>
                            <Text style={[styles.heroMainTitle, { fontSize: 38, lineHeight: 46 }]}>
                                זה לא עוד ״דיאטה״
                            </Text>
                        </FadeInView>

                        {/* Subtitle Text */}
                        <FadeInView delay={900}>
                            <Text style={[styles.heroTagline, { fontSize: 30, lineHeight: 28, marginTop: 12 }]}>
                                כי השליטה היא <Text style={{ color: '#000000' }}>בידיים שלך</Text>.
                            </Text>
                        </FadeInView>
                    </>
                ) : (
                    <>
                        {/* DESKTOP: Text First, Button Below */}
                        {/* Title Text */}
                        <FadeInView delay={300}>
                            <Text style={[styles.heroMainTitle, { fontSize: 60, lineHeight: 70, letterSpacing: -1.5 }]}>
                                זו לא עוד ״דיאטה״
                            </Text>
                        </FadeInView>

                        {/* Subtitle Text */}
                        <FadeInView delay={600}>
                            <Text style={[styles.heroTagline, { fontSize: 32, lineHeight: 42, marginTop: 16 }]}>
                                כי השליטה היא <Text style={{ color: '#000000' }}>בידיים שלך</Text>.
                            </Text>
                        </FadeInView>

                        {/* Button Below Text */}
                        <FadeInView delay={900}>
                            <TouchableOpacity
                                style={[styles.ctaButtonLarge, {
                                    marginTop: 50,
                                    backgroundColor: '#FFFFFF',
                                    borderColor: '#fff',
                                    borderWidth: 0,
                                    paddingVertical: 20,
                                    paddingHorizontal: 50
                                }]}
                                onPress={onScrollToForm}
                            >
                                <Text style={[styles.ctaButtonTextLarge, { color: '#1FA09B', fontSize: 20 }]}>שריינו לי מקום בגל הראשון</Text>
                            </TouchableOpacity>
                        </FadeInView>
                    </>
                )}

            </View>



            {/* Hand Image - From Bottom Right */}

            <Animated.View style={{

                transform: [{ scale: scaleAnim }],

                opacity: fadeAnim,

                position: 'absolute',

                bottom: isMobile ? -50 : -100,

                right: isMobile ? -30 : -50,

                zIndex: 5

            }}>

                <Image

                    source={require('../assets/images/icon-hand.png')}

                    style={{

                        width: isMobile ? 350 : 600,

                        height: isMobile ? 350 : 600,

                        resizeMode: 'contain'

                    }}

                />

            </Animated.View>

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

                                <View style={{ minHeight: 60, overflow: 'visible', width: '100%' }}>
                                    {item.description.split('\n').map((line, i) => (
                                        <Text key={i} style={styles.principleDescription}>{line}</Text>
                                    ))}
                                </View>

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

// --- Pricing Section ---
const PricingSection = () => {
    return (
        <View style={styles.pricingSection}>
            <View style={styles.pricingCard}>
                <View style={styles.freeTrialBadge}>
                    <Text style={styles.freeTrialText}>חודש ראשון חינם</Text>
                </View>

                <View style={styles.pricingContent}>
                    <View style={styles.pricingLeft}>
                        <Text style={styles.pricingLabel}>מנוי שנתי</Text>
                        <Text style={styles.pricingYearly}>180₪/שנה</Text>
                    </View>
                    <View style={styles.pricingRight}>
                        <Text style={styles.pricingMonthly}>15₪/חודש</Text>
                    </View>
                </View>
            </View>

            <Text style={styles.pricingDisclaimer}>
                לאחר החודש החינם, המנוי השנתי עולה 180₪ ומתחדש אוטומטית כל שנה עד לביטול.
            </Text>
        </View>
    );
};

const TestimonialsSection = ({ width }: { width: number }) => {
    const isDesktop = width >= 768;

    const testimonials = [
        {
            text: 'ירדתי 3.5 ק״ג בשבועיים הראשונים בלי לשקול אוכל אפילו פעם אחת. המערכת של המנות פשוט עובדת!',
            name: 'הילה מ.',
            role: 'בוחנת בטא',
            rating: 5
        },
        {
            text: 'כדיאטנית, הייתי סקפטית. אבל הדיוק של המנות מרשים, והלקוחות שלי סוף סוף עומדים בתוכנית.',
            name: 'אורית ל.',
            role: 'דיאטנית קלינית',
            rating: 5
        },
        {
            text: 'ה-AI שמזהה אוכל מתמונה חוסך לי 10 דקות בכל ארוחה. גם עם 3 ילדים אני מצליחה לעקוב.',
            name: 'מיכל ש.',
            role: 'אמא ל-3',
            rating: 5
        }
    ];

    return (
        <View style={{ paddingVertical: 60, backgroundColor: COLORS.background }}>
            <FadeInView delay={0}>
                <Text style={[styles.sectionHeader, { fontSize: 32, fontWeight: '800', textAlign: 'center', marginBottom: 40 }]}>
                    מה הבוחנים שלנו אומרים?
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
                                <Text style={styles.testimonialAuthor}>{testimonial.name}</Text>
                                <Text style={styles.testimonialRole}>{testimonial.role}</Text>

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

            <View style={[
                styles.featureTextWrapper,
                isDesktop ? { width: '45%', padding: 40 } : { width: '100%' },
                // For non-food_bank cards: add spacing under subtitle
                item.title !== "בנק מזון עשיר ועצום" && { paddingBottom: 20 }
            ]}>

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

            <View style={[
                styles.imageMask,
                isDesktop ? { width: '50%', height: '100%' } : { width: '80%', alignSelf: 'center' },
                // For non-food_bank cards: set height to show full image without cropping
                item.title !== "בנק מזון עשיר ועצום" && !isDesktop && { height: 400, aspectRatio: undefined, marginBottom: -1 }
            ]}>

                <Image

                    source={item.image}

                    style={[
                        styles.featureImage,
                        // For non-food_bank cards: fill container height from bottom
                        item.title !== "בנק מזון עשיר ועצום" && {
                            bottom: 0,
                            top: 'auto',
                            height: '100%'
                        }
                    ]}

                />

            </View>

        </View>

    );

};



// --- PreOrder Form (Early Access Waitlist) ---

const PreOrderForm = ({ spotsLeft }: { spotsLeft: number }) => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ name: false, phone: false, email: false });
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Your Google Apps Script Web App URL
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxuyB9w7ziZYlfaB5geXUe9LhfeeLmnJhuH4odnazEV_SgBiJ7kKGOQWLVxhoQRJzs/exec";

    const handleSubmit = async () => {
        // Reset errors
        setErrors({ name: false, phone: false, email: false });

        let hasError = false;
        const newErrors = { name: false, phone: false, email: false };

        if (!name) {
            newErrors.name = true;
            hasError = true;
        }
        if (!phone) {
            newErrors.phone = true;
            hasError = true;
        }
        if (!email) {
            newErrors.email = true;
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            Alert.alert("חסרים פרטים", "אנא מלא את כל השדות המסומנים באדום כדי שנוכל לחזור אליך.");
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
                setShowSuccessModal(true);
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
        <View style={styles.preOrderWrapper}>
            {/* Form Card */}
            <View style={styles.formCard}>
                <Text style={styles.preOrderTitle}>הצטרפו לגל הראשון!</Text>
                <Text style={styles.preOrderLabel}>השאירו פרטים ונשלח לכם קישור להורדה בינואר 2025</Text>

                <View style={styles.formInputs}>
                    <TextInput
                        style={[styles.input, errors.name && styles.inputError]}
                        placeholder="שם מלא"
                        placeholderTextColor="#888"
                        value={name}
                        onChangeText={(text) => {
                            setName(text);
                            if (errors.name) setErrors({ ...errors, name: false });
                        }}
                        textAlign="right"
                        editable={!loading}
                    />
                    <TextInput
                        style={[styles.input, errors.phone && styles.inputError]}
                        placeholder="טלפון נייד"
                        placeholderTextColor="#888"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={(text) => {
                            setPhone(text);
                            if (errors.phone) setErrors({ ...errors, phone: false });
                        }}
                        textAlign="right"
                        editable={!loading}
                    />
                    <TextInput
                        style={[styles.input, errors.email && styles.inputError]}
                        placeholder="אימייל"
                        placeholderTextColor="#888"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            if (errors.email) setErrors({ ...errors, email: false });
                        }}
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
            </View>

            {/* Success Modal */}
            <Modal
                visible={showSuccessModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowSuccessModal(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowSuccessModal(false)}
                >
                    <View style={styles.contactPopup}>
                        <Feather name="check-circle" size={48} color="#1FA09B" style={{ marginBottom: 16 }} />
                        <Text style={styles.contactPopupTitle}>ברוכים הבאים! 🎉</Text>
                        <Text style={[styles.emailText, { textAlign: 'center', marginBottom: 24, paddingHorizontal: 10, lineHeight: 24 }]}>
                            שמרנו לכם מקום בגל הראשון!{'\n'}בדקו את המייל לפרטים נוספים.
                        </Text>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setShowSuccessModal(false)}
                        >
                            <Text style={styles.closeButtonText}>איזה כיף!</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};




const Footer = () => {
    const [showContactPopup, setShowContactPopup] = useState(false);

    const handleEmailPress = () => {
        Linking.openURL('mailto:ivan@reelrep.com');
    };

    return (
        <>
            <View style={styles.footer}>
                <Text style={styles.footerText}>© Reel Rep Plus 2025</Text>

                <View style={styles.footerLinks}>
                    <TouchableOpacity onPress={() => setShowContactPopup(true)}>
                        <Text style={styles.footerLink}>צור קשר</Text>
                    </TouchableOpacity>

                    <Link href="/privacy" asChild>
                        <TouchableOpacity>
                            <Text style={styles.footerLink}>פרטיות</Text>
                        </TouchableOpacity>
                    </Link>

                    <Link href="/termsofuse" asChild>
                        <TouchableOpacity>
                            <Text style={styles.footerLink}>תנאי שימוש</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>

            {/* Contact Popup Modal */}
            <Modal
                visible={showContactPopup}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowContactPopup(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowContactPopup(false)}
                >
                    <View style={styles.contactPopup}>
                        <Text style={styles.contactPopupTitle}>צור קשר</Text>

                        <TouchableOpacity
                            style={styles.emailContainer}
                            onPress={handleEmailPress}
                        >
                            <Feather name="mail" size={24} color="#1FA09B" />
                            <Text style={styles.emailText}>ivan@reelrep.com</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.emailContainer}
                            onPress={() => Linking.openURL('https://www.instagram.com/reelrep.plus?igsh=bzl6NmNrOW1hc3B4&utm_source=qr')}
                        >
                            <Feather name="instagram" size={24} color="#1FA09B" />
                            <Text style={styles.emailText}>@reelrep.plus</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setShowContactPopup(false)}
                        >
                            <Text style={styles.closeButtonText}>סגור</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
};



// --- Main Page Component ---



export default function LandingPage() {

    const { width } = useWindowDimensions();

    const scrollY = useRef(new Animated.Value(0)).current;

    const scrollViewRef = useRef<RNScrollView>(null);

    const [fontsLoaded] = useFonts({ Rubik_400Regular, Rubik_600SemiBold, Rubik_700Bold });

    const insets = useSafeAreaInsets();



    // Spots available for early access (update manually as people sign up)

    const [spotsLeft] = useState(18); // 82 already filled out of 100



    const scrollToForm = () => {

        if (scrollViewRef.current) {

            // Smooth scroll to bottom with slower animation (2000ms duration)

            // This allows users to see the content as they scroll

            scrollViewRef.current.scrollTo({

                y: 10000, // Large value to ensure we reach the bottom

                animated: true

            });

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

        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>

            <Stack.Screen options={{ headerShown: false }} />



            <Navbar onScrollToForm={scrollToForm} spotsLeft={spotsLeft} />



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



                    {/* Custom Divider */}

                    <View style={styles.customDivider}>

                        <View style={styles.dividerLine} />

                    </View>



                    <TestimonialsSection width={width} />

                    {/* Custom Divider */}

                    <View style={styles.customDivider}>

                        <View style={styles.dividerLine} />

                    </View>


                    {/* Pricing Section Title */}
                    <View style={styles.pricingSectionTitleContainer}>
                        <Text style={styles.pricingSectionTitle}>
                            תתחילו את המסע שלכם עם
                        </Text>
                        <Text style={styles.pricingSectionTitleBold}>
                            Reel Rep Plus
                        </Text>
                    </View>

                    {/* Pricing Card - Full Width */}
                    <View style={styles.pricingFullWidth}>
                        <PricingSection />
                    </View>

                    {/* Promo Offer Card - Full Width */}
                    <View style={styles.promoOfferWrapper}>
                        <LinearGradient
                            colors={['#1FA09B', '#15807B']}
                            style={styles.promoOfferCard}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                                <Feather name="award" size={18} color="#fff" />
                                <Text style={styles.preOrderHighlightText}>
                                    הצעה מיוחדת ל-100 הראשונים
                                </Text>
                            </View>
                            <Text style={styles.preOrderHighlightTextBold}>
                                <Text style={styles.freeTextHighlight}>חודש ראשון חינם</Text>
                            </Text>
                            <Text style={styles.preOrderSubtext}>
                                הצטרפו עכשיו וקבלו חודש ראשון ללא עלות
                            </Text>
                            <View style={styles.promoTimerWrapper}>
                                <SpotsCounter spotsLeft={spotsLeft} />
                            </View>
                        </LinearGradient>
                    </View>

                    {/* Sign Up Form */}
                    <View style={styles.signUpFormWrapper}>
                        <PreOrderForm spotsLeft={spotsLeft} />
                    </View>



                    <View style={{ backgroundColor: '#111', paddingBottom: insets.bottom }}>

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

        zIndex: 9999,

        overflow: 'hidden',

        borderBottomLeftRadius: 40,

        borderBottomRightRadius: 40,

        shadowColor: '#000',

        shadowOffset: { width: 0, height: 3 },

        shadowOpacity: 0.3,

        shadowRadius: 8,

        elevation: 5,

    },

    navbarGradient: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 45 : 20,
        paddingBottom: 16,
    },

    navButton: {

        backgroundColor: COLORS.primary,

        paddingVertical: 10,

        paddingHorizontal: 28,

        borderRadius: 50,

        alignItems: 'center',

        shadowColor: COLORS.primary,

        shadowOffset: { width: 0, height: 2 },

        shadowOpacity: 0.25,

        shadowRadius: 6,

        elevation: 3,

    },

    navButtonText: {

        color: '#fff',

        fontFamily: 'Rubik_400Regular',

        fontSize: 14,

    },

    navbarLogo: {

        width: 300,

        height: 80,

        marginTop: 0,

        marginBottom: 0,

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

        marginBottom: 10,

        position: 'relative',

        minHeight: 600,

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


    // --- Navbar Tagline ---

    navbarTagline: {

        fontFamily: 'Rubik_600SemiBold',

        fontSize: 16,

        color: '#FFFFFF',

        textAlign: 'center',

        marginTop: -4,

    },



    // --- Hero Layout ---

    heroContentCentered: {

        width: '100%',

        alignItems: 'center',

        paddingHorizontal: 20,

        paddingTop: 10,

        paddingBottom: 20,

        zIndex: 10,

    },



    heroMainTitle: {

        fontFamily: 'Rubik_700Bold',

        fontSize: 42,

        color: '#ffffff',

        textAlign: 'center',

        letterSpacing: -1,

        lineHeight: 52,

    },



    heroTagline: {

        fontFamily: 'Rubik_600SemiBold',

        fontSize: 22,

        color: 'rgba(255, 255, 255, 0.95)',

        textAlign: 'center',

        lineHeight: 32,

        marginTop: 12,

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

        fontFamily: 'Rubik_400Regular',

        fontSize: 18,

    },

    sectionHeader: {

        fontFamily: 'Rubik_400Regular',

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

        overflow: 'visible',

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

        fontFamily: 'Rubik_400Regular',

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

        fontFamily: 'Rubik_400Regular',

        fontSize: 16,

        color: '#1FA09B',

        letterSpacing: 0.5,

    },

    valuePropositionMainText: {

        fontFamily: 'Rubik_400Regular',

        fontSize: 26,

        color: COLORS.textDark,

        textAlign: 'center',

        lineHeight: 38,

        marginBottom: 16,

    },

    valuePropositionSubText: {

        fontFamily: 'Rubik_400Regular',

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

        fontFamily: 'Rubik_400Regular',

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

        fontFamily: 'Rubik_400Regular',

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

        paddingBottom: 10,

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

    customDivider: {

        alignItems: 'center',

        paddingTop: 50,

        paddingBottom: 20,

        backgroundColor: COLORS.background,

    },



    // --- Pre Order Form ---

    preOrderWrapper: {

        marginHorizontal: 20,

        marginBottom: 40,

        gap: 20,

    },

    promoCard: {

        borderRadius: 24,

        padding: 30,

        alignItems: 'center',

        shadowColor: COLORS.primary,

        shadowOffset: { width: 0, height: 8 },

        shadowOpacity: 0.3,

        shadowRadius: 20,

        elevation: 8,

    },

    formCard: {

        backgroundColor: '#fff',

        borderRadius: 24,

        padding: 30,

        alignItems: 'center',

        shadowColor: '#000',

        shadowOffset: { width: 0, height: 8 },

        shadowOpacity: 0.15,

        shadowRadius: 20,

        elevation: 5,

    },

    preOrderTitle: {

        fontFamily: 'Rubik_700Bold',

        fontSize: 28,

        color: COLORS.textDark,

        marginBottom: 8,

        textAlign: 'center',

    },

    preOrderHighlightText: {

        fontFamily: 'Rubik_400Regular',

        fontSize: 16,

        color: '#fff',

        textAlign: 'center',

        marginBottom: 8,

        lineHeight: 24,

    },

    preOrderHighlightTextBold: {

        fontFamily: 'Rubik_400Regular',

        fontSize: 22,

        color: '#fff',

        textAlign: 'center',

        marginBottom: 16,

        lineHeight: 30,

    },

    freeTextHighlight: {

        fontFamily: 'Rubik_400Regular',

        fontSize: 28,

        color: '#000',

    },

    promoTimerWrapper: {

        alignItems: 'center',

        marginTop: 16,

    },

    preOrderLabel: {

        fontFamily: 'Rubik_400Regular',

        fontSize: 14,

        color: COLORS.textLight,

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

    inputError: {
        borderWidth: 1,
        borderColor: '#FF4D4D',
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

        fontFamily: 'Rubik_400Regular',

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

        fontFamily: 'Rubik_400Regular',

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

        fontFamily: 'Rubik_400Regular',

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

    // --- Pricing Section ---

    pricingSection: {

        paddingVertical: 0,

        paddingHorizontal: 0,

        backgroundColor: COLORS.background,

        alignItems: 'center',

        width: '100%',

    },

    pricingFormRow: {
        flexDirection: 'row',
        backgroundColor: COLORS.background,
        paddingHorizontal: 40,
        alignItems: 'stretch',
        gap: 40,
        maxWidth: 1200,
        width: '100%',
        alignSelf: 'center',
    },

    pricingFormColumn: {
        flexDirection: 'column',
        backgroundColor: COLORS.background,
    },

    pricingSectionTitleContainer: {
        backgroundColor: COLORS.background,
        paddingTop: 60,
        paddingBottom: 30,
        alignItems: 'center',
    },

    pricingFormCard: {
        flex: 1,
        minHeight: 400,
    },

    pricingFullWidth: {
        backgroundColor: COLORS.background,
        paddingHorizontal: 20,
        paddingBottom: 20,
        alignItems: 'center',
        width: '100%',
    },

    promoOfferWrapper: {
        backgroundColor: COLORS.background,
        paddingHorizontal: 20,
        paddingBottom: 20,
        alignItems: 'center',
    },

    promoOfferCard: {
        borderRadius: 24,
        padding: 30,
        alignItems: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 8,
        width: '100%',
        maxWidth: 600,
    },

    signUpFormWrapper: {
        backgroundColor: COLORS.background,
        paddingHorizontal: 20,
        paddingBottom: 40,
        alignItems: 'center',
    },

    pricingSectionTitle: {

        fontFamily: 'Rubik_700Bold',

        fontSize: 24,

        color: COLORS.textDark,

        textAlign: 'center',

        marginBottom: 8,

    },

    pricingSectionTitleBold: {

        fontFamily: 'Rubik_400Regular',

        fontSize: 28,

        color: COLORS.primary,

        textAlign: 'center',

        marginBottom: 32,

    },

    pricingCard: {

        backgroundColor: '#fff',

        borderRadius: 20,

        borderWidth: 2,

        borderColor: COLORS.primary,

        padding: 20,

        width: '100%',

        maxWidth: 600,

        shadowColor: COLORS.primary,

        shadowOffset: { width: 0, height: 8 },

        shadowOpacity: 0.15,

        shadowRadius: 20,

        elevation: 8,

        position: 'relative',

        overflow: 'visible',

    },

    freeTrialBadge: {

        position: 'absolute',

        top: -12,

        right: 20,

        backgroundColor: COLORS.primary,

        paddingHorizontal: 16,

        paddingVertical: 6,

        borderRadius: 20,

        shadowColor: COLORS.primary,

        shadowOffset: { width: 0, height: 4 },

        shadowOpacity: 0.3,

        shadowRadius: 8,

        elevation: 5,

    },

    freeTrialText: {

        fontFamily: 'Rubik_400Regular',

        fontSize: 14,

        color: '#fff',

    },

    pricingContent: {

        flexDirection: 'row-reverse',

        justifyContent: 'space-between',

        alignItems: 'center',

        marginTop: 12,

    },

    pricingContentMobile: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
    },

    pricingLeft: {

        alignItems: 'flex-end',

    },

    pricingLabel: {

        fontFamily: 'Rubik_400Regular',

        fontSize: 14,

        color: COLORS.textDark,

        marginBottom: 4,

    },

    pricingYearly: {

        fontFamily: 'Rubik_400Regular',

        fontSize: 18,

        color: COLORS.textDark,

    },

    pricingRight: {

        alignItems: 'flex-start',

    },

    pricingMonthly: {

        fontFamily: 'Rubik_400Regular',

        fontSize: 18,

        color: COLORS.primary,

    },

    pricingDisclaimer: {

        fontFamily: 'Rubik_400Regular',

        fontSize: 13,

        color: COLORS.textLight,

        textAlign: 'center',

        marginTop: 20,

        maxWidth: 500,

        lineHeight: 20,

    },



    // --- Navbar Promo & Timer ---

    navbarPromoText: {

        fontFamily: 'Rubik_400Regular',

        fontSize: 11,

        color: COLORS.textLight,

        marginBottom: 12,

        textAlign: 'center',

        opacity: 0.85,

    },

    navbarButtonRow: {

        flexDirection: 'row-reverse',

        alignItems: 'center',

        justifyContent: 'center',

        gap: 10,

        width: '100%',

        maxWidth: 360,

    },

    navbarTimerBox: {

        flex: 1,

        maxWidth: 150,

    },

    timerCompact: {

        backgroundColor: 'rgba(31, 160, 155, 0.08)',

        paddingVertical: 12,

        paddingHorizontal: 4,

        borderRadius: 50,

        borderWidth: 1.5,

        borderColor: 'rgba(31, 160, 155, 0.3)',

        alignItems: 'center',

        justifyContent: 'center',

    },

    timerTextCompact: {

        fontFamily: 'Rubik_400Regular',

        fontSize: 15,

        color: COLORS.primary,

        letterSpacing: 0.5,

    },

    timerContainer: {

        backgroundColor: 'rgba(0, 0, 0, 0.15)',

        paddingHorizontal: 24,

        paddingVertical: 12,

        borderRadius: 20,

        borderWidth: 2,

        borderColor: 'rgba(255, 255, 255, 0.3)',

        marginTop: 8,

    },

    timerText: {

        fontFamily: 'Rubik_400Regular',

        fontSize: 32,

        color: '#fff',

        letterSpacing: 3,

        textAlign: 'center',

    },



    // --- PreOrder Form Timer ---

    preOrderTimerLabel: {

        fontFamily: 'Rubik_400Regular',

        fontSize: 14,

        color: '#fff',

        marginBottom: 8,

        textAlign: 'center',

    },



    // --- Spots Counter ---

    spotsCounterContainer: {

        alignItems: 'center',

        marginTop: 12,

        width: '100%',

    },

    spotsCounterText: {

        fontFamily: 'Rubik_400Regular',

        fontSize: 16,

        color: '#fff',

        textAlign: 'center',

        marginBottom: 12,

    },

    progressBarContainer: {

        width: '100%',

        height: 8,

        backgroundColor: 'rgba(255, 255, 255, 0.2)',

        borderRadius: 10,

        overflow: 'hidden',

        marginBottom: 8,

    },

    progressBarFill: {

        height: '100%',

        backgroundColor: '#fff',

        borderRadius: 10,

    },

    spotsSubtext: {

        fontFamily: 'Rubik_400Regular',

        fontSize: 12,

        color: 'rgba(255, 255, 255, 0.8)',

        textAlign: 'center',

    },



    // --- Beta Badge ---

    betaBadge: {

        backgroundColor: 'rgba(31, 160, 155, 0.2)',

        paddingHorizontal: 16,

        paddingVertical: 8,

        borderRadius: 20,

        borderWidth: 1,

        borderColor: 'rgba(31, 160, 155, 0.4)',

        marginTop: 8,

        flexDirection: 'row',

        alignItems: 'center',

        justifyContent: 'center',

    },

    betaBadgeText: {

        fontFamily: 'Rubik_400Regular',

        fontSize: 13,

        color: '#1FA09B',

        textAlign: 'center',

    },



    // --- Early Bird Pricing ---

    preOrderSubtext: {

        fontFamily: 'Rubik_400Regular',

        fontSize: 14,

        color: 'rgba(255, 255, 255, 0.9)',

        textAlign: 'center',

        marginTop: 4,

    },



    // --- Hero Progress Bar ---

    heroProgressWrapper: {

        width: '100%',

        maxWidth: 400,

        marginTop: 24,

        paddingHorizontal: 20,

        zIndex: 100,

        position: 'relative',

        backgroundColor: 'rgba(31, 160, 155, 0.2)',

        paddingVertical: 16,

        borderRadius: 12,

    },

    heroProgressText: {

        fontFamily: 'Rubik_400Regular',

        fontSize: 14,

        color: 'rgba(255, 255, 255, 0.9)',

    },

    heroProgressBar: {

        width: '100%',

        height: 24,

        backgroundColor: 'rgba(0, 0, 0, 0.3)',

        borderRadius: 12,

        overflow: 'hidden',

        borderWidth: 2,

        borderColor: 'rgba(255, 255, 255, 0.5)',

    },

    heroProgressFill: {

        height: '100%',

        backgroundColor: '#1FA09B',

        borderRadius: 10,

        shadowColor: '#1FA09B',

        shadowOffset: { width: 0, height: 0 },

        shadowOpacity: 0.8,

        shadowRadius: 8,

    },



    // --- Testimonial Role ---

    testimonialRole: {

        fontSize: 14,

        color: COLORS.textLight,

        fontFamily: 'Rubik_400Regular',

        marginBottom: 12,

        textAlign: 'right',

    },

    // --- Contact Modal ---
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    contactPopup: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 30,
        width: '90%',
        maxWidth: 400,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },

    contactPopupTitle: {
        fontFamily: 'Rubik_700Bold',
        fontSize: 24,
        color: COLORS.textDark,
        marginBottom: 20,
    },

    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: '#F9FAFB',
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
        width: '100%',
    },

    emailText: {
        fontFamily: 'Rubik_400Regular',
        fontSize: 16,
        color: COLORS.primary,
    },

    closeButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },

    closeButtonText: {
        fontFamily: 'Rubik_600SemiBold',
        fontSize: 16,
        color: '#FFFFFF',
    },

});
export type CharacterKey = "daniel" | "maya" | "mateo";

export type VisualItem = {
  symbol: string;
  spanish: string;
  hebrew: string;
  example: string;
};

export type ChapterVisualSpec = {
  number: number;
  kind: string;
  kicker: string;
  title: string;
  instruction: string;
  character: CharacterKey;
  characterLine: string;
  items: VisualItem[];
  check: { prompt: string; options: string[]; answer: string; explanation: string };
};

export const characters: Record<CharacterKey, { name: string; role: string; image: string; color: string }> = {
  daniel: { name: "דניאל", role: "לומד דרך שגרה, עבודה והעיר", image: "/images/characters/daniel-portrait.webp", color: "navy" },
  maya: { name: "מאיה", role: "לומדת דרך אנשים, תוכניות וחוויות", image: "/images/characters/maya-portrait.webp", color: "coral" },
  mateo: { name: "מטאו", role: "החבר שמחבר את הספרדית לחיים", image: "/images/characters/mateo-portrait.webp", color: "mint" },
};

export const chapterVisuals: Record<number, ChapterVisualSpec> = {
  1: { number: 1, kind: "sound", kicker: "שומעים לפני שקוראים", title: "מפת הצלילים הראשונה", instruction: "לחצו על כל צליל וראו מילה שמדגימה אותו.", character: "mateo", characterLine: "מטאו מזכיר: בספרדית רוב המילים נשמעות כמו שהן נכתבות.", items: [
    { symbol: "H", spanish: "hola", hebrew: "האות שקטה", example: "hola → אוֹלָה" }, { symbol: "J", spanish: "jardín", hebrew: "צליל חזק של ח", example: "jardín → חַרְדִין" }, { symbol: "Ñ", spanish: "niño", hebrew: "נְי", example: "niño → נִינְיוֹ" }, { symbol: "LL", spanish: "calle", hebrew: "לרוב י", example: "calle → קָאיֶה" },
  ], check: { prompt: "באיזו מילה לא שומעים את האות הראשונה?", options: ["hola", "casa", "mesa", "libro"], answer: "hola", explanation: "האות H אינה נהגית בספרדית." } },
  2: { number: 2, kind: "rhythm", kicker: "הקצב של הספרדית", title: "רואים את ההטעמה", instruction: "כל כרטיס מדגיש את ההברה שנושאת את הקול.", character: "maya", characterLine: "מאיה מקישה עם האצבע על השולחן בכל הברה.", items: [
    { symbol: "●○○", spanish: "GRA-cias", hebrew: "הברה ראשונה", example: "GRA-cias" }, { symbol: "○●○", spanish: "a-MI-go", hebrew: "הברה אמצעית", example: "a-MI-go" }, { symbol: "○○●", spanish: "pro-fe-SOR", hebrew: "הברה אחרונה", example: "pro-fe-SOR" }, { symbol: "´", spanish: "teléfono", hebrew: "הסימן קובע", example: "te-LÉ-fo-no" },
  ], check: { prompt: "איפה ההטעמה במילה amigo?", options: ["a", "mi", "go"], answer: "mi", explanation: "אומרים a-MI-go, עם הדגשה על ההברה האמצעית." } },
  3: { number: 3, kind: "dialogue", kicker: "ערכת הישרדות", title: "מה אומרים ברגע האמת?", instruction: "בחרו מצב כדי לחשוף את המשפט המתאים.", character: "daniel", characterLine: "דניאל מגיע לבית קפה ומגלה שחמישה משפטים מספיקים כדי להתחיל.", items: [
    { symbol: "👋", spanish: "Hola", hebrew: "פותחים שיחה", example: "Hola, ¿cómo estás?" }, { symbol: "❓", spanish: "No entiendo", hebrew: "לא הבנתי", example: "Perdón, no entiendo." }, { symbol: "↻", spanish: "¿Puedes repetir?", hebrew: "אפשר לחזור?", example: "¿Puedes repetir, por favor?" }, { symbol: "✓", spanish: "Gracias", hebrew: "מסיימים בנימוס", example: "Gracias. De nada." },
  ], check: { prompt: "לא הבנתם את המשפט. מה אומרים?", options: ["No entiendo", "Hasta luego", "Muy bien", "Soy Daniel"], answer: "No entiendo", explanation: "No entiendo פירושו: אני לא מבין או מבינה." } },
  4: { number: 4, kind: "pronouns", kicker: "מי עושה את הפעולה?", title: "כינויי גוף בתנועה", instruction: "הדמויות מראות בגוף מי הוא yo, מי היא ella ומי הם ellos.", character: "maya", characterLine: "מאיה מצביעה על עצמה: Yo soy Maya. אחר כך היא מצביעה על דניאל: Él es Daniel.", items: [
    { symbol: "◎", spanish: "yo", hebrew: "אני", example: "Yo soy Maya." }, { symbol: "→", spanish: "tú", hebrew: "אתה / את", example: "Tú eres Daniel." }, { symbol: "♂", spanish: "él", hebrew: "הוא", example: "Él es Mateo." }, { symbol: "♀", spanish: "ella", hebrew: "היא", example: "Ella es Maya." }, { symbol: "◉◉", spanish: "nosotros", hebrew: "אנחנו", example: "Nosotros somos amigos." }, { symbol: "⇢⇢", spanish: "ustedes", hebrew: "אתם / אתן", example: "Ustedes son estudiantes." }, { symbol: "•••", spanish: "ellos", hebrew: "הם", example: "Ellos son amigos." },
  ], check: { prompt: "מאיה מדברת על עצמה. באיזו מילה תשתמש?", options: ["yo", "ella", "ellos", "ustedes"], answer: "yo", explanation: "כשאדם מדבר על עצמו הוא משתמש ב־yo." } },
  5: { number: 5, kind: "identity", kicker: "כרטיס זהות ספרדי", title: "מי אני בארבע שורות", instruction: "לחצו על כל שדה ובנו היכרות קצרה.", character: "mateo", characterLine: "מטאו מציג את עצמו בלי לתרגם מילה־מילה.", items: [
    { symbol: "01", spanish: "Soy Mateo", hebrew: "שם", example: "Hola, soy Mateo." }, { symbol: "02", spanish: "Soy de México", hebrew: "מוצא", example: "Soy de México." }, { symbol: "03", spanish: "Soy profesor", hebrew: "מקצוע", example: "Soy profesor." }, { symbol: "04", spanish: "Soy tranquilo", hebrew: "תיאור", example: "Soy tranquilo y simpático." },
  ], check: { prompt: "איך אומרים 'אני מישראל'?", options: ["Soy de Israel", "Estoy Israel", "Tengo Israel", "Hay Israel"], answer: "Soy de Israel", explanation: "להצגת מוצא משתמשים ב־soy de." } },
  6: { number: 6, kind: "character", kicker: "היכרות אמיתית", title: "שלוש דמויות, שלושה קולות", instruction: "עברו בין הדמויות וראו איך כל אחת מציגה את עצמה.", character: "daniel", characterLine: "דניאל, מאיה ומטאו ימשיכו להופיע בסיפורים ובדיאלוגים לאורך הספר.", items: [
    { symbol: "D", spanish: "Daniel", hebrew: "תל אביב · מעצב", example: "Soy Daniel. Vivo en Tel Aviv." }, { symbol: "M", spanish: "Maya", hebrew: "חיפה · סטודנטית", example: "Soy Maya. Soy estudiante." }, { symbol: "M", spanish: "Mateo", hebrew: "מקסיקו סיטי · מורה", example: "Soy Mateo. Soy profesor." }, { symbol: "+", spanish: "¿Y tú?", hebrew: "עכשיו תורכם", example: "¿Cómo te llamas?" },
  ], check: { prompt: "איזו שאלה מבקשת את השם?", options: ["¿Cómo te llamas?", "¿Dónde vives?", "¿Qué haces?", "¿Cuántos años tienes?"], answer: "¿Cómo te llamas?", explanation: "¿Cómo te llamas? היא שאלת השם הבסיסית." } },
  7: { number: 7, kind: "objects", kicker: "לכל מילה יש מסגרת", title: "זכר, נקבה ומאמר", instruction: "ראו איך המסגרת משתנה לפי סוג המילה.", character: "maya", characterLine: "מאיה לא מנחשת לפי עברית. היא לומדת כל מילה יחד עם el או la.", items: [
    { symbol: "▣", spanish: "el libro", hebrew: "הספר", example: "Tengo el libro." }, { symbol: "▢", spanish: "la casa", hebrew: "הבית", example: "La casa es bonita." }, { symbol: "1", spanish: "un café", hebrew: "קפה אחד", example: "Quiero un café." }, { symbol: "1", spanish: "una mesa", hebrew: "שולחן אחד", example: "Hay una mesa." },
  ], check: { prompt: "איזו צורה מתאימה ל־casa?", options: ["la casa", "el casa", "un casa", "los casa"], answer: "la casa", explanation: "casa היא מילה בנקבה ולכן משתמשים ב־la." } },
  8: { number: 8, kind: "plural", kicker: "מאחד לכמה", title: "רואים את הרבים", instruction: "לחצו כדי לעבור מפריט אחד לקבוצה.", character: "daniel", characterLine: "דניאל מכפיל את הכרטיס ושומר גם על המין הדקדוקי.", items: [
    { symbol: "▣→▣▣", spanish: "el libro → los libros", hebrew: "זכר ברבים", example: "Hay dos libros." }, { symbol: "▢→▢▢", spanish: "la casa → las casas", hebrew: "נקבה ברבים", example: "Las casas son bonitas." }, { symbol: "1→••", spanish: "un café → unos cafés", hebrew: "כמה בזכר", example: "Quiero unos cafés." }, { symbol: "1→••", spanish: "una mesa → unas mesas", hebrew: "כמה בנקבה", example: "Hay unas mesas." },
  ], check: { prompt: "מה הרבים של la casa?", options: ["las casas", "los casas", "la casas", "unas casa"], answer: "las casas", explanation: "la הופכת ל־las, וגם casa מקבלת s." } },
  9: { number: 9, kind: "room", kicker: "מצלמים את החדר", title: "מה יש בתמונה?", instruction: "כל נקודה בחדר מציגה דבר שקיים במקום.", character: "mateo", characterLine: "מטאו מסתכל סביב ואומר hay לפני שהוא מצביע על דבר מסוים.", items: [
    { symbol: "▤", spanish: "Hay una mesa", hebrew: "יש שולחן", example: "Hay una mesa en la cocina." }, { symbol: "▥", spanish: "Hay dos sillas", hebrew: "יש שני כיסאות", example: "Hay dos sillas." }, { symbol: "⌕", spanish: "¿Hay café?", hebrew: "יש קפה?", example: "Sí, hay café." }, { symbol: "−", spanish: "No hay televisión", hebrew: "אין טלוויזיה", example: "No hay televisión." },
  ], check: { prompt: "איך אומרים 'יש ספר'?", options: ["Hay un libro", "Tengo un libro", "Está un libro", "Es un libro"], answer: "Hay un libro", explanation: "Hay מציג דבר שקיים במקום." } },
  10: { number: 10, kind: "belongings", kicker: "מה יש לי?", title: "התרמיל של דניאל", instruction: "פתחו כל כיס וראו מה דניאל מחזיק או מרגיש.", character: "daniel", characterLine: "דניאל משתמש ב־tengo גם לחפצים וגם לרעב ולצמא.", items: [
    { symbol: "📘", spanish: "Tengo un libro", hebrew: "יש לי ספר", example: "Tengo un libro español." }, { symbol: "⌕", spanish: "¿Tienes tiempo?", hebrew: "יש לך זמן?", example: "Sí, tengo tiempo." }, { symbol: "◒", spanish: "Tengo hambre", hebrew: "אני רעב", example: "Tengo hambre." }, { symbol: "◐", spanish: "Tengo sed", hebrew: "אני צמא", example: "Tengo sed." },
  ], check: { prompt: "איך אומרים 'יש לי זמן'?", options: ["Tengo tiempo", "Hay tiempo", "Soy tiempo", "Estoy tiempo"], answer: "Tengo tiempo", explanation: "כשמשהו שייך לי או נמצא ברשותי משתמשים ב־tengo." } },
  11: { number: 11, kind: "numbers", kicker: "מספרים עם היגיון", title: "המסלול מ־1 עד 100", instruction: "המספרים מסודרים בתחנות שמציגות את הדפוס.", character: "maya", characterLine: "מאיה מחברת עשרות ומספרים עם y החל מ־31.", items: [
    { symbol: "0–15", spanish: "uno, dos, quince", hebrew: "לומדים כיחידות", example: "Tengo quince años." }, { symbol: "16–19", spanish: "dieciséis", hebrew: "dieci + מספר", example: "dieciocho" }, { symbol: "20–29", spanish: "veintidós", hebrew: "veinti + מספר", example: "veintiséis" }, { symbol: "30+", spanish: "treinta y uno", hebrew: "עשרות + y", example: "cuarenta y cinco" },
  ], check: { prompt: "איך אומרים 31?", options: ["treinta y uno", "treinta uno", "tres y uno", "veintiuno"], answer: "treinta y uno", explanation: "מ־30 מחברים את העשרות והיחידות באמצעות y." } },
  12: { number: 12, kind: "family", kicker: "האנשים סביב מאיה", title: "עץ המשפחה החי", instruction: "לחצו על כל ענף כדי לראות שייכות וקשר.", character: "maya", characterLine: "מאיה מציגה את המשפחה שלה באמצעות tengo, mi ו־nuestra.", items: [
    { symbol: "♙", spanish: "mi madre", hebrew: "אמא שלי", example: "Mi madre es profesora." }, { symbol: "♟", spanish: "mi hermano", hebrew: "אח שלי", example: "Mi hermano es estudiante." }, { symbol: "♙♟", spanish: "mis padres", hebrew: "ההורים שלי", example: "Mis padres viven en Israel." }, { symbol: "⌂", spanish: "nuestra familia", hebrew: "המשפחה שלנו", example: "Nuestra familia es tranquila." },
  ], check: { prompt: "איך אומרים 'המשפחה שלי'?", options: ["mi familia", "familia mi", "la mi familia", "mis familia"], answer: "mi familia", explanation: "מילת השייכות mi באה לפני שם העצם." } },
  13: { number: 13, kind: "ser-estar", kicker: "זהות מול רגע", title: "SER או ESTAR בעין אחת", instruction: "צד אחד מציג מי האדם, הצד השני איפה ואיך הוא עכשיו.", character: "mateo", characterLine: "מטאו הוא מורה, אבל עכשיו הוא בבית ועייף.", items: [
    { symbol: "ID", spanish: "Soy profesor", hebrew: "מי אני", example: "Soy Mateo." }, { symbol: "⌖", spanish: "Estoy en casa", hebrew: "איפה אני", example: "Estoy en casa." }, { symbol: "∞", spanish: "Es tranquilo", hebrew: "תיאור כללי", example: "Mateo es tranquilo." }, { symbol: "NOW", spanish: "Está cansado", hebrew: "מצב עכשיו", example: "Ahora está cansado." },
  ], check: { prompt: "איזה משפט מתאר מיקום עכשיו?", options: ["Estoy en casa", "Soy profesor", "Es simpática", "Somos amigos"], answer: "Estoy en casa", explanation: "למיקום משתמשים ב־estar." } },
  14: { number: 14, kind: "room-map", kicker: "חדר שאפשר לקרוא", title: "HAY מול ESTÁ", instruction: "מציגים מה קיים בחדר, ואז מצביעים על המיקום המדויק.", character: "daniel", characterLine: "דניאל מצלם חדר: hay מציג את הפריטים, está מאתר פריט שכבר מכירים.", items: [
    { symbol: "+", spanish: "Hay una cama", hebrew: "קיים בחדר", example: "Hay una cama en la habitación." }, { symbol: "⌖", spanish: "La cama está aquí", hebrew: "המיטה המסוימת", example: "La cama está cerca de la ventana." }, { symbol: "↥", spanish: "encima de", hebrew: "מעל", example: "El libro está encima de la mesa." }, { symbol: "↧", spanish: "debajo de", hebrew: "מתחת", example: "La mochila está debajo de la silla." },
  ], check: { prompt: "אנחנו מציגים ספר חדש בחדר. במה נשתמש?", options: ["Hay un libro", "El libro es", "Está un libro", "Tengo la habitación"], answer: "Hay un libro", explanation: "כדי להציג דבר שקיים במקום משתמשים ב־hay." } },
  15: { number: 15, kind: "city-map", kicker: "העיר בכף היד", title: "מפה של שאלות ותשובות", instruction: "בחרו יעד וראו איך שואלים ואיך מתארים מרחק.", character: "mateo", characterLine: "מטאו עוזר למאיה למצוא את בית הקפה במרכז.", items: [
    { symbol: "☕", spanish: "el café", hebrew: "בית הקפה", example: "El café está cerca." }, { symbol: "▤", spanish: "la estación", hebrew: "התחנה", example: "¿Dónde está la estación?" }, { symbol: "↔", spanish: "cerca de", hebrew: "קרוב ל", example: "Está cerca del hotel." }, { symbol: "⟷", spanish: "lejos de", hebrew: "רחוק מ", example: "Está lejos del centro." },
  ], check: { prompt: "איך שואלים איפה התחנה?", options: ["¿Dónde está la estación?", "¿Qué es la estación?", "¿Hay dónde?", "¿Quién estación?"], answer: "¿Dónde está la estación?", explanation: "¿Dónde está...? משמש לשאלה על מיקום של מקום מסוים." } },
  16: { number: 16, kind: "verbs", kicker: "מנוע הפועל", title: "שורש וסיומת", instruction: "החליפו את הסיומת וראו איך הפועל מתחבר לאדם.", character: "daniel", characterLine: "דניאל מפרק hablar ל־habl + o וכך רואה את הדפוס.", items: [
    { symbol: "-AR", spanish: "hablar → hablo", hebrew: "אני מדבר", example: "Hablo español." }, { symbol: "-ER", spanish: "comer → como", hebrew: "אני אוכל", example: "Como en casa." }, { symbol: "-IR", spanish: "vivir → vivo", hebrew: "אני גר", example: "Vivo en Tel Aviv." }, { symbol: "∅", spanish: "yo (אופציונלי)", hebrew: "הסיומת כבר מספרת", example: "Trabajo = Yo trabajo." },
  ], check: { prompt: "מה צורת yo של hablar?", options: ["hablo", "hablas", "habla", "hablar"], answer: "hablo", explanation: "בפעלים רגילים ב־AR, צורת yo מסתיימת ב־o." } },
  17: { number: 17, kind: "timeline", kicker: "היום של דניאל", title: "שגרה על ציר זמן", instruction: "עברו מהבוקר לערב וראו איפה me מופיעה.", character: "daniel", characterLine: "דניאל קם בשבע, עובד בבית והולך לישון באחת עשרה.", items: [
    { symbol: "07:00", spanish: "Me levanto", hebrew: "אני קם", example: "Me levanto a las siete." }, { symbol: "07:30", spanish: "Me ducho", hebrew: "אני מתקלח", example: "Después me ducho." }, { symbol: "09:00", spanish: "Trabajo", hebrew: "אני עובד", example: "Trabajo en casa." }, { symbol: "23:00", spanish: "Me acuesto", hebrew: "אני הולך לישון", example: "Me acuesto a las once." },
  ], check: { prompt: "איפה שמים את me?", options: ["לפני הפועל", "אחרי הפועל", "בסוף המשפט", "רק בשאלה"], answer: "לפני הפועל", explanation: "אומרים Me levanto, ולא Levanto me." } },
  18: { number: 18, kind: "frequency", kicker: "כמה פעמים?", title: "מד תדירות", instruction: "הסולם נע ממאה אחוז לאפס ומחבר כל מילה להרגל.", character: "maya", characterLine: "מאיה משתמשת במיקום על הסולם כדי לזכור את המילים.", items: [
    { symbol: "100%", spanish: "siempre", hebrew: "תמיד", example: "Siempre tomo café." }, { symbol: "70%", spanish: "normalmente", hebrew: "בדרך כלל", example: "Normalmente trabajo en casa." }, { symbol: "40%", spanish: "a veces", hebrew: "לפעמים", example: "A veces leo." }, { symbol: "0%", spanish: "nunca", hebrew: "אף פעם", example: "Nunca trabajo el domingo." },
  ], check: { prompt: "איזו מילה נמצאת ב־0%?", options: ["nunca", "siempre", "a veces", "normalmente"], answer: "nunca", explanation: "nunca פירושה אף פעם." } },
  19: { number: 19, kind: "likes", kicker: "דבר אחד או כמה?", title: "הלב בוחר gusta", instruction: "הכמות קובעת אם נשתמש ב־gusta או gustan.", character: "mateo", characterLine: "מטאו אוהב קפה, ספרים וגם ללמוד ספרדית.", items: [
    { symbol: "♥1", spanish: "Me gusta el café", hebrew: "דבר אחד", example: "Me gusta el café." }, { symbol: "♥→", spanish: "Me gusta leer", hebrew: "פעולה", example: "Me gusta leer." }, { symbol: "♥♥", spanish: "Me gustan los libros", hebrew: "כמה דברים", example: "Me gustan los libros." }, { symbol: "?", spanish: "¿Te gusta...?", hebrew: "אתה אוהב?", example: "¿Te gusta la música?" },
  ], check: { prompt: "איזה משפט מתאים ל־los libros?", options: ["Me gustan los libros", "Me gusta los libros", "Yo gusta libros", "Me gustan el libro"], answer: "Me gustan los libros", explanation: "עם כמה דברים משתמשים ב־gustan." } },
  20: { number: 20, kind: "intentions", kicker: "שלושה כוחות", title: "רוצה, צריך, יכול", instruction: "בחרו את הכוונה והפועל השני נשאר תמיד בצורת המקור.", character: "maya", characterLine: "מאיה רוצה קפה, צריכה לעבוד ויכולה להיפגש בערב.", items: [
    { symbol: "♥", spanish: "Quiero viajar", hebrew: "אני רוצה", example: "Quiero viajar a México." }, { symbol: "!", spanish: "Necesito trabajar", hebrew: "אני צריכה", example: "Necesito trabajar hoy." }, { symbol: "✓", spanish: "Puedo ir", hebrew: "אני יכולה", example: "Puedo ir mañana." }, { symbol: "∞", spanish: "infinitivo", hebrew: "הפועל לא משתנה", example: "Quiero comer, no quiero como." },
  ], check: { prompt: "מה נכון אחרי puedo?", options: ["Puedo viajar", "Puedo viajo", "Puedo viajas", "Puedo viajando"], answer: "Puedo viajar", explanation: "אחרי puedo משתמשים בפועל בצורת המקור." } },
  21: { number: 21, kind: "route", kicker: "לאן הולכים?", title: "קו IR בעיר", instruction: "כל תחנה מחברת את הפועל ir למקום אחר.", character: "daniel", characterLine: "דניאל יוצא מהבית ועובר בין תחנות בעיר.", items: [
    { symbol: "⌂", spanish: "Voy a casa", hebrew: "לבית", example: "Voy a casa." }, { symbol: "☕", spanish: "Voy al café", hebrew: "לבית הקפה", example: "a + el = al" }, { symbol: "▤", spanish: "Voy a la estación", hebrew: "לתחנה", example: "Voy a la estación." }, { symbol: "?", spanish: "¿Adónde vas?", hebrew: "לאן אתה הולך?", example: "Voy al trabajo." },
  ], check: { prompt: "איך אומרים 'אני הולך לבית הקפה'?", options: ["Voy al café", "Voy a el café", "Soy al café", "Estoy café"], answer: "Voy al café", explanation: "a + el מתחברים לצורה al." } },
  22: { number: 22, kind: "future", kicker: "החץ אל העתיד", title: "תוכנית בשלושה חלקים", instruction: "חברו מי + ir + a + פעולה.", character: "maya", characterLine: "מאיה מעבירה את הכרטיס מהיום למחר באמצעות voy a.", items: [
    { symbol: "YO", spanish: "Voy a estudiar", hebrew: "אני הולכת ללמוד", example: "Hoy voy a estudiar." }, { symbol: "TÚ", spanish: "Vas a trabajar", hebrew: "אתה הולך לעבוד", example: "Mañana vas a trabajar." }, { symbol: "ELLA", spanish: "Va a viajar", hebrew: "היא הולכת לנסוע", example: "Maya va a viajar." }, { symbol: "∞", spanish: "estudiar / trabajar", hebrew: "הפועל השני במקור", example: "Voy a comer." },
  ], check: { prompt: "איזו תוכנית בנויה נכון?", options: ["Voy a estudiar", "Voy estudio", "Soy a estudiar", "Voy a estudio"], answer: "Voy a estudiar", explanation: "התבנית היא voy a + פועל בצורת המקור." } },
  23: { number: 23, kind: "calendar", kicker: "השבוע של מאיה", title: "לוח שנה שמדבר", instruction: "עברו בין יום, שעה וחודש וראו איזו מילת יחס מגיעה איתם.", character: "maya", characterLine: "מאיה קובעת שיעור ביום שני וקפה עם חברה ביום שישי.", items: [
    { symbol: "L", spanish: "el lunes", hebrew: "ביום שני", example: "El lunes tengo clase." }, { symbol: "08", spanish: "a las ocho", hebrew: "בשמונה", example: "A las ocho estudio." }, { symbol: "MAY", spanish: "en mayo", hebrew: "במאי", example: "Mi cumpleaños es en mayo." }, { symbol: "15", spanish: "el 15 de junio", hebrew: "ב־15 ביוני", example: "La clase es el 15 de junio." },
  ], check: { prompt: "איך אומרים 'בשמונה'?", options: ["a las ocho", "en ocho", "el ocho", "de ocho"], answer: "a las ocho", explanation: "לשעה משתמשים ב־a la או a las." } },
  24: { number: 24, kind: "cafe", kicker: "מזמינים בלי להילחץ", title: "דלפק ספרדי אינטראקטיבי", instruction: "בחרו מהתפריט וראו משפט טבעי להזמנה.", character: "mateo", characterLine: "מטאו מראה איך בקשה אחת קצרה פותחת את כל השיחה.", items: [
    { symbol: "☕", spanish: "Quiero un café", hebrew: "אני רוצה קפה", example: "Quiero un café, por favor." }, { symbol: "+", spanish: "con leche", hebrew: "עם חלב", example: "Un café con leche." }, { symbol: "−", spanish: "sin azúcar", hebrew: "בלי סוכר", example: "Café sin azúcar." }, { symbol: "€", spanish: "La cuenta, por favor", hebrew: "את החשבון", example: "La cuenta, por favor." },
  ], check: { prompt: "איך מבקשים חשבון?", options: ["La cuenta, por favor", "¿Dónde cuenta?", "Tengo cuenta", "Soy cuenta"], answer: "La cuenta, por favor", explanation: "זהו המשפט הקצר והטבעי לבקשת החשבון." } },
  25: { number: 25, kind: "shopping", kicker: "מהמדף לקופה", title: "קנייה בארבעה צעדים", instruction: "כל כרטיס הוא שלב אחר בשיחה בחנות.", character: "daniel", characterLine: "דניאל בודק מחיר, בוחר ולבסוף מחליט אם לקנות.", items: [
    { symbol: "⌕", spanish: "Busco una camisa", hebrew: "אני מחפש חולצה", example: "Busco una camisa azul." }, { symbol: "€?", spanish: "¿Cuánto cuesta?", hebrew: "כמה זה עולה?", example: "¿Cuánto cuesta esta camisa?" }, { symbol: "✓", spanish: "Quiero comprarla", hebrew: "אני רוצה לקנות", example: "Quiero comprar esta camisa." }, { symbol: "×", spanish: "No la quiero", hebrew: "אני לא רוצה אותה", example: "Gracias, no la quiero." },
  ], check: { prompt: "איזו שאלה מבקשת את המחיר?", options: ["¿Cuánto cuesta?", "¿Dónde está?", "¿Cómo eres?", "¿Qué hora es?"], answer: "¿Cuánto cuesta?", explanation: "¿Cuánto cuesta? פירושו: כמה זה עולה?" } },
  26: { number: 26, kind: "wardrobe", kicker: "בגד + צבע", title: "ארון ההתאמה", instruction: "הצבע עובר לזכר, לנקבה או לרבים יחד עם הבגד.", character: "maya", characterLine: "מאיה בוחרת בגד ורק אז מתאימה אליו את הצבע.", items: [
    { symbol: "▰", spanish: "una camisa blanca", hebrew: "חולצה לבנה", example: "La camisa es blanca." }, { symbol: "▮", spanish: "un pantalón negro", hebrew: "מכנס שחור", example: "El pantalón es negro." }, { symbol: "◆", spanish: "un vestido verde", hebrew: "שמלה ירוקה", example: "Quiero un vestido verde." }, { symbol: "••", spanish: "zapatos rojos", hebrew: "נעליים אדומות", example: "Los zapatos son rojos." },
  ], check: { prompt: "מה מתאים ל־camisa?", options: ["blanca", "blanco", "blancos", "blancas"], answer: "blanca", explanation: "camisa היא נקבה ביחיד ולכן גם הצבע מופיע בנקבה ביחיד." } },
  27: { number: 27, kind: "transport", kicker: "מפה בתנועה", title: "מהתחנה אל היעד", instruction: "בחרו תחבורה או כיוון וראו הוראה שימושית.", character: "mateo", characterLine: "מטאו מסביר את הדרך במשפטים קצרים וברורים.", items: [
    { symbol: "BUS", spanish: "Voy en autobús", hebrew: "באוטובוס", example: "Voy al centro en autobús." }, { symbol: "→", spanish: "todo recto", hebrew: "ישר", example: "Sigue todo recto." }, { symbol: "↰", spanish: "a la izquierda", hebrew: "שמאלה", example: "Gira a la izquierda." }, { symbol: "↱", spanish: "a la derecha", hebrew: "ימינה", example: "Gira a la derecha." },
  ], check: { prompt: "איך אומרים 'פנה ימינה'?", options: ["Gira a la derecha", "Gira a la izquierda", "Sigue todo recto", "Voy en tren"], answer: "Gira a la derecha", explanation: "a la derecha פירושו ימינה." } },
  28: { number: 28, kind: "weather", kicker: "תחזית בספרדית", title: "ארבעה חלונות מזג אוויר", instruction: "לחצו על התחזית וקבלו משפט שאפשר לומר היום.", character: "maya", characterLine: "מאיה מסתכלת מהחלון ובוחרת בין hace, hay ו־está.", items: [
    { symbol: "☀", spanish: "Hace sol", hebrew: "יש שמש", example: "Hoy hace sol." }, { symbol: "HOT", spanish: "Hace calor", hebrew: "חם", example: "En verano hace calor." }, { symbol: "☁", spanish: "Está nublado", hebrew: "מעונן", example: "Hoy está nublado." }, { symbol: "☂", spanish: "Llueve", hebrew: "יורד גשם", example: "Hoy llueve." },
  ], check: { prompt: "איזה משפט אומר שחם?", options: ["Hace calor", "Está calor", "Hay calor yo", "Es calor"], answer: "Hace calor", explanation: "למזג אוויר חם משתמשים בביטוי hace calor." } },
  29: { number: 29, kind: "body", kicker: "מצביעים ומסבירים", title: "מפת הגוף והכאב", instruction: "בחרו אזור בגוף כדי לראות איך מבקשים עזרה.", character: "daniel", characterLine: "דניאל לא צריך משפט ארוך: Me duele + חלק הגוף.", items: [
    { symbol: "◯", spanish: "Me duele la cabeza", hebrew: "כואב לי הראש", example: "Me duele la cabeza." }, { symbol: "♥", spanish: "Me duele el estómago", hebrew: "כואבת לי הבטן", example: "Me duele el estómago." }, { symbol: "✋", spanish: "Me duele la mano", hebrew: "כואבת לי היד", example: "Me duele la mano." }, { symbol: "+", spanish: "Necesito ayuda", hebrew: "אני צריך עזרה", example: "Perdón, necesito ayuda." },
  ], check: { prompt: "איך אומרים 'כואב לי הראש'?", options: ["Me duele la cabeza", "Tengo la cabeza", "Soy cabeza", "Estoy dolor"], answer: "Me duele la cabeza", explanation: "הביטוי הבסיסי הוא me duele + חלק הגוף." } },
  30: { number: 30, kind: "constellation", kicker: "כל מה שכבר אפשר", title: "מפת היכולות של A1", instruction: "פתחו כל תחום וראו מה אתם כבר יכולים לעשות בספרדית.", character: "mateo", characterLine: "מטאו מזכיר: המטרה אינה ספרדית מושלמת, אלא ספרדית שאפשר להשתמש בה.", items: [
    { symbol: "01", spanish: "Me presento", hebrew: "אני מציג את עצמי", example: "Hola, soy Daniel." }, { symbol: "02", spanish: "Hablo de mi vida", hebrew: "אני מדבר על החיים", example: "Vivo en Tel Aviv y trabajo." }, { symbol: "03", spanish: "Resuelvo situaciones", hebrew: "אני מסתדר במצבים", example: "Quiero un café, por favor." }, { symbol: "04", spanish: "Hago planes", hebrew: "אני מתכנן", example: "Mañana voy a estudiar." },
  ], check: { prompt: "מהו היעד האמיתי של הספר?", options: ["להשתמש בספרדית בחיים", "לדעת כל פועל", "לא לטעות לעולם", "לתרגם כל מילה"], answer: "להשתמש בספרדית בחיים", explanation: "A1 הוא בסיס שימושי לתקשורת, לא שלמות." } },
};

export type ReadingQuestion =
  | { type: "choice" | "truefalse"; prompt: string; options: string[]; answer: string; explanation: string }
  | { type: "blank"; prompt: string; answer: string; explanation: string }
  | { type: "order"; prompt: string; items: string[]; answer: string[]; explanation: string };

export type ReadingQuiz = { title: string; character: CharacterKey; excerpt: string; questions: ReadingQuestion[] };

export const readingQuizzes: Record<string, ReadingQuiz> = {
  "12-chapter-23": { title: "המשפחה של מאיה", character: "maya", excerpt: "Hola, soy Maya. Soy de Israel. Tengo una familia pequeña. Tengo un hermano. Mi hermano es estudiante. Mi madre es profesora. Nuestra familia es tranquila.", questions: [
    { type: "truefalse", prompt: "למאיה יש משפחה גדולה.", options: ["נכון", "לא נכון"], answer: "לא נכון", explanation: "מאיה אומרת: Tengo una familia pequeña." },
    { type: "choice", prompt: "מה אחיה של מאיה עושה?", options: ["Es estudiante", "Es profesor", "Es médico", "Trabaja en un café"], answer: "Es estudiante", explanation: "בטקסט כתוב: Mi hermano es estudiante." },
    { type: "blank", prompt: "השלימו: Mi madre es _____.", answer: "profesora", explanation: "אמא של מאיה היא מורה: profesora." },
    { type: "order", prompt: "סדרו את המידע לפי הופעתו בטקסט.", items: ["מאיה מישראל", "יש לה משפחה קטנה", "אחיה סטודנט", "אמה מורה"], answer: ["מאיה מישראל", "יש לה משפחה קטנה", "אחיה סטודנט", "אמה מורה"], explanation: "זהו סדר הפרטים בטקסט." },
  ] },
  "12-mini-24": { title: "מאיה ודניאל", character: "maya", excerpt: "Maya es joven y alta. Es simpática y tranquila. Tiene el pelo largo y negro. Tiene los ojos marrones. Daniel es alto. Tiene el pelo corto y rubio. Tiene los ojos verdes. Es simpático, pero no es tranquilo.", questions: [
    { type: "choice", prompt: "למי יש שיער ארוך ושחור?", options: ["Maya", "Daniel", "Mateo", "לא נאמר"], answer: "Maya", explanation: "בטקסט נאמר שלמאיה יש pelo largo y negro." },
    { type: "truefalse", prompt: "דניאל רגוע.", options: ["נכון", "לא נכון"], answer: "לא נכון", explanation: "הטקסט אומר: no es tranquilo." },
    { type: "blank", prompt: "השלימו: Daniel tiene los ojos _____.", answer: "verdes", explanation: "לדניאל יש עיניים ירוקות." },
  ] },
  "14-chapter-28": { title: "הבית והחדר", character: "daniel", excerpt: "Mi casa es pequeña, pero bonita. En mi casa hay una cocina, un salón y dos habitaciones. Mi habitación es tranquila. Hay una cama, una mesa y dos sillas. El libro está en la mesa. Mi teléfono está en la habitación.", questions: [
    { type: "truefalse", prompt: "הבית גדול.", options: ["נכון", "לא נכון"], answer: "לא נכון", explanation: "הבית מתואר כ־pequeña, כלומר קטן." },
    { type: "choice", prompt: "איפה הספר?", options: ["En la mesa", "En la cocina", "En el salón", "Debajo de la cama"], answer: "En la mesa", explanation: "El libro está en la mesa." },
    { type: "blank", prompt: "השלימו: Hay dos _____.", answer: "sillas", explanation: "בחדר יש שני כיסאות." },
    { type: "order", prompt: "סדרו מהכללי לממוקד.", items: ["הבית קטן ויפה", "יש בו מטבח וסלון", "בחדר יש מיטה ושולחן", "הספר על השולחן"], answer: ["הבית קטן ויפה", "יש בו מטבח וסלון", "בחדר יש מיטה ושולחן", "הספר על השולחן"], explanation: "הטקסט מתקדם מהבית אל החדר ואז אל הספר." },
  ] },
  "17-chapter-34": { title: "היום של דניאל", character: "daniel", excerpt: "Hola, soy Daniel. Vivo en Tel Aviv. Por la mañana me levanto a las siete. Me ducho y tomo café. Después trabajo en casa. Por la tarde como en un restaurante. Por la noche estudio español y leo un libro. Me acuesto a las once.", questions: [
    { type: "choice", prompt: "באיזו שעה דניאל קם?", options: ["A las siete", "A las ocho", "A las diez", "A las once"], answer: "A las siete", explanation: "דניאל אומר: me levanto a las siete." },
    { type: "truefalse", prompt: "דניאל עובד במסעדה.", options: ["נכון", "לא נכון"], answer: "לא נכון", explanation: "הוא עובד בבית ואוכל במסעדה אחר הצהריים." },
    { type: "blank", prompt: "השלימו: Por la noche estudio _____ y leo un libro.", answer: "español", explanation: "בערב דניאל לומד ספרדית וקורא ספר." },
    { type: "order", prompt: "סדרו את השגרה.", items: ["קם בשבע", "מתקלח ושותה קפה", "עובד בבית", "לומד ספרדית וקורא"], answer: ["קם בשבע", "מתקלח ושותה קפה", "עובד בבית", "לומד ספרדית וקורא"], explanation: "זה סדר הפעולות בטקסט." },
  ] },
  "23-chapter-47": { title: "השבוע של מאיה", character: "maya", excerpt: "El lunes tengo clase de español. El martes voy al trabajo. El miércoles voy a estudiar por la noche. El viernes voy a tomar café con una amiga. El fin de semana voy a descansar.", questions: [
    { type: "choice", prompt: "מתי יש למאיה שיעור ספרדית?", options: ["El lunes", "El martes", "El viernes", "El domingo"], answer: "El lunes", explanation: "הטקסט מתחיל ב־El lunes tengo clase de español." },
    { type: "truefalse", prompt: "ביום שישי מאיה נפגשת לקפה עם חברה.", options: ["נכון", "לא נכון"], answer: "נכון", explanation: "El viernes voy a tomar café con una amiga." },
    { type: "blank", prompt: "השלימו: El fin de semana voy a _____.", answer: "descansar", explanation: "בסוף השבוע מאיה הולכת לנוח." },
    { type: "order", prompt: "סדרו את השבוע.", items: ["שיעור ספרדית", "עבודה", "לימודים בערב", "קפה עם חברה"], answer: ["שיעור ספרדית", "עבודה", "לימודים בערב", "קפה עם חברה"], explanation: "הפעולות מופיעות מיום שני עד יום שישי." },
  ] },
  "23-mini-48": { title: "קובעים קפה", character: "maya", excerpt: "Daniel: ¿Quieres tomar café el viernes? Maya: Sí, buena idea. ¿A qué hora? Daniel: A las ocho. Maya: Lo siento, a las ocho no puedo. Tengo que trabajar. Daniel: ¿A las nueve? Maya: Sí, perfecto.", questions: [
    { type: "choice", prompt: "באיזה יום דניאל מציע להיפגש?", options: ["El viernes", "El lunes", "El sábado", "Hoy"], answer: "El viernes", explanation: "דניאל מציע קפה ביום שישי." },
    { type: "truefalse", prompt: "מאיה יכולה להיפגש בשמונה.", options: ["נכון", "לא נכון"], answer: "לא נכון", explanation: "מאיה אומרת: a las ocho no puedo." },
    { type: "blank", prompt: "השלימו: Tengo que _____.", answer: "trabajar", explanation: "מאיה חייבת לעבוד." },
    { type: "choice", prompt: "באיזו שעה הם מסכימים להיפגש?", options: ["A las nueve", "A las ocho", "A la una", "No se encuentran"], answer: "A las nueve", explanation: "מאיה עונה Sí, perfecto להצעה בתשע." },
  ] },
};

/* ==========================================================
   Inclusign — interactions
   0. Settings
   1. Translations (EN / FR)
   2. Theme (light / dark)
   3. Navigation
   4. Ticker
   5. Scroll reveal + active nav link
   6. Dictionary preview
   7. Contact form
   8. Chat helper
   ========================================================== */
(() => {
  'use strict';

  /* ---------------------------------------------------------
     0. Settings — edit these
     --------------------------------------------------------- */
  const CONFIG = {
    // Public contact address, used by every email link, the contact form and the chat helper.
    contactEmail: 'contact@inclusign.website',
    // Optional form endpoint, e.g. a Formspree URL ("https://formspree.io/f/xxxx").
    // Leave empty and the form opens the visitor's email app with the message filled in.
    contactEndpoint: '',
    // Inclusign's LinkedIn page, used by every LinkedIn link and the chat helper.
    linkedinUrl: 'https://www.linkedin.com/company/inclusign-ai/',
    // The full LSC dictionary. Leave empty while it's not live: the button shows "Coming soon".
    // Add its address (e.g. 'https://dictionnaire.inclusign.website') and the button becomes a real link.
    lscDictionaryUrl: '',
  };

  // Core team shown on team.html (eight engineering students from ENSPD Douala).
  //   name:     full name
  //   role/bio: English (en) and French (fr)
  //   photo:    e.g. 'assets/team/amina.jpg' (portrait works best), or '' to show initials
  //   linkedin: full profile URL, or '' to hide the icon
  const TEAM = [
    { name: 'Yaka Essaky Frédérique Anges',
      role: { en: 'General coordination', fr: 'Coordination générale' },
      bio: { en: 'Strategy, communication and project management.', fr: 'Stratégie, communication et gestion du projet.' },
      photo: '', linkedin: '' },
    { name: 'Tamekem Nzofou Brayan',
      role: { en: 'Frontend', fr: 'Frontend' },
      bio: { en: 'Building the interfaces and the web experience.', fr: 'Développement des interfaces et de l’expérience web.' },
      photo: '', linkedin: '' },
    { name: 'Kamdem Tcheutchoua Herve',
      role: { en: 'Technical lead', fr: 'Capitaine technique' },
      bio: { en: 'Backend architecture, APIs and AI integration.', fr: 'Architecture backend, APIs, intégration IA.' },
      photo: '', linkedin: '' },
    { name: 'Cheuleu Tchikamun P. Brondon',
      role: { en: 'UI/UX & Frontend', fr: 'UI/UX & Frontend' },
      bio: { en: 'Interface design and user experience.', fr: 'Design des interfaces et expérience utilisateur.' },
      photo: '', linkedin: '' },
    { name: 'Bogning Zemfack Nativine',
      role: { en: 'Artificial intelligence', fr: 'Intelligence Artificielle' },
      bio: { en: 'Gesture recognition and model training.', fr: 'Reconnaissance gestuelle et entraînement des modèles.' },
      photo: '', linkedin: '' },
    { name: 'Konmegne Nguenang Ines X.',
      role: { en: 'Mobile & Testing', fr: 'Mobile & Tests' },
      bio: { en: 'User testing, stability and mobile compatibility.', fr: 'Tests utilisateurs, stabilité et compatibilité mobile.' },
      photo: '', linkedin: '' },
    { name: 'Adjomo Nnomoko Marie Gaelle',
      role: { en: 'Communication & UX', fr: 'Communication & UX' },
      bio: { en: 'User research, documentation and communication.', fr: 'Études utilisateurs, documentation, communication.' },
      photo: '', linkedin: '' },
    { name: 'Fotso Kamga Yves Michel',
      role: { en: 'Cloud infrastructure', fr: 'Infrastructure Cloud' },
      bio: { en: 'Hosting, deployment and cloud architecture.', fr: 'Hébergement, déploiement et architecture cloud.' },
      photo: '', linkedin: '' },
  ];

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const nb = ' '; // French spacing before ? ! : ;
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const store = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch { /* storage unavailable */ } },
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const linkEmail = (html) => html.split(esc(CONFIG.contactEmail))
    .join(`<a href="mailto:${esc(CONFIG.contactEmail)}">${esc(CONFIG.contactEmail)}</a>`);

  /* ---------------------------------------------------------
     1. Translations
     English lives in the HTML; French lives here.
     --------------------------------------------------------- */
  const FR = {
    'meta.title': 'Inclusign — Apprendre la langue des signes, clairement',
    'meta.description': 'Des leçons pensées pour les débutants, un dictionnaire visuel et des outils de pratique bienveillants. Apprenez à votre rythme avec Inclusign.',

    'skip': 'Aller au contenu',
    'nav.features': 'Atouts',
    'nav.dictionary': 'Dictionnaire',
    'nav.journey': 'Parcours',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.team': 'Équipe',
    'nav.cta': 'Commencer',
    'nav.menu': 'Menu',

    'theme.dark': 'Mode sombre',
    'theme.toggle': 'Basculer clair / sombre',
    'theme.label': 'Apparence',
    'theme.lightShort': 'Clair',
    'theme.darkShort': 'Sombre',

    'hero.eyebrow': 'Apprentissage inclusif de la langue des signes',
    'hero.title': 'Apprenez la langue des signes de façon <span class="swash">claire et bienveillante</span>.',
    'hero.lead': 'Commencez par des leçons pensées pour les débutants, explorez les signes en images et gagnez en assurance au quotidien, à votre rythme, grâce aux outils interactifs d’Inclusign.',
    'hero.cta1': 'Commencer à apprendre',
    'hero.cta2': 'Explorer le dictionnaire',
    'hero.point1': 'Pensé pour débuter',
    'hero.point2': 'Visuel, étape par étape',
    'hero.point3': 'À votre rythme',
    'hero.alt': 'Un jeune homme souriant lève la main, le pouce et l’index formant un cercle.',
    'hero.tag1': 'Configuration',
    'hero.tag2': 'Paume vers l’avant',
    'hero.tag3': 'L’expression compte',
    'hero.caption': 'Des leçons d’abord visuelles, avec un accompagnement calme et bienveillant.',

    'ticker.label': 'Des signes du quotidien pour commencer',

    'journey.eyebrow': 'Parcours de pratique',
    'journey.title': 'Transformez la curiosité en progrès concrets, jour après jour.',
    'journey.lead': 'Commencez par une séquence simple, conçue pour les débutants, pour un apprentissage structuré, visuel et accessible.',
    'v1.kicker': 'Leçon 1',
    'v1.count': '2 sur 5',
    'v1.title': 'Configurations de base',
    'step1.label': 'Étape 1',
    'step1.title': 'Apprendre les bases',
    'step1.text': 'Suivez un court parcours d’introduction pour comprendre les configurations de base et les signes du quotidien.',
    'v2.typed': 'fam',
    'v2.word': 'Famille',
    'cat.people': 'Personnes',
    'step2.label': 'Étape 2',
    'step2.title': 'Explorer le dictionnaire',
    'step2.text': 'Recherchez et comparez les signes en images pour reconnaître plus facilement chaque nouveau mot.',
    'v3.q': `Quel mot correspond à ce signe${nb}?`,
    'w.thankyou': 'Merci',
    'w.please': 'S’il vous plaît',
    'step3.label': 'Étape 3',
    'step3.title': 'Pratiquer en confiance',
    'step3.text': 'Utilisez de courts exercices et la répétition pour mémoriser et communiquer plus naturellement.',

    'dict.eyebrow': 'Dictionnaire',
    'dict.title': 'Explorez les signes avec un dictionnaire clair et facile à parcourir.',
    'dict.lead': 'Trouvez rapidement ce qu’il vous faut, étudiez en images et révisez au rythme qui vous convient.',
    'dict.flowLabel': 'Étapes d’utilisation du dictionnaire',
    'flow1.title': 'Chercher un mot',
    'flow1.text': 'Trouvez un signe par mot, catégorie ou thème.',
    'flow2.title': 'Voir le signe',
    'flow2.text': 'Apprenez en images grâce à des exemples détaillés, étape par étape.',
    'flow3.title': 'Pratiquer en images',
    'flow3.text': 'Étudiez à votre vitesse, sans pression.',
    'flow4.title': 'Garder pour réviser',
    'flow4.text': 'Révisez vos signes enregistrés à tout moment pour mieux les retenir.',
    'dict.try': 'Essayez chaque étape dans l’aperçu →',
    'dict.lsc': 'Dictionnaire LSC',
    'dict.soon': 'Bientôt disponible',
    'app.title': 'Dictionnaire',
    'app.saved': 'Enregistrés',
    'app.searchLabel': 'Rechercher un signe',
    'app.search': `Cherchez un mot, ex. «${nb}famille${nb}»`,
    'app.categories': 'Catégories',
    'detail.hint': 'Choisissez un signe pour voir comment il se forme.',
    'app.note': 'Aperçu interactif',

    'features.eyebrow': 'Pourquoi choisir Inclusign',
    'features.title': 'Des atouts qui donnent confiance, en un coup d’œil.',
    'features.lead': 'Une façon d’apprendre la langue des signes pensée pour les débutants — courte, visuelle et bienveillante dès la première leçon.',
    'features.alt': 'Un jeune homme au grand sourire, les deux mains ouvertes levées sur le côté.',
    'features.capKicker': 'Pourquoi Inclusign fonctionne',
    'features.cap': 'Des leçons courtes, ciblées et faciles à parcourir, même avec un emploi du temps chargé.',
    'f1.now': 'Vous',
    'f1.title': 'Commencer sans stress',
    'f1.text': 'Des premières leçons en douceur, faites pour les vrais débutants, pour prendre confiance un signe à la fois.',
    'cue.circle': 'Cercle',
    'cue.forward': 'Avant',
    'cue.tap': 'Tape',
    'f2.title': 'Apprendre d’abord en images',
    'f2.text': 'Des repères visuels simples rendent chaque mouvement plus facile à comprendre et à retenir.',
    'f3.again': 'Encore',
    'f3.got': 'Compris',
    'f3.title': 'Pratiquer avec clarté',
    'f3.text': 'Des outils de pratique bienveillants pour répéter et réviser sans vous sentir dépassé.',
    'd.mon': 'L', 'd.tue': 'M', 'd.wed': 'M', 'd.thu': 'J', 'd.fri': 'V', 'd.sat': 'S', 'd.sun': 'D',
    'f4.title': 'Progresser à votre rythme',
    'f4.text': 'Un parcours bienveillant qui s’adapte à une vie d’étudiant bien remplie — pratiquez quand cela vous convient.',

    'stories.eyebrow': 'Témoignages',
    'stories.title': 'De vrais débutants qui ont pris confiance ici.',
    'stories.lead': 'Quelques mots d’apprenants qui ont découvert que la langue des signes devient accessible avec un bon support visuel.',
    'q1.text': 'Je ne savais pas par où commencer, mais Inclusign a rendu les premiers pas clairs et faciles à suivre.',
    'q1.role': 'Étudiante à l’université',
    'q2.text': 'L’approche visuelle m’a aidé à retenir les signes bien plus vite que de longues explications écrites.',
    'q2.role': 'Apprenant débutant',
    'q3.text': 'J’ai aimé que tout soit accueillant et simple, au lieu d’être intimidant.',
    'q3.role': 'Élève du secondaire',

    'faq.eyebrow': 'FAQ',
    'faq.title': 'Questions fréquentes, réponses claires.',
    'faq.lead': 'Si vous découvrez la langue des signes, ces réponses rapides vous aideront à commencer sereinement avec Inclusign.',
    'faq.helpTitle': `Besoin d’un autre format ou d’un accompagnement${nb}?`,
    'faq.helpText': 'Écrivez-nous — nous serons ravis de vous aider.',
    'faq.helpLink': 'Nous écrire →',
    'faq.q1': `La langue des signes est-elle difficile à aborder quand on débute complètement${nb}?`,
    'faq.a1': 'Pas du tout. Inclusign commence par des bases simples et visuelles pour vous permettre de prendre confiance pas à pas, sans vous sentir dépassé.',
    'faq.q2': `Inclusign convient-il aux élèves, aux étudiants et aux débutants${nb}?`,
    'faq.a2': 'Oui. Les leçons et les exercices sont conçus spécialement pour les personnes qui débutent et qui veulent un accompagnement clair et une progression accessible.',
    'faq.q3': `Comment le dictionnaire m’aide-t-il à apprendre plus vite${nb}?`,
    'faq.a3': 'Vous pouvez explorer les signes par thème, comparer des gestes proches et consolider ce que vous venez d’apprendre grâce à une référence visuelle immédiate.',
    'faq.q4': `Puis-je apprendre à mon rythme${nb}?`,
    'faq.a4': `Absolument. Inclusign est conçu pour un apprentissage flexible${nb}: pratiquez par courtes séances, revenez sur l’essentiel et avancez quand vous êtes prêt.`,
    'faq.q5': `Quelle est la meilleure façon de commencer aujourd’hui${nb}?`,
    'faq.a5': 'Commencez par le parcours débutant, essayez quelques signes de base, puis utilisez le dictionnaire pour découvrir des mots proches et pratiquer chaque jour.',

    'cta.title': 'Prêt quand vous l’êtes — faites le premier pas en confiance.',
    'cta.text': 'Commencez dès aujourd’hui par le parcours débutant et prenez confiance, un signe à la fois.',
    'cta.polaroid': 'Premier signe, réussi.',

    'contact.eyebrow': 'Contact',
    'contact.title': 'Parlons-en — nous sommes là pour vous aider.',
    'contact.lead': `Une question, besoin d’un autre format ou envie de partager un avis${nb}? Envoyez un message et l’équipe Inclusign vous répondra.`,
    'contact.emailTitle': 'Écrivez-nous',
    'contact.formatTitle': `Besoin d’un autre format${nb}?`,
    'contact.formatText': 'Demandez un accompagnement ou un autre format — il suffit de le préciser dans votre message.',
    'contact.chatTitle': 'Réponses rapides',
    'contact.chatText': 'L’assistant peut répondre tout de suite aux questions fréquentes.',
    'contact.chatBtn': 'Ouvrir l’assistant',
    'social.linkedin': 'Inclusign sur LinkedIn (s’ouvre dans un nouvel onglet)',
    'form.title': 'Envoyer un message',
    'form.sub': 'Tous les champs sont obligatoires.',
    'form.name': 'Votre nom',
    'form.email': 'Adresse e-mail',
    'form.topic': `De quoi s’agit-il${nb}?`,
    'form.t1': 'Une question générale',
    'form.t2': 'De l’aide pour apprendre',
    'form.t3': 'Un autre format ou un accompagnement',
    'form.t4': 'Un avis ou une idée',
    'form.message': 'Message',
    'form.messagePh': 'Dites-nous en quelques mots ce dont vous avez besoin…',
    'form.send': 'Envoyer le message',
    'form.note': 'Nous utilisons vos coordonnées uniquement pour vous répondre.',
    'form.another': 'Écrire un autre message',

    'intro.skip': 'Passer l’intro',

    'chat.launch': 'Poser une question',
    'chat.title': 'Assistant Inclusign',
    'chat.sub': 'Réponses automatiques tirées de nos guides',
    'chat.reset': 'Recommencer',
    'chat.close': 'Fermer la discussion',
    'chat.inputLabel': 'Écrivez votre question',
    'chat.placeholder': 'Écrivez votre question…',
    'chat.send': 'Envoyer',
    'chat.foot': 'Assistant automatique · pour le reste, utilisez le formulaire de contact.',

    'footer.blurb': 'Apprendre la langue des signes doit être clair, accueillant et possible dès le premier jour. Merci d’apprendre avec nous.',
    'footer.contact': `Besoin d’un autre format ou d’un accompagnement${nb}? Écrivez-nous à`,
    'footer.learn': 'Apprendre',
    'footer.quick': 'Accès rapide',
    'footer.stories': 'Témoignages',
    'footer.top': 'Retour en haut',
    'footer.follow': 'Suivez-nous',

    'meta.title.team': 'L’équipe — Inclusign',
    'meta.description.team': 'Huit étudiants ingénieurs de l’ENSPD de Douala ont conçu et développé Inclusign.',
    'team.back': '← Retour à l’accueil',
    'team.eyebrow': 'L’équipe',
    'team.title': 'Les personnes derrière Inclusign.',
    'team.lead': 'Huit étudiants ingénieurs de l’ENSPD de Douala ont conçu et développé Inclusign — pour que la langue des signes soit claire, accueillante et accessible à toutes et tous, dès le premier jour.',
    'team.gridLabel': 'Membres de l’équipe',
    'team.ctaTitle': `Envie de travailler avec nous ou de partager une idée${nb}?`,
    'team.ctaText': 'Nous serions ravis d’avoir de vos nouvelles.',
    'team.ctaContact': 'Contacter l’équipe',
    'team.ctaHome': 'Découvrir Inclusign',
    'footer.copy': '© 2026 Inclusign · Ressources inclusives pour apprendre la langue des signes, pensées pour les débutants.',
  };

  // Strings used by scripts (not present in the HTML)
  const UI = {
    en: {
      words: ['Hello', 'Thank you', 'Please', 'Sorry', 'Family', 'Friend', 'School', 'Water', 'Good night', 'Yes', 'No', 'Help', 'Learn', 'Happy'],
      cats: { all: 'All', greetings: 'Greetings', people: 'People', feelings: 'Feelings', everyday: 'Everyday', school: 'School' },
      moves: { outward: 'Moves outward', forward: 'Moves forward', circle: 'Small circle', switch: 'Switch places', tap: 'Taps twice', lift: 'Up to the forehead' },
      how: 'How to sign it:',
      practice: 'Practice', practiced: 'Practiced',
      save: 'Save for review', saved: 'Saved',
      saveLabel: (w) => `Save “${w}” for review`,
      empty: 'No signs match that search yet. Try another word or category.',
      emptySaved: 'Nothing saved yet. Tap the bookmark on any sign to keep it for review.',
      count: (n) => `${n} ${n === 1 ? 'sign' : 'signs'} shown`,
      lscSoon: 'The LSC dictionary isn’t available yet — it’s coming soon.',
      form: {
        nameMissing: 'Please enter your name.',
        emailMissing: 'Please enter your email address.',
        emailInvalid: 'That email address doesn’t look quite right — please check it.',
        messageShort: 'Please write a short message (at least 10 characters).',
        sending: 'Sending…',
        sendError: (email) => `Sorry, your message couldn’t be sent. Please try again, or email us at ${email}.`,
        sentTitle: (name) => `Thanks, ${name}!`,
        sentText: (email) => `Your message is on its way. We’ll reply to ${email}.`,
        mailTitle: 'One last step',
        mailText: (email) => `Your email app should open with your message ready — just press send. If nothing opened, email us directly at ${email}.`,
        subject: (topic, name) => `[Inclusign] ${topic} — ${name}`,
        signoff: (name, email) => `\n\n— ${name} (${email})`,
      },
    },
    fr: {
      words: ['Bonjour', 'Merci', 'S’il vous plaît', 'Pardon', 'Famille', 'Ami', 'École', 'Eau', 'Bonne nuit', 'Oui', 'Non', 'Aider', 'Apprendre', 'Heureux'],
      cats: { all: 'Tous', greetings: 'Salutations', people: 'Personnes', feelings: 'Émotions', everyday: 'Quotidien', school: 'École' },
      moves: { outward: 'Vers l’extérieur', forward: 'Vers l’avant', circle: 'Petit cercle', switch: 'Inversion', tap: 'Deux tapes', lift: 'Vers le front' },
      how: `Comment le signer${nb}:`,
      practice: 'S’entraîner', practiced: 'Pratiqué',
      save: 'Garder pour réviser', saved: 'Enregistré',
      saveLabel: (w) => `Garder «${nb}${w}${nb}» pour réviser`,
      empty: 'Aucun signe ne correspond pour l’instant. Essayez un autre mot ou une autre catégorie.',
      emptySaved: 'Rien d’enregistré pour l’instant. Touchez le marque-page d’un signe pour le garder.',
      count: (n) => `${n} ${n === 1 ? 'signe affiché' : 'signes affichés'}`,
      lscSoon: 'Le dictionnaire LSC n’est pas encore disponible — il arrive bientôt.',
      form: {
        nameMissing: 'Veuillez indiquer votre nom.',
        emailMissing: 'Veuillez indiquer votre adresse e-mail.',
        emailInvalid: `Cette adresse e-mail semble incorrecte — pouvez-vous la vérifier${nb}?`,
        messageShort: 'Veuillez écrire un court message (10 caractères minimum).',
        sending: 'Envoi…',
        sendError: (email) => `Désolé, votre message n’a pas pu être envoyé. Réessayez, ou écrivez-nous à ${email}.`,
        sentTitle: (name) => `Merci, ${name}${nb}!`,
        sentText: (email) => `Votre message est en route. Nous répondrons à ${email}.`,
        mailTitle: 'Dernière étape',
        mailText: (email) => `Votre messagerie devrait s’ouvrir avec votre message prêt — il ne reste qu’à l’envoyer. Rien ne s’est ouvert${nb}? Écrivez-nous directement à ${email}.`,
        subject: (topic, name) => `[Inclusign] ${topic} — ${name}`,
        signoff: (name, email) => `\n\n— ${name} (${email})`,
      },
    },
  };

  const PAGE = document.body.dataset.page || 'home';
  const META_TITLE = PAGE === 'home' ? 'meta.title' : `meta.title.${PAGE}`;
  const META_DESC = PAGE === 'home' ? 'meta.description' : `meta.description.${PAGE}`;
  const EN = {
    [META_TITLE]: document.title,
    [META_DESC]: $('meta[name="description"]')?.content || '',
  };
  $$('[data-i18n]').forEach((el) => { EN[el.dataset.i18n] ??= el.innerHTML; });
  // The chat helper answers from these on every page, including pages that don't show the FAQ
  Object.entries({
    'hero.lead': "Start with beginner-first lessons, explore signs visually, and build everyday confidence at your own pace with Inclusign’s interactive learning tools.",
    'faq.a1': "Not at all. Inclusign starts with simple, visual foundations so you can build confidence step by step without feeling overwhelmed.",
    'faq.a2': "Yes. The lessons and practice flow are designed specifically for early-stage learners who want clear guidance and approachable progress.",
    'faq.a3': "You can quickly explore signs by topic, compare similar gestures, and reinforce what you just learned with immediate visual reference.",
    'faq.a4': "Absolutely. Inclusign is built for flexible learning, so you can practice in short sessions, revisit essentials, and move forward when ready.",
    'faq.a5': "Start with the beginner path, try a few core signs, then use the dictionary to explore related terms and build daily consistency.",
  }).forEach(([key, value]) => { EN[key] ??= value; });
  $$('[data-i18n-attr]').forEach((el) => {
    el.dataset.i18nAttr.split(';').forEach((pair) => {
      const [attr, key] = pair.split(':');
      EN[key] ??= el.getAttribute(attr) || '';
    });
  });

  let lang = 'en';
  const t = (key) => (lang === 'fr' && FR[key] != null ? FR[key] : EN[key]);
  const ui = () => UI[lang];
  const langListeners = [];

  function setLang(next) {
    lang = next === 'fr' ? 'fr' : 'en';
    root.lang = lang;
    document.title = t(META_TITLE);
    $('meta[name="description"]')?.setAttribute('content', t(META_DESC));

    $$('[data-i18n]').forEach((el) => {
      const value = t(el.dataset.i18n);
      if (value != null && el.innerHTML !== value) el.innerHTML = value;
    });
    $$('[data-i18n-attr]').forEach((el) => {
      el.dataset.i18nAttr.split(';').forEach((pair) => {
        const [attr, key] = pair.split(':');
        el.setAttribute(attr, t(key));
      });
    });
    $$('[data-lang]').forEach((btn) => btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang)));
    store.set('inclusign-lang', lang);
    langListeners.forEach((fn) => fn());
  }

  $$('[data-lang]').forEach((btn) => btn.addEventListener('click', () => setLang(btn.dataset.lang)));

  /* ---------------------------------------------------------
     2. Theme — the <head> script sets data-theme before paint;
     this keeps the controls in sync and saves the choice.
     --------------------------------------------------------- */
  const themeMeta = $('meta[name="theme-color"]');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function syncThemeUI() {
    const dark = root.dataset.theme === 'dark';
    $$('[data-theme-toggle]').forEach((b) => b.setAttribute('aria-pressed', String(dark)));
    $$('[data-theme-set]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.themeSet === root.dataset.theme)));
    themeMeta?.setAttribute('content', dark ? '#0B1A33' : '#EAF5FF');
  }

  // The theme we're switching to — kept separately so quick double-clicks never flip the wrong way
  let themeTarget = root.dataset.theme;

  function setTheme(theme, persist = true) {
    if (persist) store.set('inclusign-theme', theme);
    if (theme === themeTarget) return;
    themeTarget = theme;
    const apply = () => {
      if (root.dataset.theme === themeTarget) return;
      root.dataset.theme = themeTarget;
      syncThemeUI();
    };
    if (document.startViewTransition && !reduceMotion.matches) {
      root.dataset.themeSwitch = theme; // picks the slide direction in CSS
      const vt = document.startViewTransition(apply);
      // The theme still applies if the animation is skipped; ignore those rejections
      [vt.ready, vt.updateCallbackDone].forEach((p) => p?.catch(() => {}));
      vt.finished.catch(() => {}).finally(() => {
        if (root.dataset.themeSwitch === theme) delete root.dataset.themeSwitch;
      });
      setTimeout(apply, 400); // safety net if the animation never gets a frame
    } else {
      apply();
    }
  }

  $$('[data-theme-toggle]').forEach((b) => b.addEventListener('click', () => setTheme(themeTarget === 'dark' ? 'light' : 'dark')));
  $$('[data-theme-set]').forEach((b) => b.addEventListener('click', () => setTheme(b.dataset.themeSet)));
  systemDark.addEventListener('change', (e) => {
    if (!store.get('inclusign-theme')) setTheme(e.matches ? 'dark' : 'light', false);
  });
  syncThemeUI();

  /* ---------------------------------------------------------
     3. Navigation
     --------------------------------------------------------- */
  const nav = $('#nav');
  const menuBtn = $('.menu-btn');
  const menu = $('#mobile-menu');

  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 12);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    menuBtn.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
  }
  menuBtn.addEventListener('click', () => setMenu(menu.hidden));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) { setMenu(false); menuBtn.focus(); }
  });
  document.addEventListener('click', (e) => {
    if (!menu.hidden && !nav.contains(e.target)) setMenu(false);
  });
  window.matchMedia('(min-width: 1081px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

  // Sections like #contact live on the home page; from other pages, go there instead
  const HOME = 'index.html';
  const session = {
    get(key) { try { return sessionStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { sessionStorage.setItem(key, value); } catch { /* unavailable */ } },
    take(key) { const v = this.get(key); try { sessionStorage.removeItem(key); } catch { /* unavailable */ } return v; },
  };

  function goTo(selector, focusEl) {
    const target = $(selector);
    if (!target) { window.location.href = HOME + selector; return; }
    target.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
    if (focusEl) setTimeout(() => focusEl.focus({ preventScroll: true }), reduceMotion.matches ? 0 : 450);
  }

  /* ---------------------------------------------------------
     Logo motion — the starting page on first visit, and a replay
     whenever the logo is clicked. The mark assembles, then the
     curtain lifts while the logo glides into its place in the nav.
     --------------------------------------------------------- */
  const show = $('[data-logo-show]');
  const showImgs = show ? $$('img[data-light]', show) : [];
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  let showReady = null;
  let showTheme = null;
  let showPlaying = false;
  let showLeaving = false;
  let showTimer = 0;
  let flights = [];

  // Load the layers for the current theme (only once per theme)
  function loadShow() {
    const theme = root.dataset.theme;
    if (showReady && showTheme === theme) return showReady;
    showTheme = theme;
    showImgs.forEach((img) => { img.src = theme === 'dark' ? img.dataset.dark : img.dataset.light; });
    showReady = Promise.all(showImgs.map((img) => img.decode().catch(() => {})));
    return showReady;
  }

  const firstVisible = (selector) => $$(selector).find((el) => el.getClientRects().length > 0);

  function finishShow() {
    show.hidden = true;
    root.classList.remove('logo-landing');
    show.classList.remove('is-on', 'is-playing', 'is-leaving', 'is-flying', 'is-intro');
    flights.forEach((a) => a.cancel());
    flights = [];
    showPlaying = false;
    showLeaving = false;
  }

  // fly = true: glide the logo into the nav; false: quick fade (used when skipping)
  function exitShow(fly) {
    if (!showPlaying || showLeaving) return;
    showLeaving = true;
    clearTimeout(showTimer);
    root.classList.remove('intro'); // unlock scrolling and start the hero entrance
    // Opened on a section link (e.g. /#contact)? Land exactly on it now that the page has settled
    const linked = location.hash.length > 1 && document.getElementById(location.hash.slice(1));
    if (linked) linked.scrollIntoView({ behavior: 'instant', block: 'start' });

    if (!fly) {
      show.classList.add('is-leaving');
      setTimeout(finishShow, 450);
      return;
    }
    // The symbol flies home to the nav; everything else fades away in place
    const mark = $('.ls-mark', show);
    const target = firstVisible('.brand .logo-mark');
    if (mark && target) {
      const a = mark.getBoundingClientRect();
      const b = target.getBoundingClientRect();
      flights.push(mark.animate([
        { transformOrigin: '0 0', transform: 'none' },
        { transformOrigin: '0 0', transform: `translate(${b.left - a.left}px, ${b.top - a.top}px) scale(${b.width / a.width})` },
      ], { duration: 900, easing: 'cubic-bezier(.7, 0, .2, 1)', fill: 'forwards' }));
      root.classList.add('logo-landing'); // hide the nav symbol until this one lands on it
    }
    [['.ls-word', 'translateY(-8px) scale(.97)'], ['.ls-tag'], ['.ls-progress'], ['.ls-skip']].forEach(([sel, transform]) => {
      const el = $(sel, show);
      const end = transform ? { opacity: 0, transform } : { opacity: 0 };
      if (el) flights.push(el.animate([{ opacity: 1 }, end], { duration: 320, easing: 'ease', fill: 'forwards' }));
    });
    show.classList.add('is-flying');
    setTimeout(finishShow, 950);
  }

  async function playShow({ intro = false } = {}) {
    if (showPlaying) return;
    showPlaying = true;
    const ready = loadShow();
    show.classList.toggle('is-intro', intro);
    show.hidden = false;
    if (intro) {
      // Already covering the page from the first paint; wait for the layers (up to a limit)
      show.classList.add('is-on');
      await Promise.race([ready, wait(1500)]);
    } else {
      void show.offsetWidth; // let the fade-in transition start from 0
      show.classList.add('is-on');
      await Promise.all([wait(300), Promise.race([ready, wait(900)])]);
      if (showPlaying && !showLeaving) window.scrollTo({ top: 0, behavior: 'instant' });
    }
    if (!showPlaying || showLeaving) return;
    show.classList.add('is-playing');
    showTimer = setTimeout(() => exitShow(true), 2650);
  }

  if (show) {
    $$('.brand').forEach((link) => {
      link.addEventListener('pointerenter', loadShow, { once: true });
      link.addEventListener('focus', loadShow, { once: true });
      link.addEventListener('click', (e) => {
        if (reduceMotion.matches) return; // plain jump to the top instead
        e.preventDefault();
        setMenu(false);
        playShow();
      });
    });

    // Skipping: click, Escape — and on the starting page, any key, wheel or touch
    const skipShow = () => { if (showPlaying) exitShow(false); };
    show.addEventListener('click', skipShow);
    document.addEventListener('keydown', (e) => {
      if (!showPlaying) return;
      const isModifier = ['Shift', 'Control', 'Alt', 'Meta'].includes(e.key);
      if (e.key === 'Escape' || (show.classList.contains('is-intro') && !isModifier)) skipShow();
    });
    ['wheel', 'touchstart'].forEach((type) => window.addEventListener(type, () => {
      if (show.classList.contains('is-intro')) skipShow();
    }, { passive: true }));

    // Warm the layers up once the page is idle, so the first click is instant
    window.addEventListener('load', () => {
      (window.requestIdleCallback || ((fn) => setTimeout(fn, 2500)))(() => loadShow());
    });
  }

  /* ---------------------------------------------------------
     4. Ticker
     --------------------------------------------------------- */
  const ticker = $('[data-ticker]');
  function renderTicker() {
    const words = ui().words;
    const item = (w, hidden) => `<li${hidden ? ' aria-hidden="true"' : ''}>${w}</li>`;
    // Two copies so the loop is seamless; the second copy is hidden from assistive tech.
    ticker.innerHTML = words.map((w) => item(w, false)).join('') + words.map((w) => item(w, true)).join('');
  }
  if (ticker) langListeners.push(renderTicker);

  /* ---------------------------------------------------------
     Team page — cards are built from TEAM (top of this file)
     --------------------------------------------------------- */
  const teamGrid = $('[data-team]');
  if (teamGrid) {
    const LI_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>';
    const initials = (name) => name.trim().split(/\s+/).slice(0, 2).map((w) => w[0] || '').join('').toUpperCase();
    teamGrid.innerHTML = TEAM.map((m, i) => `
      <li class="member" style="--i:${i}">
        <div class="member-photo tint-${i % 4}${m.photo ? '' : ' is-initials'}">
          ${m.photo
            ? `<img src="${esc(m.photo)}" alt="" loading="lazy" width="600" height="750" />`
            : `<span class="member-initials" aria-hidden="true">${esc(initials(m.name))}</span>`}
        </div>
        <div class="member-body">
          <h3 class="member-name">${esc(m.name)}</h3>
          <p class="member-role" data-member-role="${i}"></p>
          <p class="member-bio" data-member-bio="${i}"></p>
          ${m.linkedin ? `<a class="social-btn member-link" href="${esc(m.linkedin)}" target="_blank" rel="noopener noreferrer" data-member-link="${i}">${LI_ICON}</a>` : ''}
        </div>
      </li>`).join('');
    // Text that changes with the language is updated in place (so cards don't re-animate)
    const renderTeamText = () => TEAM.forEach((m, i) => {
      $(`[data-member-role="${i}"]`, teamGrid).textContent = m.role[lang] || m.role.en;
      $(`[data-member-bio="${i}"]`, teamGrid).textContent = m.bio[lang] || m.bio.en;
      const link = $(`[data-member-link="${i}"]`, teamGrid);
      if (link) link.setAttribute('aria-label', lang === 'fr' ? `${m.name} sur LinkedIn (s’ouvre dans un nouvel onglet)` : `${m.name} on LinkedIn (opens in a new tab)`);
    });
    langListeners.push(renderTeamText);
  }

  /* ---------------------------------------------------------
     5. Scroll reveal + active nav link
     --------------------------------------------------------- */
  const reveals = $$('.reveal');
  const unrevealed = new Set(reveals);
  let io = null;
  const reveal = (el) => { el.classList.add('in'); unrevealed.delete(el); if (io) io.unobserve(el); };

  // Safety net: some phones skip observer callbacks during fast swipes, so also check on scroll —
  // a section can never stay invisible once it's on screen. Printing shows everything.
  let sweeping = false;
  const sweep = () => {
    sweeping = false;
    const limit = window.innerHeight * 0.95;
    unrevealed.forEach((el) => { if (el.getBoundingClientRect().top < limit) reveal(el); });
    if (!unrevealed.size) window.removeEventListener('scroll', onRevealScroll);
  };
  const onRevealScroll = () => { if (!sweeping) { sweeping = true; setTimeout(sweep, 120); } };
  window.addEventListener('scroll', onRevealScroll, { passive: true });
  window.addEventListener('load', () => setTimeout(sweep, 300));
  window.addEventListener('beforeprint', () => unrevealed.forEach(reveal));

  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) reveal(entry.target); });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    reveals.forEach((el) => io.observe(el));

    const links = $$('.nav-links a');
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['learning-features', 'dictionary-overview', 'practice-journey', 'common-questions', 'contact', 'hero-learning']
      .forEach((id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  } else {
    reveals.forEach(reveal);
  }

  /* ---------------------------------------------------------
     6. Dictionary preview
     Sign descriptions are short written guides shown in the
     demo; replace them with entries from your own dictionary.
     --------------------------------------------------------- */
  const SIGNS = [
    { id: 'hello', cat: 'greetings', move: 'outward', en: 'Hello', fr: 'Bonjour', alias: ['hi', 'hey', 'salut'],
      how: { en: 'A flat hand starts at your temple and moves outward, like a small salute.',
             fr: 'La main à plat part de la tempe et s’éloigne vers l’avant, comme un petit salut.' } },
    { id: 'thanks', cat: 'greetings', move: 'forward', en: 'Thank you', fr: 'Merci', alias: ['thanks', 'thank'],
      how: { en: 'Fingertips of a flat hand touch your chin, then move forward toward the other person.',
             fr: 'Le bout des doigts de la main à plat touche le menton, puis avance vers l’autre personne.' } },
    { id: 'please', cat: 'everyday', move: 'circle', en: 'Please', fr: 'S’il vous plaît', alias: ['s il te plait', 'svp', 'stp'],
      how: { en: 'A flat hand rests on your chest and moves in a small circle.',
             fr: 'La main à plat, posée sur la poitrine, décrit un petit cercle.' } },
    { id: 'sorry', cat: 'feelings', move: 'circle', en: 'Sorry', fr: 'Pardon', alias: ['desole', 'desolee', 'excuse me', 'apologize'],
      how: { en: 'A closed fist moves in a small circle on your chest.',
             fr: 'Le poing fermé décrit un petit cercle sur la poitrine.' } },
    { id: 'friend', cat: 'people', move: 'switch', en: 'Friend', fr: 'Ami', alias: ['friends', 'amie', 'amis', 'amies', 'copain', 'copine'],
      how: { en: 'Hook your index fingers together, then switch which one is on top.',
             fr: 'Accrochez les deux index l’un à l’autre, puis inversez celui du dessus.' } },
    { id: 'family', cat: 'people', move: 'circle', en: 'Family', fr: 'Famille', alias: ['families', 'familles'],
      how: { en: 'Both hands make an F shape and trace a circle forward until the little fingers meet.',
             fr: 'Les deux mains en forme de F tracent un cercle vers l’avant jusqu’à ce que les auriculaires se rejoignent.' } },
    { id: 'school', cat: 'school', move: 'tap', en: 'School', fr: 'École', alias: ['schools', 'ecoles'],
      how: { en: 'Clap your flat hands together twice, top palm facing down.',
             fr: 'Frappez deux fois les mains à plat l’une contre l’autre, paume du dessus vers le bas.' } },
    { id: 'learn', cat: 'school', move: 'lift', en: 'Learn', fr: 'Apprendre', alias: ['learning', 'apprends'],
      how: { en: 'Pick up from your open palm and bring your gathered fingertips to your forehead.',
             fr: 'Prenez dans la paume ouverte et portez le bout des doigts réunis jusqu’au front.' } },
    { id: 'water', cat: 'everyday', move: 'tap', en: 'Water', fr: 'Eau', alias: [],
      how: { en: 'Make a W shape and tap your index finger against your chin twice.',
             fr: 'Formez un W et tapotez deux fois le menton avec l’index.' } },
  ];
  const CATS = ['all', 'greetings', 'people', 'feelings', 'everyday', 'school'];
  const TINT = { greetings: 'var(--sun-soft)', people: 'var(--blue-soft)', feelings: 'var(--peach)', everyday: 'var(--sage)', school: 'var(--sand)' };
  const GLYPH = {
    outward: '<path d="M5 7v10"/><path d="M8 12h11"/><path d="M15 8l4 4-4 4"/>',
    forward: '<path d="M5 18c2.5-7 7-10 14-10"/><path d="M15 4.5 19 8l-3.5 4"/>',
    circle: '<path d="M19 12a7 7 0 1 1-2.05-4.95"/><path d="M19 4v4h-4"/>',
    switch: '<path d="M4 9h14"/><path d="M15 6l3 3-3 3"/><path d="M20 15H6"/><path d="M9 12l-3 3 3 3"/>',
    tap: '<path d="M12 4v10"/><path d="M8 10.5 12 14.5l4-4"/><path d="M7.5 18.5h9"/>',
    lift: '<path d="M12 20V6"/><path d="M7 11l5-5 5 5"/>',
  };
  const ICON = {
    bookmark: '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h10v16l-5-3.5L7 20z"/></svg>',
    check: '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    repeat: '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12a7 7 0 1 1-2.05-4.95"/><path d="M19 4v4h-4"/></svg>',
  };
  const glyph = (move) => `<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">${GLYPH[move]}</svg>`;
  const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[’']/g, '');

  // From pages without the dictionary, open it on the home page instead
  let openSign = (id) => {
    session.set('inclusign-open-sign', id);
    window.location.href = `${HOME}#dictionary-overview`;
  };

  const app = $('#dict-app');
  if (app) {
    const els = {
      search: $('[data-search]', app),
      chips: $('[data-chips]', app),
      grid: $('[data-grid]', app),
      empty: $('[data-empty]', app),
      detail: $('[data-detail]', app),
      status: $('[data-results-status]', app),
      savedToggle: $('[data-saved-toggle]', app),
      savedCount: $('[data-saved-count]', app),
    };
    const state = { q: '', cat: 'all', savedOnly: false, selected: null, saved: new Set(), practiced: new Set() };
    const flowDone = new Set();

    function markFlow(step) {
      if (flowDone.has(step)) return;
      flowDone.add(step);
      $(`[data-flow="${step}"]`)?.classList.add('is-done');
    }

    function renderChips() {
      els.chips.innerHTML = CATS.map((c) =>
        `<button type="button" class="chip" data-cat="${c}" aria-pressed="${state.cat === c}">${ui().cats[c]}</button>`
      ).join('');
    }

    function visibleSigns() {
      const q = norm(state.q.trim());
      return SIGNS.filter((s) =>
        (state.cat === 'all' || s.cat === state.cat) &&
        (!state.savedOnly || state.saved.has(s.id)) &&
        (!q || norm(s.en).includes(q) || norm(s.fr).includes(q) || norm(ui().cats[s.cat]).includes(q))
      );
    }

    function renderGrid() {
      const list = visibleSigns();
      els.grid.innerHTML = list.map((s) => {
        const word = s[lang];
        const saved = state.saved.has(s.id);
        return `<li class="sign${state.selected === s.id ? ' is-selected' : ''}" style="--tint:${TINT[s.cat]}">
          <button type="button" class="sign-open" data-open="${s.id}" aria-pressed="${state.selected === s.id}">
            <span class="sign-glyph">${glyph(s.move)}</span>
            <span><span class="sign-word">${esc(word)}</span><span class="sign-cat">${ui().cats[s.cat]}</span></span>
          </button>
          <button type="button" class="sign-save" data-save="${s.id}" aria-pressed="${saved}" aria-label="${esc(ui().saveLabel(word))}">${ICON.bookmark}</button>
        </li>`;
      }).join('');

      els.empty.hidden = list.length > 0;
      els.empty.textContent = state.savedOnly && state.saved.size === 0 ? ui().emptySaved : ui().empty;
      els.status.textContent = ui().count(list.length);
    }

    function renderDetail(animate) {
      const s = SIGNS.find((x) => x.id === state.selected);
      els.detail.classList.toggle('fade-in', Boolean(animate));
      if (!s) {
        els.detail.innerHTML = `<p class="detail-hint" data-i18n="detail.hint">${t('detail.hint')}</p>`;
        return;
      }
      const practiced = state.practiced.has(s.id);
      const saved = state.saved.has(s.id);
      els.detail.innerHTML = `
        <div class="detail-head">
          <span class="sign-glyph" style="--tint:${TINT[s.cat]}">${glyph(s.move)}</span>
          <div><p class="detail-word">${esc(s[lang])}</p><p class="detail-meta">${ui().cats[s.cat]} · ${ui().moves[s.move]}</p></div>
        </div>
        <p class="detail-how"><b>${ui().how}</b> ${esc(s.how[lang])}</p>
        <div class="detail-actions">
          <button type="button" class="d-btn ${practiced ? '' : 'primary'}" data-practice="${s.id}" aria-pressed="${practiced}">
            ${practiced ? ICON.check : ICON.repeat}<span>${practiced ? ui().practiced : ui().practice}</span>
          </button>
          <button type="button" class="d-btn save" data-save="${s.id}" aria-pressed="${saved}">
            ${ICON.bookmark}<span>${saved ? ui().saved : ui().save}</span>
          </button>
        </div>`;
      if (animate) requestAnimationFrame(() => els.detail.classList.remove('fade-in'));
    }

    function renderSavedCount(bump) {
      els.savedCount.textContent = state.saved.size;
      if (bump) {
        els.savedToggle.classList.remove('bump');
        void els.savedToggle.offsetWidth; // restart animation
        els.savedToggle.classList.add('bump');
      }
    }

    function renderAll() {
      renderChips();
      renderGrid();
      renderDetail(false);
    }

    // Keep focus on the same control after a re-render
    function refocus(selector) {
      const el = $(selector, app);
      if (el) el.focus({ preventScroll: true });
    }

    // Used by the chat helper: clear filters, select a sign and bring it into view
    openSign = (id) => {
      state.q = '';
      state.cat = 'all';
      state.savedOnly = false;
      state.selected = id;
      els.search.value = '';
      els.savedToggle.setAttribute('aria-pressed', 'false');
      markFlow('view');
      renderAll();
      renderDetail(true);
      els.detail.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'center' });
    };

    els.search.addEventListener('input', () => {
      state.q = els.search.value;
      if (state.q.trim()) markFlow('search');
      renderGrid();
    });

    els.chips.addEventListener('click', (e) => {
      const chip = e.target.closest('[data-cat]');
      if (!chip) return;
      state.cat = chip.dataset.cat;
      if (state.cat !== 'all') markFlow('search');
      renderChips();
      renderGrid();
      refocus(`[data-cat="${state.cat}"]`);
    });

    els.savedToggle.addEventListener('click', () => {
      state.savedOnly = !state.savedOnly;
      els.savedToggle.setAttribute('aria-pressed', String(state.savedOnly));
      renderGrid();
    });

    app.addEventListener('click', (e) => {
      const open = e.target.closest('[data-open]');
      const save = e.target.closest('[data-save]');
      const practice = e.target.closest('[data-practice]');

      if (open) {
        state.selected = open.dataset.open;
        markFlow('view');
        renderGrid();
        renderDetail(true);
        refocus(`[data-open="${state.selected}"]`);
      } else if (save) {
        const id = save.dataset.save;
        const fromDetail = Boolean(save.closest('[data-detail]'));
        if (state.saved.has(id)) state.saved.delete(id);
        else { state.saved.add(id); markFlow('save'); }
        renderSavedCount(state.saved.has(id));
        renderGrid();
        renderDetail(false);
        refocus(fromDetail ? '[data-detail] [data-save]' : `.sign-grid [data-save="${id}"]`);
      } else if (practice) {
        const id = practice.dataset.practice;
        if (state.practiced.has(id)) state.practiced.delete(id);
        else { state.practiced.add(id); markFlow('practice'); }
        renderDetail(false);
        refocus('[data-practice]');
      }
    });

    // Press "/" anywhere to jump to the dictionary search
    document.addEventListener('keydown', (e) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = document.activeElement;
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || el.isContentEditable)) return;
      e.preventDefault();
      els.search.scrollIntoView({ behavior: 'smooth', block: 'center' });
      els.search.focus({ preventScroll: true });
    });

    langListeners.push(renderAll);

    // A sign requested from another page (via the chat helper)
    const carriedSign = session.take('inclusign-open-sign');
    if (carriedSign && SIGNS.some((x) => x.id === carriedSign)) window.addEventListener('load', () => openSign(carriedSign));
  }

  /* ---------------------------------------------------------
     LSC dictionary link — "Coming soon" until CONFIG.lscDictionaryUrl is set
     --------------------------------------------------------- */
  const lscLink = $('[data-lsc-link]');
  if (lscLink) {
    const lscNote = $('[data-lsc-note]');
    if (CONFIG.lscDictionaryUrl) {
      lscLink.href = CONFIG.lscDictionaryUrl;
      lscLink.removeAttribute('aria-disabled');
      lscLink.classList.add('is-live');
      $('[data-lsc-badge]', lscLink)?.remove();
    } else {
      let shown = false;
      lscLink.addEventListener('click', (e) => {
        e.preventDefault();
        shown = true;
        lscNote.textContent = ui().lscSoon;
        lscNote.classList.add('is-shown');
        lscLink.classList.remove('nudge');
        void lscLink.offsetWidth; // restart the little nudge
        lscLink.classList.add('nudge');
      });
      langListeners.push(() => { if (shown) lscNote.textContent = ui().lscSoon; });
    }
  }

  /* ---------------------------------------------------------
     7. Contact form
     --------------------------------------------------------- */
  // From pages without the form, carry the request over to the home page
  let openContact = (prefill = {}) => {
    session.set('inclusign-prefill', JSON.stringify(prefill));
    window.location.href = `${HOME}#contact`;
  };

  const form = $('[data-contact-form]');
  if (form) {
    const statusBox = $('[data-form-status]');
    const formError = $('[data-form-error]');
    const submitBtn = $('[data-submit]');
    const topicSelect = $('#cf-topic');
    const fields = { name: $('#cf-name'), email: $('#cf-email'), message: $('#cf-message') };
    let submitted = false;
    let lastStatus = null;

    function fieldError(key) {
      const value = fields[key].value.trim();
      const m = ui().form;
      if (key === 'name') return value ? '' : m.nameMissing;
      if (key === 'email') {
        if (!value) return m.emailMissing;
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) ? '' : m.emailInvalid;
      }
      return value.length >= 10 ? '' : m.messageShort;
    }

    function showFieldError(key, message) {
      const input = fields[key];
      const box = $(`#${input.id}-err`);
      input.setAttribute('aria-invalid', String(Boolean(message)));
      box.textContent = message;
      box.hidden = !message;
    }

    function validateAll() {
      let firstInvalid = null;
      Object.keys(fields).forEach((key) => {
        const message = fieldError(key);
        showFieldError(key, message);
        if (message && !firstInvalid) firstInvalid = fields[key];
      });
      return firstInvalid;
    }

    // Validate live only after the first submit attempt, so people aren't scolded while typing
    Object.keys(fields).forEach((key) => {
      fields[key].addEventListener('input', () => { if (submitted) showFieldError(key, fieldError(key)); });
    });
    fields.email.addEventListener('blur', () => {
      if (fields.email.value.trim()) showFieldError('email', fieldError('email'));
    });

    function setSending(on) {
      submitBtn.disabled = on;
      const label = $('span', submitBtn);
      label.textContent = on ? ui().form.sending : t('form.send');
      $('.arr', submitBtn).style.display = on ? 'none' : '';
      $('.spinner', submitBtn)?.remove();
      if (on) submitBtn.insertAdjacentHTML('beforeend', '<span class="spinner" aria-hidden="true"></span>');
    }

    function renderStatus() {
      if (!lastStatus) return;
      const m = ui().form;
      const { kind, data } = lastStatus;
      $('[data-status-title]', statusBox).textContent = kind === 'sent' ? m.sentTitle(data.name) : m.mailTitle;
      $('[data-status-text]', statusBox).innerHTML = kind === 'sent'
        ? esc(m.sentText(data.email))
        : linkEmail(esc(m.mailText(CONFIG.contactEmail)));
    }

    function showStatus(kind, data) {
      lastStatus = { kind, data };
      renderStatus();
      form.hidden = true;
      statusBox.hidden = false;
      statusBox.focus();
    }

    function resetForm() {
      form.reset();
      submitted = false;
      lastStatus = null;
      Object.keys(fields).forEach((key) => showFieldError(key, ''));
      formError.hidden = true;
      statusBox.hidden = true;
      form.hidden = false;
      fields.name.focus();
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      submitted = true;
      formError.hidden = true;
      const firstInvalid = validateAll();
      if (firstInvalid) { firstInvalid.focus(); return; }

      const data = {
        name: fields.name.value.trim(),
        email: fields.email.value.trim(),
        topic: topicSelect.options[topicSelect.selectedIndex].text,
        message: fields.message.value.trim(),
      };
      const m = ui().form;

      if (CONFIG.contactEndpoint) {
        setSending(true);
        try {
          const body = new FormData(form);
          body.append('_subject', m.subject(data.topic, data.name));
          const res = await fetch(CONFIG.contactEndpoint, { method: 'POST', body, headers: { Accept: 'application/json' } });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          showStatus('sent', data);
        } catch {
          formError.innerHTML = linkEmail(esc(m.sendError(CONFIG.contactEmail)));
          formError.hidden = false;
        } finally {
          setSending(false);
        }
      } else {
        // No backend: hand the message to the visitor's email app
        const subject = encodeURIComponent(m.subject(data.topic, data.name));
        const body = encodeURIComponent(data.message + m.signoff(data.name, data.email));
        window.location.href = `mailto:${CONFIG.contactEmail}?subject=${subject}&body=${body}`;
        showStatus('mail', data);
      }
    });

    $('[data-form-reset]').addEventListener('click', resetForm);

    function prefillContact({ topic, message } = {}) {
      if (topic) topicSelect.value = topic;
      if (message && !fields.message.value.trim()) fields.message.value = message;
    }

    openContact = (prefill = {}) => {
      prefillContact(prefill);
      goTo('#contact', form.hidden ? statusBox : fields.name);
    };

    // A request carried over from another page
    const carried = session.take('inclusign-prefill');
    if (carried) { try { prefillContact(JSON.parse(carried)); } catch { /* ignore */ } }

    langListeners.push(() => {
      if (submitted) Object.keys(fields).forEach((key) => {
        if (fields[key].getAttribute('aria-invalid') === 'true') showFieldError(key, fieldError(key));
      });
      if (lastStatus) renderStatus();
    });
  }

  /* ---------------------------------------------------------
     8. Chat helper
     A built-in, rule-based assistant: it answers from the FAQ,
     the dictionary and a few site facts. No data leaves the page.
     --------------------------------------------------------- */
  const BOT = {
    en: {
      q: {
        start: 'How do I start?',
        hard: 'Is it hard for beginners?',
        pace: 'Can I learn at my own pace?',
        signs: 'Which signs can you show me?',
        signThanks: 'How do I sign “thank you”?',
        signWater: 'How do I sign “water”?',
        signWord: (w) => `How do I sign “${w}”?`,
      },
      a: {
        journey: 'Show me the learning path',
        dict: 'Open the dictionary',
        contact: 'Go to the contact form',
        openSign: 'Open it in the dictionary',
        themeNow: 'Switch it now',
        langSwitch: 'Switch to English',
        linkedin: 'Open our LinkedIn',
        team: 'Meet the team',
      },
      team: 'Inclusign was designed and built by a core team — you can meet them on the Team page.',
      social: 'You can follow Inclusign on LinkedIn for news and updates.',
      greeting: 'Hi! I’m the Inclusign helper. I can answer questions about getting started, the dictionary and learning at your own pace — and show you how to sign a few everyday words.\nWhat would you like to know?',
      hello: 'Hello! What can I help you with today?',
      thanks: 'You’re welcome! Anything else I can help with?',
      bye: 'Bye for now — happy signing!',
      ok: 'Great! Anything else you’d like to know?',
      about: () => `Inclusign helps beginners learn sign language in a clear, friendly way.\n${t('hero.lead')}`,
      practice: 'Practice works best in short, regular sessions. In the dictionary you can open a sign, mark it as practiced, and save it to review later.',
      price: 'I don’t have pricing details in my guides. The team can tell you exactly — would you like to send them a message?',
      account: 'I can’t see accounts from here. For sign-up or account questions, the team can help you directly.',
      whichSL: 'Good question! The team can confirm exactly which sign language each lesson covers — just send them a quick message.',
      format: 'Need a different format or extra support? The team will do their best to help. Use the contact form and mention what you need.',
      contact: (email) => `You can reach the Inclusign team through the contact form, or by email at ${email}.`,
      bot: 'I’m an automated helper — I answer from Inclusign’s guides, so I can’t see your account or personal details. For anything specific, the team is one message away.',
      theme: 'Use the sun / moon button at the top of the page to switch between light and dark mode.',
      themeDone: (dark) => (dark ? 'Done — dark mode is on.' : 'Done — light mode is on.'),
      lang: 'Inclusign is available in English and French. Use EN / FR at the top of the page, or tap below.',
      langDone: 'Done — the site is now in English.',
      signList: 'Here are the signs I can show you right now. Tap one:',
      unknownSign: 'I can only show a few starter signs here — the full Inclusign dictionary has many more. Try one of these:',
      sign: (word, move, how) => `**${word}** · ${move}\n${how}`,
      fallback: 'Sorry, I’m not sure about that one. I can help with getting started, the dictionary, learning at your pace, or a few everyday signs — or you can ask the team directly.',
    },
    fr: {
      q: {
        start: `Comment commencer${nb}?`,
        hard: `Est-ce difficile pour débuter${nb}?`,
        pace: `Puis-je apprendre à mon rythme${nb}?`,
        signs: `Quels signes pouvez-vous me montrer${nb}?`,
        signThanks: `Comment signer «${nb}merci${nb}»${nb}?`,
        signWater: `Comment signer «${nb}eau${nb}»${nb}?`,
        signWord: (w) => `Comment signer «${nb}${w.toLowerCase()}${nb}»${nb}?`,
      },
      a: {
        journey: 'Voir le parcours',
        dict: 'Ouvrir le dictionnaire',
        contact: 'Aller au formulaire de contact',
        openSign: 'L’ouvrir dans le dictionnaire',
        themeNow: 'Changer maintenant',
        langSwitch: 'Passer en français',
        linkedin: 'Ouvrir notre LinkedIn',
        team: 'Découvrir l’équipe',
      },
      team: 'Inclusign a été conçu et développé par une équipe — vous pouvez la découvrir sur la page Équipe.',
      social: 'Vous pouvez suivre Inclusign sur LinkedIn pour ses nouvelles et actualités.',
      greeting: `Bonjour${nb}! Je suis l’assistant Inclusign. Je peux répondre à vos questions sur les débuts, le dictionnaire et l’apprentissage à votre rythme — et vous montrer comment signer quelques mots du quotidien.\nQue souhaitez-vous savoir${nb}?`,
      hello: `Bonjour${nb}! Comment puis-je vous aider aujourd’hui${nb}?`,
      thanks: `Avec plaisir${nb}! Puis-je vous aider pour autre chose${nb}?`,
      bye: `À bientôt — bonne pratique${nb}!`,
      ok: `Parfait${nb}! Autre chose que vous aimeriez savoir${nb}?`,
      about: () => `Inclusign aide les débutants à apprendre la langue des signes de façon claire et bienveillante.\n${t('hero.lead')}`,
      practice: 'La pratique fonctionne mieux par séances courtes et régulières. Dans le dictionnaire, ouvrez un signe, marquez-le comme pratiqué et gardez-le pour le réviser plus tard.',
      price: `Je n’ai pas d’informations sur les tarifs dans mes guides. L’équipe pourra vous répondre précisément — voulez-vous lui écrire${nb}?`,
      account: 'Je ne vois pas les comptes d’ici. Pour l’inscription ou votre compte, l’équipe peut vous aider directement.',
      whichSL: `Bonne question${nb}! L’équipe peut vous confirmer quelle langue des signes chaque leçon couvre — envoyez-lui un petit message.`,
      format: `Besoin d’un autre format ou d’un accompagnement${nb}? L’équipe fera de son mieux pour vous aider. Utilisez le formulaire de contact en précisant ce dont vous avez besoin.`,
      contact: (email) => `Vous pouvez joindre l’équipe Inclusign via le formulaire de contact, ou par e-mail à ${email}.`,
      bot: 'Je suis un assistant automatique — je réponds à partir des guides d’Inclusign, je n’ai donc pas accès à votre compte ni à vos données. Pour une demande précise, l’équipe est à un message de vous.',
      theme: 'Utilisez le bouton soleil / lune en haut de la page pour passer du mode clair au mode sombre.',
      themeDone: (dark) => (dark ? 'C’est fait — le mode sombre est activé.' : 'C’est fait — le mode clair est activé.'),
      lang: 'Inclusign est disponible en anglais et en français. Utilisez EN / FR en haut de la page, ou touchez ci-dessous.',
      langDone: 'C’est fait — le site est maintenant en français.',
      signList: `Voici les signes que je peux vous montrer pour l’instant. Touchez-en un${nb}:`,
      unknownSign: `Je ne peux montrer ici que quelques signes de départ — le dictionnaire complet d’Inclusign en contient bien d’autres. Essayez l’un de ceux-ci${nb}:`,
      sign: (word, move, how) => `**${word}** · ${move}\n${how}`,
      fallback: 'Désolé, je ne suis pas sûr de pouvoir répondre à cela. Je peux vous aider pour bien démarrer, le dictionnaire, l’apprentissage à votre rythme ou quelques signes du quotidien — ou vous pouvez écrire directement à l’équipe.',
    },
  };

  // Keywords are matched as whole words, without accents, in either language.
  const INTENTS = [
    { id: 'social', k: ['linkedin', 'linked in', 'social media', 'social', 'socials', 'follow', 'follow you', 'instagram', 'facebook', 'twitter', 'tiktok', 'reseaux sociaux', 'reseaux', 'suivre', 'vous suivre'] },
    { id: 'signList', k: ['which signs', 'what signs', 'list of signs', 'what words', 'which words', 'more signs', 'another sign', 'other signs', 'quels signes', 'liste des signes', 'quels mots', 'autre signe', 'autres signes'] },
    { id: 'account', k: ['sign up', 'signup', 'sign in', 'log in', 'login', 'register', 'account', 'password', 'inscription', 'inscrire', 's inscrire', 'connexion', 'se connecter', 'compte', 'mot de passe'] },
    { id: 'whichSL', k: ['asl', 'lsf', 'bsl', 'which sign language', 'what sign language', 'which language', 'american sign language', 'british sign language', 'international sign', 'quelle langue des signes', 'langue des signes francaise', 'quelle langue'] },
    { id: 'price', k: ['price', 'prices', 'pricing', 'cost', 'costs', 'free', 'pay', 'paid', 'payment', 'subscription', 'how much', 'money', 'prix', 'tarif', 'tarifs', 'cout', 'gratuit', 'gratuite', 'payer', 'payant', 'abonnement', 'combien', 'combien ca coute'] },
    { id: 'format', k: ['format', 'formats', 'accessible', 'accessibility', 'large text', 'large print', 'caption', 'captions', 'subtitles', 'transcript', 'transcripts', 'extra support', 'screen reader', 'accessibilite', 'sous titres', 'transcription', 'grand texte', 'gros caracteres', 'lecteur d ecran', 'autre format'] },
    { id: 'bot', k: ['are you a bot', 'are you human', 'are you real', 'robot', 'bot', 'chatbot', 'ai', 'artificial intelligence', 'es tu un robot', 'etes vous un robot', 'ia', 'intelligence artificielle'] },
    { id: 'contact', k: ['contact', 'email', 'e mail', 'mail', 'human', 'person', 'someone', 'real person', 'talk to', 'speak to', 'speak with', 'reach', 'phone', 'call', 'message', 'joindre', 'contacter', 'humain', 'quelqu un', 'parler', 'telephone', 'appeler', 'courriel', 'ecrire'] },
    { id: 'team', k: ['team', 'core team', 'the team', 'who made', 'who built', 'who created', 'who developed', 'who is behind', 'who are behind', 'founder', 'founders', 'developers', 'creators', 'equipe', 'l equipe', 'qui a cree', 'qui a developpe', 'qui est derriere', 'fondateur', 'fondateurs', 'fondatrice', 'createurs', 'developpeurs'] },
    { id: 'theme', k: ['dark mode', 'light mode', 'dark', 'theme', 'brightness', 'night mode', 'bright mode', 'mode sombre', 'mode clair', 'sombre', 'luminosite', 'mode nuit'] },
    { id: 'lang', k: ['in french', 'in english', 'en francais', 'en anglais', 'switch language', 'change language', 'changer de langue', 'french version', 'english version', 'french', 'english', 'francais', 'anglais'] },
    { id: 'dictionary', k: ['dictionary', 'dictionaries', 'search', 'look up', 'lookup', 'find a sign', 'find signs', 'vocabulary', 'dictionnaire', 'chercher', 'rechercher', 'recherche', 'trouver un signe', 'vocabulaire'] },
    { id: 'practice', k: ['practice', 'practise', 'practicing', 'review', 'revise', 'remember', 'memorize', 'memory', 's entrainer', 'pratiquer', 'pratique', 'reviser', 'revision', 'memoriser', 'retenir'] },
    { id: 'pace', k: ['pace', 'own pace', 'my own pace', 'speed', 'own speed', 'busy', 'schedule', 'how long', 'time', 'minutes', 'per day', 'flexible', 'rythme', 'mon rythme', 'a mon rythme', 'vitesse', 'temps', 'combien de temps', 'occupe', 'emploi du temps', 'par jour'] },
    { id: 'beginner', k: ['hard', 'difficult', 'easy', 'beginner', 'beginners', 'complete beginner', 'new to', 'never', 'no experience', 'difficile', 'facile', 'debutant', 'debutante', 'debutants', 'pour debuter', 'jamais', 'aucune experience'] },
    { id: 'fit', k: ['student', 'students', 'school', 'schools', 'teacher', 'teachers', 'class', 'classroom', 'enseignant', 'professeur', 'classe', 'university', 'college', 'kids', 'children', 'teen', 'teens', 'suitable', 'for me', 'right for me', 'eleve', 'eleves', 'etudiant', 'etudiante', 'etudiants', 'lycee', 'universite', 'enfants', 'ecole', 'pour moi', 'convient', 'adapte'] },
    { id: 'start', k: ['start', 'starting', 'begin', 'beginning', 'get started', 'first step', 'first steps', 'where to start', 'how to start', 'learn', 'want to learn', 'commencer', 'debuter', 'demarrer', 'premier pas', 'par ou commencer', 'apprendre', 'je veux apprendre'] },
    { id: 'about', k: ['what is inclusign', 'about', 'who are you', 'what do you do', 'what is this', 'inclusign', 'c est quoi', 'qu est ce que', 'qui etes vous', 'a propos'] },
  ];
  const SMALLTALK = {
    hello: ['hi', 'hello', 'hey', 'hi there', 'hello there', 'hey there', 'good morning', 'good afternoon', 'good evening', 'bonjour', 'salut', 'coucou', 'bonsoir', 'yo'],
    thanks: ['thanks', 'thank you', 'thanks a lot', 'thank you so much', 'many thanks', 'cheers', 'merci', 'merci beaucoup', 'merci bien'],
    bye: ['bye', 'goodbye', 'bye bye', 'see you', 'see you later', 'au revoir', 'a bientot', 'a plus', 'ciao'],
    ok: ['ok', 'okay', 'cool', 'great', 'nice', 'got it', 'd accord', 'super', 'parfait', 'genial', 'top'],
  };

  // Normalise to padded, accent-free, lowercase words: " how do i sign water "
  const words = (s) => ` ${s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/[’'`]/g, ' ').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()} `;
  const has = (m, k) => m.includes(` ${k} `);
  const SIGN_NAMES = SIGNS.map((s) => ({ sign: s, names: [s.en, s.fr, ...s.alias].map((n) => words(n).trim()) }));

  function findSign(m) {
    let best = null;
    let bestLen = 0;
    SIGN_NAMES.forEach(({ sign, names }) => names.forEach((n) => {
      if (n && has(m, n) && n.length > bestLen) { best = sign; bestLen = n.length; }
    }));
    return best;
  }

  function answer(text) {
    const B = BOT[lang];
    const m = words(text);
    const bare = m.trim();
    const count = bare ? bare.split(' ').length : 0;
    const otherLang = lang === 'fr' ? 'en' : 'fr';

    const chip = {
      ask: (q, label = q) => ({ label, ask: q }),
      journey: () => ({ label: B.a.journey, action: 'goto', target: '#practice-journey' }),
      dict: () => ({ label: B.a.dict, action: 'goto', target: '#dictionary-overview' }),
      contact: (topic) => ({ label: B.a.contact, action: 'contact', topic }),
      sign: (id) => ({ label: B.a.openSign, action: 'sign', id }),
      theme: () => ({ label: B.a.themeNow, action: 'theme' }),
      lang: () => ({ label: BOT[otherLang].a.langSwitch, action: 'lang', to: otherLang }),
    };
    const starter = () => [chip.ask(B.q.start), chip.ask(B.q.hard), chip.ask(B.q.signThanks), chip.contact()];
    const signChips = (list) => list.map((s) => chip.ask(B.q.signWord(s[lang]), s[lang]));
    const reply = (txt, chips = []) => ({ text: txt, chips });

    // "sign language" / "langue des signes" is a topic, not a request to sign something
    const stripped = m.replace(/ (sign language|langue des signes|langage des signes) /g, ' ');
    const signVerb = / (sign|signs|signing|signer|signe|signes|say|dire|dit on) /.test(stripped)
      && !/ sign (up|in) /.test(stripped);
    const sign = findSign(m);
    const small = Object.keys(SMALLTALK).find((key) => SMALLTALK[key].includes(bare));

    // 1. A specific sign ("how do I sign water", or just "water")
    if (sign && (signVerb || (count <= 3 && !small))) {
      return reply(B.sign(sign[lang], ui().moves[sign.move], sign.how[lang]), [chip.sign(sign.id), chip.ask(B.q.signs)]);
    }
    // 2. Small talk
    if (small === 'hello') return reply(B.hello, starter());
    if (small === 'thanks') return reply(B.thanks, starter());
    if (small === 'bye') return reply(B.bye);
    if (small === 'ok') return reply(B.ok, starter());

    // 3. Topics, scored by how many (and how long) keywords match
    let best = null;
    let bestScore = 0;
    INTENTS.forEach((intent) => {
      const score = intent.k.reduce((sum, k) => sum + (has(m, k) ? k.split(' ').length : 0), 0);
      if (score > bestScore) { best = intent.id; bestScore = score; }
    });

    if (best === 'signList') return reply(B.signList, signChips(SIGNS));
    if (signVerb && !sign && best !== 'account') return reply(B.unknownSign, [...signChips(SIGNS.slice(0, 4)), chip.dict()]);

    switch (best) {
      case 'start': return reply(t('faq.a5'), [chip.journey(), chip.ask(B.q.signThanks), chip.dict()]);
      case 'beginner': return reply(t('faq.a1'), [chip.ask(B.q.pace), chip.ask(B.q.start)]);
      case 'fit': return reply(t('faq.a2'), [chip.ask(B.q.start), chip.journey()]);
      case 'dictionary': return reply(t('faq.a3'), [chip.dict(), chip.ask(B.q.signWater)]);
      case 'pace': return reply(t('faq.a4'), [chip.ask(B.q.start), chip.journey()]);
      case 'practice': return reply(B.practice, [chip.dict(), chip.ask(B.q.signs)]);
      case 'about': return reply(B.about(), [chip.ask(B.q.start), chip.journey()]);
      case 'price': return reply(B.price, [chip.contact('question')]);
      case 'account': return reply(B.account, [chip.contact('question')]);
      case 'whichSL': return reply(B.whichSL, [chip.contact('question')]);
      case 'format': return reply(B.format, [chip.contact('format')]);
      case 'contact': return reply(B.contact(CONFIG.contactEmail), [chip.contact()]);
      case 'team': return reply(B.team, [{ label: B.a.team, action: 'page', href: 'team.html' }]);
      case 'social': return reply(B.social, [{ label: B.a.linkedin, action: 'link', href: CONFIG.linkedinUrl }]);
      case 'bot': return reply(B.bot, [chip.contact(), chip.ask(B.q.start)]);
      case 'theme': return reply(B.theme, [chip.theme()]);
      case 'lang': return reply(B.lang, [chip.lang()]);
      default: return reply(B.fallback, starter());
    }
  }

  if ($('[data-chat-launcher]')) {
    // --- Chat UI ---
    const launcher = $('[data-chat-launcher]');
    const panel = $('[data-chat-panel]');
    const log = $('[data-chat-log]');
    const chatForm = $('[data-chat-form]');
    const chatInput = $('#chat-input');
    const sendBtn = $('.chat-send', chatForm);
    const mqMobile = window.matchMedia('(max-width: 600px)');
    const finePointer = window.matchMedia('(pointer: fine)');
    let chatOpen = false;
    let busy = false;
    let lastQuestion = '';
    panel.tabIndex = -1;

    if (store.get('inclusign-chat-seen')) launcher.classList.add('seen');

    // Escape, then allow **bold** and turn the contact address into a link
    const format = (text) => linkEmail(esc(text).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>'));

    function scrollLog() { log.scrollTop = log.scrollHeight; }

    function addMessage(who, html) {
      const el = document.createElement('div');
      el.className = `msg ${who}`;
      el.innerHTML = html;
      log.appendChild(el);
      scrollLog();
      return el;
    }

    function addChips(chips) {
      if (!chips || !chips.length) return;
      const wrap = document.createElement('div');
      wrap.className = 'chat-chips';
      chips.forEach((c) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = `chat-chip${c.action ? ' action' : ''}`;
        b.textContent = c.label;
        b.addEventListener('click', () => onChip(c));
        wrap.appendChild(b);
      });
      log.appendChild(wrap);
      scrollLog();
    }

    function clearChips() { $$('.chat-chips', log).forEach((c) => c.remove()); }

    function botSay(reply, delay) {
      busy = true;
      const typing = addMessage('bot typing', '<i></i><i></i><i></i>');
      typing.setAttribute('aria-hidden', 'true');
      reply = { text: String((reply && reply.text) || BOT[lang].fallback), chips: (reply && reply.chips) || [] };
      const wait = reduceMotion.matches ? 120 : (delay ?? Math.min(450 + reply.text.length * 5, 1200));
      setTimeout(() => {
        typing.remove();
        addMessage('bot', format(reply.text));
        addChips(reply.chips);
        busy = false;
      }, wait);
    }

    function greet(delay) {
      const B = BOT[lang];
      botSay({ text: B.greeting, chips: [
        { label: B.q.start, ask: B.q.start },
        { label: B.q.hard, ask: B.q.hard },
        { label: B.q.signThanks, ask: B.q.signThanks },
        { label: B.a.contact, action: 'contact' },
      ] }, delay);
    }

    function userSays(text, fromChip) {
      clearChips();
      addMessage('user', esc(text));
      // Remember real questions so "contact the team" can pre-fill the message
      const isSmallTalk = Object.values(SMALLTALK).some((list) => list.includes(words(text).trim()));
      if (!fromChip && !isSmallTalk) lastQuestion = text;
      botSay(answer(text));
    }

    function onChip(c) {
      if (busy) return;
      if (c.ask) { userSays(c.ask, true); return; }
      clearChips();
      switch (c.action) {
        case 'goto':
          closeChat(false);
          goTo(c.target);
          break;
        case 'sign':
          closeChat(false);
          openSign(c.id);
          break;
        case 'contact':
          closeChat(false);
          openContact({ topic: c.topic, message: lastQuestion });
          break;
        case 'theme': {
          const next = themeTarget === 'dark' ? 'light' : 'dark';
          setTheme(next);
          botSay({ text: BOT[lang].themeDone(next === 'dark'), chips: [] }, 300);
          break;
        }
        case 'link':
          window.open(c.href, '_blank', 'noopener');
          break;
        case 'page':
          window.location.href = c.href;
          break;
        case 'lang':
          setLang(c.to);
          botSay({ text: BOT[lang].langDone, chips: [
            { label: BOT[lang].q.start, ask: BOT[lang].q.start },
            { label: BOT[lang].q.signs, ask: BOT[lang].q.signs },
          ] }, 300);
          break;
        default:
          break;
      }
    }

    function openChat() {
      if (chatOpen) return;
      chatOpen = true;
      panel.hidden = false;
      launcher.setAttribute('aria-expanded', 'true');
      launcher.classList.add('seen');
      store.set('inclusign-chat-seen', '1');
      if (mqMobile.matches) root.classList.add('chat-locked');
      if (!log.childElementCount) greet(350);
      // On touch screens, don't pop the keyboard over the suggestions
      (finePointer.matches ? chatInput : panel).focus({ preventScroll: true });
    }

    function closeChat(returnFocus = true) {
      if (!chatOpen) return;
      chatOpen = false;
      panel.hidden = true;
      launcher.setAttribute('aria-expanded', 'false');
      root.classList.remove('chat-locked');
      if (returnFocus) launcher.focus();
    }

    launcher.addEventListener('click', () => (chatOpen ? closeChat() : openChat()));
    $('[data-chat-close]', panel).addEventListener('click', () => closeChat());
    $$('[data-chat-open-inline]').forEach((b) => b.addEventListener('click', openChat));
    $('[data-chat-reset]', panel).addEventListener('click', () => {
      if (busy) return;
      log.innerHTML = '';
      lastQuestion = '';
      greet(250);
    });
    panel.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); closeChat(); }
    });
    mqMobile.addEventListener('change', (e) => root.classList.toggle('chat-locked', e.matches && chatOpen));

    chatInput.addEventListener('input', () => { sendBtn.disabled = !chatInput.value.trim(); });
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text || busy) return;
      chatInput.value = '';
      sendBtn.disabled = true;
      userSays(text, false);
    });
  }

  /* ---------------------------------------------------------
     Boot
     --------------------------------------------------------- */
  $$('[data-linkedin]').forEach((a) => { a.href = CONFIG.linkedinUrl; });
  $$('[data-email]').forEach((a) => {
    a.href = `mailto:${CONFIG.contactEmail}`;
    a.textContent = CONFIG.contactEmail;
  });

  const prefersFrench = (navigator.languages || [navigator.language || 'en'])[0]?.toLowerCase().startsWith('fr');
  setLang(store.get('inclusign-lang') || (prefersFrench ? 'fr' : 'en'));

  // Starting page: the <head> script decided whether to show it (first visit in this tab)
  if (show && root.classList.contains('intro')) playShow({ intro: true });
})();

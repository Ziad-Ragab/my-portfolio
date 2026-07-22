(() => {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector("#site-header");
  const themeToggle = document.querySelector("#theme-toggle");
  const languageToggle = document.querySelector("#language-toggle");
  const navToggle = document.querySelector("#nav-toggle");
  const primaryNav = document.querySelector("#primary-nav");
  const floatingContact = document.querySelector(".floating-contact");
  const colorSchemeMeta = document.querySelector('meta[name="color-scheme"]');
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const translations = {
    en: {
      "meta.title": "Ziad Ragab Atef | Full Stack .NET Developer",
      "meta.description": "Full Stack .NET Developer building secure, maintainable enterprise applications with .NET, ABP Framework, Blazor, Angular, and SQL Server.",
      "meta.socialDescription": "Reliable enterprise software, from business workflows and secure APIs to polished responsive interfaces.",
      "meta.imageAlt": "Ziad Ragab Atef, Full Stack .NET Developer",
      "a11y.skip": "Skip to content", "a11y.openNav": "Open navigation", "a11y.closeNav": "Close navigation",
      "brand.role": "Full Stack .NET Developer", "language.switch": "Switch to Arabic",
      "nav.work": "Work", "nav.expertise": "Expertise", "nav.experience": "Experience", "nav.journey": "Journey", "nav.approach": "Approach", "nav.contact": "Contact",
      "actions.startProject": "Start a project", "actions.discuss": "Discuss your project", "actions.explore": "Explore case studies", "actions.downloadCv": "Download CV",
      "hero.availability": "Available for selected freelance projects", "hero.eyebrow": "Enterprise engineering · thoughtful execution",
      "hero.title": "I build reliable <span>business software</span> for real-world complexity.",
      "hero.summary": "Full Stack .NET Developer turning complex workflows into secure APIs, maintainable systems, and polished user experiences—without losing sight of the business behind the code.",
      "hero.currently": "Currently", "hero.systems": "Systems thinking", "hero.product": "Product-minded delivery",
      "proof.enterprise": "Enterprise", "proof.dotnet": ".NET experience", "proof.endToEnd": "End to end", "proof.uiData": "UI to database",
      "proof.trust": "Built for trust", "proof.security": "Security & permissions", "proof.global": "Global ready", "proof.languages": "Arabic & English UX"
    },
    ar: {
      "meta.title": "زياد رجب عاطف | مطور Full Stack .NET",
      "meta.description": "مطور Full Stack .NET يبني تطبيقات مؤسسية آمنة وسهلة الصيانة باستخدام .NET وABP Framework وBlazor وAngular وSQL Server.",
      "meta.socialDescription": "برمجيات مؤسسية موثوقة، من إجراءات العمل وواجهات API الآمنة إلى واجهات متجاوبة ومتقنة.",
      "meta.imageAlt": "زياد رجب عاطف، مطور Full Stack .NET",
      "a11y.skip": "انتقل إلى المحتوى", "a11y.openNav": "افتح قائمة التنقل", "a11y.closeNav": "أغلق قائمة التنقل",
      "brand.role": "مطور Full Stack .NET", "language.switch": "التبديل إلى الإنجليزية",
      "nav.work": "أعمالي", "nav.expertise": "خبراتي", "nav.experience": "الخبرة", "nav.journey": "رحلتي", "nav.approach": "منهجي", "nav.contact": "تواصل معي",
      "actions.startProject": "ابدأ مشروعًا", "actions.discuss": "ناقش مشروعك", "actions.explore": "استكشف دراسات الحالة", "actions.downloadCv": "تحميل السيرة الذاتية بالإنجليزية",
      "hero.availability": "متاح لمشروعات عمل حر مختارة", "hero.eyebrow": "هندسة برمجيات مؤسسية · تنفيذ مدروس",
      "hero.title": "أبني <span>برمجيات أعمال</span> موثوقة للتعامل مع التعقيدات الواقعية.",
      "hero.summary": "مطور Full Stack .NET أحوّل إجراءات العمل المعقدة إلى واجهات API آمنة، وأنظمة سهلة الصيانة، وتجارب مستخدم متقنة—مع إبقاء أهداف العمل في صميم كل قرار.",
      "hero.currently": "حاليًا", "hero.systems": "تفكير منظومي", "hero.product": "تنفيذ يركز على المنتج",
      "proof.enterprise": "حلول مؤسسية", "proof.dotnet": "خبرة في .NET", "proof.endToEnd": "من البداية للنهاية", "proof.uiData": "من الواجهة إلى قاعدة البيانات",
      "proof.trust": "مصمم للثقة", "proof.security": "الأمان والصلاحيات", "proof.global": "جاهز عالميًا", "proof.languages": "تجربة عربية وإنجليزية"
    }
  };

  const arabicText = new Map(Object.entries({
    "Full Stack .NET Developer": "مطور Full Stack .NET",
    "Selected work / 01": "أعمال مختارة / 01", "Complex systems, made clear.": "أنظمة معقدة، بصورة واضحة.",
    "I work across business rules, data, security, and interface design. These case studies focus on the engineering decisions and responsibilities behind the outcome.": "أعمل عبر قواعد العمل والبيانات والأمان وتصميم الواجهات. تركز دراسات الحالة دي على القرارات والمسؤوليات الهندسية وراء النتيجة.",
    "Confidential enterprise work": "عمل مؤسسي سري", "Competition operations platform": "منصة لإدارة عمليات المسابقات",
    "Workflow": "إجراءات العمل", "Documents": "المستندات", "Delivery": "التسليم", "Meters": "العدادات", "Billing": "الفوترة", "Payments": "المدفوعات",
    "Turning multi-step competition workflows into one dependable system.": "تحويل إجراءات مسابقات متعددة الخطوات إلى نظام واحد يمكن الاعتماد عليه.",
    "Extended an existing enterprise platform while respecting its layered architecture, legacy database, and active business workflows.": "طورت منصة مؤسسية قائمة مع الحفاظ على بنيتها متعددة الطبقات، وقاعدة بياناتها القديمة، وإجراءات العمل النشطة.",
    "Focus": "التركيز", "Workflow & document management": "إدارة إجراءات العمل والمستندات", "Contribution": "المساهمة",
    "Feature delivery across application layers": "تنفيذ المزايا عبر طبقات التطبيق", "Architecture": "البنية", "Layered DDD monolith": "نظام DDD موحد متعدد الطبقات",
    "Business value": "القيمة للأعمال", "Supports active operations with maintainable workflows and secure document capabilities.": "يدعم العمليات النشطة بإجراءات عمل سهلة الصيانة وإمكانات آمنة لإدارة المستندات.",
    "Anonymized case study": "دراسة حالة بدون بيانات تعريفية", "Utility operations & billing": "عمليات المرافق والفوترة",
    "One operational view across meters, contracts, rates, bills, and payments.": "عرض تشغيلي واحد للعدادات والعقود والتعريفات والفواتير والمدفوعات.",
    "Built a layered application with role-based permissions, responsive Arabic/English interfaces, data-rich dashboards, map navigation, and scheduled background maintenance.": "بنيت تطبيقًا متعدد الطبقات بصلاحيات قائمة على الأدوار، وواجهات عربية وإنجليزية متجاوبة، ولوحات بيانات غنية، وتنقل عبر الخرائط، وصيانة مجدولة في الخلفية.",
    "Gives operators a clearer bilingual view of connected billing and field operations.": "يمنح فرق التشغيل رؤية أوضح باللغتين لعمليات الفوترة والعمل الميداني المترابطة.",
    "View source": "عرض المصدر", "Discuss a similar project": "ناقش مشروعًا مشابهًا", "Commerce & order management": "التجارة وإدارة الطلبات",
    "A complete bookstore journey, from product discovery to payment tracking.": "رحلة متكاملة لمتجر كتب، من اكتشاف المنتجات إلى متابعة الدفع.",
    "Developed catalog management, persistent carts, quantity pricing, Stripe Checkout, company payment workflows, image uploads, identity, and administrative order operations.": "طورت إدارة الكتالوج، وسلات شراء محفوظة، وتسعير الكميات، وStripe Checkout، وإجراءات دفع الشركات، ورفع الصور، والهوية، وعمليات إدارة الطلبات.",
    "Connects customer checkout with the administrative workflows needed to manage orders and payments.": "يربط تجربة دفع العميل بإجراءات الإدارة اللازمة لمتابعة الطلبات والمدفوعات.",
    "Expertise / 02": "الخبرات / 02", "Full-stack means owning the whole path.": "Full-stack يعني تحمل مسؤولية المسار كاملًا.",
    "From domain rules and data access to responsive interfaces and secure delivery, I build each layer to support the system around it.": "من قواعد الـ domain والوصول للبيانات إلى الواجهات المتجاوبة والتسليم الآمن، أبني كل طبقة لتدعم النظام المحيط بها.",
    "Enterprise backend": "Backend مؤسسي", "Structured services and APIs that keep complex business logic understandable, testable, and maintainable.": "خدمات وواجهات API منظمة تجعل منطق العمل المعقد مفهومًا وقابلًا للاختبار والصيانة.",
    "Product interfaces": "واجهات المنتجات", "Responsive, localized experiences that help people complete real operational work with less friction.": "تجارب متجاوبة ومترجمة تساعد المستخدمين على إنجاز العمل التشغيلي الفعلي بسهولة أكبر.",
    "Data & security": "البيانات والأمان", "Reliable persistence and clear permission boundaries designed into the application—not added at the end.": "تخزين موثوق وحدود واضحة للصلاحيات مصممة داخل التطبيق—وليست إضافة لاحقة.",
    "Architecture & delivery": "البنية والتسليم", "Practical architecture that respects existing constraints while keeping future changes safe and predictable.": "بنية عملية تحترم القيود الحالية وتجعل التغييرات المستقبلية آمنة ومتوقعة.",
    "Experience / 03": "الخبرة / 03", "Built in real constraints, not just demos.": "خبرة مبنية وسط قيود حقيقية، وليست مجرد نماذج تجريبية.",
    "My experience spans enterprise application development, professional .NET training, and software engineering fundamentals.": "تمتد خبرتي عبر تطوير التطبيقات المؤسسية، والتدريب الاحترافي على .NET، وأساسيات هندسة البرمجيات.",
    "Download full CV": "تحميل السيرة الذاتية الكاملة بالإنجليزية", "Nov 2025 — Present": "نوفمبر 2025 — حتى الآن", "Apr 2025 — Sep 2025": "أبريل 2025 — سبتمبر 2025", "Nov 2024 — Mar 2025": "نوفمبر 2024 — مارس 2025",
    "Maintaining and extending a layered DDD application with .NET, ABP Framework, Blazor Server, EF Core, SignalR, secure file management, and background processing.": "أعمل على صيانة وتطوير تطبيق DDD متعدد الطبقات باستخدام .NET وABP Framework وBlazor Server وEF Core وSignalR، مع إدارة آمنة للملفات ومعالجة في الخلفية.",
    "Full Stack .NET Development Intern": "متدرب تطوير Full Stack .NET", "Built REST APIs, EF Core persistence, LINQ queries, JWT authentication, and role-based authorization using ASP.NET Identity.": "بنيت REST APIs، وتخزين بيانات باستخدام EF Core، واستعلامات LINQ، ومصادقة JWT، وصلاحيات قائمة على الأدوار باستخدام ASP.NET Identity.",
    "Software Development Fundamentals Intern": "متدرب أساسيات تطوير البرمجيات", "Strengthened OOP, data structures, algorithms, problem solving, and browser-based development fundamentals.": "عززت مهارات OOP وهياكل البيانات والخوارزميات وحل المشكلات وأساسيات التطوير للويب.",
    "Professional journey / 04": "الرحلة المهنية / 04", "Built through practice, teamwork, and delivery.": "تطورت بالممارسة والعمل الجماعي والتسليم.",
    "A few real moments from my ITI journey—presenting a working product, completing intensive training, and delivering alongside a team.": "لحظات حقيقية من رحلتي في ITI—عرض منتج يعمل، وإكمال تدريب مكثف، والتسليم ضمن فريق.",
    "Communication & ownership": "التواصل وتحمل المسؤولية", "Presenting our ITI graduation project": "عرض مشروع تخرجنا في ITI",
    "Presenting the final product to instructors and guests alongside my team—communicating the solution, demonstrating its capabilities, and answering technical and business questions.": "عرضت المنتج النهائي مع فريقي أمام المدربين والضيوف—شرحت الحل، واستعرضت إمكاناته، وأجبت عن الأسئلة التقنية والتجارية.",
    "Continuous development": "التطوير المستمر", "Completing my ITI training": "إكمال تدريبي في ITI", "Marking the completion of an intensive practical journey focused on software-development fundamentals and professional delivery.": "إتمام رحلة عملية مكثفة ركزت على أساسيات تطوير البرمجيات والتسليم الاحترافي.",
    "Teamwork & shared delivery": "العمل الجماعي والتسليم المشترك", "Completing the ITI journey together": "إكمال رحلة ITI معًا", "Celebrating our graduation project and training experience alongside teammates and instructors at ITI Creativa.": "الاحتفال بمشروع التخرج وتجربة التدريب مع الزملاء والمدربين في ITI Creativa.",
    "Approach / 05": "منهجي / 05", "Strong software starts before the first line of code.": "البرمجيات القوية تبدأ قبل أول سطر كود.", "I keep the process transparent and focused on the decisions that make a product dependable after launch.": "أحافظ على شفافية العملية وأركز على القرارات التي تجعل المنتج جديرًا بالاعتماد بعد الإطلاق.",
    "Clarify the real problem": "توضيح المشكلة الحقيقية", "Translate requirements into clear workflows, risks, roles, and success conditions.": "تحويل المتطلبات إلى إجراءات عمل ومخاطر وأدوار وشروط نجاح واضحة.",
    "Design for change": "التصميم من أجل التغيير", "Choose boundaries and data flows that keep future features safe and understandable.": "اختيار حدود وتدفقات بيانات تجعل المزايا المستقبلية آمنة ومفهومة.",
    "Build securely": "البناء بأمان", "Implement the interface, services, data access, permissions, and validation as one coherent system.": "تنفيذ الواجهة والخدمات والوصول للبيانات والصلاحيات والتحقق كنظام واحد متماسك.",
    "Refine the experience": "تحسين التجربة", "Polish responsiveness, localization, edge cases, and the details users feel every day.": "إتقان التجاوب والترجمة والحالات الطرفية والتفاصيل التي يلمسها المستخدم يوميًا.",
    "Start a conversation / 06": "ابدأ محادثة / 06", "Have a complex workflow that needs a clear, reliable solution?": "هل لديك إجراء عمل معقد يحتاج إلى حل واضح وموثوق؟", "Tell me what you are building, where the friction is, and what success should look like. I will reply with practical next steps.": "أخبرني بما تبنيه، وأين تكمن الصعوبة، وكيف يبدو النجاح بالنسبة لك. سأرد عليك بخطوات عملية تالية.",
    "Best fit": "المشروعات الأنسب", "Enterprise workflows, internal tools, and commerce platforms": "إجراءات العمل المؤسسية والأدوات الداخلية ومنصات التجارة",
    "Useful context": "معلومات مفيدة", "Your goal, current friction, users, and preferred timeline": "هدفك والتحديات الحالية والمستخدمون والجدول الزمني المفضل",
    "Next step": "الخطوة التالية", "A practical reply with the clearest way forward": "رد عملي يوضح أنسب طريق للبدء",
    "Message me on WhatsApp": "راسلني على WhatsApp", "Send an email": "أرسل بريدًا إلكترونيًا", "Engineering reliable software for real business complexity.": "هندسة برمجيات موثوقة لتعقيدات الأعمال الحقيقية.", "Let's talk": "لنتحدث"
  }));

  let currentLanguage = "en";
  const originalText = new WeakMap();

  const getSavedLanguage = () => {
    try { return window.localStorage.getItem("portfolio-language"); } catch { return null; }
  };

  const saveLanguage = (language) => {
    try { window.localStorage.setItem("portfolio-language", language); } catch { /* Applies for this visit. */ }
  };

  const preferredLanguage = () => {
    const saved = getSavedLanguage();
    if (saved === "en" || saved === "ar") return saved;
    return navigator.language?.toLowerCase().startsWith("ar") ? "ar" : "en";
  };

  const translatePlainText = (language) => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      if (node.parentElement?.closest("[data-i18n], [data-i18n-html], script, style")) return;
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      const source = originalText.get(node);
      const trimmed = source.trim();
      if (!trimmed) return;
      const replacement = language === "ar" ? arabicText.get(trimmed) : trimmed;
      if (!replacement) return;
      node.nodeValue = source.replace(trimmed, replacement);
    });
  };

  const updateThemeLabel = () => {
    if (!themeToggle) return;
    const isLight = root.dataset.theme === "light";
    themeToggle.setAttribute("aria-label", currentLanguage === "ar"
      ? (isLight ? "التبديل إلى الوضع الداكن" : "التبديل إلى الوضع الفاتح")
      : (isLight ? "Switch to dark theme" : "Switch to light theme"));
  };

  const updateNavLabel = () => {
    if (!navToggle) return;
    const isOpen = body.classList.contains("nav-open");
    const key = isOpen ? "a11y.closeNav" : "a11y.openNav";
    const label = translations[currentLanguage][key];
    navToggle.setAttribute("aria-label", label);
    const screenReaderText = navToggle.querySelector(".sr-only");
    if (screenReaderText) screenReaderText.textContent = label;
  };

  const applyLanguage = (language) => {
    currentLanguage = language === "ar" ? "ar" : "en";
    const dictionary = translations[currentLanguage];
    root.lang = currentLanguage;
    root.dir = currentLanguage === "ar" ? "rtl" : "ltr";
    root.dataset.language = currentLanguage;
    translatePlainText(currentLanguage);

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = dictionary[element.dataset.i18n];
      if (value) element.textContent = value;
    });
    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
      const value = dictionary[element.dataset.i18nHtml];
      if (value) element.innerHTML = value;
    });
    document.querySelectorAll("[data-i18n-content]").forEach((element) => {
      const value = dictionary[element.dataset.i18nContent];
      if (!value) return;
      if (element.tagName === "TITLE") element.textContent = value;
      else element.setAttribute("content", value);
    });

    const isArabic = currentLanguage === "ar";
    if (languageToggle) {
      languageToggle.setAttribute("aria-pressed", String(isArabic));
      languageToggle.setAttribute("aria-label", dictionary["language.switch"]);
      languageToggle.querySelector("[aria-hidden='true']").textContent = isArabic ? "EN" : "ع";
    }

    const whatsappText = isArabic ? "مرحبًا زياد، أود مناقشة مشروع برمجي معك." : "Hi Ziad, I'd like to discuss a software project.";
    document.querySelectorAll("[data-contact='whatsapp']").forEach((link) => {
      link.href = `https://wa.me/201062492696?text=${encodeURIComponent(whatsappText)}`;
    });
    const caseMessages = isArabic ? {
      competition: "مرحبًا زياد، أود مناقشة منصة لإدارة إجراءات عمل متعددة الخطوات مشابهة لدراسة حالة المسابقات.",
      utility: "مرحبًا زياد، أود مناقشة نظام تشغيلي وفوترة مشابه لدراسة حالة المرافق.",
      commerce: "مرحبًا زياد، أود مناقشة منصة تجارة وإدارة طلبات مشابهة لمشروع متجر الكتب."
    } : {
      competition: "Hi Ziad, I'd like to discuss a multi-step workflow platform similar to your competition operations case study.",
      utility: "Hi Ziad, I'd like to discuss an operations and billing system similar to your utility case study.",
      commerce: "Hi Ziad, I'd like to discuss a commerce and order-management platform similar to your bookstore project."
    };
    document.querySelectorAll("[data-case-contact]").forEach((link) => {
      const message = caseMessages[link.dataset.caseContact];
      if (message) link.href = `https://wa.me/201062492696?text=${encodeURIComponent(message)}`;
    });
    const email = document.querySelector("a[href^='mailto:'][href*='subject=']");
    if (email) email.href = `mailto:ziadragab01@gmail.com?subject=${encodeURIComponent(isArabic ? "استفسار عن مشروع برمجي" : "Software project inquiry")}`;
    primaryNav?.setAttribute("aria-label", isArabic ? "التنقل الرئيسي" : "Primary navigation");
    document.querySelector(".hero-links")?.setAttribute("aria-label", isArabic ? "روابط مهنية" : "Professional links");
    document.querySelector(".proof-bar")?.setAttribute("aria-label", isArabic ? "نقاط القوة المهنية" : "Professional strengths");
    document.querySelector(".contact-brief")?.setAttribute("aria-label", isArabic ? "دليل بدء محادثة المشروع" : "Project conversation guide");
    document.querySelectorAll(".tag-list").forEach((list) => list.setAttribute("aria-label", isArabic ? "التقنيات المستخدمة" : "Technologies used"));
    const caseVisualLabels = isArabic
      ? ["إجراءات العمل والمستندات والتسليم", "العدادات والفوترة والمدفوعات"]
      : ["Workflow, documents, and delivery", "Meters, billing, and payments"];
    document.querySelectorAll(".case-visual-flow").forEach((visual, index) => visual.setAttribute("aria-label", caseVisualLabels[index]));
    document.querySelector(".brand")?.setAttribute("aria-label", isArabic ? "زياد رجب عاطف، الرئيسية" : "Ziad Ragab Atef, home");
    document.querySelector(".footer-brand")?.setAttribute("aria-label", isArabic ? "العودة إلى أعلى الصفحة" : "Back to top");
    document.querySelector(".floating-contact")?.setAttribute("aria-label", isArabic ? "راسل زياد على WhatsApp" : "Message Ziad on WhatsApp");
    const portrait = document.querySelector(".portrait-frame img");
    if (portrait) portrait.alt = isArabic ? "صورة شخصية لزياد رجب عاطف" : "Portrait of Ziad Ragab Atef";
    const journeyAlts = isArabic ? [
      "زياد رجب يعرض مشروع تخرجه من ITI أمام المدربين والضيوف مع فريقه.",
      "زياد رجب يحمل شهادة إتمام تدريب ITI.",
      "زياد رجب مع زملائه ومدربيه في ITI بعد عرض مشروع التخرج."
    ] : [
      "Ziad Ragab presenting his ITI graduation project to instructors and guests alongside his team.",
      "Ziad Ragab holding his ITI training completion certificate.",
      "Ziad Ragab with ITI teammates and instructors after the graduation project presentation."
    ];
    document.querySelectorAll(".journey-media img").forEach((image, index) => { image.alt = journeyAlts[index]; });
    updateThemeLabel();
    updateNavLabel();
  };

  const getSavedTheme = () => {
    try {
      return window.localStorage.getItem("portfolio-theme");
    } catch {
      return null;
    }
  };

  const saveTheme = (theme) => {
    try {
      window.localStorage.setItem("portfolio-theme", theme);
    } catch {
      // The selected theme still applies for the current visit.
    }
  };

  const preferredTheme = () => getSavedTheme() || (systemDark.matches ? "dark" : "light");

  const applyTheme = (theme) => {
    const selected = theme === "light" ? "light" : "dark";
    root.dataset.theme = selected;

    if (colorSchemeMeta) {
      colorSchemeMeta.setAttribute("content", selected === "light" ? "light dark" : "dark light");
    }

    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", selected === "light" ? "#f5f8fc" : "#07111f");
    }

    if (themeToggle) themeToggle.setAttribute("aria-pressed", String(selected === "light"));
    updateThemeLabel();
  };

  applyTheme(preferredTheme());
  applyLanguage(preferredLanguage());

  languageToggle?.addEventListener("click", () => {
    const nextLanguage = currentLanguage === "ar" ? "en" : "ar";
    saveLanguage(nextLanguage);
    applyLanguage(nextLanguage);
    closeNav();
  });

  themeToggle?.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
    saveTheme(nextTheme);
    applyTheme(nextTheme);
  });

  systemDark.addEventListener?.("change", (event) => {
    if (!getSavedTheme()) applyTheme(event.matches ? "dark" : "light");
  });

  const closeNav = () => {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
    updateNavLabel();
  };

  navToggle?.addEventListener("click", () => {
    const willOpen = !body.classList.contains("nav-open");
    body.classList.toggle("nav-open", willOpen);
    navToggle.setAttribute("aria-expanded", String(willOpen));
    updateNavLabel();
  });

  primaryNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });

  document.addEventListener("click", (event) => {
    if (!body.classList.contains("nav-open")) return;
    if (primaryNav?.contains(event.target) || navToggle?.contains(event.target)) return;
    closeNav();
  });

  window.matchMedia("(min-width: 821px)").addEventListener?.("change", (event) => {
    if (event.matches) closeNav();
  });

  const updateScrollState = () => {
    const hasScrolled = window.scrollY > 12;
    header?.classList.toggle("is-scrolled", hasScrolled);
    floatingContact?.classList.toggle("is-visible", window.scrollY > 620);
  };

  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });

  const revealItems = Array.from(document.querySelectorAll(".reveal"));

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.12 });

    revealItems.forEach((item) => {
      if (item.getBoundingClientRect().top < window.innerHeight * 0.92) {
        item.classList.add("is-visible");
      } else {
        revealObserver.observe(item);
      }
    });
  }

  const navLinks = Array.from(document.querySelectorAll("#primary-nav a[href^='#']"));
  const sections = Array.from(document.querySelectorAll("main section[id]"));

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${visible.target.id}`;
        link.classList.toggle("is-active", isActive);
        if (isActive) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-35% 0px -55%", threshold: [0.05, 0.25, 0.55] });

    sections.forEach((section) => sectionObserver.observe(section));
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();

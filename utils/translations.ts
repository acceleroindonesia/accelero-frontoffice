export type Language = "en" | "id";

export interface Translations {
  // Common
  common: {
    loading: string;
    search: string;
    clear: string;
    readMore: string;
    learnMore: string;
    contactUs: string;
    subscribe: string;
    viewAll: string;
    backTo: string;
  };

  // Navigation
  nav: {
    home: string;
    about: string;
    projects: string;
    blog: string;
    partnership: string;
    volunteer: string;
    donate: string;
    contact: string;
    impact: string;
  };

  // Projects Page
  projects: {
    title: string;
    subtitle: string;
    ourPrograms: string;
    featuredPrograms: string;
    makeADifference: string;
    browsePrograms: string;
    activePrograms: string;
    studentsReached: string;
    totalRaised: string;
    searchPlaceholder: string;
    allPrograms: string;
    literacy: string;
    numeracy: string;
    teacherTraining: string;
    infrastructure: string;
    allStatus: string;
    active: string;
    completed: string;
    newestFirst: string;
    lowestFunded: string;
    highestFunded: string;
    mostImpact: string;
    clearFilters: string;
    results: string;
    noPrograms: string;
    noProgramsMessage: string;
    resetFilters: string;
    cantFind: string;
    donateGeneral: string;
    biggerImpact: string;
    supportGeneralFund: string;
  };

  // Partnership Page
  partnership: {
    title: string;
    subtitle: string;
    becomePartner: string;
    whyPartner: string;
    meaningfulImpact: string;
    meaningfulImpactDesc: string;
    globalReach: string;
    globalReachDesc: string;
    transparentReporting: string;
    transparentReportingDesc: string;
    brandVisibility: string;
    brandVisibilityDesc: string;
    opportunities: string;
    corporatePartnership: string;
    corporateDesc: string;
    foundationPartnership: string;
    foundationDesc: string;
    ngoPartnership: string;
    ngoDesc: string;
    successStories: string;
    howItWorks: string;
    initialConsultation: string;
    initialConsultationDesc: string;
    customizedProposal: string;
    customizedProposalDesc: string;
    implementation: string;
    implementationDesc: string;
    impactReporting: string;
    impactReportingDesc: string;
    readyToMakeDifference: string;
    explorePartnership: string;
    startConversation: string;
    learnAboutUs: string;
  };

  // Blog Page
  blog: {
    title: string;
    subtitle: string;
    ourBlog: string;
    storiesOfImpact: string;
    discoverLatest: string;
    searchArticles: string;
    allPosts: string;
    impactStories: string;
    updates: string;
    events: string;
    teamNews: string;
    showing: string;
    of: string;
    articles: string;
    noArticles: string;
    noArticlesMessage: string;
    stayUpdated: string;
    neverMissStory: string;
    subscribeNewsletter: string;
    enterEmail: string;
    subscribeNow: string;
    joinSubscribers: string;
    followJourney: string;
    readTime: string;
    tags: string;
    aboutAuthor: string;
    shareArticle: string;
    relatedArticles: string;
  };

  // Volunteer Page
  volunteer: {
    title: string;
    subtitle: string;
    becomeVolunteer: string;
    makeADifference: string;
    whyVolunteer: string;
    makeImpact: string;
    makeImpactDesc: string;
    learnGrow: string;
    learnGrowDesc: string;
    connect: string;
    connectDesc: string;
    empower: string;
    empowerDesc: string;
    application: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    areasOfInterest: string;
    availability: string;
    experience: string;
    motivation: string;
    submit: string;
    submitting: string;
  };

  // CTA Components
  cta: {
    getInvolved: string;
    giveTime: string;
    transformLives: string;
    volunteerDesc: string;
    flexibleSchedule: string;
    flexibleScheduleDesc: string;
    fullTraining: string;
    fullTrainingDesc: string;
    meaningfulImpact: string;
    meaningfulImpactDesc: string;
    applyToVolunteer: string;
    corporatePartnerships: string;
    volunteerImpact: string;
    thisYear: string;
    activeVolunteers: string;
    teachingHours: string;
    studentsTutored: string;
    currentOpportunities: string;
    slots: string;
    partnerWithUs: string;
    createImpact: string;
    partnerDesc: string;
    strategicAlignment: string;
    strategicAlignmentDesc: string;
    partnershipImpact: string;
    activePartners: string;
    jointFunding: string;
    livesImpacted: string;
    partnershipOpportunities: string;
    trustedBy: string;
    stayConnected: string;
    neverMiss: string;
    stayInspired: string;
    blogDesc: string;
    monthlyNewsletter: string;
    monthlyNewsletterDesc: string;
    impactStories: string;
    impactStoriesDesc: string;
    exclusiveContent: string;
    exclusiveContentDesc: string;
    ourReach: string;
    sharingStories: string;
    articlesPublished: string;
    monthlyReaders: string;
    newsletterSubscribers: string;
    popularTopics: string;
    posts: string;
    recentActivity: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    common: {
      loading: "Loading...",
      search: "Search",
      clear: "Clear",
      readMore: "Read More",
      learnMore: "Learn More",
      contactUs: "Contact Us",
      subscribe: "Subscribe",
      viewAll: "View All",
      backTo: "Back to",
    },
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      blog: "Blog",
      partnership: "Partnership",
      volunteer: "Volunteer",
      donate: "Donate",
      contact: "Contact",
      impact: "Impact",
    },
    projects: {
      title: "Make a Difference Today",
      subtitle:
        "Browse our programs and support schools and students who need it most. Every donation is tracked transparently and makes a real impact.",
      ourPrograms: "Our Programs",
      featuredPrograms: "Featured Programs",
      makeADifference: "Make a Difference Today",
      browsePrograms: "Support schools and students who need it most",
      activePrograms: "Active Programs",
      studentsReached: "Students Reached",
      totalRaised: "Total Raised",
      searchPlaceholder: "Search programs...",
      allPrograms: "All Programs",
      literacy: "Literacy",
      numeracy: "Numeracy",
      teacherTraining: "Teacher Training",
      infrastructure: "Infrastructure",
      allStatus: "All Status",
      active: "Active",
      completed: "Completed",
      newestFirst: "Newest First",
      lowestFunded: "Lowest Funded",
      highestFunded: "Highest Funded",
      mostImpact: "Most Impact",
      clearFilters: "Clear",
      results: "results",
      noPrograms: "No Programs Found",
      noProgramsMessage:
        "We couldn't find any programs matching your criteria. Try adjusting your filters or search query.",
      resetFilters: "Reset Filters",
      cantFind: "Can't Find What You're Looking For?",
      donateGeneral: "Donate to General Fund",
      biggerImpact: "Want to Make an Even Bigger Impact?",
      supportGeneralFund:
        "Support our general fund to help us allocate resources where they're needed most across all our programs.",
    },
    partnership: {
      title: "Partner With Us",
      subtitle:
        "Join forces to create lasting impact and transform communities together",
      becomePartner: "Become a Partner",
      whyPartner: "Why Partner With Accelero?",
      meaningfulImpact: "Meaningful Impact",
      meaningfulImpactDesc:
        "Create real change by supporting programs that directly improve lives in underserved communities",
      globalReach: "Global Reach",
      globalReachDesc:
        "Expand your social impact footprint across multiple regions and communities worldwide",
      transparentReporting: "Transparent Reporting",
      transparentReportingDesc:
        "Receive detailed reports on your partnership impact with measurable outcomes and metrics",
      brandVisibility: "Brand Visibility",
      brandVisibilityDesc:
        "Enhance your corporate social responsibility profile through strategic collaboration",
      opportunities: "Partnership Opportunities",
      corporatePartnership: "Corporate Partnership",
      corporateDesc:
        "Strategic alliances with businesses committed to social responsibility and community development",
      foundationPartnership: "Foundation Partnership",
      foundationDesc:
        "Collaborate with foundations to amplify grant-making impact and reach more communities",
      ngoPartnership: "NGO Partnership",
      ngoDesc:
        "Partner with other nonprofits to combine resources and expertise for greater impact",
      successStories: "Partnership Success Stories",
      howItWorks: "How Partnership Works",
      initialConsultation: "Initial Consultation",
      initialConsultationDesc:
        "We discuss your goals, values, and desired impact areas to find the perfect alignment",
      customizedProposal: "Customized Proposal",
      customizedProposalDesc:
        "Receive a tailored partnership proposal outlining objectives, activities, and expected outcomes",
      implementation: "Implementation",
      implementationDesc:
        "Launch collaborative programs with dedicated support and regular communication",
      impactReporting: "Impact Reporting",
      impactReportingDesc:
        "Receive comprehensive reports showcasing the measurable impact of your partnership",
      readyToMakeDifference: "Ready to Make a Difference Together?",
      explorePartnership:
        "Let's explore how we can partner to create meaningful and lasting impact in communities around the world.",
      startConversation: "Start a Conversation",
      learnAboutUs: "Learn About Us",
    },
    blog: {
      title: "Stories of Impact",
      subtitle:
        "Discover the latest news, impact stories, and updates from our work in education and community development.",
      ourBlog: "Our Blog",
      storiesOfImpact: "Stories of Impact",
      discoverLatest:
        "Discover the latest news, impact stories, and updates from our work in education and community development.",
      searchArticles: "Search articles...",
      allPosts: "All Posts",
      impactStories: "Impact Stories",
      updates: "Updates",
      events: "Events",
      teamNews: "Team News",
      showing: "Showing",
      of: "of",
      articles: "articles",
      noArticles: "No Articles Found",
      noArticlesMessage:
        "We couldn't find any articles matching your criteria. Try adjusting your filters or search query.",
      stayUpdated: "Stay Updated",
      neverMissStory: "Never Miss a Story",
      subscribeNewsletter:
        "Subscribe to our newsletter to receive the latest impact stories, program updates, and volunteer opportunities directly in your inbox.",
      enterEmail: "Enter your email",
      subscribeNow: "Subscribe",
      joinSubscribers: "Join 5,000+ subscribers. Unsubscribe anytime.",
      followJourney: "Follow Our Journey",
      readTime: "min read",
      tags: "Tags:",
      aboutAuthor: "About the Author",
      shareArticle: "Share this article",
      relatedArticles: "Related Articles",
    },
    volunteer: {
      title: "Become a Volunteer",
      subtitle:
        "Make a difference in your community. Join our team of dedicated volunteers and help create positive change.",
      becomeVolunteer: "Become a Volunteer",
      makeADifference:
        "Make a difference in your community. Join our team of dedicated volunteers and help create positive change.",
      whyVolunteer: "Why Volunteer?",
      makeImpact: "Make an Impact",
      makeImpactDesc:
        "Directly contribute to meaningful projects that change lives",
      learnGrow: "Learn & Grow",
      learnGrowDesc: "Develop new skills and gain valuable experience",
      connect: "Connect",
      connectDesc: "Meet like-minded people and build lasting relationships",
      empower: "Empower",
      empowerDesc: "Help empower communities to reach their full potential",
      application: "Volunteer Application",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone",
      areasOfInterest: "Areas of Interest",
      availability: "Availability",
      experience: "Relevant Experience (Optional)",
      motivation: "Why do you want to volunteer?",
      submit: "Submit Application",
      submitting: "Submitting...",
    },
    cta: {
      getInvolved: "Get Involved",
      giveTime: "Give Your Time,",
      transformLives: "Transform Lives",
      volunteerDesc:
        "Join our community of passionate volunteers making a direct impact on students' learning journeys. Whether you can teach, mentor, or support our programs - every contribution matters.",
      flexibleSchedule: "Flexible Schedule",
      flexibleScheduleDesc: "Online or on-site, full-time or part-time",
      fullTraining: "Full Training",
      fullTrainingDesc: "Complete onboarding and ongoing support",
      meaningfulImpact: "Meaningful Impact",
      meaningfulImpactDesc: "See the direct results of your work",
      applyToVolunteer: "Apply to Volunteer",
      corporatePartnerships: "Corporate Partnerships",
      volunteerImpact: "Volunteer Impact",
      thisYear: "This year's achievements",
      activeVolunteers: "Active Volunteers",
      teachingHours: "Teaching Hours",
      studentsTutored: "Students Tutored",
      currentOpportunities: "Current Opportunities",
      slots: "slots",
      partnerWithUs: "Partner With Us,",
      createImpact: "Create Lasting Impact",
      partnerDesc:
        "Join leading organizations committed to transforming education and empowering communities. Together, we can amplify your social impact and create sustainable change.",
      strategicAlignment: "Strategic Alignment",
      strategicAlignmentDesc: "Partnerships tailored to your CSR goals",
      partnershipImpact: "Partnership Impact",
      activePartners: "Active Partners",
      jointFunding: "Joint Funding",
      livesImpacted: "Lives Impacted",
      partnershipOpportunities: "Partnership Opportunities",
      trustedBy: "Trusted By",
      stayConnected: "Stay Connected",
      neverMiss: "Never Miss a Story,",
      stayInspired: "Stay Inspired",
      blogDesc:
        "Subscribe to our newsletter and get the latest impact stories, program updates, and inspiring content delivered directly to your inbox every month.",
      monthlyNewsletter: "Monthly Newsletter",
      monthlyNewsletterDesc: "Curated stories and updates",
      impactStories: "Impact Stories",
      impactStoriesDesc: "Real stories from the field",
      exclusiveContent: "Exclusive Content",
      exclusiveContentDesc: "Behind-the-scenes insights",
      ourReach: "Our Reach",
      sharingStories: "Sharing stories that matter",
      articlesPublished: "Articles Published",
      monthlyReaders: "Monthly Readers",
      newsletterSubscribers: "Newsletter Subscribers",
      popularTopics: "Popular Topics",
      posts: "posts",
      recentActivity: "Recent Activity",
    },
  },
  id: {
    common: {
      loading: "Memuat...",
      search: "Cari",
      clear: "Hapus",
      readMore: "Baca Selengkapnya",
      learnMore: "Pelajari Lebih Lanjut",
      contactUs: "Hubungi Kami",
      subscribe: "Berlangganan",
      viewAll: "Lihat Semua",
      backTo: "Kembali ke",
    },
    nav: {
      home: "Beranda",
      about: "Tentang",
      projects: "Program",
      blog: "Blog",
      partnership: "Kemitraan",
      volunteer: "Relawan",
      donate: "Donasi",
      contact: "Kontak",
      impact: "Dampak",
    },
    projects: {
      title: "Buat Perbedaan Hari Ini",
      subtitle:
        "Telusuri program kami dan dukung sekolah serta siswa yang paling membutuhkan. Setiap donasi dilacak secara transparan dan memberikan dampak nyata.",
      ourPrograms: "Program Kami",
      featuredPrograms: "Program Unggulan",
      makeADifference: "Buat Perbedaan Hari Ini",
      browsePrograms: "Dukung sekolah dan siswa yang paling membutuhkan",
      activePrograms: "Program Aktif",
      studentsReached: "Siswa Terjangkau",
      totalRaised: "Total Terkumpul",
      searchPlaceholder: "Cari program...",
      allPrograms: "Semua Program",
      literacy: "Literasi",
      numeracy: "Numerasi",
      teacherTraining: "Pelatihan Guru",
      infrastructure: "Infrastruktur",
      allStatus: "Semua Status",
      active: "Aktif",
      completed: "Selesai",
      newestFirst: "Terbaru",
      lowestFunded: "Pendanaan Terendah",
      highestFunded: "Pendanaan Tertinggi",
      mostImpact: "Dampak Terbesar",
      clearFilters: "Hapus",
      results: "hasil",
      noPrograms: "Program Tidak Ditemukan",
      noProgramsMessage:
        "Kami tidak dapat menemukan program yang sesuai dengan kriteria Anda. Coba sesuaikan filter atau kata kunci pencarian Anda.",
      resetFilters: "Reset Filter",
      cantFind: "Tidak Menemukan yang Anda Cari?",
      donateGeneral: "Donasi ke Dana Umum",
      biggerImpact: "Ingin Membuat Dampak yang Lebih Besar?",
      supportGeneralFund:
        "Dukung dana umum kami untuk membantu kami mengalokasikan sumber daya ke program yang paling membutuhkan.",
    },
    partnership: {
      title: "Bermitra Dengan Kami",
      subtitle:
        "Bergabunglah untuk menciptakan dampak jangka panjang dan mengubah komunitas bersama-sama",
      becomePartner: "Menjadi Mitra",
      whyPartner: "Mengapa Bermitra Dengan Accelero?",
      meaningfulImpact: "Dampak Bermakna",
      meaningfulImpactDesc:
        "Ciptakan perubahan nyata dengan mendukung program yang secara langsung meningkatkan kehidupan di komunitas yang kurang terlayani",
      globalReach: "Jangkauan Global",
      globalReachDesc:
        "Perluas jejak dampak sosial Anda di berbagai wilayah dan komunitas di seluruh dunia",
      transparentReporting: "Pelaporan Transparan",
      transparentReportingDesc:
        "Terima laporan rinci tentang dampak kemitraan Anda dengan hasil dan metrik yang terukur",
      brandVisibility: "Visibilitas Merek",
      brandVisibilityDesc:
        "Tingkatkan profil tanggung jawab sosial perusahaan Anda melalui kolaborasi strategis",
      opportunities: "Peluang Kemitraan",
      corporatePartnership: "Kemitraan Korporat",
      corporateDesc:
        "Aliansi strategis dengan bisnis yang berkomitmen pada tanggung jawab sosial dan pengembangan komunitas",
      foundationPartnership: "Kemitraan Yayasan",
      foundationDesc:
        "Berkolaborasi dengan yayasan untuk memperkuat dampak pemberian hibah dan menjangkau lebih banyak komunitas",
      ngoPartnership: "Kemitraan LSM",
      ngoDesc:
        "Bermitra dengan organisasi nirlaba lain untuk menggabungkan sumber daya dan keahlian untuk dampak yang lebih besar",
      successStories: "Kisah Sukses Kemitraan",
      howItWorks: "Cara Kerja Kemitraan",
      initialConsultation: "Konsultasi Awal",
      initialConsultationDesc:
        "Kami mendiskusikan tujuan, nilai, dan area dampak yang Anda inginkan untuk menemukan keselarasan yang sempurna",
      customizedProposal: "Proposal Disesuaikan",
      customizedProposalDesc:
        "Terima proposal kemitraan yang disesuaikan dengan tujuan, aktivitas, dan hasil yang diharapkan",
      implementation: "Implementasi",
      implementationDesc:
        "Luncurkan program kolaboratif dengan dukungan khusus dan komunikasi rutin",
      impactReporting: "Pelaporan Dampak",
      impactReportingDesc:
        "Terima laporan komprehensif yang menampilkan dampak terukur dari kemitraan Anda",
      readyToMakeDifference: "Siap Membuat Perbedaan Bersama?",
      explorePartnership:
        "Mari kita jelajahi bagaimana kita dapat bermitra untuk menciptakan dampak yang bermakna dan berkelanjutan di komunitas di seluruh dunia.",
      startConversation: "Mulai Percakapan",
      learnAboutUs: "Pelajari Tentang Kami",
    },
    blog: {
      title: "Kisah Dampak",
      subtitle:
        "Temukan berita terbaru, kisah dampak, dan pembaruan dari pekerjaan kami di bidang pendidikan dan pengembangan komunitas.",
      ourBlog: "Blog Kami",
      storiesOfImpact: "Kisah Dampak",
      discoverLatest:
        "Temukan berita terbaru, kisah dampak, dan pembaruan dari pekerjaan kami di bidang pendidikan dan pengembangan komunitas.",
      searchArticles: "Cari artikel...",
      allPosts: "Semua Postingan",
      impactStories: "Kisah Dampak",
      updates: "Pembaruan",
      events: "Acara",
      teamNews: "Berita Tim",
      showing: "Menampilkan",
      of: "dari",
      articles: "artikel",
      noArticles: "Artikel Tidak Ditemukan",
      noArticlesMessage:
        "Kami tidak dapat menemukan artikel yang sesuai dengan kriteria Anda. Coba sesuaikan filter atau kata kunci pencarian Anda.",
      stayUpdated: "Tetap Terkini",
      neverMissStory: "Jangan Lewatkan Cerita",
      subscribeNewsletter:
        "Berlangganan newsletter kami untuk menerima kisah dampak terbaru, pembaruan program, dan peluang relawan langsung di kotak masuk Anda.",
      enterEmail: "Masukkan email Anda",
      subscribeNow: "Berlangganan",
      joinSubscribers:
        "Bergabung dengan 5.000+ pelanggan. Berhenti berlangganan kapan saja.",
      followJourney: "Ikuti Perjalanan Kami",
      readTime: "menit baca",
      tags: "Tag:",
      aboutAuthor: "Tentang Penulis",
      shareArticle: "Bagikan artikel ini",
      relatedArticles: "Artikel Terkait",
    },
    volunteer: {
      title: "Menjadi Relawan",
      subtitle:
        "Buat perbedaan di komunitas Anda. Bergabunglah dengan tim relawan kami yang berdedikasi dan bantu ciptakan perubahan positif.",
      becomeVolunteer: "Menjadi Relawan",
      makeADifference:
        "Buat perbedaan di komunitas Anda. Bergabunglah dengan tim relawan kami yang berdedikasi dan bantu ciptakan perubahan positif.",
      whyVolunteer: "Mengapa Menjadi Relawan?",
      makeImpact: "Buat Dampak",
      makeImpactDesc:
        "Berkontribusi langsung pada proyek bermakna yang mengubah hidup",
      learnGrow: "Belajar & Berkembang",
      learnGrowDesc:
        "Kembangkan keterampilan baru dan dapatkan pengalaman berharga",
      connect: "Terhubung",
      connectDesc:
        "Bertemu dengan orang-orang yang berpikiran sama dan membangun hubungan yang langgeng",
      empower: "Berdayakan",
      empowerDesc:
        "Bantu memberdayakan komunitas untuk mencapai potensi penuh mereka",
      application: "Aplikasi Relawan",
      firstName: "Nama Depan",
      lastName: "Nama Belakang",
      email: "Email",
      phone: "Telepon",
      areasOfInterest: "Bidang Minat",
      availability: "Ketersediaan",
      experience: "Pengalaman Relevan (Opsional)",
      motivation: "Mengapa Anda ingin menjadi relawan?",
      submit: "Kirim Aplikasi",
      submitting: "Mengirim...",
    },
    cta: {
      getInvolved: "Terlibat",
      giveTime: "Berikan Waktu Anda,",
      transformLives: "Ubah Kehidupan",
      volunteerDesc:
        "Bergabunglah dengan komunitas relawan kami yang bersemangat memberikan dampak langsung pada perjalanan belajar siswa. Baik Anda dapat mengajar, membimbing, atau mendukung program kami - setiap kontribusi penting.",
      flexibleSchedule: "Jadwal Fleksibel",
      flexibleScheduleDesc:
        "Online atau di tempat, penuh waktu atau paruh waktu",
      fullTraining: "Pelatihan Lengkap",
      fullTrainingDesc: "Orientasi lengkap dan dukungan berkelanjutan",
      meaningfulImpact: "Dampak Bermakna",
      meaningfulImpactDesc: "Lihat hasil langsung dari pekerjaan Anda",
      applyToVolunteer: "Daftar Menjadi Relawan",
      corporatePartnerships: "Kemitraan Korporat",
      volunteerImpact: "Dampak Relawan",
      thisYear: "Pencapaian tahun ini",
      activeVolunteers: "Relawan Aktif",
      teachingHours: "Jam Mengajar",
      studentsTutored: "Siswa Dibimbing",
      currentOpportunities: "Peluang Saat Ini",
      slots: "slot",
      partnerWithUs: "Bermitra Dengan Kami,",
      createImpact: "Ciptakan Dampak Jangka Panjang",
      partnerDesc:
        "Bergabunglah dengan organisasi terkemuka yang berkomitmen untuk mengubah pendidikan dan memberdayakan komunitas. Bersama-sama, kita dapat memperkuat dampak sosial Anda dan menciptakan perubahan yang berkelanjutan.",
      strategicAlignment: "Keselarasan Strategis",
      strategicAlignmentDesc:
        "Kemitraan yang disesuaikan dengan tujuan CSR Anda",
      partnershipImpact: "Dampak Kemitraan",
      activePartners: "Mitra Aktif",
      jointFunding: "Pendanaan Bersama",
      livesImpacted: "Kehidupan Terdampak",
      partnershipOpportunities: "Peluang Kemitraan",
      trustedBy: "Dipercaya Oleh",
      stayConnected: "Tetap Terhubung",
      neverMiss: "Jangan Lewatkan Cerita,",
      stayInspired: "Tetap Terinspirasi",
      blogDesc:
        "Berlangganan newsletter kami dan dapatkan kisah dampak terbaru, pembaruan program, dan konten inspiratif langsung di kotak masuk Anda setiap bulan.",
      monthlyNewsletter: "Newsletter Bulanan",
      monthlyNewsletterDesc: "Cerita dan pembaruan terkurasi",
      impactStories: "Kisah Dampak",
      impactStoriesDesc: "Kisah nyata dari lapangan",
      exclusiveContent: "Konten Eksklusif",
      exclusiveContentDesc: "Wawasan di balik layar",
      ourReach: "Jangkauan Kami",
      sharingStories: "Berbagi cerita yang penting",
      articlesPublished: "Artikel Dipublikasikan",
      monthlyReaders: "Pembaca Bulanan",
      newsletterSubscribers: "Pelanggan Newsletter",
      popularTopics: "Topik Populer",
      posts: "postingan",
      recentActivity: "Aktivitas Terkini",
    },
  },
};

export function getTranslation(lang: Language): Translations {
  return translations[lang] || translations.en;
}

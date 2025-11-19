export type Language = 'en' | 'id'

export const translations = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    blog: 'Blog',
    contact: 'Contact',
    donate: 'Donate',
    volunteer: 'Volunteer',
    members: 'Members',
    partner: 'Partner',
    impact: 'Impact',
    help: 'Help',

    // Common
    learnMore: 'Learn More',
    readMore: 'Read More',
    getStarted: 'Get Started',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    search: 'Search',
    loading: 'Loading...',

    // Messages
    welcomeMessage: 'Welcome to Accelero',
    successMessage: 'Success!',
    errorMessage: 'Something went wrong',
  },
  id: {
    // Navigation
    home: 'Beranda',
    about: 'Tentang',
    projects: 'Proyek',
    blog: 'Blog',
    contact: 'Kontak',
    donate: 'Donasi',
    volunteer: 'Relawan',
    members: 'Anggota',
    partner: 'Mitra',
    impact: 'Dampak',
    help: 'Bantuan',

    // Common
    learnMore: 'Pelajari Lebih Lanjut',
    readMore: 'Baca Selengkapnya',
    getStarted: 'Mulai',
    submit: 'Kirim',
    cancel: 'Batal',
    save: 'Simpan',
    edit: 'Edit',
    delete: 'Hapus',
    search: 'Cari',
    loading: 'Memuat...',

    // Messages
    welcomeMessage: 'Selamat datang di Accelero',
    successMessage: 'Berhasil!',
    errorMessage: 'Terjadi kesalahan',
  },
}

export type TranslationKey = keyof typeof translations.en

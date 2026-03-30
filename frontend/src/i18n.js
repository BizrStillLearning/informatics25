import { createI18n } from 'vue-i18n';

const messages = {
    ID: {
        nav: { home: 'Beranda', students: 'Mahasiswa', event: 'Agenda', admin: 'Admin', structure: 'Struktur', about:'Tentang Kami', gallery: 'Galeri Kami' },
        hero: {
            buttons: { students: "Lihat Mahasiswa", gallery: "Lihat Galeri" },
            slides: [ { title: "Informatika 25" }, { title: "Masa Depan" }, { title: "Kreativitas" }, { title: "Solidaritas" } ]
        },
        about: {
            badge: "Awal Perjalanan",
            title_part1: "Bersatu Dalam",
            title_highlight: "Perbedaan",
            description: "Kami adalah kolektif pemikir kreatif dan insinyur masa depan yang berdedikasi untuk mendorong batas teknologi informatika. Berasal dari berbagai latar belakang, kami membangun sinergi dalam setiap baris kode.",
            stats: {
                item1: { title: "Tahun Masuk", desc: "Memulai perjalanan sejak 2025." },
                item2: { title: "Keberagaman", desc: "Talenta dari seluruh Indonesia." }
            },
            quote: "Dari Sabang sampai Merauke, kami berkumpul di sini untuk menuliskan kode masa depan bersama-sama."
        },
        structure: {
            badge: 'Struktur Organisasi',
            roles: {
                komting: 'Komisaris Tingkat',
                wakil: 'Wakil Komting',
                sekretaris1: 'Sekretaris I',
                sekretaris2: 'Sekretaris II',
                bendahara1: 'Bendahara I',
                bendahara2: 'Bendahara II'
            }
        },
        gallery: {
            badge: 'Arsip Visual',
            title_part1: 'Galeri',
            title_highlight: 'Angkatan',
            empty: 'Belum ada dokumentasi untuk kategori ini.'
        },
        galleryEventDetail: {
            back: "Kembali",
            visualArchive: "Arsip Visual",
            totalPhotos: "Foto Dokumentasi",
            about: "Tentang Momen Ini",
            info: {
                date: "Waktu Pelaksanaan",
                location: "Titik Lokasi",
                participants: "Total Peserta"
            },
            items: {
                makrab: {
                    title: "Midniight 2026",
                    category: "Gathering",
                    desc: "Momen di mana tembok pembatas antar individu runtuh, digantikan oleh tawa dan janji untuk berjuang bersama."
                },
                ba2026: {
                    title: "Baitul Arqam 2026",
                    category: "Gathering",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi facere fuga impedit, ipsum nesciunt perspiciatis?\n."
                },

                bukber: {
                    title: "Buka Bersama Angkatan 2026",
                    category: "Event",
                    desc: "Buka bersama angkatan 2025 di bulan ramadhan."
                }
            }
        },
        students: {
            badge: 'Database Angkatan',
            title_part1: 'Directory',
            title_highlight: 'Mahasiswa',
            search_placeholder: 'Cari Nama atau NIM...',
            sort_alpha: 'Urut Abjad',
            sort_nim: 'Urut NIM',
            view_profile: 'Lihat Profil',
            no_results: 'Pencarian tidak menemukan hasil.'
        },
        studentDetail: {
            back: 'Kembali ke Directory',
            default_quote: 'Eksplorasi tanpa batas di dunia baris kode.',
            tabs: { profile: 'Profil', portfolio: 'Portfolio', gallery: 'Galeri' },
            labels: { name: 'Nama Lengkap', address: 'Domisili', school: 'Asal Sekolah', goal: 'Cita-Cita', hobby: 'Hobi' },
            portfolio_desc1: 'Membangun platform digital angkatan dengan teknologi modern.',
            portfolio_desc2: 'Sistem manajemen terintegrasi untuk pondok pesantren.'
        },
        events: {
            badge: "Agenda Terlewati",
            title_main: "Kegiatan",
            title_highlight: "Angkatan",
            location_label: "Lokasi",
            btn_documentation: "Lihat Dokumentasi",
            categories: { makrab: "Makrab", others: "Lain-lain" },
            item1: { title: "Malam Keakraban", desc: "Kegiatan untuk saling mengenal dan mempererat kebersamaan mahasiswa Informatika angkatan 25." },
            item2: { title: "Buka Bersama", desc: "Kegiatan buka puasa bersama mahasiswa Informatika angkatan 25 di bulan Ramadan." }
        },
        footer: {
            description: 'Wadah digital resmi Angkatan 2025. Tempat di mana kenangan disimpan, prestasi dirayakan, dan koneksi dipererat.',
            nav_title: 'Navigasi',
            contact_title: 'Hubungi Kami',
            cta_title: 'Butuh bantuan atau ingin kolaborasi?',
            wa_text: 'Halo Admin Informatika 25! Saya ingin bertanya mengenai...',
            location_title: "Lokasi Kampus",
            campus_name: "Universitas Muhammadiyah Surabaya",
            building_detail: "Gedung Lab Teknik / Lantai 4",
            address: "Jl. Sutorejo No.59, Surabaya"
        },
        login: {
            back: "Kembali",
            title_part1: "Admin",
            title_highlight: "Access",
            badge: "Gatekeeper Protocol",
            label_user: "Username",
            label_pass: "Password",
            btn_login: "Masuk ke Dashboard",
            error_empty: "Username dan password wajib diisi",
            error_wrong: "Username atau password salah (Gunakan admin/admin)",
            footer: "Informatika 25 Protocol"
        },
    },
    EN: {
        nav: { home: 'Home', students: 'Students', event: 'Events', admin: 'Admin', structure: 'Structure', about:'About Us', gallery: 'Our Gallery' },
        hero: {
            buttons: { students: "View Students", gallery: "View Gallery" },
            slides: [ { title: "Informatics 25" }, { title: "The Future" }, { title: "Creativity" }, { title: "Solidarity" } ]
        },
        about: {
            badge: "The Beginning",
            title_part1: "United In",
            title_highlight: "Diversity",
            description: "We are a collective of creative thinkers and future engineers dedicated to pushing the boundaries of information technology. From various backgrounds, we build synergy in every line of code.",
            stats: {
                item1: { title: "Entry Year", desc: "Starting the journey since 2025." },
                item2: { title: "Diversity", desc: "Talents from all over Indonesia." }
            },
            quote: "From Sabang to Merauke, we gather here to write the code of the future together."
        },
        structure: {
            badge: 'Organizational Structure',
            roles: {
                komting: 'Class Leader',
                wakil: 'Vice Leader',
                sekretaris1: 'Secretary I',
                sekretaris2: 'Secretary II',
                bendahara1: 'Treasurer I',
                bendahara2: 'Treasurer II'
            }
        },
        gallery: {
            badge: 'Visual Archive',
            title_part1: 'Batch',
            title_highlight: 'Gallery',
            empty: 'No documentation available for this category.'
        },
        students: {
            badge: 'Batch Database',
            title_part1: 'Student',
            title_highlight: 'Directory',
            search_placeholder: 'Search Name or ID...',
            sort_alpha: 'Sort A-Z',
            sort_nim: 'Sort by ID',
            view_profile: 'View Profile',
            no_results: 'No results found.'
        },
        studentDetail: {
            back: 'Back to Directory',
            default_quote: 'Limitless exploration in the world of code.',
            tabs: { profile: 'Profile', portfolio: 'Portfolio', gallery: 'Gallery' },
            labels: { name: 'Full Name', address: 'Domicile', school: 'Previous School', goal: 'Life Goal', hobby: 'Hobby' },
            portfolio_desc1: 'Building batch digital platform with modern technology.',
            portfolio_desc2: 'Integrated management system for Islamic schools.'
        },
        events: {
            badge: "Past Events",
            title_main: "Batch",
            title_highlight: "Activities",
            location_label: "Location",
            btn_documentation: "View Documentation",
            categories: { makrab: "Gathering", others: "Others" },
            item1: { title: "Gathering Night", desc: "Activity to get to know each other and strengthen the bond of Informatics 25." },
            item2: { title: "Iftar Gathering", desc: "Breaking fast together during the month of Ramadan." }
        },
        footer: {
            description: 'Official digital hub for Batch 2025. Where memories are stored, achievements celebrated, and connections strengthened.',
            nav_title: 'Navigation',
            contact_title: 'Contact Us',
            cta_title: 'Need help or want to collaborate?',
            wa_text: 'Hi Informatics 25 Admin! I would like to ask about...',
            location_title: "Campus Location",
            campus_name: "Muhammadiyah University of Surabaya",
            building_detail: "Engineering Lab Building / 4th Floor",
            address: "Sutorejo St. No.59, Surabaya"
        },
        login: {
            back: "Back",
            title_part1: "Admin",
            title_highlight: "Access",
            badge: "Gatekeeper Protocol",
            label_user: "Username",
            label_pass: "Password",
            btn_login: "Sign to Dashboard",
            error_empty: "Username and password are required",
            error_wrong: "Invalid username or password (Use admin/admin)",
            footer: "Informatics 25 Protocol"
        },
    },
    AR: {
        nav: { home: 'الرئيسية', students: 'الطلاب', event: 'الأجندة', admin: 'مسؤول', structure: 'الهيكل', about: 'نبذة عنا', gallery: 'معرضنا' },
        hero: {
            buttons: { students: "قائمة الطلاب", gallery: "معرض الصور" },
            slides: [ { title: "المعلوماتية 25" }, { title: "المستقبل" }, { title: "الإبداع" }, { title: "التضامن" } ]
        },
        about: {
            badge: "بداية الرحلة",
            title_part1: "متحدون في",
            title_highlight: "التنوع",
            description: "نحن مجموعة من المفكرين المبدعين ومهندسي المستقبل المكرسين لدفع حدود تكنولوجيا المعلومات.",
            stats: {
                item1: { title: "سنة الدخول", desc: "بدأنا الرحلة منذ عام 2025." },
                item2: { title: "التنوع", desc: "مواهب من جميع أنحاء إندونيسيا." }
            },
            quote: "من سابانج إلى ميروك، نجتمع هنا لنكتب كود المستقبل معاً."
        },
        structure: {
            badge: 'الهيكل التنظيمي',
            roles: {
                komting: 'قائد الفصل',
                wakil: 'نائب القائد',
                sekretaris1: 'السكرتير الأول',
                sekretaris2: 'السكرتير الثاني',
                bendahara1: 'أمين الصندوق الأول',
                bendahara2: 'أمين الصندوق الثاني'
            }
        },
        gallery: {
            badge: 'الأرشيف البصري',
            title_part1: 'معرض',
            title_highlight: 'الدفعة',
            empty: 'لا توجد وثائق لهذه الفئة بعد.'
        },
        students: {
            badge: 'قاعدة بيانات الدفعة',
            title_part1: 'دليل',
            title_highlight: 'الطلاب',
            search_placeholder: 'بحث بالاسم أو الرقم الجامعي...',
            sort_alpha: 'ترتيب أبجدي',
            sort_nim: 'ترتيب بالرقم',
            view_profile: 'عرض الملف الشخصي',
            no_results: 'لم يتم العثور على نتائج.'
        },
        events: {
            badge: "الأحداث السابقة",
            title_main: "أنشطة",
            title_highlight: "الدفعة",
            location_label: "الموقع",
            btn_documentation: "مشاهدة التوثيق",
            categories: { makrab: "تجمع", others: "أخرى" },
            item1: { title: "ليلة التعارف", desc: "نشاط للتعرف على بعضنا البعض وتعزيز الروابط." },
            item2: { title: "إفطار جماعي", desc: "نشاط الإفطار الجماعي في شهر رمضان." }
        },
        footer: {
            description: 'المركز الرقمي الرسمي لدفعة 2025. حيث تُحفظ الذكريات، ويُحتفل بالإنجازات.',
            nav_title: 'تصفح',
            contact_title: 'اتصل بنا',
            cta_title: 'هل تحتاج إلى مساعدة أو ترغب في التعاون؟',
            wa_text: 'مرحباً مسؤول المعلوماتية 25...',
            location_title: "موقع الحرم الجامعي",
            campus_name: "جامعة محمدية سورابايا",
            building_detail: "مبنى مختبر الهندسة / الطابق الرابع",
            address: "شارع سوتوريجو رقم 59، سورابايا"
        },
        login : {
            back: "رجوع",
            title_part1: "وصول",
            title_highlight: "المشرف",
            badge: "بوابة الدخول",
            label_user: "اسم المستخدم",
            label_pass: "كلمة المرور",
            btn_login: "تسجيل الدخول إلى لوحة التحكم",
            error_empty: "اسم المستخدم وكلمة المرور مطلوبان",
            error_wrong: "اسم المستخدم أو كلمة المرور غير صحيحة",
            footer: "نظام معلوماتية 25"
        }
    },
    JP: {
        nav: { home: 'ホーム', students: '学生', event: '予定', admin: '管理者', structure: '組織', about: '私たちについて', gallery: 'ギャラリー' },
        hero: {
            buttons: { students: "学生リスト", gallery: "ギャラリー" },
            slides: [ { title: "情報学 25" }, { title: "未来" }, { title: "創造性" }, { title: "連帯" } ]
        },
        about: {
            badge: "旅の始まり",
            title_part1: "多様性の中の",
            title_highlight: "団結",
            description: "私たちは、情報技術の限界を押し広げることに専念する、創造的な思想家と未来のエンジニアの集まりです。",
            stats: {
                item1: { title: "入学年度", desc: "2025年から旅を開始。" },
                item2: { title: "多様性", desc: "インドネシア全土からの才能。" }
            },
            quote: "私たちはここに集まり、共に未来のコードを書き上げます。"
        },
        structure: {
            badge: '組織構造',
            roles: {
                komting: 'クラス代表',
                wakil: '副代表',
                sekretaris1: '書記 I',
                sekretaris2: '書記 II',
                bendahara1: '会計 I',
                bendahara2: '会計 II'
            }
        },
        gallery: {
            badge: 'アーカイブ',
            title_part1: '期',
            title_highlight: 'ギャラリー',
            empty: 'このカテゴリにはまだ記録がありません。'
        },
        students: {
            badge: '学生データベース',
            title_part1: '学生',
            title_highlight: '名簿',
            search_placeholder: '名前や学籍番号で検索...',
            sort_alpha: '五十音順',
            sort_nim: '学籍番号順',
            view_profile: 'プロフィールを表示',
            no_results: '結果が見つかりませんでした。'
        },
        events: {
            badge: "過去のイベント",
            title_main: "期",
            title_highlight: "活動",
            location_label: "場所",
            btn_documentation: "記録を見る",
            categories: { makrab: "交流会", others: "その他" },
            item1: { title: "親睦の夜", desc: "お互いを知り、絆を深めるための活動。" },
            item2: { title: "イフタール会", desc: "ラマダン中の合同断食明けの食事会。" }
        },
        footer: {
            description: '2025年度生の公式デジタルハブ。思い出を保存し、実績を祝う場所。',
            nav_title: 'ナビゲーション',
            contact_title: 'お問い合わせ',
            cta_title: 'サポートやコラボレーションが必要ですか？',
            wa_text: 'こんにちは、情報学25管理者！質問があります...',
            location_title: "キャンパス所在地",
            campus_name: "スラバヤ・ムハンマディヤ大学",
            building_detail: "工学ラボビル / 4階",
            address: "スラバヤ、ストゥレジョ通り 59番"
        },
        login: {
            back: "戻る",
            title_part1: "管理者",
            title_highlight: "アクセス",
            badge: "ログインポータル",
            label_user: "ユーザー名",
            label_pass: "パスワード",
            btn_login: "ダッシュボードへログイン",
            error_empty: "ユーザー名とパスワードは必須です",
            error_wrong: "ユーザー名またはパスワードが正しくありません",
            footer: "情報学25システム"
        }
    },
    CN: {
        nav: { home: '首页', students: '学生', event: '议程', admin: '管理', structure: '结构', about: '关于我们', gallery: '我们的画廊' },
        hero: {
            buttons: { students: "学生名单", gallery: "查看画廊" },
            slides: [ { title: "信息学 25" }, { title: "未来" }, { title: "创造力" }, { title: "团结" } ]
        },
        about: {
            badge: "旅程开始",
            title_part1: "在多样性中",
            title_highlight: "团结",
            description: "我们是一群充满创造力的思想家和未来的工程师，致力于突破信息技术的界限。",
            stats: {
                item1: { title: "入学年份", desc: "自2025年开启旅程。" },
                item2: { title: "多样性", desc: "来自印尼各地的天才。" }
            },
            quote: "我们齐聚于此，共同编写未来的代码。"
        },
        structure: {
            badge: '组织结构',
            roles: {
                komting: '班长',
                wakil: '副班长',
                sekretaris1: '秘书 I',
                sekretaris2: '秘书 II',
                bendahara1: '财务 I',
                bendahara2: '财务 II'
            }
        },
        gallery: {
            badge: '视觉档案',
            title_part1: '届',
            title_highlight: '画廊',
            empty: '该分类暂无相关记录。'
        },
        students: {
            badge: '届学生数据库',
            title_part1: '学生',
            title_highlight: '目录',
            search_placeholder: '搜索姓名或学号...',
            sort_alpha: '字母排序',
            sort_nim: '学号排序',
            view_profile: '查看详情',
            no_results: '未找到结果。'
        },
        events: {
            badge: "往期活动",
            title_main: "届",
            title_highlight: "活动",
            location_label: "地点",
            btn_documentation: "查看记录",
            categories: { makrab: "聚会", others: "其他" },
            item1: { title: "迎新晚会", desc: "旨在增进了解、加强联系的活动。" },
            item2: { title: "开斋聚餐", desc: "斋月期间的集体开斋活动。" }
        },
        footer: {
            description: '2025届官方数字中心。保存记忆、庆祝成就并加强联系的地方。',
            nav_title: '导航',
            contact_title: '联系我们',
            cta_title: '需要帮助或想要合作？',
            wa_text: '您好，信息学 25 管理员！我想咨询...',
            location_title: "校区位置",
            campus_name: "泗水穆罕默德迪亚大学",
            building_detail: "工程实验楼 / 4楼",
            address: "泗水 Sutorejo 街 59 号"
        },
        login: {
            back: "返回",
            title_part1: "管理员",
            title_highlight: "访问",
            badge: "登录入口",
            label_user: "用户名",
            label_pass: "密码",
            btn_login: "登录到后台",
            error_empty: "请输入用户名和密码",
            error_wrong: "用户名或密码错误",
            footer: "信息学25系统"
        }
    },
    KR: {
        nav: { home: '홈', students: '학생', event: '일정', admin: '관리', structure: '조직', about: '회사 소개', gallery: '갤러리' },
        hero: {
            buttons: { students: "학생 명단", gallery: "갤러리 보기" },
            slides: [ { title: "정보공학 25" }, { title: "미래" }, { title: "창의성" }, { title: "연대" } ]
        },
        about: {
            badge: "여정의 시작",
            title_part1: "다양성 속의",
            title_highlight: "단결",
            description: "우리는 정보 기술의 경계를 넓히기 위해 헌신하는 창의적인 사상가들과 미래 엔지니어들의 집단입니다.",
            stats: {
                item1: { title: "입학 연도", desc: "2025년부터 여정을 시작했습니다." },
                item2: { title: "다양성", desc: "인도네시아 전역의 인재들." }
            },
            quote: "우리는 미래의 코드를 함께 쓰기 위해 이곳에 모였습니다."
        },
        structure: {
            badge: '조직 구조',
            roles: {
                komting: '과대표',
                wakil: '부대표',
                sekretaris1: '서기 I',
                sekretaris2: '서기 II',
                bendahara1: '회계 I',
                bendahara2: '회계 II'
            }
        },
        gallery: {
            badge: '비주얼 아카이브',
            title_part1: '기수',
            title_highlight: '갤러리',
            empty: '이 카테고리에는 아직 기록이 없습니다.'
        },
        students: {
            badge: '학생 데이터베이스',
            title_part1: '학생',
            title_highlight: '디렉토리',
            search_placeholder: '이름 또는 학번 검색...',
            sort_alpha: '가나다순',
            sort_nim: '학번순',
            view_profile: '프로필 보기',
            no_results: '결과가 없습니다.'
        },
        events: {
            badge: "지난 일정",
            title_main: "기수",
            title_highlight: "활동",
            location_label: "장소",
            btn_documentation: "기록 보기",
            categories: { makrab: "친목회", others: "기타" },
            item1: { title: "친목의 밤", desc: "서로를 알아가고 유대감을 강화하는 활동입니다." },
            item2: { title: "이프타르 모임", desc: "라마단 기간 동안의 공동 식사 모임입니다." }
        },
        footer: {
            description: '2025학번 공식 디지털 허브. 추억을 보관하고 성과를 축하하는 공간입니다.',
            nav_title: '네비게이션',
            contact_title: '문의하기',
            cta_title: '도움이나 협업이 필요하신가요?',
            wa_text: '안녕하세요 정보공학 25 관리자님! ~에 대해 문의하고 싶습니다...',
            location_title: "캠퍼스 위치",
            campus_name: "수라바야 무함마디야 대학교",
            building_detail: "공학 실험동 / 4층",
            address: "수라바야, Sutorejo 거리 59번지"
        },
        login: {
            back: "뒤로",
            title_part1: "관리자",
            title_highlight: "접근",
            badge: "로그인 포털",
            label_user: "아이디",
            label_pass: "비밀번호",
            btn_login: "대시보드 로그인",
            error_empty: "아이디와 비밀번호를 입력하세요",
            error_wrong: "아이디 또는 비밀번호가 올바르지 않습니다",
            footer: "정보학 25 시스템"
        }
    }
};

const i18n = createI18n({
    legacy: false,
    locale: 'ID',
    fallbackLocale: 'EN',
    messages,
});

export default i18n;
import heroFeastImg from '../assets/images/hero_egyptian_feast_1794535261547.jpg';
import molokhiaTagineImg from '../assets/images/dish_molokhia_tagine_1794535260150.jpg';
import mixedGrillImg from '../assets/images/dish_mixed_grill_1794535260618.jpg';
import fattaPigeonImg from '../assets/images/dish_fatta_pigeon_1794535261580.jpg';
import bamiaMahshiImg from '../assets/images/dish_bamia_mahshi_1794535262072.jpg';
import kosharyHawawshiImg from '../assets/images/dish_koshary_hawawshi_1794535262753.jpg';
import omAliKunafaImg from '../assets/images/dish_om_ali_kunafa_1794535261621.jpg';
import { Dish, DishAddon, DishCategory } from '../types';

export const HERO_IMAGE = heroFeastImg;

export const CATEGORIES: { id: DishCategory; label: string }[] = [
  { id: 'all', label: 'الكل' },
  { id: 'tagines', label: 'طواجن الفخار' },
  { id: 'grills', label: 'مشويات الفحم' },
  { id: 'classics', label: 'أطباق مصرية أصيلة' },
  { id: 'desserts', label: 'حلويات شرقية' },
];

const SAVORY_ADDONS: DishAddon[] = [
  { id: 'baladi-bread', label: 'عيش بلدي ساخن (٣ أرغفة)', price: 15 },
  { id: 'tahina', label: 'سلطة طحينة بالكمون', price: 25 },
  { id: 'torshi', label: 'مخلل بلدي مشكل', price: 15 },
  { id: 'vermicelli-rice', label: 'أرز مصري بالشعرية إضافي', price: 45 },
];

const DESSERT_ADDONS: DishAddon[] = [
  { id: 'extra-eshta', label: 'إضافة قشطة بلدي طازجة', price: 30 },
  { id: 'extra-pistachio', label: 'فستق حلبي مجروش إضافي', price: 35 },
];

export const MENU_DISHES: Dish[] = [
  {
    id: 'molokhia-chicken',
    name: 'طاجن ملوخية بالثوم وفراخ محمرة',
    category: 'tagines',
    categoryLabel: 'طواجن الفخار',
    prepTime: '٢٥ دقيقة',
    servingLabel: 'يكفي ١–٢ فرد',
    price: 215,
    featured: true,
    description:
      'ملوخية خضراء مخرطة طازجة مطهوة في مرق الدجاج البلدي مع طشة الثوم والكزبرة بالسمن البلدي، تُقدّم مع نصف فرخة محمرة وأرز بالشعرية.',
    ingredients: ['ملوخية بلدي طازجة', 'ثوم وكزبرة ناشفة', 'سمن بلدي طبيعي', 'دجاج بلدي محمر', 'أرز بالشعرية'],
    image: molokhiaTagineImg,
    portions: [
      { id: 'single', label: 'فردي', extraPrice: 0 },
      { id: 'family', label: 'عائلي مضاعف', extraPrice: 170 },
    ],
    addons: SAVORY_ADDONS,
  },
  {
    id: 'mixed-grill',
    name: 'صينية ميكس جريل الحاتي على الفحم',
    category: 'grills',
    categoryLabel: 'مشويات الفحم',
    prepTime: '٣٠ دقيقة',
    servingLabel: '٤٥٠ جم صافي',
    price: 390,
    featured: true,
    description:
      'تشكيلة مشويات فحم من الكفتة الضاني المفرومة مع الكباب البتلو وشيش طاووق متبل، تُقدّم فوق البقدونس مع طماطم وبصل مشوي وطحينة.',
    ingredients: ['كفتة ضاني بلدي', 'كباب لحم بتلو', 'شيش طاووق متبل', 'بصل وطماطم مشوية', 'عيش بلدي وطحينة'],
    image: mixedGrillImg,
    portions: [
      { id: 'single', label: 'فردي (٤٥٠ جم)', extraPrice: 0 },
      { id: 'family', label: 'صينية عائلية (١ كجم)', extraPrice: 410 },
    ],
    addons: SAVORY_ADDONS,
  },
  {
    id: 'hamam-mahshi',
    name: 'حمام محشي فريك بلدي على أصوله',
    category: 'classics',
    categoryLabel: 'أطباق مصرية أصيلة',
    prepTime: '٣٥ دقيقة',
    servingLabel: 'جوز حمام بلدي',
    price: 265,
    featured: true,
    description:
      'جوز حمام بلدي محشو بالفريك الصعيدي المتبل بالبهارات والكبد والقوانص، مسلوق في مرق غني ومحمر بالسمن البلدي حتى القرمشة الذهبية.',
    ingredients: ['حمام بلدي طازج', 'فريك صعيدي منقى', 'بهارات مصرية وبصل مفروم', 'سمن بلدي', 'دقة فلفل وليمون'],
    image: fattaPigeonImg,
    portions: [
      { id: 'pair', label: 'جوز حمام (٢ حبة)', extraPrice: 0 },
      { id: 'double-pair', label: '٤ حبات للعائلة', extraPrice: 245 },
    ],
    addons: SAVORY_ADDONS,
  },
  {
    id: 'bamia-lamb-tagine',
    name: 'طاجن بامية باللحمة الضاني في الفرن',
    category: 'tagines',
    categoryLabel: 'طواجن الفخار',
    prepTime: '٣٠ دقيقة',
    servingLabel: 'يكفي ١–٢ فرد',
    price: 285,
    featured: true,
    description:
      'بامية زيرو طرية مطهوة بصلصة الطماطم المسبكة والثوم مع قطع اللحم الضاني الموزة في طاجن فخار مكمور داخل الفرن الحجري.',
    ingredients: ['بامية خضراء زيرو', 'موزة لحم ضاني بلدي', 'عصير طماطم طازجة', 'طشة ثوم وفلفل حامي', 'ليمون بلدي'],
    image: bamiaMahshiImg,
    portions: [
      { id: 'single', label: 'طاجن فردي', extraPrice: 0 },
      { id: 'family', label: 'طاجن عائلي كبير', extraPrice: 220 },
    ],
    addons: SAVORY_ADDONS,
  },
  {
    id: 'fatta-moza',
    name: 'فتة الموزة الضاني بالخل والثوم',
    category: 'classics',
    categoryLabel: 'أطباق مصرية أصيلة',
    prepTime: '٣٠ دقيقة',
    servingLabel: 'وجبة مشبعة',
    price: 345,
    description:
      'عيش بلدي محمص بالسمن البلدي مسقي بالمرق، يعلوه أرز مصري أبيض وصلصة طماطم بالخل والثوم مع قطعة موزة ضاني دايبة.',
    ingredients: ['موزة ضاني مطهوة ببطء', 'عيش بلدي محمص بالسمن', 'أرز مصري أبيض', 'صلصة بالخل الأبيض والثوم'],
    image: fattaPigeonImg,
    portions: [
      { id: 'single', label: 'طبق فردي', extraPrice: 0 },
      { id: 'family', label: 'صينية فتة عائلية', extraPrice: 310 },
    ],
    addons: SAVORY_ADDONS,
  },
  {
    id: 'koshary-asil',
    name: 'كشري مصري أصيل بالبصل المقرمش',
    category: 'classics',
    categoryLabel: 'أطباق مصرية أصيلة',
    prepTime: '١٥ دقيقة',
    servingLabel: 'طبق كبير',
    price: 90,
    description:
      'خلطة الكشري القاهري الأصيلة من الأرز والعدس بجبة والمكرونة والحمص، مع صلصة الطماطم بالكمون والدقة والشطة الزيت والبصل المقرمش.',
    ingredients: ['أرز مصري وعدس بجبة', 'حمص الشام ومكرونة', 'صلصة طماطم بالكمون', 'دقة خل وثوم', 'بصل ورد مقرمش'],
    image: kosharyHawawshiImg,
    portions: [
      { id: 'regular', label: 'وسط', extraPrice: 0 },
      { id: 'large', label: 'طاجن كشري كبير', extraPrice: 35 },
    ],
    addons: [
      { id: 'extra-onion', label: 'بصل مقرمش إضافي', price: 15 },
      { id: 'extra-sauce', label: 'صلصة ودقة إضافية', price: 10 },
    ],
  },
  {
    id: 'mahshi-mix',
    name: 'سرفيس محشي مشكل ورق عنب وكوسة',
    category: 'classics',
    categoryLabel: 'أطباق مصرية أصيلة',
    prepTime: '٢٥ دقيقة',
    servingLabel: '١٦ قطعة مشكلة',
    price: 175,
    description:
      'ورق عنب بناتي ملفوف يدوياً مع الكوسة والباذنجان المحشي بالأرز المتبل بالشبت والكزبرة والبقدونس وصلصة الطماطم الطازجة.',
    ingredients: ['ورق عنب بناتي', 'كوسة وباذنجان بلدي', 'خلطة أرز بالخضرة الطازجة', 'عصير ليمون ودبس رمان خفيف'],
    image: bamiaMahshiImg,
    portions: [
      { id: 'single', label: 'سرفيس فردي', extraPrice: 0 },
      { id: 'family', label: 'سرفيس عزومة (٣٦ قطعة)', extraPrice: 185 },
    ],
    addons: SAVORY_ADDONS,
  },
  {
    id: 'kofta-hati',
    name: 'كفتة الحاتي المشوية على فحم الزان',
    category: 'grills',
    categoryLabel: 'مشويات الفحم',
    prepTime: '٢٥ دقيقة',
    servingLabel: '٣٥٠ جم صافي',
    price: 295,
    description:
      'أسياخ كفتة لحم بقري وضاني بلدي مفرومة يومياً مع البقدونس والبهار السبعة، مشوية على الفحم ومخدومة بسلطة الطحينة والعيش البلدي.',
    ingredients: ['لحم بقري وضاني بلدي', 'بصل مبشور وبقدونس', 'بهارات الحاتي الخاصة', 'سلطة طحينة وعيش بلدي'],
    image: mixedGrillImg,
    portions: [
      { id: 'single', label: '٣٥٠ جم (فردي)', extraPrice: 0 },
      { id: 'kilo', label: 'كيلو مشوي كامل', extraPrice: 485 },
    ],
    addons: SAVORY_ADDONS,
  },
  {
    id: 'hawawshi-baladi',
    name: 'حواوشي بلدي بالفرن الحجري',
    category: 'grills',
    categoryLabel: 'مشويات الفحم',
    prepTime: '٢٠ دقيقة',
    servingLabel: 'رغيفان بلدي',
    price: 145,
    description:
      'عيش بلدي طازج محشو بلحم مفروم متبل بالبصل والفلفل الرومي والحامي وجوزة الطيب، مخبوز حتى القرمشة في الفرن ومدهون بالسمن.',
    ingredients: ['لحم بقري مفروم بالدهن البلدي', 'عيش بلدي طازج', 'فلفل ألوان وبصل مفروم', 'مخلل وطحينة'],
    image: kosharyHawawshiImg,
    portions: [
      { id: 'two', label: 'رغيفان', extraPrice: 0 },
      { id: 'four', label: '٤ أرغفة للصحبة', extraPrice: 135 },
    ],
    addons: SAVORY_ADDONS,
  },
  {
    id: 'akawi-tagine',
    name: 'طاجن عكاوي بالبصل المكرمل والبطاطس',
    category: 'tagines',
    categoryLabel: 'طواجن الفخار',
    prepTime: '٣٥ دقيقة',
    servingLabel: 'يكفي ٢ فرد',
    price: 365,
    description:
      'عكاوي بلدي مطهوة ببطء في الفخار لساعات مع البصل المكرمل والثوم والبهارات الدافئة وصوص اللحم المركز.',
    ingredients: ['عكاوي بقري بلدي', 'بصل مكرمل وثوم', 'جوزة الطيب وحبهان', 'فلفل أسود طازج'],
    image: molokhiaTagineImg,
    portions: [
      { id: 'single', label: 'طاجن وسط', extraPrice: 0 },
      { id: 'family', label: 'طاجن عائلي', extraPrice: 280 },
    ],
    addons: SAVORY_ADDONS,
  },
  {
    id: 'om-ali',
    name: 'طاجن أم علي بالقشطة والمكسرات',
    category: 'desserts',
    categoryLabel: 'حلويات شرقية',
    prepTime: '١٥ دقيقة',
    servingLabel: 'طاجن فخار ساخن',
    price: 115,
    description:
      'رقائق الملفيه المقرمشة مغمورة بالحليب المغلي والفانيليا والقشطة البلدي، محمرة في الفرن ومزينة بالفستق واللوز والزبيب.',
    ingredients: ['رقائق عجين محمصة', 'حليب كامل الدسم وقشطة بلدي', 'فستق ولوز محمص', 'زبيب وجوز هند'],
    image: omAliKunafaImg,
    portions: [
      { id: 'single', label: 'طاجن فردي', extraPrice: 0 },
      { id: 'family', label: 'طاجن عائلي', extraPrice: 125 },
    ],
    addons: DESSERT_ADDONS,
  },
  {
    id: 'kunafa-eshta',
    name: 'كنافة بالقشطة البلدي والفستق الحلبي',
    category: 'desserts',
    categoryLabel: 'حلويات شرقية',
    prepTime: '١٥ دقيقة',
    servingLabel: 'قطعة كبيرة',
    price: 125,
    description:
      'كنافة ذهبية مقرمشة محضرة بالسمن البلدي ومحشوة بقشطة طازجة غير محلاة، مسقية بشربات خفيف بماء الزهر ومزينة بالفستق الحلبي.',
    ingredients: ['كنافة شعر طازجة', 'سمن بلدي نقي', 'قشطة طازجة', 'شربات خفيف بماء الزهر', 'فستق حلبي'],
    image: omAliKunafaImg,
    portions: [
      { id: 'slice', label: 'قطعة كبيرة', extraPrice: 0 },
      { id: 'tray', label: 'صينية كنافة كاملة', extraPrice: 295 },
    ],
    addons: DESSERT_ADDONS,
  },
];

export const BRANCHES = [
  {
    id: 'zamalek',
    name: 'فرع الزمالك',
    address: '١٤ شارع ٢٦ يوليو، بجوار مسرح البالون القديم',
    hours: 'يومياً ١٢:٠٠ ظهراً – ٢:٠٠ صباحاً',
  },
  {
    id: 'maadi',
    name: 'فرع المعادي',
    address: 'شارع ٩، ميدان الحرية، المعادي',
    hours: 'يومياً ١٢:٠٠ ظهراً – ١:٣٠ صباحاً',
  },
  {
    id: 'new-cairo',
    name: 'فرع التجمع الخامس',
    address: 'مجمع المأكولات، محور التسعين الشمالي',
    hours: 'يومياً ١٢:٣٠ ظهراً – ٢:٠٠ صباحاً',
  },
];

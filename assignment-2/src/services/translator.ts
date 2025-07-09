// Simple English to Urdu dictionary for basic translation
const englishToUrduDictionary: { [key: string]: string } = {
  // Common words
  'the': 'یہ',
  'this': 'یہ', 
  'that': 'وہ',
  'and': 'اور',
  'or': 'یا',
  'but': 'لیکن',
  'with': 'کے ساتھ',
  'for': 'کے لیے',
  'in': 'میں',
  'on': 'پر',
  'at': 'پر',
  'to': 'کو',
  'from': 'سے',
  'by': 'کے ذریعے',
  'about': 'کے بارے میں',
  
  // Verbs
  'is': 'ہے',
  'are': 'ہیں',
  'was': 'تھا',
  'were': 'تھے',
  'will': 'گا',
  'have': 'ہے',
  'has': 'ہے',
  'had': 'تھا',
  'do': 'کرنا',
  'does': 'کرتا ہے',
  'did': 'کیا',
  'can': 'سکتا ہے',
  'could': 'سکتا تھا',
  'would': 'گا',
  'should': 'چاہیے',
  'must': 'ضروری ہے',
  'make': 'بنانا',
  'makes': 'بناتا ہے',
  'made': 'بنایا',
  'take': 'لینا',
  'takes': 'لیتا ہے',
  'took': 'لیا',
  'give': 'دینا',
  'gives': 'دیتا ہے',
  'gave': 'دیا',
  'get': 'حاصل کرنا',
  'gets': 'حاصل کرتا ہے',
  'got': 'حاصل کیا',
  'come': 'آنا',
  'comes': 'آتا ہے',
  'came': 'آیا',
  'go': 'جانا',
  'goes': 'جاتا ہے',
  'went': 'گیا',
  'see': 'دیکھنا',
  'sees': 'دیکھتا ہے',
  'saw': 'دیکھا',
  'know': 'جاننا',
  'knows': 'جانتا ہے',
  'knew': 'جانتا تھا',
  'think': 'سوچنا',
  'thinks': 'سوچتا ہے',
  'thought': 'سوچا',
  'say': 'کہنا',
  'says': 'کہتا ہے',
  'said': 'کہا',
  'tell': 'بتانا',
  'tells': 'بتاتا ہے',
  'told': 'بتایا',
  'ask': 'پوچھنا',
  'asks': 'پوچھتا ہے',
  'asked': 'پوچھا',
  'help': 'مدد کرنا',
  'helps': 'مدد کرتا ہے',
  'helped': 'مدد کی',
  'work': 'کام کرنا',
  'works': 'کام کرتا ہے',
  'worked': 'کام کیا',
  'play': 'کھیلنا',
  'plays': 'کھیلتا ہے',
  'played': 'کھیلا',
  'try': 'کوشش کرنا',
  'tries': 'کوشش کرتا ہے',
  'tried': 'کوشش کی',
  'use': 'استعمال کرنا',
  'uses': 'استعمال کرتا ہے',
  'used': 'استعمال کیا',
  'find': 'تلاش کرنا',
  'finds': 'تلاش کرتا ہے',
  'found': 'تلاش کیا',
  'look': 'دیکھنا',
  'looks': 'دیکھتا ہے',
  'looked': 'دیکھا',
  'feel': 'محسوس کرنا',
  'feels': 'محسوس کرتا ہے',
  'felt': 'محسوس کیا',
  'become': 'بننا',
  'becomes': 'بنتا ہے',
  'became': 'بنا',
  'seem': 'لگنا',
  'seems': 'لگتا ہے',
  'seemed': 'لگا',
  'leave': 'چھوڑنا',
  'leaves': 'چھوڑتا ہے',
  'left': 'چھوڑا',
  
  // Nouns
  'blog': 'بلاگ',
  'post': 'پوسٹ',
  'article': 'مضمون',
  'content': 'مواد',
  'information': 'معلومات',
  'data': 'ڈیٹا',
  'technology': 'ٹیکنالوجی',
  'computer': 'کمپیوٹر',
  'internet': 'انٹرنیٹ',
  'website': 'ویب سائٹ',
  'page': 'صفحہ',
  'text': 'متن',
  'word': 'لفظ',
  'words': 'الفاظ',
  'sentence': 'جملہ',
  'sentences': 'جملے',
  'paragraph': 'پیراگراف',
  'story': 'کہانی',
  'news': 'خبریں',
  'report': 'رپورٹ',
  'study': 'مطالعہ',
  'research': 'تحقیق',
  'analysis': 'تجزیہ',
  'result': 'نتیجہ',
  'results': 'نتائج',
  'conclusion': 'خلاصہ',
  'summary': 'خلاصہ',
  'topic': 'موضوع',
  'subject': 'موضوع',
  'theme': 'موضوع',
  'idea': 'خیال',
  'ideas': 'خیالات',
  'concept': 'تصور',
  'point': 'نکتہ',
  'points': 'نکات',
  'example': 'مثال',
  'examples': 'مثالیں',
  'problem': 'مسئلہ',
  'problems': 'مسائل',
  'solution': 'حل',
  'solutions': 'حل',
  'answer': 'جواب',
  'answers': 'جوابات',
  'question': 'سوال',
  'questions': 'سوالات',
  'method': 'طریقہ',
  'methods': 'طریقے',
  'way': 'طریقہ',
  'ways': 'طریقے',
  'process': 'عمل',
  'system': 'نظام',
  'program': 'پروگرام',
  'project': 'منصوبہ',
  'plan': 'منصوبہ',
  'strategy': 'حکمت عملی',
  'goal': 'مقصد',
  'goals': 'مقاصد',
  'objective': 'مقصد',
  'purpose': 'مقصد',
  'reason': 'وجہ',
  'reasons': 'وجوہات',
  'cause': 'وجہ',
  'effect': 'اثر',
  'impact': 'اثر',
  'influence': 'اثر',
  'change': 'تبدیلی',
  'changes': 'تبدیلیاں',
  'development': 'ترقی',
  'growth': 'ترقی',
  'improvement': 'بہتری',
  'progress': 'پیشرفت',
  'success': 'کامیابی',
  'failure': 'ناکامی',
  'challenge': 'چیلنج',
  'challenges': 'چیلنجز',
  'opportunity': 'موقع',
  'opportunities': 'مواقع',
  'benefit': 'فائدہ',
  'benefits': 'فوائد',
  'advantage': 'فائدہ',
  'disadvantage': 'نقصان',
  'risk': 'خطرہ',
  'risks': 'خطرات',
  
  // Adjectives
  'important': 'اہم',
  'good': 'اچھا',
  'bad': 'برا',
  'great': 'بہترین',
  'best': 'بہترین',
  'better': 'بہتر',
  'worse': 'بدتر',
  'worst': 'بدترین',
  'new': 'نیا',
  'old': 'پرانا',
  'young': 'جوان',
  'big': 'بڑا',
  'small': 'چھوٹا',
  'large': 'بڑا',
  'little': 'چھوٹا',
  'long': 'لمبا',
  'short': 'چھوٹا',
  'high': 'اونچا',
  'low': 'نیچا',
  'fast': 'تیز',
  'slow': 'آہستہ',
  'easy': 'آسان',
  'difficult': 'مشکل',
  'hard': 'مشکل',
  'simple': 'آسان',
  'complex': 'پیچیدہ',
  'clear': 'واضح',
  'different': 'مختلف',
  'same': 'ویسا ہی',
  'similar': 'ملتا جلتا',
  'possible': 'ممکن',
  'impossible': 'ناممکن',
  'available': 'دستیاب',
  'free': 'مفت',
  'expensive': 'مہنگا',
  'cheap': 'سستا',
  'popular': 'مقبول',
  'famous': 'مشہور',
  'useful': 'مفید',
  'effective': 'مؤثر',
  'successful': 'کامیاب',
  'interesting': 'دلچسپ',
  'amazing': 'حیرت انگیز',
  'beautiful': 'خوبصورت',
  'wonderful': 'شاندار',
  'excellent': 'بہترین',
  'perfect': 'کامل',
  'complete': 'مکمل',
  'full': 'بھرا ہوا',
  'empty': 'خالی',
  'clean': 'صاف',
  'dirty': 'گندا',
  'fresh': 'تازہ',
  'modern': 'جدید',
  'traditional': 'روایتی',
  'digital': 'ڈیجیٹل',
  'online': 'آن لائن',
  'offline': 'آف لائن',
  'virtual': 'ورچوئل',
  'real': 'حقیقی',
  'true': 'سچ',
  'false': 'جھوٹ',
  'correct': 'درست',
  'wrong': 'غلط',
  'right': 'دائیں',
  'public': 'عوامی',
  'private': 'نجی',
  'personal': 'ذاتی',
  'professional': 'پیشہ ورانہ',
  'social': 'سماجی',
  'economic': 'اقتصادی',
  'political': 'سیاسی',
  'cultural': 'ثقافتی',
  'educational': 'تعلیمی',
  'scientific': 'سائنسی',
  'technical': 'تکنیکی',
  'medical': 'طبی',
  'legal': 'قانونی',
  'financial': 'مالی',
  'commercial': 'تجارتی',
  'industrial': 'صنعتی',
  'environmental': 'ماحولیاتی',
  'international': 'بین الاقوامی',
  'national': 'قومی',
  'local': 'مقامی',
  'global': 'عالمی',
  'regional': 'علاقائی',
  
  // Time words
  'today': 'آج',
  'yesterday': 'کل',
  'tomorrow': 'کل',
  'now': 'اب',
  'then': 'پھر',
  'before': 'پہلے',
  'after': 'بعد میں',
  'during': 'کے دوران',
  'while': 'جبکہ',
  'when': 'جب',
  'time': 'وقت',
  'year': 'سال',
  'month': 'مہینہ',
  'week': 'ہفتہ',
  'day': 'دن',
  'hour': 'گھنٹہ',
  'minute': 'منٹ',
  'second': 'سیکنڈ',
  'morning': 'صبح',
  'afternoon': 'دوپہر',
  'evening': 'شام',
  'night': 'رات',
  'early': 'جلدی',
  'late': 'دیر',
  'recent': 'حالیہ',
  'future': 'مستقبل',
  'past': 'ماضی',
  'present': 'حال',
  
  // Numbers
  'one': 'ایک',
  'two': 'دو', 
  'three': 'تین',
  'four': 'چار',
  'five': 'پانچ',
  'six': 'چھ',
  'seven': 'سات',
  'eight': 'آٹھ',
  'nine': 'نو',
  'ten': 'دس',
  'first': 'پہلا',
  'third': 'تیسرا',
  'last': 'آخری',
  'next': 'اگلا',
  'previous': 'پچھلا',
  'many': 'بہت سے',
  'few': 'کچھ',
  'several': 'کئی',
  'all': 'تمام',
  'some': 'کچھ',
  'any': 'کوئی',
  'no': 'نہیں',
  'none': 'کوئی نہیں',
  'each': 'ہر',
  'every': 'ہر',
  'both': 'دونوں',
  'either': 'دونوں میں سے کوئی',
  'neither': 'دونوں میں سے کوئی نہیں',
  'other': 'دوسرا',
  'another': 'دوسرا',
  'more': 'زیادہ',
  'most': 'سب سے زیادہ',
  'less': 'کم',
  'least': 'سب سے کم',
  'enough': 'کافی',
  'too': 'بہت',
  'very': 'بہت',
  'quite': 'کافی',
  'rather': 'بلکہ',
  'just': 'صرف',
  'only': 'صرف',
  'also': 'بھی',
  'like': 'جیسے',
  'such': 'اس طرح',
  'so': 'اتنا',
  'than': 'سے',
  'if': 'اگر',
  'unless': 'جب تک نہیں',
  'although': 'اگرچہ',
  'though': 'اگرچہ',
  'however': 'تاہم',
  'therefore': 'لہذا',
  'thus': 'اس طرح',
  'hence': 'اس لیے',
  'because': 'کیونکہ',
  'since': 'چونکہ',
  'due': 'کی وجہ سے',
  'owing': 'کی وجہ سے',
  'according': 'کے مطابق',
  'regarding': 'کے حوالے سے',
  'concerning': 'کے بارے میں',
  'despite': 'کے باوجود',
  'besides': 'کے علاوہ',
  'except': 'کے سوا',
  'without': 'کے بغیر',
  'within': 'کے اندر',
  'outside': 'باہر',
  'inside': 'اندر',
  'above': 'اوپر',
  'below': 'نیچے',
  'under': 'نیچے',
  'over': 'اوپر',
  'between': 'کے درمیان',
  'among': 'کے درمیان',
  'around': 'کے آس پاس',
  'near': 'کے قریب',
  'far': 'دور',
  'here': 'یہاں',
  'there': 'وہاں',
  'where': 'کہاں',
  'everywhere': 'ہر جگہ',
  'somewhere': 'کہیں',
  'anywhere': 'کہیں بھی',
  'nowhere': 'کہیں نہیں'
}

export class UrduTranslator {
  static translateToUrdu(englishText: string): string {
    // Convert text to lowercase for matching
    const words = englishText.toLowerCase().split(/\s+/)
    
    // Translate each word
    const translatedWords = words.map(word => {
      // Remove punctuation for matching
      const cleanWord = word.replace(/[^\w]/g, '')
      
      // Check if word exists in dictionary
      if (englishToUrduDictionary[cleanWord]) {
        return englishToUrduDictionary[cleanWord]
      }
      
      // Handle common English patterns
      if (cleanWord.endsWith('ing')) {
        const baseWord = cleanWord.slice(0, -3)
        if (englishToUrduDictionary[baseWord]) {
          return englishToUrduDictionary[baseWord] + ' رہا ہے'
        }
      }
      
      if (cleanWord.endsWith('ed')) {
        const baseWord = cleanWord.slice(0, -2)
        if (englishToUrduDictionary[baseWord]) {
          return englishToUrduDictionary[baseWord] + ' کیا'
        }
      }
      
      if (cleanWord.endsWith('ly')) {
        const baseWord = cleanWord.slice(0, -2)
        if (englishToUrduDictionary[baseWord]) {
          return englishToUrduDictionary[baseWord] + ' سے'
        }
      }
      
      if (cleanWord.endsWith('s') && cleanWord.length > 3) {
        const baseWord = cleanWord.slice(0, -1)
        if (englishToUrduDictionary[baseWord]) {
          return englishToUrduDictionary[baseWord]
        }
      }
      
      // If no translation found, keep original word in English
      return word
    })
    
    // Join translated words and add some context
    let result = translatedWords.join(' ')
    
    // Add basic Urdu sentence structure improvements
    result = result.replace(/\./g, '۔')
    result = result.replace(/\?/g, '؟')
    
    // Add introductory phrase for blog summaries
    if (result.includes('blog') || result.includes('بلاگ')) {
      result = 'اس بلاگ پوسٹ میں ' + result
    }
    
    return result
  }
  
  static async translateSummary(englishSummary: string): Promise<string> {
    // In a real implementation, this would call a proper translation API
    // For now, we'll use our basic dictionary translation
    
    const sentences = englishSummary.split(/[.!?]+/).filter(s => s.trim())
    const translatedSentences = sentences.map(sentence => 
      this.translateToUrdu(sentence.trim())
    )
    
    let urduSummary = translatedSentences.join('۔ ')
    
    // Add proper Urdu formatting
    if (urduSummary && !urduSummary.endsWith('۔')) {
      urduSummary += '۔'
    }
    
    // Add a note about the translation method
    urduSummary += '\n\n(نوٹ: یہ بنیادی لغت پر مبنی ترجمہ ہے)'
    
    return urduSummary
  }
}

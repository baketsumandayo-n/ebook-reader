/**
 * @license BSD-3-Clause
 * Copyright (c) 2025, ッツ Reader Authors
 * All rights reserved.
 */

const textTranslations = new Map<string, string>([
  ['Reader', '\u30ea\u30fc\u30c0\u30fc'],
  ['Data', '\u30c7\u30fc\u30bf'],
  ['Statistics', '\u7d71\u8a08'],
  ['Theme', '\u30c6\u30fc\u30de'],
  ['View mode', '\u8868\u793a\u30e2\u30fc\u30c9'],
  ['Font family (Group 1)', '\u30d5\u30a9\u30f3\u30c8\uff08\u30b0\u30eb\u30fc\u30d71\uff09'],
  ['Font family (Group 2)', '\u30d5\u30a9\u30f3\u30c8\uff08\u30b0\u30eb\u30fc\u30d72\uff09'],
  ['Font size', '\u30d5\u30a9\u30f3\u30c8\u30b5\u30a4\u30ba'],
  ['Line Height', '\u884c\u306e\u9ad8\u3055'],
  ['Paragraph Indentation', '\u6bb5\u843d\u306e\u5b57\u4e0b\u3052'],
  ['Paragraph Margin Mode', '\u6bb5\u843d\u30de\u30fc\u30b8\u30f3\u30e2\u30fc\u30c9'],
  ['Paragraph Margins', '\u6bb5\u843d\u30de\u30fc\u30b8\u30f3'],
  ['Writing mode', '\u66f8\u5b57\u65b9\u5411'],
  ['Reader Left/right margin', '\u30ea\u30fc\u30c0\u30fc\u5de6\u53f3\u306e\u4f59\u767d'],
  ['Reader Top/bottom margin', '\u30ea\u30fc\u30c0\u30fc\u4e0a\u4e0b\u306e\u4f59\u767d'],
  ['Enable Text Justification', '\u6587\u5b57\u4e21\u7aef\u63c3\u3048\u3092\u6709\u52b9\u5316'],
  [
    'Enable Pretty Text Wrap',
    '\u304d\u308c\u3044\u306a\u7981\u5247\u51e6\u7406\u3092\u6709\u52b9\u5316'
  ],
  [
    'Prioritize Reader Styles',
    '\u30ea\u30fc\u30c0\u30fc\u306e\u30b9\u30bf\u30a4\u30eb\u3092\u512a\u5148'
  ],
  ['Blur image', '\u753b\u50cf\u3092\u307c\u304b\u3059'],
  ['Blur Mode', '\u307c\u304b\u3057\u5bfe\u8c61'],
  ['Hide furigana', '\u3075\u308a\u304c\u306a\u3092\u96a0\u3059'],
  ['Hide furigana style', '\u3075\u308a\u304c\u306a\u306e\u8868\u793a\u65b9\u6cd5'],
  ['Show Character Counter', '\u6587\u5b57\u6570\u30ab\u30a6\u30f3\u30bf\u30fc\u3092\u8868\u793a'],
  ['Show Percentage', '\u9032\u6357\u7387\u3092\u8868\u793a'],
  ['Auto position on resize', '\u30b5\u30a4\u30ba\u5909\u66f4\u6642\u306b\u81ea\u52d5\u8abf\u6574'],
  ['Page Columns', '\u5217\u6570'],
  ['Swipe Threshold', '\u30b9\u30ef\u30a4\u30d7\u691c\u77e5\u306e\u95be\u5024'],
  [
    'Disable Wheel Navigation',
    '\u30db\u30a4\u30fc\u30eb\u3067\u30da\u30fc\u30b8\u9001\u308a\u3057\u306a\u3044'
  ],
  ['Tap to Flip', '\u30bf\u30c3\u30d7\u3067\u30da\u30fc\u30b8\u9001\u308a'],
  ['Avoid Page Break', '\u30da\u30fc\u30b8\u5206\u5272\u3092\u907f\u3051\u308b'],
  ['Custom Reading Point', '\u30ab\u30b9\u30bf\u30e0\u8aad\u66f8\u30dd\u30a4\u30f3\u30c8'],
  [
    'Custom Point pauses Tracker',
    '\u30ab\u30b9\u30bf\u30e0\u30dd\u30a4\u30f3\u30c8\u3067\u30c8\u30e9\u30c3\u30ab\u30fc\u3092\u4e00\u6642\u505c\u6b62'
  ],
  ['Selection to Bookmark', '\u9078\u629e\u7bc4\u56f2\u3092\u30d6\u30c3\u30af\u30de\u30fc\u30af'],
  [
    'Enable Tap Edge To Flip',
    '\u7aef\u3092\u30bf\u30c3\u30d7\u3057\u3066\u30da\u30fc\u30b8\u9001\u308a'
  ],
  ['Manual Bookmark', '\u624b\u52d5\u30d6\u30c3\u30af\u30de\u30fc\u30af'],
  ['Auto Bookmark', '\u81ea\u52d5\u30d6\u30c3\u30af\u30de\u30fc\u30af'],
  [
    'Auto Bookmark Time',
    '\u81ea\u52d5\u30d6\u30c3\u30af\u30de\u30fc\u30af\u307e\u3067\u306e\u6642\u9593'
  ],
  ['Close Confirmation', '\u9589\u3058\u308b\u524d\u306b\u78ba\u8a8d'],
  ['Enable Screen Lock', '\u753b\u9762\u30ed\u30c3\u30af\u3092\u6709\u52b9\u5316'],
  ['Show Placeholder', '\u30d7\u30ec\u30fc\u30b9\u30db\u30eb\u30c0\u30fc\u3092\u8868\u793a'],
  ['Persistent storage', '\u6c38\u7d9a\u30b9\u30c8\u30ec\u30fc\u30b8'],
  ['Cache Data', '\u30c7\u30fc\u30bf\u3092\u30ad\u30e3\u30c3\u30b7\u30e5'],
  [
    'Auto Import/Export',
    '\u81ea\u52d5\u30a4\u30f3\u30dd\u30fc\u30c8\uff0f\u30a8\u30af\u30b9\u30dd\u30fc\u30c8'
  ],
  ['Import/Export Behavior', '\u540c\u671f\u6642\u306e\u4fdd\u5b58\u65b9\u6cd5'],
  ['Statistics Merge', '\u7d71\u8a08\u306e\u30de\u30fc\u30b8\u65b9\u6cd5'],
  ['Reading Goals Merge', '\u8aad\u66f8\u76ee\u6a19\u306e\u30de\u30fc\u30b8\u65b9\u6cd5'],
  ['Overwrite Book Completion', '\u8aad\u4e86\u65e5\u3092\u4e0a\u66f8\u304d'],
  [
    'Open Tracker on Completion',
    '\u8aad\u4e86\u6642\u306b\u30c8\u30e9\u30c3\u30ab\u30fc\u3092\u958b\u304f'
  ],
  ['Add Characters on Completion', '\u8aad\u4e86\u6642\u306b\u6587\u5b57\u6570\u3092\u52a0\u7b97'],
  ['Enable Statistics', '\u7d71\u8a08\u3092\u6709\u52b9\u5316'],
  [
    'Tracker Auto Pause',
    '\u30c8\u30e9\u30c3\u30ab\u30fc\u306e\u81ea\u52d5\u4e00\u6642\u505c\u6b62'
  ],
  ['Dictionary Detection', '\u8f9e\u66f8\u691c\u51fa'],
  ['Idle Time (min)', '\u30a2\u30a4\u30c9\u30eb\u6642\u9593\uff08\u5206\uff09'],
  [
    'Rollback Statistics on Idle',
    '\u30a2\u30a4\u30c9\u30eb\u3067\u7d71\u8a08\u3092\u5dfb\u304d\u623b\u3059'
  ],
  ['Forward Skip Threshold', '\u9806\u65b9\u5411\u30b9\u30ad\u30c3\u30d7\u95be\u5024'],
  ['Backward Skip Threshold', '\u9006\u65b9\u5411\u30b9\u30ad\u30c3\u30d7\u95be\u5024'],
  ['Threshold Action', '\u95be\u5024\u30a2\u30af\u30b7\u30e7\u30f3'],
  ['Autostart tracker (sec)', '\u81ea\u52d5\u958b\u59cb\u307e\u3067\u306e\u79d2\u6570'],
  ['Auto', '\u81ea\u52d5'],
  ['Manual', '\u624b\u52d5'],
  ['Off', '\u30aa\u30d5'],
  ['Up', '\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9'],
  ['Down', '\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9'],
  ['All', '\u3059\u3079\u3066'],
  ['New Only', '\u65b0\u898f\u306e\u307f'],
  ['Overwrite', '\u4e0a\u66f8\u304d'],
  ['Hide', '\u975e\u8868\u793a'],
  ['Partial', '\u90e8\u5206\u8868\u793a'],
  ['Toggle', '\u5207\u308a\u66ff\u3048'],
  ['Full', '\u5e38\u306b\u8868\u793a'],
  ['Horizontal', '\u6a2a\u66f8\u304d'],
  ['Vertical', '\u7e26\u66f8\u304d'],
  ['Continuous', '\u9023\u7d9a\u30b9\u30af\u30ed\u30fc\u30eb'],
  ['Paginated', '\u30da\u30fc\u30b8\u3054\u3068'],
  ['Moderate', '\u4e2d\u7a0b\u5ea6'],
  ['Strict', '\u53b3\u683c'],
  ['Ignore', '\u7121\u8996\u3059\u308b'],
  ['Pause Tracker', '\u30c8\u30e9\u30c3\u30ab\u30fc\u3092\u4e00\u6642\u505c\u6b62'],
  ['Merge', '\u30de\u30fc\u30b8'],
  ['Replace', '\u7f6e\u304d\u63db\u3048'],
  [
    'Toggle source as sync target',
    '\u540c\u671f\u5bfe\u8c61\u3068\u3057\u3066\u5207\u308a\u66ff\u3048'
  ],
  [
    'Toggle source as data source for this type',
    '\u3053\u306e\u7a2e\u5225\u306e\u30c7\u30fc\u30bf\u30bd\u30fc\u30b9\u3068\u3057\u3066\u5207\u308a\u66ff\u3048'
  ],
  ['Delete Reading Goal', '\u8aad\u66f8\u76ee\u6a19\u3092\u524a\u9664'],
  [
    'Delete all Reading Goals',
    '\u3059\u3079\u3066\u306e\u8aad\u66f8\u76ee\u6a19\u3092\u524a\u9664'
  ],
  [
    'Keep Local Data on Deletion',
    '\u524a\u9664\u3057\u3066\u3082\u30ed\u30fc\u30ab\u30eb\u30c7\u30fc\u30bf\u3092\u4fdd\u6301'
  ]
]);

const attributeTranslations = new Map<string, Map<string, string>>([
  [
    'title',
    new Map<string, string>([
      [
        'Open Custom Font Dialog',
        '\u30ab\u30b9\u30bf\u30e0\u30d5\u30a9\u30f3\u30c8\u30c0\u30a4\u30a2\u30ed\u30b0\u3092\u958b\u304f'
      ],
      [
        '# of rem added as text indentation of new paragraphs',
        '\u65b0\u3057\u3044\u6bb5\u843d\u306b\u8ffd\u52a0\u3059\u308b\u5b57\u4e0b\u3052\u91cf\uff08rem \u5358\u4f4d\uff09'
      ],
      [
        '# of rem added as margin to paragraphs',
        '\u6bb5\u843d\u306b\u8ffd\u52a0\u3059\u308b\u30de\u30fc\u30b8\u30f3\u91cf\uff08rem \u5358\u4f4d\uff09'
      ],
      [
        'Auto position on resize',
        '\u30b5\u30a4\u30ba\u5909\u66f4\u6642\u306b\u81ea\u52d5\u8abf\u6574'
      ],
      [
        'Reserves small margins on the left and right on which you can tap to turn pages',
        '\u5de6\u53f3\u306b\u30bf\u30c3\u30d7\u7528\u306e\u7d30\u3044\u9818\u57df\u3092\u78ba\u4fdd\u3057\u3001\u30da\u30fc\u30b8\u9001\u308a\u304c\u3067\u304d\u307e\u3059'
      ],
      [
        'Auto Bookmark Time',
        '\u81ea\u52d5\u30d6\u30c3\u30af\u30de\u30fc\u30af\u307e\u3067\u306e\u6642\u9593'
      ]
    ])
  ],
  [
    'placeholder',
    new Map<string, string>([
      ['Name', '\u540d\u524d'],
      ['Password', '\u30d1\u30b9\u30ef\u30fc\u30c9'],
      ['Confirm Password', '\u30d1\u30b9\u30ef\u30fc\u30c9\uff08\u78ba\u8a8d\uff09'],
      ['Client ID', '\u30af\u30e9\u30a4\u30a2\u30f3\u30c8 ID'],
      ['Client Secret', '\u30af\u30e9\u30a4\u30a2\u30f3\u30c8\u30b7\u30fc\u30af\u30ec\u30c3\u30c8'],
      ['Theme Name', '\u30c6\u30fc\u30de\u540d']
    ])
  ]
]);

const tooltipTranslations = new Map<string, string>([
  [
    'Avoids breaking words/sentences into different pages',
    '\u5358\u8a9e\u3084\u6587\u7ae0\u304c\u30da\u30fc\u30b8\u3092\u307e\u305f\u304c\u3089\u306a\u3044\u3088\u3046\u306b\u3057\u307e\u3059'
  ],
  [
    'Allow words/sentences to break into different pages',
    '\u5358\u8a9e\u3084\u6587\u7ae0\u304c\u30da\u30fc\u30b8\u3092\u307e\u305f\u3044\u3067\u3082\u69cb\u3044\u307e\u305b\u3093'
  ],
  [
    'Reader uses higher storage limit for local data',
    '\u30ed\u30fc\u30ab\u30eb\u30c7\u30fc\u30bf\u306b\u5bfe\u3057\u3066\u5927\u304d\u306a\u30b9\u30c8\u30ec\u30fc\u30b8\u4e0a\u9650\u3092\u5229\u7528\u3057\u307e\u3059'
  ],
  [
    'Uses lower temporary storage for local data.\nMay require bookmark or notification permissions for enablement',
    '\u30ed\u30fc\u30ab\u30eb\u30c7\u30fc\u30bf\u3092\u4e00\u6642\u30b9\u30c8\u30ec\u30fc\u30b8\u306b\u4fdd\u5b58\u3057\u307e\u3059\u3002\n\u6709\u52b9\u5316\u306b\u306f\u30d6\u30c3\u30af\u30de\u30fc\u30af\u307e\u305f\u306f\u901a\u77e5\u6a29\u9650\u304c\u5fc5\u8981\u306a\u5834\u5408\u304c\u3042\u308a\u307e\u3059'
  ],
  [
    'Storage data is cached. Saves network traffic/latency but requires to reload current/open a new tab to retrieve data changes',
    '\u30b9\u30c8\u30ec\u30fc\u30b8\u30c7\u30fc\u30bf\u3092\u30ad\u30e3\u30c3\u30b7\u30e5\u3057\u307e\u3059\u3002\u901a\u4fe1\u91cf\u3068\u5f85\u3061\u6642\u9593\u3092\u6291\u3048\u307e\u3059\u304c\u3001\u5909\u66f4\u3092\u53cd\u6620\u3059\u308b\u306b\u306f\u30bf\u30d6\u3092\u518d\u8aad\u307f\u8fbc\u307f\u3059\u308b\u5fc5\u8981\u304c\u3042\u308a\u307e\u3059'
  ],
  [
    'Storage data is refetched on every action. May consume more network traffic/latency but ensures current data',
    '\u64cd\u4f5c\u306e\u305f\u3073\u306b\u30b9\u30c8\u30ec\u30fc\u30b8\u30c7\u30fc\u30bf\u3092\u518d\u53d6\u5f97\u3057\u307e\u3059\u3002\u901a\u4fe1\u91cf\u3068\u5f85\u3061\u6642\u9593\u306f\u5897\u3048\u307e\u3059\u304c\u5e38\u306b\u6700\u65b0\u306e\u30c7\u30fc\u30bf\u3092\u6271\u3048\u307e\u3059'
  ],
  [
    'Updated data will be exported to sync target when reading once per minute',
    '\u8aad\u66f8\u4e2d\uff081 \u5206\u306b 1 \u56de\uff09\u66f4\u65b0\u3055\u308c\u305f\u30c7\u30fc\u30bf\u3092\u540c\u671f\u5148\u3078\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9\u3057\u307e\u3059'
  ],
  [
    'Data will be imported from sync target when opening a book',
    '\u672c\u3092\u958b\u3044\u305f\u969b\u306b\u540c\u671f\u5148\u304b\u3089\u30c7\u30fc\u30bf\u3092\u53d6\u308a\u8fbc\u307f\u307e\u3059'
  ],
  [
    'Data will be synced in both directions',
    '\u30c7\u30fc\u30bf\u3092\u53cc\u65b9\u5411\u306b\u540c\u671f\u3057\u307e\u3059'
  ],
  [
    'No automatic import/export of data',
    '\u30c7\u30fc\u30bf\u306e\u81ea\u52d5\u30a4\u30f3\u30dd\u30fc\u30c8\uff0f\u30a8\u30af\u30b9\u30dd\u30fc\u30c8\u306f\u884c\u3044\u307e\u305b\u3093'
  ],
  [
    'Tracker does not auto pause except for certain reader events',
    '\u4e00\u90e8\u306e\u64cd\u4f5c\u3092\u9664\u3044\u3066\u81ea\u52d5\u4e00\u6642\u505c\u6b62\u3057\u307e\u305b\u3093'
  ],
  [
    'Tracker will auto pause on certain reader events and any kind of site focus loss (e. g. dictionary popup)',
    '\u4e00\u90e8\u306e\u64cd\u4f5c\u3084\u30b5\u30a4\u30c8\u306e\u30d5\u30a9\u30fc\u30ab\u30b9\u55aa\u5931\uff08\u8f9e\u66f8\u30dd\u30c3\u30d7\u30a2\u30c3\u30d7\u306a\u3069\uff09\u3067\u81ea\u52d5\u4e00\u6642\u505c\u6b62\u3057\u307e\u3059'
  ],
  [
    'Tracker will auto pause on certain reader events and when the reader tab loses focus',
    '\u4e00\u90e8\u306e\u64cd\u4f5c\u304a\u3088\u3073\u30ea\u30fc\u30c0\u30fc\u30bf\u30d6\u306e\u30d5\u30a9\u30fc\u30ab\u30b9\u55aa\u5931\u6642\u306b\u81ea\u52d5\u4e00\u6642\u505c\u6b62\u3057\u307e\u3059'
  ],
  [
    "If enabled auto pause is skipped if open yomitan/jpdb-browser-reader was detected - yomitan requires disabled 'Secure Container' settings",
    '\u6709\u52b9\u306b\u3059\u308b\u3068 Yomitan \u3084 jpdb-browser-reader \u304c\u691c\u51fa\u3055\u308c\u305f\u5834\u5408\u306f\u81ea\u52d5\u4e00\u6642\u505c\u6b62\u3092\u30b9\u30ad\u30c3\u30d7\u3057\u307e\u3059\uff08Yomitan \u3067\u306f\u300cSecure Container\u300d\u3092\u7121\u52b9\u306b\u3059\u308b\u5fc5\u8981\u304c\u3042\u308a\u307e\u3059\uff09'
  ],
  [
    'Time in minutes after which the tracker will auto pause without page interaction (0 = disabled, max 12h)',
    '\u30da\u30fc\u30b8\u64cd\u4f5c\u304c\u306a\u3044\u72b6\u614b\u304c\u4f55\u5206\u7d9a\u3044\u305f\u3089\u81ea\u52d5\u4e00\u6642\u505c\u6b62\u3059\u308b\u304b\u3092\u6307\u5b9a\u3057\u307e\u3059\uff080 \u3067\u7121\u52b9\u3001\u6700\u5927 12 \u6642\u9593\uff09'
  ],
  [
    'If enabled attempts to rollback statistics by subtracting the idled time value back from the session',
    '\u6709\u52b9\u306b\u3059\u308b\u3068\u30a2\u30a4\u30c9\u30eb\u6642\u9593\u5206\u3092\u7d71\u8a08\u304b\u3089\u5dee\u3057\u5f15\u3044\u3066\u5dfb\u304d\u623b\u3057\u3092\u8a66\u307f\u307e\u3059'
  ],
  [
    'Amount of positive characters passed between a tick after which a threshold action is triggered (0 = disabled)',
    '1 \u56de\u306e\u66f4\u65b0\u3067\u5897\u52a0\u3057\u305f\u6587\u5b57\u6570\u304c\u8a2d\u5b9a\u5024\u3092\u8d85\u3048\u305f\u5834\u5408\u306b\u95be\u5024\u30a2\u30af\u30b7\u30e7\u30f3\u3092\u5b9f\u884c\u3057\u307e\u3059\uff080 \u3067\u7121\u52b9\uff09'
  ],
  [
    'Amount of negative characters passed between a tick after which a threshold action is triggered (0 = disabled)',
    '1 \u56de\u306e\u66f4\u65b0\u3067\u6e1b\u5c11\u3057\u305f\u6587\u5b57\u6570\u304c\u8a2d\u5b9a\u5024\u3092\u8d85\u3048\u305f\u5834\u5408\u306b\u95be\u5024\u30a2\u30af\u30b7\u30e7\u30f3\u3092\u5b9f\u884c\u3057\u307e\u3059\uff080 \u3067\u7121\u52b9\uff09'
  ],
  [
    'Determines what action will be executed in case a skip threshold was triggered',
    '\u30b9\u30ad\u30c3\u30d7\u95be\u5024\u304c\u767a\u52d5\u3057\u305f\u969b\u306b\u5b9f\u884c\u3059\u308b\u30a2\u30af\u30b7\u30e7\u30f3\u3092\u6307\u5b9a\u3057\u307e\u3059'
  ],
  [
    'Time in seconds without a change to the character count after which the tracker will initially auto start (0 = disabled, higher value recommended to avoid racing conditions)',
    '\u6587\u5b57\u6570\u304c\u5909\u5316\u3057\u306a\u3044\u72b6\u614b\u304c\u6307\u5b9a\u79d2\u6570\u7d9a\u304f\u3068\u30c8\u30e9\u30c3\u30ab\u30fc\u3092\u81ea\u52d5\u958b\u59cb\u3057\u307e\u3059\uff080 \u3067\u7121\u52b9\u3001\u7af6\u5408\u3092\u907f\u3051\u308b\u305f\u3081\u5927\u304d\u3081\u306e\u5024\u3092\u63a8\u5968\uff09'
  ],
  [
    'When enabled asks for confirmation on closing/reloading a reader tab and unsaved changes were detected',
    '\u30ea\u30fc\u30c0\u30fc\u30bf\u30d6\u3092\u9589\u3058\u305f\u308a\u518d\u8aad\u307f\u8fbc\u307f\u3057\u305f\u308a\u3059\u308b\u969b\u3001\u672a\u4fdd\u5b58\u306e\u5909\u66f4\u304c\u3042\u308b\u5834\u5408\u306b\u78ba\u8a8d\u30c0\u30a4\u30a2\u30ed\u30b0\u3092\u8868\u793a\u3057\u307e\u3059'
  ],
  [
    'If enabled sets a bookmark after ${autoBookmarkTime} seconds without scrolling/page change',
    '\u30b9\u30af\u30ed\u30fc\u30eb\u3084\u30da\u30fc\u30b8\u79fb\u52d5\u304c\u306a\u3044\u72b6\u614b\u304c ${autoBookmarkTime} \u79d2\u7d9a\u304f\u3068\u81ea\u52d5\u3067\u30d6\u30c3\u30af\u30de\u30fc\u30af\u3092\u4f5c\u6210\u3057\u307e\u3059'
  ],
  [
    'Determines if statistics will be merged entry by entry or replaced completely on a sync',
    '\u540c\u671f\u6642\u306b\u7d71\u8a08\u3092\u9805\u76ee\u3054\u3068\u306b\u30de\u30fc\u30b8\u3059\u308b\u304b\u3001\u5b8c\u5168\u306b\u7f6e\u304d\u63db\u3048\u308b\u304b\u3092\u6307\u5b9a\u3057\u307e\u3059'
  ],
  [
    'Determines if reading goals will be merged entry by entry or replaced completely on a sync',
    '\u540c\u671f\u6642\u306b\u8aad\u66f8\u76ee\u6a19\u3092\u9805\u76ee\u3054\u3068\u306b\u30de\u30fc\u30b8\u3059\u308b\u304b\u3001\u5b8c\u5168\u306b\u7f6e\u304d\u63db\u3048\u308b\u304b\u3092\u6307\u5b9a\u3057\u307e\u3059'
  ],
  [
    'Determines if the missing amount of characters between the current position and the book total will be added to the statistics or not',
    '\u73fe\u5728\u4f4d\u7f6e\u3068\u7dcf\u6587\u5b57\u6570\u306e\u5dee\u5206\u3092\u7d71\u8a08\u306b\u52a0\u7b97\u3059\u308b\u304b\u3069\u3046\u304b\u3092\u6307\u5b9a\u3057\u307e\u3059'
  ],
  [
    'Determines if only the first Book Completion will be tracked or if it always updates to the latest one',
    '\u6700\u521d\u306e\u8aad\u4e86\u65e5\u3092\u4fdd\u6301\u3059\u308b\u304b\u3001\u5e38\u306b\u6700\u65b0\u306e\u8aad\u4e86\u65e5\u306b\u66f4\u65b0\u3059\u308b\u304b\u3092\u6307\u5b9a\u3057\u307e\u3059'
  ],
  [
    'Placeholder data for external books is shown in the browser source manager',
    '\u5916\u90e8\u66f8\u7c4d\u306e\u30d7\u30ec\u30fc\u30b9\u30db\u30eb\u30c0\u30fc\u3092\u30d6\u30e9\u30a6\u30b6\u30bd\u30fc\u30b9\u30de\u30cd\u30fc\u30b8\u30e3\u30fc\u306b\u8868\u793a\u3057\u307e\u3059'
  ],
  [
    'Placeholder data for external books is hidden',
    '\u5916\u90e8\u66f8\u7c4d\u306e\u30d7\u30ec\u30fc\u30b9\u30db\u30eb\u30c0\u30fc\u3092\u975e\u8868\u793a\u306b\u3057\u307e\u3059'
  ]
]);

const tooltipPatternTranslations: Array<{
  pattern: RegExp;
  replace: (match: RegExpExecArray) => string;
}> = [
  {
    pattern:
      /^If enabled sets a bookmark after (\d+(?:\.\d+)?) seconds without scrolling\/page change$/,
    replace: (match) =>
      `\u30b9\u30af\u30ed\u30fc\u30eb\u3084\u30da\u30fc\u30b8\u79fb\u52d5\u304c\u306a\u3044\u72b6\u614b\u304c ${match[1]} \u79d2\u7d9a\u304f\u3068\u81ea\u52d5\u3067\u30d6\u30c3\u30af\u30de\u30fc\u30af\u3092\u4f5c\u6210\u3057\u307e\u3059`
  }
];

export function applyJapaneseUI(root: ParentNode = document.body) {
  if (typeof window === 'undefined') {
    return;
  }

  const translatedTextNodes = new WeakSet<Text>();

  const translateTextNodes = () => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let current: Node | null;

    while ((current = walker.nextNode())) {
      const textNode = current as Text;
      if (translatedTextNodes.has(textNode)) continue;
      const original = textNode.textContent;
      if (!original) continue;
      const trimmed = original.trim();
      if (!trimmed) continue;
      const translation = textTranslations.get(trimmed);
      if (!translation) continue;
      const leadingLength = original.indexOf(trimmed);
      const leading = leadingLength > 0 ? original.slice(0, leadingLength) : '';
      const trailingStart = leadingLength + trimmed.length;
      const trailing = trailingStart < original.length ? original.slice(trailingStart) : '';
      textNode.textContent = `${leading}${translation}${trailing}`;
      translatedTextNodes.add(textNode);
    }
  };

  const translateAttributes = () => {
    for (const [attribute, map] of attributeTranslations.entries()) {
      const selector = `[${attribute}]`;
      const elements = (root as Element).querySelectorAll?.(selector) ?? [];
      for (const element of elements) {
        const currentValue = element.getAttribute(attribute);
        if (!currentValue) continue;
        const translation = map.get(currentValue);
        if (!translation) continue;
        element.setAttribute(attribute, translation);
      }
    }
  };

  const translateTooltips = () => {
    const elements = (root as Element).querySelectorAll?.('[title]') ?? [];
    for (const element of elements) {
      const value = element.getAttribute('title');
      if (!value) continue;
      const translation = tooltipTranslations.get(value);
      if (translation) {
        element.setAttribute('title', translation);
        continue;
      }
      for (const { pattern, replace } of tooltipPatternTranslations) {
        const match = pattern.exec(value);
        if (!match) continue;
        element.setAttribute('title', replace(match));
        break;
      }
    }
  };

  translateTextNodes();
  translateAttributes();
  translateTooltips();
}

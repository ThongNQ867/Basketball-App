/* eslint-disable prettier/prettier */
import {
  checkIconSVG,
  labIconSVG,
  medicineIconSVG,
  waringIconSVG,
  xIconSVG,
} from '../assets/svgXml';
import {vh, vw} from '../styles/stylesheet';
import {getCurrentWeekDays, getDateTime} from './dayTimeService';

export const handbookData = [
  'Các giai đoạn mang bầu',
  'Thai giáo thông minh',
  'Các bệnh thường gặp',
  'Sự phát triển của thai nhi',
  'Hành trang đi sinh',
  'Cải thiện tâm trạng của mẹ',
  'Bài tập thể chất cho mẹ bầu',
];

export const renderHandBookTitle = (index: number) => {
  switch (index) {
    case 0:
      return 'Các giai đoạn mang bầu';
    case 1:
      return 'Thai giáo thông minh';
    case 2:
      return 'Các bệnh thường gặp';
    case 3:
      return 'Sự phát triển của thai nhi';
    case 4:
      return 'Hành trang đi sinh';
    case 5:
      return 'Cải thiện tâm trạng của mẹ';
    case 6:
      return 'Bài tập thể chất cho mẹ bầu';
    default:
      break;
  }
};

export const mealSuggestionData = [
  {icon: require('../assets/Meal/yoga2.png'), label: 'Yoga'},
  {icon: require('../assets/Meal/lungs.png'), label: 'Thở'},
  {icon: require('../assets/Meal/dancingWomen.png'), label: 'Pilates'},
];

export const tabsData = [
  {icon: require('../assets/Meal/apple.png'), label: 'Trái cây'},
  {icon: require('../assets/Meal/leafygreen.png'), label: 'Rau'},
  {icon: require('../assets/Meal/cutofmeat.png'), label: 'Thịt'},
  {icon: require('../assets/Meal/shrimp.png'), label: 'Hải sản'},
  {icon: require('../assets/Meal/3d.png'), label: 'Đồ uống'},
  {icon: require('../assets/Meal/beans.png'), label: 'Ngũ cốc'},
  {icon: require('../assets/Meal/popcorn.png'), label: 'Ăn vặt'},
  {icon: require('../assets/Meal/cannedfood.png'), label: 'TPCN'},
];

export const mealCautionData = [
  {icon: checkIconSVG(vw(5), vh(5)), label: 'Nên ăn'},
  {icon: xIconSVG(vw(5), vh(5)), label: 'Không nên ăn'},
  {icon: waringIconSVG(vw(5), vh(5)), label: 'Lưu ý'},
];

export const fruitData = [
  {
    title: 'Đu đủ xanh',
    kcal: '48 kcal',
    capacity: '100 ml',
    catergory: 'Trái cây',
    img: require('../assets/Meal/duduxanh.png'),
    suggest: [
      {
        label: 'Mang thai',
        icon: xIconSVG(vw(5), vh(3)),
      },
      {
        label: 'Không nên',
        icon: xIconSVG(vw(5), vh(3)),
      },
    ],
  },
  {
    title: 'Cam',
    kcal: '48 kcal',
    capacity: '100 ml',
    catergory: 'Trái cây',
    img: require('../assets/Meal/cam.png'),
    suggest: [
      {
        label: 'Nên ăn',
        icon: checkIconSVG(vw(5), vh(3)),
      },
      {
        label: 'Mới sinh',
        icon: checkIconSVG(vw(5), vh(3)),
      },
    ],
  },
  {
    title: 'Xoài',
    kcal: '48 kcal',
    capacity: '100 ml',
    catergory: 'Trái cây',
    img: require('../assets/Meal/xoai.png'),
    suggest: [
      {
        label: 'Nên ăn',
        icon: checkIconSVG(vw(5), vh(3)),
      },
      {
        label: 'Lưu ý',
        icon: waringIconSVG(vw(5), vh(3)),
      },
    ],
  },
  {
    title: 'Dưa hấu',
    kcal: '48 kcal',
    capacity: '100 ml',
    catergory: 'Trái cây',
    img: require('../assets/Meal/duahau.png'),
    suggest: [
      {
        label: 'Nên ăn',
        icon: checkIconSVG(vw(5), vh(3)),
      },
      {
        label: 'Không nên',
        icon: xIconSVG(vw(5), vh(3)),
      },
    ],
  },
  {
    title: 'Mít',
    kcal: '48 kcal',
    capacity: '100 ml',
    catergory: 'Trái cây',
    img: require('../assets/Meal/mit.png'),
    suggest: [
      {
        label: 'Nên ăn',
        icon: checkIconSVG(vw(5), vh(3)),
      },
      {
        label: 'Lưu ý',
        icon: waringIconSVG(vw(5), vh(3)),
      },
    ],
  },
];

export const moodSuggestionData = [
  {
    img: require('../assets/Mood/sach.png'),
    title: 'Chia sẻ',
    des: 'Cải thiện tâm trạng',
  },
  {
    img: require('../assets/Meal/yoga2.png'),
    title: 'Thiền',
    des: 'Bình tĩnh',
  },
  {
    img: require('../assets/Mood/donut.png'),
    title: 'Yoga',
    des: 'Vận động',
  },
];

export const wishListTodayData = [
  {
    title: 'Thèm ăn cóc dầm muốt ớt',
    isCheck: true,
    user: 'bocuakit',
    img: require('../assets/WishList/father.png'),
  },
  {
    title: 'Hết sữa bầu rồi, @dicuakit tan làm mua cho 2 mẹ con nhé <3',
    isCheck: false,
    user: 'dìcủakit',
    img: require('../assets/WishList/aunt.png'),
  },
];

export const wishListTomorrowData = [
  {
    title: 'Đi khám định kỳ cùng 2 mẹ con',
    isCheck: true,
  },
];

export const seenWishListData = [
  {
    user: 'dìcủakit',
    img: require('../assets/WishList/aunt.png'),
    postTime: '2024-07-04T07:15:00Z',
    isAnswer: true,
    isReject: true,
  },
  {
    user: 'bànội',
    img: require('../assets/WishList/grandma.png'),
    postTime: '2024-07-03T07:20:00Z',
    isAnswer: false,
    isReject: false,
  },
  {
    user: 'bốcủakít',
    img: require('../assets/WishList/father.png'),
    postTime: '2024-07-02T07:20:00Z',
    isAnswer: false,
    isReject: false,
  },
];

export const messGrpData = [
  {
    mess: 'Mẹ tròn con vuông nhé!',
    img: require('../assets/WishList/fr1.png'),
  },
  {
    mess: 'Mẹ tròn con vuông nhé!',
    img: require('../assets/WishList/aunt.png'),
  },
  {
    mess: 'Mẹ tròn con vuông nhé!',
    img: require('../assets/WishList/fr2.png'),
  },
];

export const remindData = [
  {
    title: 'Uống thuốc sắt',
    des: '3 viên, Sau ăn 30p',
    icon: medicineIconSVG(vw(6), vh(3)),
    time: ['12:30', '18:30'],
  },
  {
    title: 'Uống thuốc sữa bầu',
    des: 'Hàng ngày',
    icon: labIconSVG(vw(6), vh(3)),
    time: ['9:00'],
  },
];

export const pregnancyExamData = [
  {
    trimester: 1,
    data: [
      {
        isDone: true,
        title: 'Xét nghiệm hCG và thử thai tại nhà',
        date: '24.02.2023',
      },
      {
        isDone: true,
        title: 'Siêu âm đo độ mờ da gáy',
        date: '25.02.2023',
      },
      {
        isDone: true,
        title:
          'Xét nghiệm sinh hóa máu trong tam cá nguyệt thứ nhất: PAPP-A, Free beta-hCG (FBC)',
        date: '26.02.2023',
      },
      {
        isDone: true,
        title: 'Khám tổng quát và xét nghiệm máu',
        date: '01.03.2023',
      },
      {
        isDone: true,
        title: 'Xét nghiệm nước tiểu',
        date: '05.03.2023',
      },
      {
        isDone: true,
        title: 'Xét nghiệm Rubella IgG và IgM',
        date: '10.03.2023',
      },
      {
        isDone: true,
        title: 'Xét nghiệm HIV, viêm gan B, giang mai',
        date: '15.03.2023',
      },
    ],
  },
  {
    trimester: 2,
    data: [
      {
        isDone: false,
        title: 'Siêu âm đo hình thái thai nhi (Siêu âm 3D/4D)',
        date: '01.05.2023',
      },
      {
        isDone: false,
        title: 'Xét nghiệm sàng lọc dị tật ống thần kinh (Triple Test)',
        date: '05.05.2023',
      },
      {
        isDone: false,
        title: 'Xét nghiệm máu và nước tiểu định kỳ',
        date: '10.05.2023',
      },
      {
        isDone: false,
        title: 'Xét nghiệm glucose để kiểm tra tiểu đường thai kỳ',
        date: '15.05.2023',
      },
      {
        isDone: false,
        title: 'Khám thai định kỳ và kiểm tra cân nặng, huyết áp',
        date: '20.05.2023',
      },
      {
        isDone: false,
        title: 'Tiêm phòng uốn ván mũi đầu tiên',
        date: '25.05.2023',
      },
      {
        isDone: false,
        title: 'Khám tổng quát và kiểm tra tim thai',
        date: '30.05.2023',
      },
    ],
  },
  {
    trimester: 3,
    data: [
      {
        isDone: false,
        title: 'Siêu âm kiểm tra sự phát triển của thai nhi',
        date: '01.08.2023',
      },
      {
        isDone: false,
        title: 'Xét nghiệm máu và nước tiểu định kỳ',
        date: '05.08.2023',
      },
      {
        isDone: false,
        title: 'Kiểm tra và đo độ giãn nở cổ tử cung',
        date: '10.08.2023',
      },
      {
        isDone: false,
        title: 'Tiêm phòng uốn ván mũi thứ hai',
        date: '15.08.2023',
      },
      {
        isDone: false,
        title: 'Kiểm tra tim thai và lượng nước ối',
        date: '20.08.2023',
      },
      {
        isDone: false,
        title: 'Khám thai định kỳ và theo dõi cân nặng, huyết áp',
        date: '25.08.2023',
      },
      {
        isDone: false,
        title: 'Khám tổng quát trước sinh',
        date: '30.08.2023',
      },
    ],
  },
];

export const barChartData = {
  labels: [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ],
  datasets: [
    {
      data: [40, 50, 50, 50, 70, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
};

export const lineChartData = {
  labels: Array.from({length: 41}, (_, i) =>
    (i + 1).toString().padStart(2, '0'),
  ),
  datasets: [
    {
      data: Array(41)
        .fill(0)
        .map((_, i) =>
          i < 15
            ? [15, 30, 50, 50, 60, 58, 60, 58, 60, 58, 60, 58, 60, 58, 60][i]
            : 0,
        ),
    },
  ],
};

export const barChartDataBelly = {
  labels: [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ],
  datasets: [
    {
      data: [40, 50, 50, 50, 70, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
};

export const lineChartDataBelly = {
  labels: Array.from({length: 41}, (_, i) =>
    (i + 1).toString().padStart(2, '0'),
  ),
  datasets: [
    {
      data: Array(41)
        .fill(0)
        .map((_, i) =>
          i < 15
            ? [70, 75, 76, 77, 77, 80, 82, 85, 88, 88, 88, 90, 91, 91, 91][i]
            : 0,
        ),
    },
  ],
};

export const doctorListData = [
  {
    name: 'Trần Thái Linh',
    department: 'Khoa sản',
    location: 'Viện Hồng Ngọc',
    rating: 4.5,
    workFrom: '8:00',
    workTo: '16:00',
    img: require('../assets/TaskList/doctorAvatar.png'),
  },
  {
    name: '',
    department: 'Khoa sản',
    location: 'Viện Tây Á',
    rating: 4,
    workFrom: '8:00',
    workTo: '16:00',
    img: require('../assets/TaskList/doctorAvatar.png'),
  },
  {
    name: '',
    department: 'Khoa sản',
    location: 'Viện Hồng Ngọc',
    rating: 5,
    workFrom: '8:00',
    workTo: '16:00',
    img: require('../assets/TaskList/doctorAvatar.png'),
  },
  {
    name: '',
    department: 'Khoa sản',
    location: 'Viện Nam Á',
    rating: 5,
    workFrom: '8:00',
    workTo: '16:00',
    img: require('../assets/TaskList/doctorAvatar.png'),
  },
  {
    name: '',
    department: 'Khoa sản',
    location: 'Viện Minh Nguyệt',
    rating: 4.5,
    workFrom: '8:00',
    workTo: '16:00',
    img: require('../assets/TaskList/doctorAvatar.png'),
  },
];

// Data for week tab in diary
export const getDiaryWeekData = () => {
  const {days} = getCurrentWeekDays();
  const today = getDateTime('day');
  const diaryWeekData = days.map(dayInfo => {
    const {dayOfWeek, day} = JSON.parse(dayInfo);
    return {
      dayOfWeek,
      date: day,
      status:
        Number(today) > Number(day)
          ? 'Mẹ quên không theo dõi rùi'
          : 'Chưa có thông tin',
      setTime: '',
      weight: 60,
      bellySize: 80,
      reservation: {
        doctorname: '',
        status: '',
        time: '',
      },
      mood: '',
      tag: [],
      note: '',
    };
  });

  return diaryWeekData;
};

export const moodReasonData = [
  'Ổn',
  'Đau người',
  'Đau ngực',
  'Khó thở',
  'Ợ hơi',
  'Mụn',
  'Phù nề',
];

export const StatementData = [
  'Ổn',
  'Đau người',
  'Đau ngực',
  'Khó thở',
  'Ợ hơi',
  'Mụn',
  'Phù nề',
];

export const sexStatusData = [
  'Quan hệ có bảo vệ',
  'Nhu cầu tình dục cao',
  'Quan hệ không bảo vệ',
  'Vuốt ve cơ thể',
  'Ít có nhu cầu tình dục',
  'Quan hệ miệng',
];

export const diaryModalData = [
  'Định kỳ',
  'Nước tiểu',
  'Siêu âm',
  'Xét nghiệm sinh hóa máu',
];

export const moodImgSelectionData = [
  {label: 'Tức giận', img: require('../assets/angryface.png')},
  {label: 'Vui cực', img: require('../assets/happywithhalo.png')},
  {label: 'U sầu', img: require('../assets/sadface.png')},
  {label: 'Tim', img: require('../assets/happywithhearteye.png')},
  {label: 'Vui', img: require('../assets/smilingFace.png')},
];

export const questionData = {
  isMom: false,
  calculateMethod: '',
  calculateValue: '',
  averageMenstrualCycle: 0,
  medicalHistory: [
    {
      name: '',
      img: [],
    },
  ],
  medicine: [
    {
      name: '',
      img: [],
    },
  ],
  isFinished: false,
};

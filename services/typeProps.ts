/* eslint-disable prettier/prettier */
export type RootStackParamList = {
  HandBookDetail: {id: number};
};

export interface Reservation {
  doctorname: string;
  status: string;
  time: string;
}

export interface DiaryEntry {
  dayOfWeek: string;
  date: string;
  status: string;
  setTime: string;
  weight: number;
  bellySize: number;
  reservation: Reservation;
  mood: string;
  tag: string[];
  note: string;
}

export interface QuestionPageData {
  isMom: boolean;
  calculateMethod: string;
  calculateValue: string;
  averageMenstrualCycle: number;
  medicalHistory: [
    {
      name: string;
      img: string[];
    },
  ];
  medicine: [
    {
      name: string;
      img: string[];
    },
  ];
  isFinished: boolean;
}

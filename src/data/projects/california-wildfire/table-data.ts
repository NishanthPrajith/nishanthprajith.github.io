import { TableData } from '../types';

export const confusionMatrixTableData: TableData = {
  shortTable: true,
  columns: [
    {
      id: 'true_label_no',
      title: 'True Label',
      subtitle: '(No)',
    },
    {
      id: 'true_label_yes',
      title: 'True Label',
      subtitle: '(Yes)',
    },
  ],
  rows: [
    {
      label: 'Predicted Label (No)',
      values: {
        true_label_no: '155',
        true_label_yes: '137',
      },
    },
    {
      label: 'Predicted Label (Yes)',
      values: {
        true_label_no: '133',
        true_label_yes: '165',
      },
    },
  ],
};

export const classificationReportTableData: TableData = {
  shortTable: true,
  columns: [
    {
      id: 'precision',
      title: 'Precision',
    },
    {
      id: 'recall',
      title: 'Recall',
    },
    {
      id: 'f1Score',
      title: 'F1-score',
    },
    {
      id: 'support',
      title: 'Support',
    },
  ],
  rows: [
    {
      label: 'No (0)',
      values: {
        precision: '54%',
        recall: '53%',
        f1Score: '53%',
        support: '292',
      },
    },
    {
      label: 'Yes (1)',
      values: {
        precision: '55%',
        recall: '55%',
        f1Score: '55%',
        support: '298',
      },
    },
    {
      section: 'Overall',
    },
    {
      label: 'Accuracy',
      values: {
        precision: '54%',
        recall: '. . .',
        f1Score: '. . .',
        support: '590',
      },
    },
    {
      label: 'Macro Avg',
      values: {
        precision: '54%',
        recall: '54%',
        f1Score: '54%',
        support: '590',
      },
    },
    {
      label: 'Weighted Avg',
      values: {
        precision: '54%',
        recall: '54%',
        f1Score: '54%',
        support: '590',
      },
    },
  ],
};

export const californiaFireCleanedTableData: TableData = {
  shortTable: false,
  caption: 'Snippet of the California_Fire_Cleaned.csv file (from GitHub)',
  columns: [
    {
      id: 'acresBurned',
      title: 'Acres Burned',
    },
    {
      id: 'adminUnit',
      title: 'Admin Unit',
      style: {
        width: '30%',
        textAlign: 'left',
      },
      rowStyle: {
        textAlign: 'left',
      },
    },
    {
      id: 'archiveYear',
      title: 'Archive Year',
    },
    {
      id: 'calFireIncident',
      title: 'CAL FIRE Incident',
    },
    {
      id: 'counties',
      title: 'County',
    },
    {
      id: '. . .',
      title: '. . .',
      style: {
        width: '4%',
      },
    },
  ],
  rows: [
    {
      values: {
        acresBurned: '257314',
        adminUnit: 'Stanislaus National Forest/Yosemite National Park',
        archiveYear: '2013',
        calFireIncident: 'True',
        counties: 'Tuolumne',
        '. . .': '. . .',
      },
    },
    {
      values: {
        acresBurned: '30274',
        adminUnit: 'USFS Angeles National Forest/Los Angeles County/CAL FIRE',
        archiveYear: '2013',
        calFireIncident: 'True',
        counties: 'Los Angeles',
        '. . .': '. . .',
      },
    },
    {
      values: {
        acresBurned: '27531',
        adminUnit: 'CAL FIRE Riverside Unit / San Bernardino National Forest',
        archiveYear: '2013',
        calFireIncident: 'True',
        counties: 'Riverside',
        '. . .': '. . .',
      },
    },
    {
      values: {
        acresBurned: '27440',
        adminUnit: 'Tahoe National Forest',
        archiveYear: '2013',
        calFireIncident: 'False',
        counties: 'Placer',
        '. . .': '. . .',
      },
    },
    {
      values: {
        acresBurned: '. . .',
        adminUnit: '. . .',
        archiveYear: '. . .',
        calFireIncident: '. . .',
        counties: '. . .',
        '. . .': '. . .',
      },
    },
  ],
};

export const weatherDataTableData: TableData = {
  shortTable: false,
  caption: 'Snippet of the weather_data.csv file (from GitHub)',
  columns: [
    {
      id: 'fips',
      title: 'FIPS',
    },
    {
      id: 'latitude',
      title: 'Latitude',
    },
    {
      id: 'longitude',
      title: 'Longitude',
    },
    {
      id: 'counties',
      title: 'County',
    },
    {
      id: 'started',
      title: 'Started',
    },
    {
      id: 'tempDayOne',
      title: 'Temp Day 1',
    },
    {
      id: '. . .',
      title: '. . .',
      style: {
        width: '4%',
      },
    },
  ],
  rows: [
    {
      values: {
        fips: '6109',
        latitude: '37.857',
        longitude: '-120.086',
        counties: 'Tuolumne',
        started: '2013-08-17 15:25:00',
        tempDayOne: '74',
        '. . .': '. . .',
      },
    },
    {
      values: {
        fips: '6037',
        latitude: '34.585595',
        longitude: '-118.423176',
        counties: 'Los Angeles',
        started: '2013-05-30 15:28:00',
        tempDayOne: '72',
        '. . .': '. . .',
      },
    },
    {
      values: {
        fips: '6065',
        latitude: '33.7095',
        longitude: '-116.72885',
        counties: 'Riverside',
        started: '2013-07-15 13:43:00',
        tempDayOne: '82',
        '. . .': '. . .',
      },
    },
    {
      values: {
        fips: '6061',
        latitude: '39.12',
        longitude: '-120.65',
        counties: 'Placer',
        started: '2013-08-10 16:30:00',
        tempDayOne: '74',
        '. . .': '. . .',
      },
    },
    {
      values: {
        fips: '6019',
        latitude: '37.279',
        longitude: '-119.318',
        counties: 'Fresno',
        started: '2013-07-22 22:15:00',
        tempDayOne: '68',
        '. . .': '. . .',
      },
    },
    {
      values: {
        fips: '6065',
        latitude: '33.86157',
        longitude: '-116.90427',
        counties: 'Riverside',
        started: '2013-08-07 14:05:00',
        tempDayOne: '76',
        '. . .': '. . .',
      },
    },
    {
      values: {
        fips: '. . .',
        latitude: '. . .',
        longitude: '. . .',
        counties: '. . .',
        started: '. . .',
        tempDayOne: '. . .',
        tempDayTwo: '. . .',
        tempDayThree: '. . .',
        '. . .': '. . .',
      },
    },
  ],
};

export const cleanedDataTableData: TableData = {
  shortTable: false,
  caption: 'Snippet of the cleaned.csv file (from GitHub)',
  columns: [
    {
      id: 'acresBurned',
      title: 'Acres Burned',
    },
    {
      id: 'counties',
      title: 'County',
    },
    {
      id: 'latitude',
      title: 'Latitude',
    },
    {
      id: 'longitude',
      title: 'Longitude',
    },
    {
      id: 'started',
      title: 'Started',
    },
    {
      id: 'fips',
      title: 'FIPS',
    },
    {
      id: 'tempDayOne',
      title: 'Temp Day 1',
    },
    {
      id: '. . .',
      title: '. . .',
      style: {
        width: '4%',
      },
    },
  ],
  rows: [
    {
      values: {
        acresBurned: '257314',
        counties: 'Tuolumne',
        latitude: '37.857',
        longitude: '-120.086',
        started: '2013-08-17 15:25:00',
        fips: '6109',
        tempDayOne: '74',
        '. . .': '. . .',
      },
    },
    {
      values: {
        acresBurned: '30274',
        counties: 'Los Angeles',
        latitude: '34.585595',
        longitude: '-118.423176',
        started: '2013-05-30 15:28:00',
        fips: '6037',
        tempDayOne: '72',
        '. . .': '. . .',
      },
    },
    {
      values: {
        acresBurned: '27531',
        counties: 'Riverside',
        latitude: '33.7095',
        longitude: '-116.72885',
        started: '2013-07-15 13:43:00',
        fips: '6065',
        tempDayOne: '82',
        '. . .': '. . .',
      },
    },
    {
      values: {
        acresBurned: '27440',
        counties: 'Placer',
        latitude: '39.12',
        longitude: '-120.65',
        started: '2013-08-10 16:30:00',
        fips: '6061',
        tempDayOne: '74',
        '. . .': '. . .',
      },
    },
    {
      values: {
        acresBurned: '22992',
        counties: 'Fresno',
        latitude: '37.279',
        longitude: '-119.318',
        started: '2013-07-22 22:15:00',
        fips: '6019',
        tempDayOne: '68',
        '. . .': '. . .',
      },
    },
    {
      values: {
        acresBurned: '20292',
        counties: 'Riverside',
        latitude: '33.86157',
        longitude: '-116.90427',
        started: '2013-08-07 14:05:00',
        fips: '6065',
        tempDayOne: '76',
        '. . .': '. . .',
      },
    },
    {
      values: {
        acresBurned: '14754',
        counties: 'Siskiyou',
        latitude: '41.32',
        longitude: '-123.176',
        started: '2013-07-31 22:00:00',
        fips: '6093',
        tempDayOne: '79',
        '. . .': '. . .',
      },
    },
    {
      values: {
        acresBurned: '. . .',
        counties: '. . .',
        latitude: '. . .',
        longitude: '. . .',
        started: '. . .',
        fips: '. . .',
        tempDayOne: '. . .',
        '. . .': '. . .',
      },
    },
  ],
};

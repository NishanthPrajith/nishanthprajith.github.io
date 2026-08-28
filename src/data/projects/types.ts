// Project Content Type
export enum ProjectContentType {
  heading = 'heading',
  subheading = 'subheading',
  text = 'text',
  footer = 'footer',
  image = 'image',
  code = 'code',
  table = 'table',
  barChart = 'barChart',
  lineChart = 'lineChart',
}

// Common
export type CommonProps = {
  hideTopPadding?: boolean;
};

// Image
export type ImageProps = {
  images?: string[];
  image?: string;
  height?: string;
  caption?: string;
  credits?: string;
  backgroundColor?: string;
  showPadding?: boolean;
};

// Chart
type ChartDataset = {
  label: string;
  data: number[];
  hideLine?: boolean;
};

export type ChartProps = CommonProps & {
  title?: string;
  labels?: string[];
  datasets?: ChartDataset[];
  horizontal?: boolean;
  yLabel?: string;
  xLabel?: string;
  xTickFormat?: (value: number) => string | number;
  yTickFormat?: (value: number) => string | number;
  xAxisMaxTicksLimit?: number;
  xAxisMin?: number;
  yAxisMin?: number;
  xAxisMax?: number;
  yAxisMax?: number;
  caption?: string;
};

// Column
export type TableColumn = {
  id: string;
  title: string;
  subtitle?: string;
  group?: string;
  highlight?: boolean;
  style?: React.CSSProperties;
  rowStyle?: React.CSSProperties;
};

// Row
export type TableRow = {
  section?: string;
  label?: string;
  subLabel?: string;
  values?: Record<string, React.ReactNode>;
};

// Table
export type TableData = CommonProps & {
  shortTable?: boolean;
  caption?: string;
  columns?: TableColumn[];
  rows?: TableRow[];
};

// Project
export type ProjectData = {
  type: ProjectContentType;
  subtitle?: string;
  content?: string;
  htmlContent?: React.ReactNode;
  multipleHtmlContent?: React.ReactNode[];
  links?: {
    text: string;
    link: string;
  }[];
  tableData?: TableData;
  chartData?: ChartProps;
  imageData?: ImageProps;
};

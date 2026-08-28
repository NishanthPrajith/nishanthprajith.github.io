import { dedent } from '../../../utils/dedent';
import { ProjectContentType, ProjectData } from '../types';

export const curveFittingContent: ProjectData[] = [
  {
    type: ProjectContentType.heading,
    content: 'Goals',
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        In this project I will implemented a class that generalized least
        squares approximation to any desired degree of precision. Rather than
        recalculating a fit by hand for every new dataset and polynomial degree,
        this class makes that approximation immediately available for any input.
        I applied it to a real question:{' '}
        <strong>
          did rising population in New York City drive water consumption up or
          down?
        </strong>
      </span>
    ),
  },
  {
    type: ProjectContentType.heading,
    content: 'Data',
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        The data comes from the NYC Open Data website (
        <i>reference provided below</i>), a free data distribution platform
        published by NYC agencies and their partners. It includes New York
        City's population, total water consumption per day, and gallons per
        person per day, tracked over several decades. I used the full set of
        these metrics and fit each to a curve. This data is particularly
        interesting because it captures how water use in a major U.S. city has
        shifted alongside population growth, offering a window into consumption
        trends that could inform how cities plan for water demand in the years
        ahead.
      </span>
    ),
  },
  {
    type: ProjectContentType.heading,
    content: 'Analysis',
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        I built a class called <code>MyProgram</code> that generalizes the least
        squares approximation to any degree of polynomial. Given any dataset and
        any degree of polynomial, the class produces a least squares
        approximation and plots the result.
      </span>
    ),
  },
  {
    type: ProjectContentType.code,
    htmlContent: dedent(`
    class MyProgram:
        def __init__(self, degreesOfPercision, x, actualData, xlabel, ylabel): 
            '''
                Constructor that initializes all the variables for future calculations.
            '''
            self.xlabel = xlabel
            self.ylabel = ylabel
            self.degreesOfPercision = degreesOfPercision
            
            # X values of the dataset
            self.xValues = np.array(x) 

            # Actual values or Y values of the dataset
            self.actualData = actualData 

            # Natural basis coefficients for the space 𝑊
            self.Identity = np.identity(self.degreesOfPercision, dtype = int) 

            # Natural basis vectors for the space 𝑊
            self.w_vectors = np.array([
                [0 for i in range(len(self.xValues))] for j in range(self.degreesOfPercision)
            ], dtype = float)

            # Orthogonal basis coefficients for space W
            self.y_vectors = np.array([
                [0 for i in range(len(self.xValues))] for j in range(self.degreesOfPercision)
            ], dtype = float)

            # Orthogonal basis vectors for space W
            self.y_coef = np.array([
                [0 for i in range(self.degreesOfPercision)] 
                for j in range(self.degreesOfPercision)], dtype = float)

            # Projection coefficients of the orthogonal basis projected on to sample W
            self.projCoef = np.array(
                [0 for i in range(self.degreesOfPercision)], dtype = float)
            
        def __function__(self, constants, x):
            '''
            Function that takes in constants vector and an x value integer 
            thats returns the value tabulated by a polynomial of the form:
            F(x) = a + bx^2 + cx^3 + dx^4 + ...
            (Here a, b, c, d are values from the constants a is the 1st constant, 
            b is the 2nd, c is the 3rd, etc..)
            ---
            Returns an int
            ---
            '''
            answer = 0
            for i in range(len(constants)):
                # Loops through all the values inside the constants vector 
                # and calculates the values of the polynomial function
                answer += constants[i] * (x ** i)
            return answer
        
        def __coefficients_to_vector__(self, constants):
            '''
            Returns a numpy array that loops through all the X values in the 
            dataset and adds the value returned by the polynomial function 
            ('def __function__') into a numpy array (which is later returned).
            ---
            Returns a numpy array
            ---
            '''
            return_list = []
            for year in self.xValues:
                # Loops throguh all the values in the X values of the 
                # dataset and runs the '__function__' on each value.
                # The return value of '__function__' is then stored inside an array
                return_list.append(self.__function__(constants, year))
            return np.array(return_list) # Returns as a numpy array

    ....
    `),
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        The <strong>two graphs below</strong> show these fitted curves: year vs.
        population and year vs. consumption, each with its least squares fit
        overlaid on the raw data.
      </span>
    ),
  },
  {
    type: ProjectContentType.lineChart,
    chartData: {
      title: 'Year vs. NYC Water consumption',
      labels: [
        2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008,
        2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996,
        1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985, 1984,
        1983, 1982, 1981, 1980, 1979, 1978, 1977, 1976, 1975, 1974, 1973, 1972,
        1971, 1970, 1969, 1968, 1967, 1966, 1965, 1964, 1963, 1962, 1961, 1960,
      ]
        .reverse()
        .map((value) => `${value}`),
      datasets: [
        {
          label: 'Actual Data',
          data: [
            360401.0, 367920.0, 361423.0, 365730.0, 368285.0, 363540.0,
            367226.5, 368321.5, 372665.0, 379235.0, 367737.5, 400770.0,
            406610.0, 390185.0, 415370.0, 401317.5, 399200.5,
            414493.99999999994, 432160.0, 452746.00000000006, 451578.0,
            445117.5, 440007.5, 473733.50000000006, 483880.5, 495560.5,
            499502.5, 499538.99999999994, 536294.5, 519687.0, 511620.5,
            541623.5, 527972.5, 493005.5, 483917.0, 534725.0, 519687.0,
            504576.00000000006, 477894.5, 549653.5, 552026.0, 540017.5,
            541295.0, 523775.0, 516475.0, 526257.0, 528848.5,
            515526.00000000006, 519613.99999999994, 511109.5, 484975.5,
            453293.50000000006, 414311.49999999994, 381388.50000000006,
            384016.49999999994, 434058.0, 444351.00000000006,
            440773.99999999994, 445665.0, 437781.00000000006,
          ]
            .reverse()
            .map((value) => Number(value.toFixed(2))),
          hideLine: true,
        },
        {
          label: 'Least Squares Approx. (deg 5)',
          data: [
            388213.72216797, 378417.04638672, 370867.36132812, 365394.33300781,
            361832.67773438, 360022.15283203, 359807.57226562, 361038.78857422,
            363570.69628906, 367263.24414062, 371981.40820312, 377595.22998047,
            383979.78369141, 391015.19726562, 398586.63232422, 406584.30761719,
            414903.47509766, 423444.44677734, 432112.56542969, 440818.22558594,
            449476.86376953, 458008.96679688, 466340.06347656, 474400.72412109,
            482126.57226562, 489458.26904297, 496341.5234375, 502727.09423828,
            508570.7734375, 513833.4140625, 518480.89794922, 522484.16455078,
            525819.19384766, 528467.00683594, 530413.67578125, 531650.31494141,
            532173.08447266, 531983.18994141, 531086.88037109, 529495.453125,
            527225.24560547, 524297.65185547, 520739.09033203, 516581.04785156,
            511860.03564453, 506617.62792969, 500900.43017578, 494760.1015625,
            488253.33691406, 481441.89111328, 474392.55224609, 467177.15527344,
            459872.58789062, 452560.76806641, 445328.66894531, 438268.31445312,
            431476.75878906, 425056.10986328, 419113.52734375, 413761.20166016,
          ]
            .reverse()
            .map((value) => Number(value.toFixed(2))),
        },
      ],
      xLabel: 'Year',
      yLabel: 'Water consumption (millions of gallons)',
      xTickFormat: (value) => `${value}`,
    },
  },
  {
    type: ProjectContentType.lineChart,
    chartData: {
      title: 'Year vs. NYC Population',
      labels: [
        2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008,
        2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996,
        1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985, 1984,
        1983, 1982, 1981, 1980, 1979, 1978, 1977, 1976, 1975, 1974, 1973, 1972,
        1971, 1970, 1969, 1968, 1967, 1966, 1965, 1964, 1963, 1962, 1961, 1960,
      ]
        .reverse()
        .map((value) => `${value}`),
      datasets: [
        {
          label: 'Actual Data',
          data: [
            8824751.0, 8826377.0, 8815395.0, 8794592.0, 8736590.0, 8655238.0,
            8565517.0, 8463961.0, 8337907.0, 8175133.0, 8158448.0, 8141762.0,
            8125077.0, 8108391.0, 8091706.0, 8075020.0, 8058335.0, 8041649.0,
            8024964.0, 8008278.0, 7947660.0, 7858259.0, 7773443.0, 7697812.0,
            7633040.0, 7570458.0, 7506166.0, 7428944.0, 7374501.0, 7335650.0,
            7344175.0, 7353719.0, 7342476.0, 7319246.0, 7274054.0, 7234514.0,
            7181224.0, 7109105.0, 7089241.0, 7071639.0, 7102100.0, 7178900.0,
            7300700.0, 7427800.0, 7492200.0, 7597800.0, 7681800.0, 7835500.0,
            7903000.0, 7895563.0, 7884205.0, 7872847.0, 7861489.0, 7850131.0,
            7838774.0, 7827416.0, 7816058.0, 7804700.0, 7793342.0, 7781984.0,
          ]
            .reverse()
            .map((value) => Number(value.toFixed(2))),
          hideLine: true,
        },
        {
          label: 'Least Squares Approx. (deg 5)',
          data: [
            8700097.67578125, 8709241.6875, 8707094.6875, 8694697.59375,
            8673056.51171875, 8643142.67578125, 8605892.55078125,
            8562207.76953125, 8512955.12890625, 8458966.59765625,
            8401039.3671875, 8339935.74609375, 8276383.26953125,
            8211074.63671875, 8144667.71875, 8077785.58203125, 8011016.4609375,
            7944913.75, 7879996.06640625, 7816747.171875, 7755616.0078125,
            7697016.7265625, 7641328.6171875, 7588896.1640625, 7540029.06640625,
            7495002.125, 7454055.390625, 7417394.1015625, 7385188.53515625,
            7357574.35546875, 7334652.28125, 7316488.17578125, 7303113.19921875,
            7294523.61328125, 7290680.84375, 7291511.546875, 7296907.56640625,
            7306725.84375, 7320788.56640625, 7338883.08984375, 7360761.9453125,
            7386142.8515625, 7414708.65625, 7446107.48046875, 7479952.5390625,
            7515822.21875, 7553260.1953125, 7591775.21875, 7630841.21875,
            7669897.37890625, 7708347.984375, 7745562.5703125, 7780875.78515625,
            7813587.4609375, 7842962.703125, 7868231.6640625, 7888589.75,
            7903197.53125, 7911180.78515625, 7911630.37890625,
          ]
            .reverse()
            .map((value) => Number(value.toFixed(2))),
        },
      ],
      xLabel: 'Year',
      yLabel: 'Water consumption (millions of gallons)',
      xTickFormat: (value) => `${value}`,
    },
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        After fitting both curves, an interesting trend emerged. As the
        population of NYC increased from 1979 to 2019, total water consumption
        actually decreased - the opposite of what one might expect, since more
        people would seem to mean more water use. The exact cause is
        inconclusive from this data alone, since it does not break down water
        use by category (drinking, cooking, showering, etc.). With that
        additional data, the cause could be narrowed down more precisely. My
        hypothesis is that fewer people are taking long showers or baths, or are
        showering less than once a day - possibly due to increased awareness of
        water conservation and more water-efficient fixtures over this period.
        Although the underlying cause remains inconclusive, the trend itself is
        notable and worth further investigation.
      </span>
    ),
  },
  {
    type: ProjectContentType.heading,
    content: 'Reflection',
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        This project sharpened my skills in data manipulation with pandas and
        reinforced object-oriented design principles in Python through building
        a reusable least-squares class. It also brought Linear Algebra concepts
        to life by applying them to a real dataset instead of an abstract
        problem set. Next, I would like to dig into more granular data - such as
        consumption broken down by borough - build out richer visualizations
        with seaborn, and test a more rigorous hypothesis that accounts for
        external factors like conservation policy or fixture efficiency
        standards.
      </span>
    ),
  },
  {
    type: ProjectContentType.footer,
    links: [
      {
        text: 'NYC Open Data',
        link: 'https://data.cityofnewyork.us/Environment/Water-Consumption-In-The-New-York-City/ia2d-e54m',
      },
    ],
  },
];

import { dedent } from '../../../utils/dedent';
import { ProjectContentType, ProjectData } from '../types';
import {
  californiaFireCleanedTableData,
  classificationReportTableData,
  cleanedDataTableData,
  confusionMatrixTableData,
  weatherDataTableData,
} from './table-data';

export const californiaWildfireContent: ProjectData[] = [
  {
    type: ProjectContentType.heading,
    content: 'Motivation',
  },
  {
    type: ProjectContentType.text,
    content: `The problem we are trying to solve is the constant wildfires in
    California. As we are aware, there have been wildfires raging across
    California for several years now, and it has caused not just racked
    up massive cost in damages, but also destroyed several forests, and
    killed animals, and human beings. There is no question that this
    occurs due to Climate Change and rising temperatures which results
    in droughts that cause such fires to not only spread quickly but
    also make it hard to put out. Another example of this is Australia,
    which had such massive wildfires that persisted for weeks and even
    caused emergency actions from several nations around the world.
    Therefore, it would be vital in this day and age to determine if it
    is possible to determine if a potential wildfire can take place so
    that the necessary precautions are taken to ensure the safety of the
    people, animals, and land.`,
  },
  {
    type: ProjectContentType.heading,
    content: 'Data',
  },
  {
    type: ProjectContentType.text,
    content: `
      The core of the wildfire data is coming from Kaggle. We will be
      downloading the dataset which lists all the wildfires from 2013 to
      2019 in California. One of the best things about this dataset is it
      lists specifically which county the wildfire occurred and also how
      many acres it burned. These are very good details as they make it
      easier to get the weather information of these places much faster.
      There is also quite a lot of additional information such as
      injuries, structures damaged, personnel involved, etc. This makes
      this dataset quite useful for not just this research but several
      others. In addition, we will be using World Weather Online to get
      the weather information at the place 5 days before the fire started.
      We will use this weather information data gathered and the fire
      dataset from Kaggle to build, train, and test our model.`,
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        Our analysis plan is very simple. We will try to use the dataset from{' '}
        <strong>Kaggle</strong> and the World Weather API to train a machine
        learning model to determine if there is potential for a wildfire to
        occur in a given region in California at a given time. Our model will
        use the average temperature, maximum temperature, minimum temperature,
        and humidity from the five days before the wildfire started as its
        features. Along with this, we will also calculate the average five-day
        temperature and average five-day humidity to use as additional features
        for our model.
      </span>
    ),
  },
  {
    type: ProjectContentType.heading,
    content: 'Cleaning',
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        First we performed the cleaning process on the raw datasets which we
        then saved. The wildfire data named{' '}
        <code>California_Fire_Cleaned.csv</code>, weather data named{' '}
        <code>weather_data.csv</code>, and merged dataset cleaned.csv for
        modeling. In order to create a reliable dataset, we have identified
        unnecessary columns, dropped them and removed missing and erroneous
        data. We believe that the downsized dataset in the name of cleaned.csv
        will help us generate more accurate results while training our machine
        learning model.
      </span>
    ),
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        Firstly to clean the wildfire dataset from Kaggle and generate the
        cleaned
        <code>California_Fire_Cleaned.csv</code>, we used the{' '}
        <code>etl_california_fire.py</code> file. This python file dropped
        unnecessary columns such as <code>SearchDescription</code>,{' '}
        <code>SearchKeywords</code>,<code>StructuresDamaged</code>,{' '}
        <code>StructuresDestroyed</code>, etc. These columns although
        interesting for exploration purposes did not provide any valuable
        information when it came to building the model. Next step was to format
        the dates, specifically the <code>Started</code> column. This was done
        mainly for two reasons. Firstly, some date information in the column
        came with microseconds data, which was a problem as most of the data in
        the column did not have this microsecond information. So to remain
        consistent, we removed this microsecond information by formatting the
        data in the
        <code>Started</code> column. We will explain the second reason later.
        Finally, we added a new column called <code>FIPS</code>. FIPS stands for
        “Federal Information Processing System (FIPS) Codes for States and
        Counties”. FIPS codes are numbers which uniquely identify geographic
        areas. We use this information specifically for exploratory analysis. As
        with this information and the <code>Latitude</code> and{' '}
        <code>Longitude</code> information that we already have we can group
        data into locations. This opens up a whole new door of opportunities for
        data visualization and analysis.
      </span>
    ),
  },
  {
    type: ProjectContentType.table,
    tableData: californiaFireCleanedTableData,
  },
  {
    type: ProjectContentType.text,
    content: `
      Secondly, we needed to get the weather data using the World Weather Online API. 
      The data was saved into weather_data.csv. The main file that we used for this data processing 
      was etl_weather.py file. This python file made use of the requests library to perform API requests 
      to World Weather Online. We used the latitude, longitude, and fire start date information to perform 
      the API request. This was where the previous date formatting became helpful. Using the date from the 
      'Started' column we can subtract 5 days from it since, we want to get the weather information 5 days 
      before the fire started for model training. Therefore, converting it before made things easier on this step. 
      The API request did give a json file which had information about average temperature, max temperature, 
      and min temperature. It also included information about humidity. However, it provided humidity information
      every 3 hours in a single day, and the average humidity of the day was not provided in the API json. 
      So, we wrote a simple for loop to calculate the average humidity and store that data as well 
      into the .csv file. This was all that we did for weather data cleaning and fetching.
    `,
  },
  {
    type: ProjectContentType.table,
    tableData: weatherDataTableData,
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        Finally, to get <code>cleaned.csv</code> we used the{' '}
        <code>cleaned.py</code> file. This file combined the{' '}
        <code>California_Fire_Cleaned.csv</code> and{' '}
        <code>weather_data.csv</code> into one big .csv file. This was the main
        data file we used for building and training our model. Once, merged we
        then dropped more columns that we did not need such as{' '}
        <code>Final</code>,<code>CountyIds</code>, <code>Injuries</code>,{' '}
        <code>Location</code>,<code>MajorIncident</code>,{' '}
        <code>PercentContained</code>, etc to list a few. Finally, we added some
        control data to the dataset to help the model to predict <i>no fires</i>{' '}
        as all the values in the current dataset had information about fires
        that actually occurs. If we train the model on the dataset with no
        control data the model will always predict fire occurrence 100% of the
        time which is obviously not correct. So, we added some control data to
        help the model distinguish patterns. This was all the things we did for
        data cleaning and processing.
      </span>
    ),
  },
  {
    type: ProjectContentType.table,
    tableData: cleanedDataTableData,
  },

  {
    type: ProjectContentType.heading,
    content: 'Exploratory Analysis',
    subtitle: 'Wildfire Dataset',
  },
  {
    type: ProjectContentType.text,
    content: `
      Now let us explore our wildfire dataset and see if we can find any interesting 
      information that might be worth exploring furthuring. First we look at a geospatial 
      graph which has all the wildfires plotted in the locations they occured long with 
      the amount of acres of area that was burned due to the fire (we are assuming they 
      are circular). Looking at this graph we see something interesting and, that is most 
      of the small wildfires occur in areas away from large forests and near mountains. 
      This is something interesting that needs further exploring, are areas near mountains 
      more susceptible to wildfires and if so why?. This trend is something interesting. 
      Plotting the graph we see that almost all areas of the California have had wildfires 
      except for some of the areas in the SE side which seem to not have as much fire. 
      Again, given the current dataset we have there is no way for us to analyze this 
      observation but if we have more geographic data and other information this is also 
      something took more into.
    `,
  },

  {
    type: ProjectContentType.text,
    content: `
      Now, we created a choropleth map to see how many wildfires occurred in each county in California 
      from 2013 - 2019 (shown below). And map proved to be interesting in its own way. When looking 
      at the map we see that Riverside County (highlighted in black) has the most number of wildfires. 
      In fact, it is the only county that is in the 98 - 146 wildfires range. But the county right 
      below Riverside which is Imperial county (highlighted in grey) did not have any wildfires. 
      Now we assumed this was probably due to some issue with the original dataset but weirdly 
      we could not find any wildfires that occurred in Imperial county during the years 2013 - 2019. 
      In fact in 2018, when the California released Wildfire Activity Statistics imperial county 
      proved to have no wildfire. Crazy right? 2 counties next to each other share very different scenarios.
    `,
  },

  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        Things get even more interesting when we plot the a choropleth map of
        the total number of acres burned throughout 2013 - 2019 in each of the
        counties (shown below). We see that Riverdale county which we saw before
        that had the most number of wildfires did not have the most acres
        burned. In fact it wasn't even close to the number of acres burned in
        countries like Trinity, Shasta, etc (all highlighted in black). These
        two choropleth maps showed something very interesting. The fact that
        south of the state of California has most of the wildfires but somehow
        does not end up burning as much land as wildfires in the north is
        something worth exploring more. Now, our hypothesis is that some form of
        geography is playing a role causing the north to have more devasting
        fires while the south far less devastating but more wildfires
        occurrences. Whatever the case might be these 2 visualizations provided
        valuable information.
      </span>
    ),
  },

  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        Finally, we explored Wildfire frequencies over the months in a given
        year to see if there where any particular months with more wildfires in
        a given year or all the years. And to our surprise there was.
      </span>
    ),
  },

  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        Looking at the above figure, that shows the wildfire frequencies over
        the months from years 2013 to 2019, we find something interesting. Most
        of the lines look like a parabola peaking around the 7th month and then
        going down. This implies that more wildfires seem to be occuring during
        the summer time. This makes sense as during this time the temperatures
        are high and it is more dry making wildfires a more likely occurrence.
        Looking at this shows that California is most vulnerable during the
        summer times, but it also shows that not much has been done to tackle
        this issue. Over the years the wildfires during the summer time seem to
        be jumping up and down without getting stable, implying that California
        are not doing enough to fix the problem they have.
      </span>
    ),
  },

  {
    type: ProjectContentType.subheading,
    subtitle: 'Weather Dataset',
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        Now let us explore the weather dataset and see if we can find any
        interesting information that might be worth exploring further. First we
        plotted the frequencies of the average temperatures and humidity.
      </span>
    ),
  },

  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        The above figure has 2 graphs. The first of which shows the frequency of
        average temperatures and the second of which is the frequency of average
        humidity. We observe that when most of the fires occur, the average
        humidity of the last 5 days before is less than 50%. This is very much
        interesting as lower the humidity means greater chance of fire spreading
        more quickly or forming in the first place. The second graph tells us
        that when most of the fires occur, the average temperature of the last 5
        days before is more than 70 F. Sometimes, it even hits 85 F +. This
        shows that humidity and temperature does play a role in wildfire
        occurrence and its spreading. This is something hopefully the machine
        learning model will pick up on and try to use.
      </span>
    ),
  },

  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        These two graphs does show an interesting pattern even if it is not
        clear at first. During the summer time the average temperature is high
        and the humidity is low (certain other months throughout the year have
        smaller avg humidity but low avg temperature as well). And this is very
        much consistent with the previous graphs where we observed that most of
        the wild fires occur during the summer time. Hence, further proof that
        change in temperatures does play a role in wildfires and that climate
        change is real.
      </span>
    ),
  },

  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        In conclusion, during our exploration of the datasets we came to certain
        conclusions. The first of which was that most of the wildfires occur
        during the summer time. This statement was further reinforced with our
        observation that during the summer times the average humidity is very
        low and the average temperatures are very high. The second observation
        we made was that the average temperature of the 5 days before the fire
        started throughout the month over the years are the same. Now we do not
        know why this is, but it is something that needs further exploration.
        Lastly, we noticed that within the geospatial data certain wildfires
        seems to be occurring in the same areas, again not sure why as of yet.
        But further exploration could provide some explanation into this as well
        the other things we identified.
      </span>
    ),
  },

  {
    type: ProjectContentType.heading,
    content: 'Machine Learning Workflow',
    subtitle: 'Model Creation',
  },
  {
    type: ProjectContentType.text,
    htmlContent: <span>First we will import the required libraries.</span>,
  },
  {
    type: ProjectContentType.code,
    htmlContent: dedent(`
      # Models from Scikit-Learn
      from sklearn.svm import SVC
      from sklearn.model_selection import train_test_split
      from sklearn.preprocessing import StandardScaler
      from sklearn.linear_model import LogisticRegression
      from sklearn.neighbors import KNeighborsClassifier
      from sklearn.ensemble import RandomForestClassifier
      from sklearn.ensemble import RandomForestRegressor

      # Import data analysis tools
      import matplotlib.pyplot as plt
      import pandas as pd
      import numpy as np
      import statsmodels.api as sm
      import seaborn as sns

      # Model Evaluations
      from sklearn.model_selection import RandomizedSearchCV, GridSearchCV
      from sklearn import metrics
      from sklearn.model_selection import KFold
      from sklearn.model_selection import cross_val_score
      from sklearn.metrics import plot_roc_curve
      from sklearn.metrics import confusion_matrix, classification_report
      from sklearn.metrics import accuracy_score, recall_score, precision_score
    `),
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span className="project-context-small-text">I. Base Approach:</span>
    ),
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        In the base approach we skipped some columns that we think are not
        important in our model, and these are AcresBurned, Country, latitude,
        longitude, Started FIPS. We worked taking care of the rest of the data
        set. As we are predicting the wildfire, we took the fire column as a
        targeted variable, and the other column we are going to use as
        independent variables. Previously, we made the fire column as a boolean
        value 1 and 0, as the predicting model works only with the numeric
        values.
      </span>
    ),
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        For the base approach we used Logistic Regression, Logictic Regression
        Normal, Random Forest, Support Vector Classifier. For the modeling we
        chose randomly 50% from the total of the original dataset to train our
        model, and we used the rest of the data set to get an accuracy model.
        After running the different models we get different prediction results.
        The prediction results are given below:
      </span>
    ),
  },
  {
    type: ProjectContentType.barChart,
    chartData: {
      title: 'Model Comparison',
      labels: [
        'Logistic Regression',
        'Logistic Regression Normal',
        'Random Forest',
        'Support Vector Classifier',
      ],
      datasets: [
        {
          label: 'Accuracy',
          data: [53.75, 56.73, 56.69, 56.62],
        },
      ],
      yLabel: 'Accuracy',
      yTickFormat: (value) => `${value}%`,
      yAxisMax: 80,
    },
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        Here, we see that all models give almost the same prediction rate though
        the logisticreg gave us a slightly higher prediction score. The accuracy
        did not show much difference even when we tried different models. This
        means that we need to modify our features. Note that if we increase the
        training dataset size the accuracy of models like the SVC does increase.
        It is important to keep in mind, if the different models give us almost
        the same prediction, we should work on our features to get a more
        accurate prediction rate. In that case, we may need to modify some
        parameters of different models. Now, we are going to modify some of our
        features.
      </span>
    ),
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        Instead of using all the value of the features we looked at the averages
        but it does not improve the accuracy.
      </span>
    ),
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        From our dataset, we were using temperature, max temperature, min
        temperature, humidity for 5 days in a week. So we took the average
        temperature of all the training dataset and used that to train our
        model. After running the all models, the accuracy results are given
        below:
      </span>
    ),
  },
  {
    type: ProjectContentType.barChart,
    chartData: {
      title: 'Model Comparison',
      labels: [
        'Logistic Regression',
        'Logistic Regression Normal',
        'Random Forest',
        'Support Vector Classifier',
      ],
      datasets: [
        {
          label: 'Accuracy',
          data: [55.29, 53.44, 52.41, 53.02],
        },
      ],
      yLabel: 'Accuracy',
      yTickFormat: (value) => `${value}%`,
      yAxisMax: 80,
    },
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        As we can see using the averages of the features did increase the
        accuracy of Logistic Regression but reducing the accuracy of the other
        three models. Almost all the models saw a decrease in accuracy,
        especially Random Forest Classifier model which went from 56% to 52%.
        So, now Let’s take another approach.
      </span>
    ),
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span className="project-context-small-text">II. Refined Approach:</span>
    ),
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        In this approach we took 20% from the original dataset and trained our
        data and used the same dataset to train each model. This time we will
        set up a little dictionary with our models in it and then we'll create a
        function. Rather than rewriting all the same code for feeding different
        models we will set up them all in a function. The function will take our
        dictionary of models and then we'll make X-train, X test, y-train,
        y-test.
      </span>
    ),
  },

  {
    type: ProjectContentType.barChart,
    chartData: {
      title: 'Model Comparison',
      labels: ['Logistic Regression', 'KNN', 'Random Forest'],
      datasets: [
        {
          label: 'Accuracy',
          data: [55.76, 54.4, 56.77],
        },
      ],
      yLabel: 'Accuracy',
      yTickFormat: (value) => `${value}%`,
      yAxisMax: 80,
    },
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        When comparing our models we can see that the Random Forest model had
        better accuracy compared to the KNN and Logistic Regression models. Now
        we try to tune each of the models KNN, Logistic Regression, and Random
        Forest and see how the models accuracy changes.
      </span>
    ),
  },
  {
    type: ProjectContentType.subheading,
    subtitle: 'Model Tuning',
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        While the resulting model accuracies are quite comparable and fairly
        better performed than our base approach. We will tune the machine
        learning model’s hyperparameters to achieve the best performance
        possible. We would want to better our KNN model which showed 56%
        accuracy. To achieve that we will do hyperparameter tuning. We made a
        list of training scores, an empty list. Because we want to compare
        different versions of the same model and create a list of different
        values for n_neighbors.
      </span>
    ),
  },
  {
    type: ProjectContentType.lineChart,
    chartData: {
      title: 'The Maximum KNN score on our test data: 57.80%',
      labels: Array.from({ length: 20 }, (_, i) => `${i + 1}`),
      xLabel: 'Number of Neighbors',
      yLabel: 'Model Score',
      yTickFormat: (value) => `${value}%`,
      datasets: [
        {
          label: 'Train Score',
          data: [
            0.9987266553480475, 0.7792869269949066, 0.7758913412563667,
            0.7126485568760611, 0.7079796264855688, 0.6922750424448217,
            0.6842105263157895, 0.6659592529711376, 0.6740237691001698,
            0.6540747028862479, 0.6587436332767402, 0.6502546689303905,
            0.6460101867572157, 0.6464346349745331, 0.6464346349745331,
            0.6417657045840407, 0.6421901528013583, 0.6337011884550084,
            0.6404923599320883, 0.6358234295415959,
          ].map((value) => Number((value * 100).toFixed(2))),
        },
        {
          label: 'Test Score',
          data: [
            0.5474576271186441, 0.5779661016949152, 0.5711864406779661,
            0.5525423728813559, 0.5576271186440678, 0.559322033898305,
            0.5576271186440678, 0.5644067796610169, 0.559322033898305,
            0.5542372881355933, 0.559322033898305, 0.5423728813559322,
            0.5576271186440678, 0.559322033898305, 0.576271186440678,
            0.5525423728813559, 0.5644067796610169, 0.5406779661016949,
            0.559322033898305, 0.5525423728813559,
          ].map((value) => Number((value * 100).toFixed(2))),
        },
      ],
      yAxisMax: 110,
    },
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        If we pay attention to out test score which is in orange line, it’s hard
        to see which is the highest value. KNN (number of neighbors) = 14 seemed
        best. The default is 5 KNN_Neighbors_Classifier. we just did some
        hyperparameter tuning to better our KNN and the result improved from 56%
        to 57.80%.
      </span>
    ),
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        Next we're going to tune: LogisticRegression() which got the lowest
        score. In order to improve that we are going to get hyperparameter grids
        setup for our scored model and tune it using RandomizedSearchCV . The
        score using [GridSearchCV] is same as when we use [RandomizedSearchCV]
        for LogicticRegressionModel which have showed decrease 54.23%. Finally,
        we applied hyperparameters for RandomForest model we have seen a slight
        boost from 56% to 59%
      </span>
    ),
  },

  {
    type: ProjectContentType.subheading,
    subtitle: 'Model Evaluation',
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        In order to better understand these outcomes, the purpose of our model
        is trying to predict if our collection of several weather parameters in
        real time i.e (all_features[temp,humidity etc]) sparks Fire Behavior.
        the positive outcome would be if the proportion of weather instances
        correctly predicted Fire, and understandably, the negative outcome would
        be if the weather instances does not predict the fire.
      </span>
    ),
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        To make comparison and the evaluation of our trained model we set a
        prediction variable, y_pred and set our trained version of logictic
        regression model there and compare them with our test data which is
        y_test.
      </span>
    ),
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>We will evaluate our ML models using the below metrics:</span>
    ),
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span className="project-context-small-text">
        i. ROC curve and AUC score
      </span>
    ),
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        If we analyze the area under the curve the perfect score should be 1.0
        but our model score is 0.73 which is not that far off.
      </span>
    ),
  },

  {
    type: ProjectContentType.text,
    htmlContent: (
      <span className="project-context-small-text">ii. Confusion matrix</span>
    ),
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        In order To make comparisons and evaluate our trained model, we will
        look at confusion matrix.
      </span>
    ),
  },
  {
    type: ProjectContentType.table,
    tableData: confusionMatrixTableData,
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        <strong>TN: (TP FP,FN,TP)</strong> the intersection of true label and
        predicted label of true occurence is 165.0 meaning that our weather
        instances did happen while predicting fire. In other words from our
        model, this means that fires occurences which were predicted to be
        happening because of higher humidity and relatively low temperatures
        indeed does not cause fires on those days.
      </span>
    ),
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        <strong>TP:</strong> 155.0 of the observations did not happen and would
        not happen based on our model In our example, this means that lower
        humidity and relatively high temperature which predicted to cause fire
        did not actually cause the fire.
      </span>
    ),
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        <strong>FN:</strong> 133.0 of the observations that the model predicted
        would not happen but actually did happen, this means that The lower
        humidity and higher temperatures which predicted fire eventually
        actually sparked fires.
      </span>
    ),
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        <strong>FP:</strong> there are ONLY 137 occasaions where the model
        predicted to happen but did not happen (false negative).
      </span>
    ),
  },

  {
    type: ProjectContentType.text,
    htmlContent: (
      <span className="project-context-small-text">
        III. Classification report
      </span>
    ),
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        We will use classfication report from sklearn to show the precision,
        recall, F1 Score, and support score of your trained classification
        model.
      </span>
    ),
  },
  {
    type: ProjectContentType.table,
    tableData: classificationReportTableData,
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        The model predicts fire which were actually correct meaning no False
        positives (133.0 in our model) will have a precision of 1.0. The
        proportion of actual positives which were correctly identified meaning
        (No false Negatives) will have recall of 1.0. If our model is perfect
        our FP which is 137.0 and FN which is 133.0 will be 0. The f1-score is
        the harmonic mean between precision & recall since our model is not
        absolutely perfect our f1 score is not 1.0. The support which is number
        of samples each metrics are calculated on in our test data set(y_test).
        In our modle there are 292 samples with a avalue of 0 and 298 with a
        value of 1 meaning the correct prediction of fire from weather
        instances.
      </span>
    ),
  },

  {
    type: ProjectContentType.text,
    htmlContent: (
      <span className="project-context-small-text">
        IV. Cross-validated accuracy
      </span>
    ),
  },
  {
    type: ProjectContentType.table,
    tableData: {
      hideTopPadding: true,
      shortTable: true,
      columns: [
        {
          id: 'accuracy',
          title: 'Accuracy',
          group: 'Cross-validated classification metrics',
        },
        {
          id: 'precision',
          title: 'Precision',
          group: 'Cross-validated classification metrics',
        },
        {
          id: 'recall',
          title: 'Recall',
          group: 'Cross-validated classification metrics',
        },
        {
          id: 'f1-score',
          title: 'F1 Score',
          group: 'Cross-validated classification metrics',
        },
      ],
      rows: [
        {
          values: {
            accuracy: '56.78%',
            precision: '56.50%',
            recall: '59.74%',
            'f1-score': '58.06%',
          },
        },
      ],
    },
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        We have used all our X data and all our y data and trying to analyze the
        cross validation score of our Logistic regression’s best parameters. It
        has evaluated our model into 5 different splits and took the mean of it
        to get the average accuracy among the split. We have calculated
        accuracy, precision, recall and f1-score of our model using
        cross-validation. The accuracy and metrics are highly biased upon how
        the split was performed. As you can see, previously we were getting 54%
        accuracy in our regression model and now with our best parameter we are
        on 58%.
      </span>
    ),
  },

  {
    type: ProjectContentType.text,
    htmlContent: (
      <span className="project-context-small-text">V. Feature Importance</span>
    ),
  },
  {
    type: ProjectContentType.barChart,
    chartData: {
      hideTopPadding: true,
      labels: [
        'Humidity Day Five',
        'Humidity Day Four',
        'Humidity Day Three',
        'Humidity Day Two',
        'Humidity Day One',
        'Temperature Day Five',
        'Temperature Day Four',
        'Temperature Day Three',
        'Temperature Day Two',
        'Temperature Day One',
      ],
      datasets: [
        {
          label: 'Accuracy',
          data: [
            0.11769991, 0.07671249, 0.0738636, 0.07323056, 0.07276159,
            0.04546421, 0.04301689, 0.04241737, 0.04186191, 0.04169208,
          ].map((value) => Number(value.toFixed(3))),
        },
      ],
      horizontal: true,
      xLabel: 'Feature Importance',
      yLabel: 'Attributes',
      xAxisMax: 0.2,
    },
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        Since we have built a model which is able to make predictions . You
        might be curious of what part of the data led to these predictions. This
        is where feature importance comes in to figure out which attributes of
        the data were most important when it comes to predicting the target
        variable which is “fire”. And we can see that Humidity Day Five scored
        higher than the rest of the metrics.
      </span>
    ),
  },

  {
    type: ProjectContentType.heading,
    content: 'Future Work',
  },
  {
    type: ProjectContentType.text,
    content: `
      For the future we hope to include more fire data and weather information to help make the model 
      more accurate. In the current instance we are only using the fire information from California, and 
      even that is a subset of the large number of fires that actually occurred. But in the future we hope 
      to use more fire data from places like Brazil, Australia, etc. The hope is that if we use more data 
      the machine learning model will be better trained and be more precise in predicting patterns increasing 
      its overall accuracy. In terms of the weather dataset, using temperatures and humidity has only produced 
      very limited accuracy for the machine learning model. But in the future it would be ideal to use more 
      weather related information, such as pressure, Heat Index, etc. These metrics could improve scaling 
      and accuracy. Finally we hope to look into some questions that came up throughout our analysis of the 
      data such as why the average temperatures of each of the 5 days before a fire occurs over the months 
      throughout years looks the same. And, also why most fires seem to be occurring near mountains in California. 
      In conclusion, the project overall in its current stage is incomplete with still a long way to go for 
      exploration and improvement. But we achieved more than what we expected.
    `,
  },
  {
    type: ProjectContentType.footer,
    content: 'Cowritten with Farah Sultana',
    links: [
      {
        text: 'Kaggle Dataset',
        link: 'https://www.kaggle.com/datasets/ananthu017/california-wildfire-incidents-20132020',
      },
      {
        text: 'World Weather Online',
        link: 'https://www.worldweatheronline.com/',
      },
    ],
  },
];

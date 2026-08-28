import { ProjectContentType, ProjectData } from '../types';

export const carDetectionContent: ProjectData[] = [
  {
    type: ProjectContentType.heading,
    content: 'Introduction',
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        CarMe is a car detection app that helps users discover the model of a
        car that they are interested in. This is done through the use of an
        image classification model. CarMe can detect over 23 unique car models (
        <a
          href="https://github.com/NishanthPrajith/carIdentificationApp#Full-list-of-23-classes-of-cars"
          target="_blank"
          rel="noopener noreferrer"
        >
          full list of car models
        </a>
        ). Besides classifying cars, CarMe also allows users to browse all
        available cars, search for a specific car by name or model, and save any
        cars to their favorites list. Our hope is that this app would allows the
        users to identify unique/classic cars. Cars that many people do not see
        on a daily basis.
      </span>
    ),
  },
  {
    type: ProjectContentType.heading,
    content: 'Design',
  },
  {
    type: ProjectContentType.subheading,
    subtitle: 'Software Design',
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        The software consists of 3 main components:{' '}
        <strong>PyTorch model, Firebase, and Flutter</strong>.
      </span>
    ),
  },
  {
    type: ProjectContentType.text,
    multipleHtmlContent: [
      <span>
        We used <strong>Flutter</strong> to build the front end of the mobile
        app which allows users to take a picture of a car and display the
        prediction by running it through the Pytorch model. This app is what the
        users will use to iteract with our model.
      </span>,
      <span>
        We used <strong>Firebase</strong> for the backend of the app.
        Specifically, we used Firebase Authentication to support user sign-up,
        sign-in, and sign-out. In addition we made use of Firebase Cloud
        Firestore to store car related information such as images of the car,
        max speed of the car, etc. We also used Firestore to store information
        about user's favorite cars so they have that information readily
        available for them on their dashboard.
      </span>,
      <span>
        Finally, the <strong>PyTorch model</strong> is the core of the entire
        software. It is responsible for classification of the taken image and
        providing the prediction to flutter and firebase to then get information
        about the car.
      </span>,
    ],
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>The following diagram shows the data flow in the software:</span>
    ),
  },
  {
    type: ProjectContentType.image,
    imageData: {
      image: 'assets/projects/car-detection/data-flow.png',
      height: '15rem',
    },
  },
  {
    type: ProjectContentType.subheading,
    subtitle: 'User Interface (UI) Design',
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        At a granular level, the user interacts with the app through the use of
        the camera. Once, the user is loaded into the app they will be greeted
        to the camera page which is also the main page of the app (
        <i>shown below</i>).
      </span>
    ),
  },
  {
    type: ProjectContentType.image,
    imageData: {
      image: '../../images/car-detection-app/ui/one.png',
      height: '30rem',
      backgroundColor: 'transparent',
      showPadding: true,
    },
  },
  {
    type: ProjectContentType.text,
    multipleHtmlContent: [
      <span>
        Once, on this screen the user has the following options they can either
        click on the big white button to take a picture and have the ML model
        classify the image on the screen or navigate to the other pages using
        the navigation bar on the bottom.
      </span>,
      <span>
        If they choose to click the white button, the app within a few seconds
        will take a picture using the device's camera and then go into the
        loading screen (<i>shown below</i>) to wait for the model to provide the
        prediction on the taken image.
      </span>,
    ],
  },
  {
    type: ProjectContentType.image,
    imageData: {
      image: '../../images/car-detection-app/ui/two.png',
      height: '30rem',
      backgroundColor: 'transparent',
      showPadding: true,
    },
  },

  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        Once, the model provides the prediction to the app the user will be
        greeted with the following screen.
      </span>
    ),
  },
  {
    type: ProjectContentType.image,
    imageData: {
      image: '../../images/car-detection-app/ui/three.png',
      height: '30rem',
      backgroundColor: 'transparent',
      showPadding: true,
    },
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        Here, the user can see the prediction of the model on the bottom in the
        slide up drawer. To view more information about the predicted car class
        the user can slide up on the drawer and see more detailed information
        about the car (<i>shown below</i>). Here the user is free to scroll down
        and read more about the predicted car class.
      </span>
    ),
  },
  {
    type: ProjectContentType.image,
    imageData: {
      images: ['../../images/car-detection-app/ui/four.png'],
      height: '30rem',
      backgroundColor: 'transparent',
      showPadding: true,
    },
  },
  {
    type: ProjectContentType.text,
    multipleHtmlContent: [
      <span>
        Once, the user is done scrolling they can slide down on the drawer from
        the top to go back to the screen from before. And slide down again on
        the drawer to go back to the camera for classifying another picture.
      </span>,
      <span>
        Now, if the user selected to go the <code>account</code> option from the
        navigation bar they will be greeted with <code>Sign In</code> page (
        <i>shown below</i>). If the user does not have an account they can click
        on the blue <code>Sign Up</code> button on the bottom of the page and
        have themselves be taken to the sign up page (<i>also shown below</i>).
      </span>,
    ],
  },
  {
    type: ProjectContentType.image,
    imageData: {
      images: [
        '../../images/car-detection-app/ui/five.png',
        '../../images/car-detection-app/ui/six.png',
      ],
      height: '30rem',
      backgroundColor: 'transparent',
      showPadding: true,
    },
  },

  {
    type: ProjectContentType.text,
    multipleHtmlContent: [
      <span>
        Once, the user creates an account or logins in with their existing
        account they will be greeted with the main user dashboard. Here they can
        choose to sign out using the button on the top right corner or explore
        their favorite/saved cars by clicking on the individual item in the
        list.
      </span>,
      <span>
        Clicking on the <code>Sign Out</code> button will take them back to the
        login page from before. And if they click on one of the saved cars from
        the list, it will open a new page where they will be able to get
        detailed information about the car they just selected.
      </span>,
    ],
  },
  {
    type: ProjectContentType.image,
    imageData: {
      images: [
        '../../images/car-detection-app/ui/seven.png',
        '../../images/car-detection-app/ui/eight.png',
      ],
      height: '30rem',
      backgroundColor: 'transparent',
      showPadding: true,
    },
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        Last but not least the user can select to go to the search page from the
        navigation bar (<i>shown below</i>).
      </span>
    ),
  },
  {
    type: ProjectContentType.image,
    imageData: {
      images: ['../../images/car-detection-app/ui/nine.png'],
      height: '30rem',
      backgroundColor: 'transparent',
      showPadding: true,
    },
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        Here, they are free to browse the different car classes the current
        model can predict or use the search bar to search for a specific car
        using keywords as (<i>shown below</i>).
      </span>
    ),
  },
  {
    type: ProjectContentType.image,
    imageData: {
      images: ['../../images/car-detection-app/ui/ten.png'],
      height: '30rem',
      backgroundColor: 'transparent',
      showPadding: true,
    },
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        If they choose to view more detailed information about a car they can
        click on the car tile and be taken to the details page shown below. Here
        the user can scroll down to view more information or click on the arrow
        at the top left hand corner to go back to the search page..
      </span>
    ),
  },
  {
    type: ProjectContentType.image,
    imageData: {
      images: ['../../images/car-detection-app/ui/eleven.png'],
      height: '30rem',
      backgroundColor: 'transparent',
      showPadding: true,
      caption: 'If the heart is filled it means it is saved else it is not',
    },
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        There you go, now you have a good understanding of how to use the app
        and how a user interacts with the app.
      </span>
    ),
  },

  /**
   * ADD HERE
   */

  {
    type: ProjectContentType.heading,
    content: 'What We Learned',
  },
  {
    type: ProjectContentType.text,
    multipleHtmlContent: [
      <span>
        One of the biggest things we learned was about the software development
        cycle (agile). This was the first real-world project without constraints
        provided by the professor, so being on task was critical to finishing
        the project. Hence, we as a team worked like how we would if this was a
        real project in a company and we enacted the agile life cycle model with
        weekly meetings and daily updates.
      </span>,
      <span>
        Another lesson we have learned is to understand how to debug.
        Considering this project was something all of us experienced for the
        first time, we naturally ran into a lot of bugs which we did not
        understand. And so, one of the things we picked upon is how to debug
        properly and look for clues that can help lead to the solutions by
        understanding the errors and behavior of the code.
      </span>,
      <span>
        Lastly, we have learned how to work with a machine learning models and a
        mobile application. In this project, we made use of a database and a
        machine learning model along with a mobile application which is
        something we as a team have not experienced in the past. So this was an
        entirely new experience for all of us. In the beginning it was hard but
        over time we all got used to it and we think right now we all have a
        really good fundamental grasp of how to build software's that has an ML
        component as part of it.
      </span>,
    ],
  },
  {
    type: ProjectContentType.heading,
    content: 'Challenges Faced',
  },
  {
    type: ProjectContentType.subheading,
    subtitle: 'Identifying Good Performance Metrics',
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        One key challenge we faced was to come up with a good performance
        metric. This required us to obtain a representative testing dataset.
        Since the image that the machine learning model classifies is taken by
        the user in real-time, we needed a testing dataset of real car images
        that the users might take. In order to obtain such a meaningful testing
        dataset, we used our phones to take images of cars that we see on the
        streets at different angles. In addition, we made use a search engine
        and downloaded some images to obtained a representative testing dataset
        of 300 car images. Once, we found the images, we labelled them in
        specific fashion to understand how the model performed on the specific
        types of a images. Such as, one with the car really far, or only the
        front side of the car being shown. These things were meant to help us
        understand what needed to be fixed and in which areas the model lagged
        behind.
      </span>
    ),
  },
  {
    type: ProjectContentType.subheading,
    subtitle: 'Increasing model accuracy',
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <span>
        Another challenge we faced was trying to increase the accuracy of our
        image classification models. It was difficult to figure out which
        approach would help increase the accuracy of the model so we ended up
        trying many different experiments to see which one would produce the
        best accuracy.
      </span>
    ),
  },
  {
    type: ProjectContentType.subheading,
    subtitle: 'Embedding the ML model to the flutter app',
  },
  {
    type: ProjectContentType.text,
    multipleHtmlContent: [
      <span>
        During the initial stages of the project, our plan was to host the
        PyTorch model on <i>Firebase Machine Learning</i> a service provided by
        <i>Firebase</i>. But, we soon realized this was not going to be
        possible. For one, <i>Firebase Machine Learning</i> does not support a
        PyTorch model, it only support TensorFlow model. Our work around for
        this was to use{' '}
        <a href="https://onnx.ai/" target="_blank" rel="noopener noreferrer">
          ONNX
        </a>
        , which is an open source file format built to represent machine
        learning models. With the use of ONNX we can then convert the PyTorch
        model into a TensorFlow model. The code is provided{' '}
        <a
          href="https://colab.research.google.com/drive/1BNok28YCY5ar8PCHUBGIrVzS1QS3vTDo"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>{' '}
        if you wish to use it. Unfortunately even though we solved that problem
        we could not figure out to properly use Firebase Machine Learning. There
        was not a lot of documentation or answers to bugs we were running into.
        Hence, we need to a new strategy and pivot.
      </span>,
      <span>
        Our new strategy was to directly embed the model into the flutter app
        using the <code>tflite: ^1.1.2</code> flutter package (found{' '}
        <a
          href="https://pub.dev/packages/tflite"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        ). But this also had a flaw. Using the <code>tflite</code> flutter
        package meant that we can no longer resize the images to our
        specification, and normalize the image using mean and standard
        deviation. To do this we wrote a function which applied the resizing and
        normalized the image. But the main problem was that flutter reads image
        data as <code>INT</code> instead of <code>FLOAT</code> which is what we
        want it to be. We want FLOAT because our original model was trained to
        accept images to have
        <code>FLOAT</code> values for the image data. If we suddenly change it
        to <code>INT</code> we will lose valuable information and the model
        might not be able to classify correctly.
      </span>,
      <span>
        Our solution was to use the <code>pytorch_mobile</code> flutter package
        (found{' '}
        <a
          href="https://pub.dev/packages/pytorch_mobile"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        ) and use the original PyTorch model without ONNX conversion. This
        worked out great and had everything we were looking for. The only thing
        was we needed to save the model using <code>.jit.trace</code>.
      </span>,
    ],
  },
  {
    type: ProjectContentType.heading,
    content: 'Future Work',
  },
  {
    type: ProjectContentType.text,
    multipleHtmlContent: [
      <span>
        In terms of app design we think the app is in a very good place. We
        think the UI and UX in its current stage to very clean and intuitive.
        The other work that needs to be completed is seperated in three sections
        App Development, Machine Learning Improvement, and Testing.
      </span>,
      <span>
        In terms of usability we will need to fix the fact the app is currently
        only working on Android. We will need to ensure it also works fine on an
        iPhone as that is a large target demographic.
      </span>,
    ],
  },
  {
    type: ProjectContentType.subheading,
    subtitle: 'App Development',
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <ol>
        <li>
          In term of usability, the app is only working on android devices. We
          would need the app working on iOS which in its current stage is not
          working due to some permission issues with the camera. So, this would
          require debugging but also changing a bit of the codebase to adhere to
          apple's strict privacy standards.
        </li>
        <li>
          Another thing we will need to do before developing this into a
          consumer grade product is fixing the camera issue. Currently, the app
          crashes after taking around 20 pictures at the same time. This would
          need to be fixed in the long run for a fully-usable product as to not
          mess with the usability.
        </li>
        <li>
          Sometimes users will try to classify a car model that is not in our
          database. We can add a new feature to let users upload car images for
          these car. After we collect a good amount of images for these car
          models, we can then add new classes to our model.
        </li>
      </ol>
    ),
  },
  {
    type: ProjectContentType.subheading,
    subtitle: 'Machine Learning Improvement',
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <ol>
        <li>
          Adding the machine learning model directly into the app currently has
          a strain on the storage as the model most of the time has a file size
          of around 150-200MB. This causes the overall app size to be around
          400MB most of time. To reduce the app size for the future we could try
          to move the model into a server (API) for easy use. This would also
          mean that we can deploy a newer model quickly without the need for
          each user updating the app for a newer model.
        </li>
        <li>
          Next, for the full-scale final product we could consider modifying the
          model to learn from its mistakes (reinforcement learning). This would
          essentially work with the help of the user who would identify the
          misclassifications and help with the re-training of the model to
          prevent such misclassifications in the future. This could be done in
          the beta stage of the app.
        </li>
        <li>
          We also need to add more classes to our model. Even though adding more
          classes will hurt the performance of our model as we tested. 23 is not
          enough for a consumer-grade product. It is good if we can increase the
          number to 100 or higher.
        </li>
        <li>
          Finally, although this is a long shot, we could try a different
          approach to classification. Instead of training one model we can train
          multiple models for each of car type (sedan, hatchback, pickup, etc).
          Finally, we can have a new model which will categorize what car type
          the car in the image falls under and then depending on that we will
          call the appropriate model for classification. This could potentially
          provide better accuracy. In fact, for this approach we are not limited
          to the car type, we can try to separate the models by the car brand
          (Ferrari, BMW, etc) as well to see how that does.
        </li>
      </ol>
    ),
  },
  {
    type: ProjectContentType.subheading,
    subtitle: 'Testing',
  },
  {
    type: ProjectContentType.text,
    htmlContent: (
      <ol>
        <li>
          One thing we need to do before developing this into a consumer-grade
          product in terms of testing is to run more tests on the ML model and
          also experiment with different training datasets. We saw that
          splitting the original training dataset into a left and right piece
          increased the accuracy significant over +10%. So, who is to say that
          it is not possible to push it further. Hence, we need to perform more
          testing to see what could be achieved.
        </li>
        <li>
          Another thing we could do in terms of testing is to analyze what the
          best model we trained learned by looking at the visualization of
          weights in the convolutional layer after training. We tried to do this
          but failed to get it to work. But with more time, spending some time
          looking at the visualization will get help us better understand how
          the model learns and where it needs improvement.
        </li>
      </ol>
    ),
  },
  {
    type: ProjectContentType.footer,
    content:
      'This project is the combined effort of Nishanth Prajith, Yue Qian, Kareem Elsheikh, and Xiaohu Zheng.',
    links: [
      {
        text: 'DVM Dataset',
        link: 'https://deepvisualmarketing.github.io/',
      },
      {
        text: 'Car Connection Picture Dataset',
        link: 'https://www.kaggle.com/datasets/prondeau/the-car-connection-picture-dataset',
      },
      {
        text: 'Google Images Downloader',
        link: 'https://github.com/Joeclinton1/google-images-download',
      },
      {
        text: 'Ensemble Learning Article',
        link: 'https://medium.com/@alexppppp/how-to-train-an-ensemble-of-convolutional-neural-networks-for-image-classification-8fc69b087d3',
      },
    ],
  },
];

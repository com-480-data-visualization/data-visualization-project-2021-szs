# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
| Zhenyu Zhu| 307416 |
| Yueqing Shen| 312676 |
| Jingran Su| 322797 |

[Milestone 1](#milestone-1) • [Milestone 2](#milestone-2) • [Milestone 3](#milestone-3)

## Milestone 1 (23rd April, 5pm)

**10% of the final grade**

This is a preliminary milestone to let you set up goals for your final project and assess the feasibility of your ideas.
Please, fill the following sections about your project.

*(max. 2000 characters per section)*

### Dataset

The dataset is *European Soccer Database* which is extracted from the [kaggle](https://www.kaggle.com/hugomathien/soccer) and contains data of players, matches and detailed match events such as goal types, possession for over 10k matches from season 2008 to season 2016. 

The data includes approximately 26.0k entries corresponding to the detailed information of each soccer event of European Professional Football ranging from season 2008 to 2016. Subsets we extracted from the datasets are **"match"** including **country, league, season, stage, date, the name and attributed ID of home team and away team, the home team goal** and **"player"** including **name, birthday, weight, height, FIFA score and preferred foot** . 

The dataset is clean and ready for data exploration and results visulization.

### Problematic

For contemporary football fans, the data about soccer matches are at their fingertips thanks to the high-speed internet. However, the data are usually scattered across different websites. Thus, in this project, our purpose is to develop a clear and comprehensive platform for soccer fans to discover the historical events and information of their interest interactively. 

Generally speaking, the platform will begin with a geographic distribution of soccer games arranged in a historical occurrence order, providing the users with an "aerial" view of the European soccer events. By selecting a certain team in a certain country and year, the detailed information of the team, league and goal will be presented, along with visualized data analysis result to facilitate users with an insightful perspective into the data themselves. 

Hence, since our intention is to provide a integral platform for users to check the soccer matches conveniently, we will go through the following aspects:

* **numbers of participating teams of different countries along time.**
* **the scores achieved by a team and a country every year.**
* **Based on the historical data, how competitve is a team? ** 
This long-running question is critical for the prediction of the success of a team in the next season. To solve this question, we can extract and present the teams and the score information along different seasons to facilitate the evaluation of competitiveness and the prediction of "win or lose" of a certain team.  Moreover, we can also investigate the competiiveness from the perspective of team player by evaluating their height, weight, age and other characteristics along with the rating scores.

* **Our platform will also allow users to explore data from a more interesting perspective. For instance:**
  * Which team is the one with the most goals in a single season?
  * Which team is the one with the most consecutive championships?
  * Which team is the most progressive one?

### Exploratory Data Analysis

Our data exploratory analysis and visualization are mainly based on the league, team and player point of view, which conclusively provides the following findings. According to our interests and intentions, the variation of data along time has been studied on the three levels.

* **From the historical point of view:**

Changes of data along different seasons can be the reflection of the rise and fall of teams and indication of interesting historical events, thus serving as a vital perspective.
  * From the season 2008/2009 to 2015/2016, the number of matches and total participating teams remains roughly constant over time, and the average is 3247 and 185 respectively.
  * In leagues, the proportion of the number of teams participating in the season to the total number of teams is basically between 55-70%. And this statistic remains roughly unchanged over time. The proportion reaches its highest value in the case of Belgium Jupiler League in season 2008/2009, which is 75%. Interestingly, it drops dramatically in season 2013/2014 due to missing data, which is merely 16.7%, and returns to normal in the next two seasons.
  * 92 teams participated in all the seasons, and 51 teams participated only once, accounting for 31% and 17% of all teams respectively. Besides, the number of teams participating twice to seven times is similar, accounting for 8.6% of all teams in average.

* **From the team point of view:**

Since goals and ranking of a team is of great concern by soccer fans, such team-oriented information will also be a key focus in this project.
  * Juventus from Italy Serie A got 102 points in season 2013/2014, the highest points in history. And the teams which obtained the top five low points in history are all from Belgium Jupiler League.
  * Celtic and FC Barcelona are the only two teams that enter the top 10 points every season. FC Barcelona is the team that won the most champions, which is four times in eight seasons. 
  * FC Barcelona, Real Madrid CF and Celtic are the top 3 high average points teams.
  * The best new team in history is Manchester United. It won 90 points when first participating in the 2008/2009 season.
  * There are 34 teams with the largest number of matches, which is 304. While the smallest number of matches is 30, obtained by 6 teams.
  * The team is more likely to win as a home team rather than an away team, with more average team goals in the match.

* **From the player point of view:**

Other than the two previous points of view, data of players, such as weight, height, age and even the preferred foot will also be studied in the project to fulfill the curiosity of those who are interested.
  * For all players, the average height is 181.87cm and average weight 168.38g. The average age in their participating seasons is about 25 and remains almost the same over time.
  * About 75.7% of the players prefer to play with the right foot and 23.5% play with the right one.
  * Lionel Messi has the highest overall rating , which is 94, and has kept it for four seasons.

### Related work

Since the European Professional Football has always been a hit topic throughout the world, there are already some good examples using the European Professional Football data:
* A project named [Analyze Games from European Soccer Leagues with Apache Spark and Databricks](https://databricks.com/blog/2018/07/09/analyze-games-from-european-soccer-leagues-with-apache-spark-and-databricks.html) demonstrated how to apply data engineering, data analysis, and machine learning in the analysis of European Soccer dataset. However, though this project can enlighten many downstream works, it is more or less a preliminary instruction instead of a solid analysis.

Moreover, there are also some good projects that can serve as our inspirations towards further work:
* [A Beautiful Game](https://dhvanil.com/football) focused on visualizing the data of over 20,000 football players from around the world and used scatterplot to visualize the bornplace and the number of players in this place (proportional to the size of the spot), which can also be utilized in our project to demonstrate the score achieved in each team or country. 
* The [Players rating change with time](https://www.kaggle.com/ahmedomareissa/players-rating-change-with-age) project provides us with other insights in the relationship between time and player rating, which is also an interesting topic to be studied.

### Optional work

For those who are superfans of some famous players and are concerned about how the lineup of players affect the game results, we can extract the information of players from the original dataset to rank and evaluate. The weight, height, age and goals of a player can be taken into consideration to give a "competitiveness" scores. Users can enjoy more interactions by choosing and matching players into groups to have "virtual competition" and get a prediction of the results of the game.


## Milestone 2 (7th May, 5pm)

**10% of the final grade**

[milestone2.pdf](https://github.com/com-480-data-visualization/data-visualization-project-2021-szs/blob/master/milestone2.pdf)

## Milestone 3 (4th June, 5pm)

**80% of the final grade**

Our final web page of viz is [here](https://com-480-data-visualization.github.io/data-visualization-project-2021-szs/website/main.html).

The video [here](https://youtu.be/efkHqvy8f4Q) demonstrates how the visualization works.

The process book can be found [here](https://github.com/com-480-data-visualization/data-visualization-project-2021-szs/blob/master/process-book-SZS.pdf).

Our github folders are structured as follows:
```
data-visualization-project-2021-szs
│
└───old_data
│   └── csv
|   └── geojson  -json file of countries
│   └── pictures  -decoration pictures of viz
│   
└───EDA.ipynb  -data exploratory
│
└───README.md
│
└───index.html  -html file that redirects to the visualization
│
└───milestone2.pdf
│
└───process-book-SZS.pdf
│
└───website  -viz folder
│   └── data  -contain csv folder and geojson files
|   └── images  -player, team images and decoration pictures
│   └── map.css
│   └── eu.js
│   └── table.js
│   └── country.js
│   └── year.js
│   └── team.js
│   └── utils.js
│   └── main.html  -html file of viz
```
The main folders are described in details below:
  * ```old_data/```: directory containing the data used to perform the data exploration and later to extract the data used in the website.
  * ```EDA.ipynb```: data exploration of our dataset.
  * ```website/```: directory containing all the files used to build the visaulization. Inside, you can find several folders used to store images or statistical information, such as ```data/``` and ```images/``` used in the visualization. The html is stored in ```main.html```, the style is defined in ```map.css``` and all the main visualizations and interactions (javascript files) are divided in different files according to the different sections in the website: ```eu.js```, ```country.js```, ```table.js```, ```team.js```, ```utils.js``` and ```year.js```.
  * ```index.html```: html file that redirects to the visualization (to ```website/map.html```).
 
## Late policy

- < 24h: 80% of the grade for the milestone
- < 48h: 70% of the grade for the milestone


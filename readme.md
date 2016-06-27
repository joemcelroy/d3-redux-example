getting started
  - npm install (im using npm 3, may not install properly on older versions)
  - npm start ( runs test suite too )
  - visit index.html
  - select a stock on top left
  - filter using the time range inputs ( one day data window )

features
  - shows a price history for a particular stock
  - can refine the data window to a particular time in the day
  - shows volume in each segment

left to do
  features
    - moving average - sometimes missing data on segments of time and therefore
     not able to visualise a point / bar. Moving average algorithm will help this issue
    - ability to add to criteria (filter by exchanges, accounts)
    - highlight buying vs selling volume within bars
    - stats on volume, low, high
    - tooltip for each segment on trading high, low, volume etc
    - xAxis, yAxis

  code
    - more test coverage
    - basic unit tests for components asserting markup with different states
    - split out d3 graph component to being more reusuable / focused
    - use redux-mock-store for wider scope of actions -> state change

Improve on
  - using techan.js / d3fc to utilize their financial centric graphs

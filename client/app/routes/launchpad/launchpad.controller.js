/**
 * Created by Flavor on 1/6/16.
 */
app.controller('LaunchpadCtrl', function ($scope, $state, $timeout) {

  $scope.menu = [];

  $scope.menu = [
    {
      title: 'Time Sheet',
      icon: 'fa fa-clock-o',
      color: '#FF7857',
      url: 'timesheet'
    },
    {
      title: 'Pay',
      icon: 'fa fa-dollar',
      color: '#7ACBEE',
      url: 'main'
    },
    {
      title: 'Customers',
      icon: 'fa fa-heart',
      color: '#927DC0',
      url: 'customers'
    },
    {
      title: 'University',
      icon: 'fa fa-graduation-cap',
      color: '#A3C86D',
      url: 'university'
    },
    {
      title: 'Teammates',
      icon: 'fa fa-users',
      color: '#FDD761',
      url: 'teammates'
    }
  ];

  $scope.goToState = function (state) {
    $state.go(state);
  };

  $scope.tiles = [
    {
      "icon": "fa fa-rocket",
      "img": null,
      "title": "Launchpad",
      "background": "green",
      "state": 'tab.notifications',
      "span":
      {
        "row": 1,
        "col": 1
      }
    },
    {
      "icon": "fa fa-gear",
      "img": null,
      "title": "Solar Works",
      "background": "red",
      "state": 'solarWorks',
      "span":
      {
        "row": 1,
        "col": 1
      }
    },

    {
      "icon": "fa fa-sun-o",
      "img": null,
      "title": "Workday",
      "background": "yellow",
      "state": 'workday',
      "span":
      {
        "row": 1,
        "col": 1
      }
    },
    {
      "icon": "fa fa-video-camera",
      "img": null,
      "title": "ZOOM",
      "background": "blue",
      "state": 'zoom',
      "span":
      {
        "row": 1,
        "col": 1
      }
    },
    {
      "icon": "fa fa-bar-chart",
      "img": null,
      "title": "Zipline",
      "background": "green",
      "state": 'zipline',
      "span":
      {
        "row": 1,
        "col": 1
      }
    },
    {
      "icon": "fa fa-ticket",
      "img": null,
      "title": "JIRA",
      "background": "purple",
      "state": 'jira',
      "span":
      {
        "row": 1,
        "col": 1
      }
    },
    {
      "icon": null,
      "img": 'assets/images/scarlett-johansson.png',
      "title": "Scarlett Johansson Goes Solar",
      "background": "blue",
      "state": 'featureOne',
      "span":
      {
        "row": 1,
        "col": 2
      }
    },


    {
      "icon": "fa fa-graduation-cap",
      "img": null,
      "title": "Solar University",
      "background": "red",
      "span":
      {
        "row": 1,
        "col": 1
      }
    },
    {
      "icon": "fa fa-desktop",
      "img": null,
      "title": "IT Support",
      "background": "blue",
      "span":
      {
        "row": 1,
        "col": 1
      }
    },
    {
      "icon": "fa fa-umbrella",
      "img": null,
      "title": "Families Helping Families",
      "background": "purple",
      "span":
      {
        "row": 1,
        "col": 1
      }
    },
    {
      "icon": "fa fa-credit-card-alt",
      "img": null,
      "title": "Expense Reporting",
      "background": "green",
      "span":
      {
        "row": 1,
        "col": 1
      }
    },

    {
      "icon": null,
      "img": 'assets/images/shopping.png',
      "title": "Company Store",
      "background": "gray",
      "span":
      {
        "row": 2,
        "col": 2
      }
    },
    {
      "icon": "fa fa-users",
      "img": null,
      "title": "Team Fusion",
      "background": "pink",
      "span":
      {
        "row": 1,
        "col": 1
      }
    },

    {
      "icon": "fa fa-thumbs-o-up",
      "img": null,
      "title": "Customer Referral",
      "background": "blue",
      "span":
      {
        "row": 1,
        "col": 1
      }
    },
    {
      "icon": "fa fa-star",
      "img": null,
      "title": "Solar Ambassador",
      "background": "green",
      "span":
      {
        "row": 1,
        "col": 1
      }
    },
    {
      "icon": "fa fa-medkit",
      "img": null,
      "title": "Health & Safety",
      "background": "red",
      "span":
      {
        "row": 1,
        "col": 1
      }
    },



    {
      "icon": null,
      "img": 'assets/images/news.jpg',
      "title": "SolarCity and Direct Energy Help Johns Hopkins Medicine Go Solar",
      "background": "blue",
      "span":
      {
        "row": 2,
        "col": 2
      }
    },

    {
      "icon": "fa fa-money",
      "img": null,
      "title": "Solar Bonds",
      "background": "blue",
      "span":
      {
        "row": 1,
        "col": 1
      }
    },




    {
      "icon": "fa fa-globe",
      "img": null,
      "title": "Earth Team",
      "background": "green",
      "span":
      {
        "row": 1,
        "col": 1
      }
    },

    {
      "icon": "fa fa-truck",
      "img": null,
      "title": "WARP",
      "background": "yellow",
      "span":
      {
        "row": 1,
        "col": 1
      }
    },
    {
      "icon": "fa fa-users",
      "img": null,
      "title": "Sharepoint",
      "background": "red",
      "span":
      {
        "row": 1,
        "col": 1
      }
    },

  ];


});

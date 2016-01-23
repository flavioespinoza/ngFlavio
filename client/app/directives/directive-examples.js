!function () {
  angular.module("angularytics", []).provider("Angularytics", function () {
    var e = ["Google"];
    this.setEventHandlers = function (a) {
      angular.isString(a) && (a = [a]), e = [], angular.forEach(a,
        function (a) {
          e.push(t(a))
        })
    };
    var t = function (e) {
        return e.charAt(0).toUpperCase() + e.substring(1)
      },
      a = "$locationChangeSuccess";
    this.setPageChangeEvent = function (e) {
      a = e
    }, this.$get = ["$injector", "$rootScope", "$location",
      function (t, n, o) {
        var i = [];
        angular.forEach(e, function (e) {
          i.push(t.get("Angularytics" + e + "Handler"))
        });
        var l = function (e) {
            angular.forEach(i, function (t) {
              e(t)
            })
          },
          s = {};
        return s.init = function () {
        }, s.trackEvent = function (e, t, a, n,
                                    o) {
          l(function (i) {
            e && t && i.trackEvent(e, t, a, n, o)
          })
        }, s.trackPageView = function (e) {
          l(function (t) {
            e && t.trackPageView(e)
          })
        }, n.$on(a, function () {
          s.trackPageView(o.url())
        }), s
      }
    ]
  })
}(),
  function () {
    angular.module("angularytics").factory("AngularyticsConsoleHandler", ["$log",
      function (e) {
        var t = {};
        return t.trackPageView = function (t) {
          e.log("URL visited", t)
        }, t.trackEvent = function (t, a, n, o, i) {
          e.log("Event tracked", t, a, n, o, i)
        }, t
      }
    ])
  }(),
  function () {
    angular.module("angularytics").factory("AngularyticsGoogleHandler", ["$log",
      function (e) {
        var t = {};
        return t.trackPageView = function (e) {
          _gaq.push(["_set", "page", e]), _gaq.push(["_trackPageview", e])
        }, t.trackEvent = function (e, t, a, n, o) {
          _gaq.push(["_trackEvent", e, t, a, n, o])
        }, t
      }
    ]).factory("AngularyticsGoogleUniversalHandler", function () {
      var e = {};
      return e.trackPageView = function (e) {
        ga("set", "page", e), ga("send", "pageview", e)
      }, e.trackEvent = function (e, t, a, n, o) {
        ga("send", "event", e, t, a, n,
          {
            nonInteraction: o
          })
      }, e
    })
  }(),
  function () {
    angular.module("angularytics").filter("trackEvent", ["Angularytics",
      function (e) {
        return function (t, a, n, o, i, l) {
          return e.trackEvent(a, n, o, i, l), t
        }
      }
    ])
  }();

var AccordionSideNav = angular.module("accordionSideNav", ["angularytics", "ngMessages", "ngMaterial"]);


AccordionSideNav.config(["AngularyticsProvider",
  function (e) {
    e.setEventHandlers(["Console", "GoogleUniversal"])
  }
]).run(["Angularytics",
  function (e) {
    e.init()
  }
]);

AccordionSideNav.service("userDefinedMenu", function () {

  var sectionsArray = [
    {
      name: 'Launchpad',
      type: 'toggle',
      active: false,
      pages: [
        {
          label: "Notifications",
          url: "lp/notifications"
        },
        {
          label: "Time Sheet",
          url: "lp/time-sheet"
        }
      ]
    },
    {
      name: 'Some Cool Page',
      type: 'toggle',
      active: false,
      pages: [
        {
          label: "Cool 1",
          url: "lp/notifications"
        },
        {
          label: "Cool 2",
          url: "lp/time-sheet"
        }
      ]
    },
    {
      name: 'Flavio Is Awesome',
      type: 'toggle',
      active: false,
      pages: [
        {
          label: "Awesome 1",
          url: "lp/notifications"
        },
        {
          label: "Awesome 2",
          url: "lp/time-sheet"
        }
      ]
    }
  ];

  var g = {};

  return {
    sections: sectionsArray,
    toggleSelectSection: function (e) {
      g.openedSection = g.openedSection === e ? null : e
    },
    isSectionSelected: function (section) {
      return g.openedSection === section
    },
    selectPage: function (e, t) {
      g.currentSection = e, g.currentPage = t
    },
    isPageSelected: function (e) {
      return g.currentPage === e
    }
  }

});


/** Menu Directives, HTML Templates & Filters **/
AccordionSideNav.directive("menuLink", function () {
  return {
    scope: {
      section: "="
    },
    templateUrl: "partials/menu-link.tmpl.html",
    link: function (e, t, attrs) {
      var a = t.parent().controller();
      e.isSelected = function () {
        return a.isSelected(e.section)
      }, e.focusSection = function () {
        //a.autoFocusContent = !0
      }
    }
  }
});

AccordionSideNav.directive("menuToggle", ["$timeout",
  function (e) {
    return {
      scope: {
        section: "="
      },
      templateUrl: "partials/menu-toggle.tmpl.html",
      link: function (t, a) {
        var n = a.parent().controller();
        t.isOpen = function () {
          return n.isOpen(t.section)
        }, t.toggle = function () {
          n.toggleOpen(t.section)
        }, t.$watch(function () {
          return n.isOpen(t.section)
        }, function (t) {
          function n() {
            var e;
            return o.addClass("no-transition"), o.css("height", ""),
              e = o.prop("clientHeight"), o.css("height", 0), o.removeClass(
              "no-transition"), e
          }
          var o = a.find("ul"),
            i = t ? n() : 0;
          e(function () {
            o.css(
              {
                height: i + "px"
              })
          }, 0, !1)
        });
        var o = a[0].parentNode.parentNode.parentNode;
        if (o.classList.contains("parent-list-item")) {
          var i = o.querySelector("h2");
          a[0].firstChild.setAttribute("aria-describedby", i.id)
        }
      }
    }
  }
]);

AccordionSideNav.controller("NavItemsCtrl", ["$scope", "$mdSidenav", "$timeout", "$mdDialog", "userDefinedMenu", "$location", "$rootScope", function (e, n, o, i, userDefinedMenu, s, r) {
  function m() {
    o(function () {
      n("left").close()
    })
  }

  function d() {
    o(function () {
      n("left").open()
    })
  }

  function c() {
    return s.path()
  }

  function p(e) {
    userDefinedMenu.selectPage(null, null),
      s.path("/")
  }

  function u() {
    e.closeMenu(),
    v.autoFocusContent && (h(),
      v.autoFocusContent = !1)
  }

  function h(e) {
    e && e.preventDefault(),
      o(function () {
        //x.focus()
      }, 90)
  }

  function g(e) {
    return userDefinedMenu.isPageSelected(e)
  }

  function b(e) {
    var t = !1
      , a = userDefinedMenu.openedSection;
    return a === e ? t = !0 : e.children && e.children.forEach(function (e) {
      e === a && (t = !0)
    }),
      t
  }

  function f(e) {
    return userDefinedMenu.isSectionSelected(e)
  }

  function y(e) {
    userDefinedMenu.toggleSelectSection(e)
  }

  var v = this;
    e.menu = userDefinedMenu,
    e.path = c,
    e.goHome = p,
    e.openMenu = d,
    e.closeMenu = m,
    e.isSectionSelected = b,
    e.thisYear = (new Date).getFullYear(),
    r.$on("$locationChangeSuccess", u),
    e.focusMainContent = h,
    Object.defineProperty(r, "relatedPage", {
      get: function () {
        return null
      },
      set: angular.noop,
      enumerable: !0,
      configurable: !0
    }),
    r.redirectToUrl = function (e) {
      s.path(e),
        o(function () {
          r.relatedPage = null
        }, 100)
    },
    this.isOpen = f,
    this.isSelected = g,
    this.toggleOpen = y,
    this.autoFocusContent = !1;
  var x = document.querySelector("[role='main']")
}]);

AccordionSideNav.run(["$templateCache",
  function (e) {
    e.put("partials/menu-link.tmpl.html",
      '<md-button\n    ng-class="{\'is-active\' : isSelected()}"\n    ng-href="{{section.url}}"\n    ng-click="focusSection()">\n  {{section | humanizeDoc}}\n  <span class="md-visually-hidden"\n    ng-if="isSelected()">\n    current page\n  </span>\n</md-button>\n'
    )
  }
]);

AccordionSideNav.run(["$templateCache",
  function (e) {
    e.put("partials/menu-toggle.tmpl.html",
      '<md-button class="md-button-toggle"\n ng-class="{\'section-toggled\' : isOpen()}"\n  ng-click="toggle()"\n  aria-controls="docs-menu-{{section.name | nospace}}"\n  aria-expanded="{{isOpen()}}">\n  <div flex layout="row">\n    {{section.name}}\n    <span flex></span>\n    <span aria-hidden="true" class="md-toggle-icon"\n    ng-class="{\'toggled\' : isOpen()}">\n      <md-icon md-svg-src="md-toggle-arrow"></md-icon>\n    </span>\n  </div>\n  <span class="md-visually-hidden">\n    Toggle {{isOpen()? \'expanded\' : \'collapsed\'}}\n  </span>\n</md-button>\n\n<ul id="docs-menu-{{section.name | nospace}}" class="menu-toggle-list">\n  <li ng-repeat="page in section.pages">\n    <menu-link section="page"></menu-link>\n  </li>\n</ul>\n'
    )
  }
]);




AccordionSideNav.filter("nospace", function () {
  return function (e) {
    return e ? e.replace(/ /g, "") : ""
  }
});

AccordionSideNav.filter("humanizeDoc", function () {
  return function (e) {
    return e ? "directive" === e.type ? e.name.replace(/([A-Z])/g,
      function (e) {
        return "-" + e.toLowerCase()
      }) : e.label || e.name : void 0
  }
});

AccordionSideNav.filter("directiveBrackets", function () {
  return function (e) {
    return e.indexOf("-") > -1 ? "<" + e + ">" : e
  }
});





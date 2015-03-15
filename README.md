# Test Flow
JSON Test File Format for executing asynchronous tests.

# Test File

sample.test.js

    {
        "label": "Sample Test",
        "configure": {
                "ignore-ajax": "regex path to ignore"
            },
        "steps":[
          [ "configure", { "ignore-ajax": "regex paths to ignore" } ],
          [ "navigate", "http://google.com" ],
          [ "wait-till", "till js expression returns true", "timeout-default-60s (1 min)", "sleep 1s default"],
          [ "type", "#query-box", "typesomething"],
          [ "set-value", "#query-box", "set-value"],
          [ "click", "#search-button"],
          [ "assert", "#page-results", { 'value >': 0 } ],
          [ "test", "javascript expression should return true", "error message" ]
        ]
    }

# Multiple Tests

    {
        "label": "Sequential Tests",
        "tests":[
                "test1.test-part.js",
                "test2.test-part.js"
            ]
        ]
    }


# File Format
Test Flow file format is a standard JSON file. The reason we have chosen JSON over any other format is because we want to execute tests in sandboxed environment, even though we want to run through PhantomJS, we do not want to expose any api from Test Runners.

Test Flow is an JSON array of steps. First item in the step identifies command to be executed.



## Configure

    [ "configre", { ... } ]
    
### Ignore AJAX
By default Test Flow halts execution of next test item till current network IO is in progress. However, if you are using long-polling or web-sockets or something to continuously fetch from server, you may want to ignore that request.

A regex or an array of regex to ignore path from automatic waiting

    [ "configre", { "ignore-ajax": "\\.web-socket$" } ]

# Steps
Following steps are included in current version.

## Navigate
First step would be to load some URL. However, you can continue testing multiple URLs in continued session assuming one part of test is done and you want to test next page. Only after page was loaded successfully, next step would be executed.

Example,

    [ "navigate", "http://testflow.io" ]

## Wait-Till
After we load URL or perform any network operation, we need to wait for operation to finish. However, 
Test Flow automatically waits for current network operation to finish, but this is an additional provision.

    [ "wait-till", "till js (expression) returns true", "max-timeout", "interval" ]

### Expression    
JavaScript expression that will be evaluated in the context of page in sandbox, so you do not have any access to any API. Test Flow will not resume till expression returns true.

### Max-Timeout
Once evaluated, expression will be reevaluated for multiple times, till max time-out is achieved, if expression still returns false, an error will be raised and recorded.

Example,

    [ "wait-till", "window.currentScope.isRunning", 60.0, 0.5 ]

## Type
Type simulates typing event for specified text. Please note, enter and escape keys are special keys and there special commands for that.

    [ "type", "css-selector", "text-to-type" ]

Example,

    [ "type", "#username-box", "my-username"],

## Key-Press
Simulates pressing of specified keys. This event will not invoke keypress event, instead, based on the type of key, it will send multiple key strokes. This command can have multiple parameters.

    [ "key-press", "css-selector", "key1", "key2", .... ]

Example,

    [ "key-press", "#login-button", "enter" ]
    [ "key-press", "#username-box", "m", "y", "u", "1" , "enter" ]

## Click
Simulates mouse click, however, it is also tested that the element to be clicked is visible in the view port, otherwise an error is thrown.

Example,

    [ "click", "#search-button"]

## Assert
Finally an assertion check command, which will raise an error specified given error message if expression returns false.

    [ "assert", "javascript expression should return true", "error message" ]

Example,

    [ "assert", "window.$", "jQuery did not load successfully." ]

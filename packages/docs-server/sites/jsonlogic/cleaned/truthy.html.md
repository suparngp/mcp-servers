# Truthy and Falsy
Because JsonLogic rules need to return the same results when executed by different languages, it carries its own specification on what is truthy and what is falsy.
For example, in PHP, empty arrays are falsy, but in JavaScript arrays are always truthy. It turns out having a dead simple way to differentiate an empty array from a non-empty one is really really useful with the `missing` operation, so JsonLogic agrees with PHP—in that case.
Here’s a quick list, backed up by the shared unit tests, of what values should be treated as true and false, especially by the logic operators and the `if` statement.
Value | Comment | As boolean 
---|---|--- 
`0` | | `false` 
`1`, `-1`, etc | any non-zero number | `true` 
`[]` | empty array | `false` 
`[1,2]` | any non-empty array | `true` 
`""` | empty string | `false` 
`"anything"` | any non-empty string | `true` 
`"0"` | string zero | `true` 
`null` | | `false` 
## Testing
Every JsonLogic interpreter exposes a method `truthy` that tells you whether the supplied arg is truthy or falsy within JsonLogic (overriding that language’s conventions when necessary).
In PHP:
```
(bool) "0"
// false
JWadhams\JsonLogic::truthy( "0" );
// true
```
In JavaScript:
```
!! []
// true
jsonLogic.truthy( [] );
// false
```
 * [Home](/)
 * [Supported Operations](/operations.html)
 * [Adding Operations](/add_operation.html)
 * [Play with It](/play.html)
 * [Fizz Buzz](/fizzbuzz.html)
 * [Truthy and Falsy](/truthy.html)
[ Parse JsonLogic in JavaScript ](https://github.com/jwadhams/json-logic-js/) [ Parse JsonLogic in PHP ](https://github.com/jwadhams/json-logic-php/) [ Parse JsonLogic in Python ](https://github.com/nadirizr/json-logic-py) [ Parse JsonLogic in Ruby ](https://github.com/kennethgeerts/json-logic-ruby) [ Parse JsonLogic in Go ](https://github.com/diegoholiveira/jsonlogic) [ Parse JsonLogic in Java ](https://github.com/jamsesso/json-logic-java) [ Parse JsonLogic in .Net ](https://github.com/gregsdennis/json-everything) [ Parse JsonLogic in C++ ](https://github.com/gabrielkim13/json-logic-cpp)
[json-logic](https://github.com/jwadhams/json-logic) is maintained by [Jeremy Wadhams](https://github.com/jwadhams).
Thanks to [Adam Parry](https://thenounproject.com/adamparry/) for the outstanding Vulcan Salute used in the logo, available on [The Noun Project](https://thenounproject.com/search/?q=spock&i=143495).
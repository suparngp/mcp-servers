# Can JsonLogic solve Fizz Buzz?
Although JsonLogic, itself, doesn’t have/need a looping construct, the rule for one integer is:
```
{"if":[{"==":[{"%":[{"var":"i"},15]},0]},"fizzbuzz",{"==":[{"%":[{"var":"i"},3]},0]},"fizz",{"==":[{"%":[{"var":"i"},5]},0]},"buzz",{"var":"i"}]}
```
(14 operators, 190 non-whitespace characters)
Which you’d use like:
```
for(var i=1; i<=30 ; i++){
 console.log(jsonLogic.apply(fizbuzz_rule, {"i":i}));
}
```
An alternative implementation is to use the map operator within your json-logic:
```
{"map":[{"var":"list"},{"if":[{"==":[{"%":[{"var":""},15]},0]},"fizzbuzz",{"==":[{"%":[{"var":""},3]},0]},"fizz",{"==":[{"%":[{"var":""},5]},0]},"buzz",{"var":""}]}]}
```
Which you’d use like:
```
const list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]; 
console.log(jsonLogic.apply(fizbuzz_rule, {"list": list}));
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
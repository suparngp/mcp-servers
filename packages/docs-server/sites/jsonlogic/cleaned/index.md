## Why use JsonLogic?
If you’re looking for a way to share logic between front-end and back-end code, and even store it in a database, JsonLogic might be a fit for you.
JsonLogic isn’t a full programming language. It’s a small, safe way to delegate one decision. You could store a rule in a database to decide later. You could send that rule from back-end to front-end so the decision is made immediately from user input. Because the rule _is_ data, you can even build it dynamically from user actions or GUI input.
JsonLogic has no setters, no loops, no functions or gotos. One rule leads to one decision, with no side effects and deterministic computation time.
## Virtues
 1. **Terse.**
 2. **Consistent.** `{"operator" : ["values" ... ]}` Always.
 3. **Secure.** We never `eval()`. Rules only have read access to data you provide, and no write access to anything.
 4. **Flexible.** Easy to add new operators, easy to build complex structures.
## Examples
### Simple
```
jsonLogic.apply( { "==" : [1, 1] } );
// true
```
This is a simple rule, equivalent to `1 == 1`. A few things about the format:
 1. The operator is always in the “key” position. There is only one key per JsonLogic rule.
 2. The values are typically an array.
 3. Each value can be a string, number, boolean, array (non-associative), or null
### Compound
Here we’re beginning to nest rules.
```
jsonLogic.apply(
 {"and" : [
 { ">" : [3,1] },
 { "<" : [1,3] }
 ] }
);
// true
```
In an infix language (like JavaScript) this could be written as:
```
( (3 > 1) && (1 < 3) )
```
JsonLogic is, effectively, an [abstract syntax tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree), so order of operations is unambiguous.
### Data-Driven
Obviously these rules aren’t very interesting if they can only take static literal data. Typically `jsonLogic` will be called with a rule object and a data object. You can use the `var` operator to get attributes of the data object:
```
jsonLogic.apply(
 { "var" : ["a"] }, // Rule
 { a : 1, b : 2 } // Data
);
// 1
```
If you like, we support [syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar) on unary operators to skip the array around values:
```
jsonLogic.apply(
 { "var" : "a" },
 { a : 1, b : 2 }
);
// 1
```
You can also use the `var` operator to access an array by numeric index:
```
jsonLogic.apply(
 {"var" : 1 },
 [ "apple", "banana", "carrot" ]
);
// "banana"
```
Here’s a complex rule that mixes literals and data. The pie isn’t ready to eat unless it’s cooler than 110 degrees, _and_ filled with apples.
```
var rules = { "and" : [
 {"<" : [ { "var" : "temp" }, 110 ]},
 {"==" : [ { "var" : "pie.filling" }, "apple" ] }
] };
var data = { "temp" : 100, "pie" : { "filling" : "apple" } };
jsonLogic.apply(rules, data);
// true
```
### Always and Never
Sometimes the rule you want to process is “Always” or “Never.” If the first parameter passed to `jsonLogic` is a non-object, non-associative-array, it is returned immediately.
```
//Always
jsonLogic.apply(true, data_will_be_ignored);
// true
//Never
jsonLogic.apply(false, i_wasnt_even_supposed_to_be_here);
// false
```
## What next?
Check out the complete list of [supported operations](/operations.html) or try out your own rules in the [web playground](/play.html).
 * [Home](/)
 * [Supported Operations](/operations.html)
 * [Adding Operations](/add_operation.html)
 * [Play with It](/play.html)
 * [Fizz Buzz](/fizzbuzz.html)
 * [Truthy and Falsy](/truthy.html)
[ Parse JsonLogic in JavaScript ](https://github.com/jwadhams/json-logic-js/) [ Parse JsonLogic in PHP ](https://github.com/jwadhams/json-logic-php/) [ Parse JsonLogic in Python ](https://github.com/nadirizr/json-logic-py) [ Parse JsonLogic in Ruby ](https://github.com/kennethgeerts/json-logic-ruby) [ Parse JsonLogic in Go ](https://github.com/diegoholiveira/jsonlogic) [ Parse JsonLogic in Java ](https://github.com/jamsesso/json-logic-java) [ Parse JsonLogic in .Net ](https://github.com/gregsdennis/json-everything) [ Parse JsonLogic in C++ ](https://github.com/gabrielkim13/json-logic-cpp)
[json-logic](https://github.com/jwadhams/json-logic) is maintained by [Jeremy Wadhams](https://github.com/jwadhams).
Thanks to [Adam Parry](https://thenounproject.com/adamparry/) for the outstanding Vulcan Salute used in the logo, available on [The Noun Project](https://thenounproject.com/search/?q=spock&i=143495).
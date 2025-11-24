* [Accessing Data](#accessing-data)
 * [`var`](#var)
 * [`missing`](#missing)
 * [`missing_some`](#missing_some)
 * [Logic and Boolean Operations](#logic-and-boolean-operations)
 * [`if`](#if)
 * [`==`](#)
 * [`===`](#)
 * [`!=`](#)
 * [`!==`](#)
 * [`!`](#)
 * [`!!`](#)
 * [`or`](#or)
 * [`and`](#and)
 * [Numeric Operations](#numeric-operations)
 * [`>`, `>=`, `<`, and `<=`](#---and-)
 * [Between](#between)
 * [`max` and `min`](#max-and-min)
 * [Arithmetic, `+` `-` `*` `/`](#arithmetic-----)
 * [`%`](#%25)
 * [Array Operations](#array-operations)
 * [`map`, `reduce`, and `filter`](#map-reduce-and-filter)
 * [`all`, `none`, and `some`](#all-none-and-some)
 * [`merge`](#merge)
 * [`in`](#in)
 * [String Operations](#string-operations)
 * [`in`](#in-1)
 * [`cat`](#cat)
 * [`substr`](#substr)
 * [Miscellaneous](#miscellaneous)
 * [`log`](#log)
# Accessing Data
## `var`
Retrieve data from the provided data object.
Most JsonLogic rules operate on data supplied at run-time. Typically this data is an object, in which case the argument to `var` is a property name.
{ "var" : ["a"] }
Data { "a":1, "b":2 }
Apply
Result 
Note, every operation will be demonstrated with a live example box. Feel free to edit the logic and the data and see what happens when you apply your change! Here’s what the example above would look like in JavaScript:
```
jsonLogic.apply(
 { "var" : ["a"] }, // Logic
 { "a":1, "b":2 } // Data
);
// 1
```
If you like, we support [syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar) to skip the array around single arguments :
{"var":"a"}
Data {"a":1,"b":2}
Apply
Result 
You can supply a default, as the second argument, for values that might be missing in the data object. (Note, the skip-the-array sugar won’t work here because you’re passing two arguments to `var`):
{"var":["z", 26]}
Data {"a":1,"b":2}
Apply
Result 
The key passed to var can use dot-notation to get the property of a property (to any depth you need):
{"var" : "champ.name"}
Data { "champ" : { "name" : "Fezzig", "height" : 223 }, "challenger" : { "name" : "Dread Pirate Roberts", "height" : 183 } }
Apply
Result 
You can also use the `var` operator to access an array by numeric index:
{"var":1}
Data ["zero", "one", "two"]
Apply
Result 
Here’s a complex rule that mixes literals and data. The pie isn’t ready to eat unless it’s cooler than 110 degrees, _and_ filled with apples.
{ "and" : [ {"<" : [ { "var" : "temp" }, 110 ]}, {"==" : [ { "var" : "pie.filling" }, "apple" ] } ] }
Data { "temp" : 100, "pie" : { "filling" : "apple" } }
Apply
Result 
You can also use `var` with an empty string to get the entire data object – which is really useful in `map`, `filter`, and `reduce` rules.
{ "cat" : [ "Hello, ", {"var":""} ] }
Data "Dolly"
Apply
Result 
## `missing`
Takes an array of data keys to search for (same format as `var`). Returns an array of any keys that are missing from the data object, or an empty array.
{"missing":["a", "b"]}
Data {"a":"apple", "c":"carrot"}
Apply
Result 
{"missing":["a", "b"]}
Data {"a":"apple", "b":"banana"}
Apply
Result 
Note, in JsonLogic, empty arrays are [falsy](/truthy.html). So you can use `missing` with `if` like:
{"if":[ {"missing":["a", "b"]}, "Not enough fruit", "OK to proceed" ]}
Data {"a":"apple", "b":"banana"}
Apply
Result 
## `missing_some`
Takes a minimum number of data keys that are required, and an array of keys to search for (same format as `var` or `missing`). Returns an empty array if the minimum is met, or an array of the missing keys otherwise.
{"missing_some":[1, ["a", "b", "c"]]}
Data {"a":"apple"}
Apply
Result 
{"missing_some":[2, ["a", "b", "c"]]}
Data {"a":"apple"}
Apply
Result 
This is useful if you’re using `missing` to track required fields, but occasionally need to require N of M fields.
{"if" :[ {"merge": [ {"missing":["first_name", "last_name"]}, {"missing_some":[1, ["cell_phone", "home_phone"] ]} ]}, "We require first name, last name, and one phone number.", "OK to proceed" ]}
Data {"first_name":"Bruce", "last_name":"Wayne"}
Apply
Result 
# Logic and Boolean Operations
## `if`
The `if` statement typically takes 3 arguments: a condition (if), what to do if it’s true (then), and what to do if it’s false (else), like:
{"if" : [ true, "yes", "no" ]}
Data null
Apply
Result 
{"if" : [ false, "yes", "no" ]}
Data null
Apply
Result 
If can also take more than 3 arguments, and will pair up arguments like if/then elseif/then elseif/then else. Like:
{"if" : [ {"<": [{"var":"temp"}, 0] }, "freezing", {"<": [{"var":"temp"}, 100] }, "liquid", "gas" ]}
Data {"temp":55}
Apply
Result 
See the [Fizz Buzz implementation](/fizzbuzz.html) for a larger example.
## `==`
Tests equality, with type coercion. Requires two arguments.
{"==" : [1, 1]}
Data null
Apply
Result 
{"==" : [1, "1"]}
Data null
Apply
Result 
{"==" : [0, false]}
Data null
Apply
Result 
## `===`
Tests strict equality. Requires two arguments.
{"===" : [1, 1]}
Data null
Apply
Result 
{"===" : [1, "1"]}
Data null
Apply
Result 
## `!=`
Tests not-equal, with type coercion.
{"!=" : [1, 2]}
Data null
Apply
Result 
{"!=" : [1, "1"]}
Data null
Apply
Result 
## `!==`
Tests strict not-equal.
{"!==" : [1, 2]}
Data null
Apply
Result 
{"!==" : [1, "1"]}
Data null
Apply
Result 
## `!`
Logical negation (“not”). Takes just one argument.
{"!": [true]}
Data null
Apply
Result 
_Note:_ unary operators can also take a single, non array argument:
{"!": true}
Data null
Apply
Result 
## `!!`
Double negation, or “cast to a boolean.” Takes a single argument.
Note that JsonLogic has its own spec for [truthy](/truthy.html) to ensure that rules will run consistently across interpreters. (e.g., empty arrays are falsy, string “0” is truthy.)
{"!!": [ [] ] }
Data null
Apply
Result 
{"!!": ["0"] }
Data null
Apply
Result 
## `or`
`or` can be used for simple boolean tests, with 1 or more arguments.
{"or": [true, false]}
Data null
Apply
Result 
At a more sophisticated level, `or` returns the first [truthy](/truthy.html) argument, or the last argument.
{"or":[false, true]}
Data null
Apply
Result 
{"or":[false, "a"]}
Data null
Apply
Result 
{"or":[false, 0, "a"]}
Data null
Apply
Result 
## `and`
`and` can be used for simple boolean tests, with 1 or more arguments.
{"and": [true, true]}
Data null
Apply
Result 
{"and": [true, false]}
Data null
Apply
Result 
At a more sophisticated level, `and` returns the first [falsy](/truthy.html) argument, or the last argument.
{"and":[true,"a",3]}
Data null
Apply
Result 
{"and": [true,"",3]}
Data null
Apply
Result 
# Numeric Operations
## `>`, `>=`, `<`, and `<=`
Greater than:
{">" : [2, 1]}
Data null
Apply
Result 
Greater than or equal to:
{">=" : [1, 1]}
Data null
Apply
Result 
Less than:
{"<" : [1, 2]}
Data null
Apply
Result 
Less than or equal to:
{"<=" : [1, 1]}
Data null
Apply
Result 
## Between
You can use a special case of `<` and `<=` to test that one value is between two others:
Between exclusive:
{"<" : [1, 2, 3]}
Data null
Apply
Result 
{"<" : [1, 1, 3]}
Data null
Apply
Result 
{"<" : [1, 4, 3]}
Data null
Apply
Result 
Between inclusive:
{"<=" : [1, 2, 3]}
Data null
Apply
Result 
{"<=" : [1, 1, 3]}
Data null
Apply
Result 
{"<=" : [1, 4, 3]}
Data null
Apply
Result 
This is most useful with data:
{ "<": [0, {"var":"temp"}, 100]}
Data {"temp" : 37}
Apply
Result 
## `max` and `min`
Return the maximum or minimum from a list of values.
{"max":[1,2,3]}
Data null
Apply
Result 
{"min":[1,2,3]}
Data null
Apply
Result 
## Arithmetic, `+` `-` `*` `/`
Addition, subtraction, multiplication, and division.
{"+":[4,2]}
Data null
Apply
Result 
{"-":[4,2]}
Data null
Apply
Result 
{"*":[4,2]}
Data null
Apply
Result 
{"/":[4,2]}
Data null
Apply
Result 
Because addition and multiplication are associative, they happily take as many args as you want:
{"+":[2,2,2,2,2]}
Data null
Apply
Result 
{"*":[2,2,2,2,2]}
Data null
Apply
Result 
Passing just one argument to `-` returns its arithmetic negative (additive inverse).
{"-": 2 }
Data null
Apply
Result 
{"-": -2 }
Data null
Apply
Result 
Passing just one argument to `+` casts it to a number.
{"+" : "3.14"}
Data null
Apply
Result 
## `%`
[Modulo](https://en.wikipedia.org/wiki/Modulo_operation). Finds the remainder after the first argument is divided by the second argument.
{"%": [101,2]}
Data null
Apply
Result 
This can be paired with a loop in the language that parses JsonLogic to create stripes or other effects.
In Javascript:
```
var rule = {"if": [{"%": [{"var":"i"}, 2]}, "odd", "even"]};
for(var i = 1; i <= 4 ; i++){
 console.log(i, jsonLogic.apply(rule, {"i":i}));
}
/* Outputs:
1 "odd"
2 "even"
3 "odd"
4 "even"
*/
```
# Array Operations
## `map`, `reduce`, and `filter`
You can use `map` to perform an action on every member of an array. Note, that inside the logic being used to map, `var` operations are relative to the array element being worked on.
{"map":[ {"var":"integers"}, {"*":[{"var":""},2]} ]}
Data {"integers":[1,2,3,4,5]}
Apply
Result 
You can use `filter` to keep only elements of the array that pass a test. Note, that inside the logic being used to filter, `var` operations are relative to the array element being worked on.
Also note, the returned array will have contiguous indexes starting at zero (typical for JavaScript, Python and Ruby) it will _not_ preserve the source indexes (making it unlike PHP’s `array_filter`).
{"filter":[ {"var":"integers"}, {"%":[{"var":""},2]} ]}
Data {"integers":[1,2,3,4,5]}
Apply
Result 
You can use `reduce` to combine all the elements in an array into a single value, like adding up a list of numbers. Note, that inside the logic being used to reduce, `var` operations only have access to an object like:
```
{
 "current" : // this element of the array,
 "accumulator" : // progress so far, or the initial value
}
```
{"reduce":[ {"var":"integers"}, {"+":[{"var":"current"}, {"var":"accumulator"}]}, 0 ]}
Data {"integers":[1,2,3,4,5]}
Apply
Result 
## `all`, `none`, and `some`
These operations take an array, and perform a test on each member of that array.
The most interesting part of these operations is that inside the test code, `var` operations are relative to the array element being tested.
It can be useful to use `{"var":""}` to get the entire array element within the test.
{"all" : [ [1,2,3], {">":[{"var":""}, 0]} ]}
Data null
Apply
Result 
{"some" : [ [-1,0,1], {">":[{"var":""}, 0]} ]}
Data null
Apply
Result 
{"none" : [ [-3,-2,-1], {">":[{"var":""}, 0]} ]}
Data null
Apply
Result 
Or it can be useful to test an object based on its properties:
{"some" : [ {"var":"pies"}, {"==":[{"var":"filling"}, "apple"]} ]}
Data {"pies":[ {"filling":"pumpkin","temp":110}, {"filling":"rhubarb","temp":210}, {"filling":"apple","temp":310} ]}
Apply
Result 
Note that `none` will return `true` for an empty array, while `all` and `some` will return `false`.
## `merge`
Takes one or more arrays, and merges them into one array. If arguments aren’t arrays, they get cast to arrays.
{"merge":[ [1,2], [3,4] ]}
Data null
Apply
Result 
{"merge":[ 1, 2, [3,4] ]}
Data null
Apply
Result 
Merge can be especially useful when defining complex `missing` rules, like which fields are required in a document. For example, this vehicle paperwork always requires the car’s VIN, but only needs the APR and term if you’re financing.
{"missing" : { "merge" : [ "vin", {"if": [{"var":"financing"}, ["apr", "term"], [] ]} ]} }
Data {"financing":true}
Apply
Result 
{"missing" : { "merge" : [ "vin", {"if": [{"var":"financing"}, ["apr", "term"], [] ]} ]} }
Data {"financing":false}
Apply
Result 
## `in`
If the second argument is an array, tests that the first argument is a member of the array:
{"in":[ "Ringo", ["John", "Paul", "George", "Ringo"] ]}
Data null
Apply
Result 
# String Operations
## `in`
If the second argument is a string, tests that the first argument is a substring:
{"in":["Spring", "Springfield"]}
Data null
Apply
Result 
## `cat`
Concatenate all the supplied arguments. Note that this is not a join or implode operation, there is no “glue” string.
{"cat": ["I love", " pie"]}
Data null
Apply
Result 
{"cat": ["I love ", {"var":"filling"}, " pie"]}
Data {"filling":"apple", "temp":110}
Apply
Result 
## `substr`
Get a portion of a string.
Give a positive start position to return everything beginning at that index. (Indexes of course start at zero.)
{"substr": ["jsonlogic", 4]}
Data null
Apply
Result 
Give a negative start position to work backwards from the end of the string, then return everything.
{"substr": ["jsonlogic", -5]}
Data null
Apply
Result 
Give a positive length to express how many characters to return.
{"substr": ["jsonlogic", 1, 3]}
Data null
Apply
Result 
Give a negative length to stop that many characters before the end.
{"substr": ["jsonlogic", 4, -2]}
Data null
Apply
Result 
# Miscellaneous
## `log`
Logs the first value to console, then passes it through unmodified.
This can be especially helpful when debugging a large rule.
{"log":"apple"}
Data null
Apply
Result 
(Check your developer console!)
 * [Home](/)
 * [Supported Operations](/operations.html)
 * [Adding Operations](/add_operation.html)
 * [Play with It](/play.html)
 * [Fizz Buzz](/fizzbuzz.html)
 * [Truthy and Falsy](/truthy.html)
[ Parse JsonLogic in JavaScript ](https://github.com/jwadhams/json-logic-js/) [ Parse JsonLogic in PHP ](https://github.com/jwadhams/json-logic-php/) [ Parse JsonLogic in Python ](https://github.com/nadirizr/json-logic-py) [ Parse JsonLogic in Ruby ](https://github.com/kennethgeerts/json-logic-ruby) [ Parse JsonLogic in Go ](https://github.com/diegoholiveira/jsonlogic) [ Parse JsonLogic in Java ](https://github.com/jamsesso/json-logic-java) [ Parse JsonLogic in .Net ](https://github.com/gregsdennis/json-everything) [ Parse JsonLogic in C++ ](https://github.com/gabrielkim13/json-logic-cpp)
[json-logic](https://github.com/jwadhams/json-logic) is maintained by [Jeremy Wadhams](https://github.com/jwadhams).
Thanks to [Adam Parry](https://thenounproject.com/adamparry/) for the outstanding Vulcan Salute used in the logo, available on [The Noun Project](https://thenounproject.com/search/?q=spock&i=143495).
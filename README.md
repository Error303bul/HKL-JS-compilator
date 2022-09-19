# HKL-JS-translator
HKL is data-working and saving language which can help you to store your datas

## Starting

When installing the HCL translator, you only need to use the file ```translator.js```.

It has all things what you need, just use the ```translator(hkl)``` function. It need string converted to array, example:

```
["$ console write Hello world!","$ console write Goodbye world!"]
```


## Basics

Command are started by $. If you don`t print it, translator will just skip this line (Like a comment).

### Writing to console

To write a message to the console, you need to access the console module and call the write procedure. Example:

```
 $ console write Hello world!;
```

You don`t need to put quotation marks. In ```console write``` procedure ,it calling automaticly.

### Variables and debugging

To create variable in the **HKL** you need to use from var module new procedure. It create new variable with name (value after procedure).

```
 $ var new Var;
 Any name for a variable;
```

To change variable value you need to call set procedure from var module:

```
  $ var new Name;
  $ var set Name Ann;
  First - variable name, second - new value
```

To write variable value to console you need to use console procedure debug:

```
  $ var new Name;
  $ var set Name Ann;
  $ console debug Name;
```

If you have to much variables, and you need to copy one of their values to other variable use ```$ var copy``` function:

```
 Creating a variables
 $ var new Age
$ var new newAge
$ var set Age 15
$ var copy newAge Age
First-where top copy second-from copy
$ console debug newAge;
 15;
```

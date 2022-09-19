# HKL-JS-translator
HKL is data-working and saving language which can help you to store your datas

## Starting

When installing the HCL translator, you only need to use the file ```translator.js```.

It has all things what you need, just use the ```interpretator(hkl)``` function. It need hkl file as one string, example:

```
"$ console write Hello world!;$ console write Goodbye world!;"
```


## Basics

Command are started by $. If you don`t print it, translator will just skip this line (Like a comment).

### Writing to console

To write a message to the console, you need to access the **console** module and call the **write** procedure. Example:

```
 $ console write Hello world!;
```

You don`t need to put quotation marks. In ```console write``` procedure ,it calling automaticly.

### Variables and debugging

To create variable in the **HKL** you need to use from **var** module **new** procedure. It create new variable with name (value after procedure).

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
$ var new Age
$ var new newAge
$ var set Age 15
$ var copy newAge Age
$ console debug newAge;
```

First-where to copy, second-from copy

### Calculation module

One of the most important thing in programming is math. To make mathematic procedures you need to use calculation module.

List of the procedures:

- reset - reseting value of calculating to 0
- set - setting value of calculating to **input**
- add - increasing value of calculating by **input**
- substract - decreasing value of calculating by **input**
- multiply - multiply value of calculating by **input**
- divide - dividing value of calculating by **input**
- write - setting the value of variable **input** to calculation value

Example. Debugging the 5+5 result:

```
$ calculation set 5;
$ calculation add 5;
$ var new result;
$ calculation write result;
$ console debug result;
```

## Branching

If you need to work with different data you need sometimes to branching your code. It`s one of the most important thing in coding. In the HKL you also can keep your code with branch

### Condition

Before you start next part you need to learn condition.

Condition is the most critical thing in HKL. It has own module - condition.

Condition has some commands and it works only with variables. It can have only tow statements: true or false. List of the procedures.

- reverse - switching condition value to opposite, like "NOT" operator.
- "=" **input1** **input2** - if the variables named **input1** and **input2** has a same values, true, if not - false
- ">" **input1** **input2** - if **input1** value is greater than **input2** value then true, else - false
- "<" **input1** **input2** - if **input2** value is greater than  **input1** value then true, else - false

You can debug value of condition by using ```$ console condition``` Example:

```
$ var new zero
$ var new i
$ var set zero 0
$ var set i 5
$ condition > i zero
$ console condition;
```

### IF, END IF

What if we want to create a real branch? All what we need is **IF** and **END IF** block.

To create an IF block you need:

1. Print ```$ if```
2. Print condition or any value
3. Print ```$ end if (line with if block-1)```

Examles:

```
$ if False;
$ end if 0;
if is on first line so you need to print 0 (because 1-1 is 0 obvisiosly);
```

Second with condition:

```
$ var new zero
$ var new i
$ var set zero 0
$ var set i 5
$ condition > i zero
$ if condition;
$ console write Hello;
$ end if 5;
only writing if condition is not false
```


### Move Module
Last thing in this chapter is move module.

What if we wan`t to create a loop? Just use a move module. It has just few procedures:

- to - moving to line **input**
- by - moving to line **current line**+**input**

Just few procedures, but them can do very much tasks.

Example loop:
```
$ var new index;
$ var set index 10;
$ calculation set 10;
$ var new zero;
$ var set 0;
$ calculation substract 1;
$ calculation write index;
$ console debug index;
$ condition > index zero;
$ if condition;
$ move to 5;
$ end if 9;
```

It debugging everu number from 9 to 0.

## Object-oriented programming

Like a much of coding launguages, HKL has an OOP system. It one of the most important system which can help you in coding.

### Creating class and object

To create an object you need to use ```$ class new (name);``` procedure. To create a new object you need to use ```$ object new (class name);``` procedure. Example:

```
$ class new Person;
$ object new Person;
```

Lately, you will learn what it object stores to last object, and has a it own link which generates randomly.

### Creating an attribute for class. Setting an attribute value.

Classes are useless without an attributes, right? To create an attribute for class you need to use ```$ class add (class name) (attribute name)``` procedure:

```
$ class new Person;
$ class add Person Age;
$ class add Person Name;
$ object new Person;
```

Remember what if you create an attribute after than object, object doesn`t will have it!

```
$ class new Person;
$ class add Person Age;
$ object new Person;
$ class add Person Name;
object doesn`t have Name attribute;
```

If you want to change variable value you need to use ```attribute``` submodule and ```set``` or ```parse``` procedure. First one will copy variable value to attribute, second-copy second input:

```
$ class new Person;
$ class add Person Age;
$ class add Person Name;
$ object new Person;
$ var new StartName;
$ var set StartName Tom;
$ object set Name StartName;
$ object parse Age 20;
```

### Storing object info in variables

If you wan`t to debug object info into console you need to store his link into variable using ```$ object write (var name)``` . It stores choosed object (last created) link to variable. If you want to get info about of this variable you get this object:

```
$ class new Person;
$ class add Person Age;
$ class add Person Name;
$ object new Person;
$ var new StartName;
$ var set StartName Tom;
$ object attribute set Name StartName;
$ object attribute parse Age 20;
$ var new Tom;
$ object write Tom;
$ console debug Tom;
```

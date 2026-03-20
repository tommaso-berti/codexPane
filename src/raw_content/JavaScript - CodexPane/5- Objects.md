# 5. Objects


Objects can be assigned to variables just like any JavaScript type. We use curly braces, {}, to designate an *object literal*:

```
// An object literal with two key-value pairs
let spaceship = {
  'Fuel Type': 'diesel',  -> property
  color: 'silver'         -> property
    |       | 
   key    value
};

```


### Access properties
Dot notation to access the properties and methods of built-in objects and data instances by key

```
let spaceship = {
  'Fuel Type' : 'Turbo Fuel',
  'Active Mission' : true,
  homePlanet : 'Earth', 
  numCrew: 5
 };
console.log(spaceship.numCrew)   //returns 5

```

We **must** use bracket notation when accessing keys that have numbers, spaces, or special characters in them. Without bracket notation in these situations, our code would throw an error.

```
let spaceship = {
  'Fuel Type': 'Turbo Fuel',
  'Active Duty': true,
  homePlanet: 'Earth',
  numCrew: 5
};
spaceship['Active Duty'];   // Returns true
spaceship['Fuel Type'];   // Returns  'Turbo Fuel'
spaceship['numCrew'];   // Returns 5
spaceship['!!!!!!!!!!!!!!!'];   // Returns undefined


```

### 
### Valorize properties
Similar to arrays, you cannot redefine a const object, but you can redefine properties

```
const spaceship = {
  'Fuel Type': 'Turbo Fuel',
  'Active Duty': true,
  homePlanet: 'Earth',
  numCrew: 5,
  type: 'Shuttle'
};
spaceship = {type: 'alien'}; // TypeError: Assignment to constant variable.
spaceship.type = 'alien'; // Changes the value of the type property
spaceship.speed = 'Mach 5'; // Creates a new key of 'speed' with a value of 'Mach 5'
spaceship['Active Duty'] = false //assing to the key 'Active Duty' the value false
spaceship.numCrew = 6    //assing to the key numCrew the value 6

```


### Delete properties
The delete a property you should use the delete operator

```
const spaceship = {
  'Fuel Type': 'Turbo Fuel',
  homePlanet: 'Earth',
  mission: 'Explore the universe' 
};
 
delete spaceship.mission;  // Removes the mission property

```


## Custom methods

```
const alienShip = {
  invade: function () { 
    console.log('Hello! We have come to dominate your planet. Instead of Earth, it shall be called New Xaculon.')
  }
};

```

With the new method syntax introduced in ES6 we can omit the colon and the function keyword.

```
const alienShip = {
  invade () { 
    console.log('Hello! We have come to dominate your planet. Instead of Earth, it shall be called New Xaculon.')
  },
  takeOff () {
    console.log('Take offfff')
  }
};

```

Invoke the method

```
alienShip.invade();

```


## **Nested Objects**

```
const spaceship = {
     telescope: {
        yearBuilt: 2018,
        model: '91031-XLT',
        focalLength: 2032 
     },
    crew: {
        captain: { 
            name: 'Sandra', 
            degree: 'Computer Engineering', 
            encourageTeam() { console.log('We got this!') } 
         }
    },
    engine: {
        model: 'Nimbus2000'
     },
     nanoelectronics: {
         computer: {
            terabytes: 100,
            monitors: 'HD'
         },
        'back-up': {
           battery: 'Lithium',
           terabytes: 50
         }
    }
}; 


```


```
spaceship.nanoelectronics['back-up'].battery;    //Returns 'Lithium'

```


## **Pass By Reference**
Objects are *passed by reference* (like arrays). This means when we pass a variable assigned to an object into a function as an argument, the computer interprets the parameter name as pointing to the space in memory holding that object. As a result, functions which change object properties actually mutate the object permanently (even when the object is assigned to a const variable).
However, reassignment of the spaceship variable wouldn’t work in the same way:

```
let spaceship = {
  homePlanet : 'Earth',
  color : 'red'
};
let tryReassignment = obj => {
  obj = {
    identified : false, 
    'transport type' : 'flying'
  }
  console.log(obj) // Prints {'identified': false, 'transport type': 'flying'}
 
};
tryReassignment(spaceship) // The attempt at reassignment does not work.
spaceship // Still returns {homePlanet : 'Earth', color : 'red'};
 
spaceship = {
  identified : false, 
  'transport type': 'flying'
}; // Regular reassignment still works.

```

Let’s look at what happened in the code example:
* We declared this spaceship object with let. This allowed us to reassign it to a new object with identified and 'transport type' properties with no problems.
* When we tried the same thing using a function designed to reassign the object passed into it, the reassignment didn’t stick (even though calling console.log() on the object produced the expected result).
* When we passed spaceship into that function, obj became a reference to the memory location of the spaceship object, but *not* to the spaceship variable. This is because the obj parameter of the tryReassignment() function is a variable in its own right. The body of tryReassignment() has no knowledge of the spaceship variable at all!
* When we did the reassignment in the body of tryReassignment(), the obj variable came to refer to the memory location of the object {'identified' : false, 'transport type' : 'flying'}, while the spaceship variable was completely unchanged from its earlier value.

## Loops
### **for…in loop**
The for...in statement iterates over all <u>[enumerable string properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Enumerability_and_ownership_of_properties)</u> of an object (ignoring properties keyed by <u>[symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)</u>), including inherited enumerable properties.

```
const object = { a: 1, b: 2, c: 3 };
for (const property in object) {
  console.log(`${property}: ${object[property]}`);
}
// Expected output:
// "a: 1"
// "b: 2"
// "c: 3"

```



## **This keyword**
The this keyword references the *calling object* which provides access to the calling object’s properties. In the example below, the calling object is goat and by using this we’re accessing the goat object itself, and then the dietType property of goat by using property dot notation.

```
const goat = {
  dietType: 'herbivore',
  makeSound() {
    console.log('baaa');
  },
  diet() {
    console.log(this.dietType);
  }
};
goat.diet(); 
// Output: herbivore
```


```


```

### 
### Arrow function with this
Arrow functions inherently *bind*, or tie, an already defined this value to the function itself that is NOT the calling object. In the code snippet above, the value of this is the *global object*, or an object that exists in the global scope, which doesn’t have a dietType property and therefore returns undefined.

```
const goat = {
  dietType: 'herbivore',
  makeSound() {
    console.log('baaa');
  },
  diet: () => {
    console.log(this.dietType);
  }
};
goat.diet(); // Prints undefined

```


## Privacy
When discussing *privacy* in objects, we define it as the idea that only certain properties should be mutable or able to change in value
One common convention is to place an underscore _ before the name of a property to mean that the property should not be altered. Here’s an example of using _ to prepend a property. Even so, it is still possible to reassign _amount. For this, we need getters and setters

```
const bankAccount = {
  _amount: 1000
}

```

### 
### Getter

```
const person = {
  _firstName: 'John',
  _lastName: 'Doe',
  get fullName() {
    if (this._firstName && this._lastName){
      return `${this._firstName} ${this._lastName}`;
    } else {
      return 'Missing a first name or a last name.';
    }
  }
}

// To call the getter method: 
person.fullName; // 'John Doe'


```

* We use the get keyword followed by a function.
* We use an if...else conditional to check if both _firstName and _lastName exist (by making sure they both return truthy values) and then return a different value depending on the result.
* We can access the calling object’s internal properties using “this”. In fullName, we’re accessing both this._firstName and this._lastName.
* In the last line we call fullName on person. In general, getter methods do not need to be called with a set of parentheses. Syntactically, it looks like we’re accessing a property.
Advantages of using getter methods:
* Getters can perform an action on the data when getting a property.
* Getters can return different values using conditionals
* In a getter, we can access the properties of the calling object using this.
* The functionality of our code is easier for other developers to understand.
### 
### Setter
Reassign values of existing properties within an object

```
const person = {
  _age: 37,
  set age(newAge){
    if (typeof newAge === 'number'){
      this._age = newAge;
    } else {
      console.log('You must assign a number to age');
    }
  }
};

```


```


```

* We can perform a check for what value is being assigned to this._age.
* When we use the setter method, only values that are numbers will reassign this._age
* There are different outputs depending on what values are used to reassign this._age.
Setter methods do not need to be called with a set of parentheses. Syntactically, it looks like we’re reassigning the value of a property.

```
person.age = 40;
console.log(person._age); // Logs: 40
person.age = '40'; // Logs: You must assign a number to age

```


## Factory functions
A factory function is a function that returns an object and can be reused to make multiple object instances. Factory functions can also have parameters allowing us to customize the object that gets returned.

```
const monsterFactory = (name, age, energySource, catchPhrase) => {
  return { 
    name: name,
    age: age, 
    energySource: energySource,
    scare() {
      console.log(catchPhrase);
    } 
  }
};

const ghost = monsterFactory('Ghouly', 251, 'ectoplasm', 'BOO!');
ghost.scare(); // 'BOO!'

```


## Destructured technique (from ES6)
### **Property value shorthand.**

```
const monsterFactory = (name, age) => {
  return { 
    name,
    age 
  }
};

```

### **Destructured Assignment**
In destructured assignment we create a variable with the name of an object’s key that is wrapped in curly braces { } and assign to it the object

```
const vampire = {
  name: 'Dracula',
  residence: 'Transylvania',
  preferences: {
    day: 'stay inside',
    night: 'satisfy appetite'
  }
};

const { residence } = vampire; 
console.log(residence); // Prints 'Transylvania'

const { day } = vampire.preferences; 
console.log(day); // Prints 'stay inside'

```


## Methods
* .hasOwnProperty(): Checks if an object has a specific property as its own (not inherited) property.
* .valueOf(): Returns the primitive value of a specified object.
* Object.assign(): Copies the values of all enumerable own properties from one or more source objects to a target object, 

```
const newRobot = Object.assign({}, robot, {laserBlaster: true, voiceRecognition: true})  //the first {} parameter wont' change the original object

```

* Object.entries(): Returns an array of a given object’s own enumerable string-keyed property [key, value] pairs.
* Object.keys(): Returns an array of a given object’s own enumerable property names, iterated in the same order that a normal loop would.



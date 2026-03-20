# 8. Classes


## Constructor
JavaScript calls the constructor() method every time it creates a new *instance* of a class.

```
class Dog {
  constructor(name) {
    this.name = name;
    this.behavior = 0;
  }
}

```

* Dog is the name of our class. By convention, we capitalize and PascalCase class names.
* JavaScript will invoke the constructor() method every time we create a new instance of our Dog class.
* This constructor() method accepts one argument, name.
* Inside of the constructor() method, we use the this keyword. In the context of a class, this refers to an instance of that class. In the Dog class, we use this to set the value of the Dog instance’s name property to the name argument.
* Under this.name, we create a property called behavior, which will keep track of the number of times a dog misbehaves. The behavior property is always initialized to zero.

## **Instance**
An *instance* is an object that contains the property names and methods of a class, but with unique property values. Let’s look at our Dog class example.

```
**class Dog {
  constructor(name) {
    this.name = name;
    this.behavior = 0;
  } 
}

const halley = new Dog('Halley'); // Create new Dog instance
console.log(halley.name); // Log the name value saved to halley
// Output: 'Halley'**

```

* We create a new variable named halley that will store an instance of our Dog class.
* We use the new keyword to generate a new instance of the Dog class. The new keyword calls the constructor(), runs the code inside of it, and then returns the new instance.

## **Methods**
Class method and getter syntax is the same as it is for objects **except you cannot include commas between methods**.

```
class Dog {
  constructor(name) {
    this._name = name;
    this._behavior = 0;
  }
  get name() {
    return this._name;
  }
  get behavior() {
    return this._behavior;
  }
  incrementBehavior() {
    this._behavior++;
  }
}

```


## **Inheritance** 
Abstract class (parent)

```
class Animal {
  constructor(name) {
    this._name = name;
    this._behavior = 0;
  }
    
  get name() {
    return this._name;
  }
  
  get behavior() {
    return this._behavior;
  }
    
  incrementBehavior() {
    this._behavior++;
  }

```


Extended class (child)

```
class Cat extends Animal {
  constructor(name, usesLitter) {
    super(name);
    this._usesLitter = usesLitter;
  }
}

```

* The extends keyword makes the methods of the animal class available inside the cat class.
* The constructor, called when you create a new Cat object, accepts two arguments, name and usesLitter.
* The super keyword calls the constructor of the parent class. In this case, super(name) passes the name argument of the Cat class to the constructor of the Animal class. When the Animal constructor runs, it sets this._name = name; for new Cat instances.
* _usesLitter is a new property that is unique to the Cat class, so we set it in the Cat constructor.
In a constructor(), you must always call the super method before you can use the this keyword — if you do not, JavaScript will throw a reference error.
When we call extends in a class declaration, all of the parent methods are available to the child class.

## Static methods
Take the Date class, for example — you can both create Date instances to represent whatever date you want, and call *static* methods, like Date.now() which returns the current date, directly from the class. The .now() method is static, so you can call it directly from the class, but not from an instance of the class.

```
class Animal {
  constructor(name) {
    this._name = name;
    this._behavior = 0;
  }
    
  static generateName() {
    const names = ['Angel', 'Spike', 'Buffy', 'Willow', 'Tara'];
    const randomNumber = Math.floor(Math.random()*5);
    return names[randomNumber];
  }
} 

```

In the example above, we create a static method called .generateName() that returns a random name when it’s called. Because of the static keyword, we can only access .generateName() by appending it to the Animal class.

```
console.log(Animal.generateName()); // returns a name

```

You cannot access the .generateName() method from instances of the Animal class or instances of its subclasses:

```
const tyson = new Animal('Tyson'); 
tyson.generateName(); // TypeError

```



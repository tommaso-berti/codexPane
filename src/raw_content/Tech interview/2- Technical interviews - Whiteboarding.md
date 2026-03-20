# 2. Technical interviews - Whiteboarding

## 
A *whiteboarding* technical interview requires the interviewee to plan and code the solution by hand. The candidate relies on their ability to communicate without the assistance of a text editor or web browser.
This lesson covers strategies to improve performance in a whiteboarding interview. Each exercise features a step in the interview with a video demonstration of the technique.
The steps are:
1. **Clarify** the Problem
3. Create **Inputs****Outline** the Solution
7. **Code** the Solution
9. **Test** the Solution
11. **Analyze** the Solution

## **Clarifying the Problem**
When the interviewer presents their technical question, repeat the question back to the interviewer **in your own words**. This gives you a moment to think and will resolve any glaring misunderstandings.
Once you’ve repeated the question, **ask every clarifying question that comes to mind.**
Assumptions must be communicated to the interviewer so there is agreement on the scope of the problem.
For example, if asked:

```
*Write a function that returns duplicate characters in string.*
```


```


```

Here are some questions which may come to mind:
* What is the desired return value?
	* True|False, a list of characters, or …?
* Do punctuation and spaces count as “characters”?
* Should case be considered?
	* are "a" and "A" duplicates?
* Should we be checking for <u>[Unicode](https://en.wikipedia.org/wiki/Unicode)</u> characters?
* Can we assume it’s a 26 character alphabet?

## **Producing Inputs and Finding Edge Cases**
When the question is clear, we then produce concrete inputs and outputs. These inputs guide a solution for the remainder of the interview so write them on the board!
You may still be unclear how to solve the problem in code, but it’s certain that given an input,  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     X
 </span>, your function will produce an output,  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     Y
 </span>.
Make one input the *happy path*: input that reflects a common scenario.
For example, you’re asked to write a function which capitalizes the first letter of an input <u>[string](https://www.codecademy.com/resources/docs/general/data-types/string)</u>.
A good input could be  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     "apple"
 </span>, which returns  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     "Apple"
 </span> because this demonstrates the function’s purpose.
If the input were  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     "Apple"
 </span>, it would return  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     "Apple"
 </span>. That’s correct but less informative.
Also think about *edge cases*, or inputs which **do not** reflect a common scenario and may cause problems.

## **Writing the Outline**
It’s time to start breaking down the problem by category.
Given a question which requires the use of a stack, what do you know about stacks? Have you encountered other problems that use stacks and how were they solved?
Is this a searching question? Can you sort the input and will that help? Does this problem sound like it can be modeled as a graph, with vertices and connected edges?
Understanding the applications of different <u>[data structures](https://www.codecademy.com/resources/docs/general/data-structures)</u> is very useful! The more questions you practice, the more you will be able to see patterns between problems.
This step varies the most because it requires details of the specific problem, but regardless of the question make certain you are communicating with the interviewer as a potential co-worker. **Show them your thought process!**
During this step, the interviewer may make suggestions on how to proceed. Acknowledge the interviewer and incorporate their suggestions into your approach.
**Don’t disregard their input! It gives the impression you would be difficult to work with on the job.**
When you and the interviewer are satisfied with a workable solution, write the steps next to your input. Follow these steps as you write code on the board.

## **Coding the Solution**
Writing code on the board is a collaborative process. Refer to your outline and explain the step you’re implementing.
The goal is to be facing the interviewer when talking through the implementation and facing the board when you’re writing the code.
Try to avoid writing code in silence or narrating at a low level like “for… i… in… range… length of the list… colon” when writing  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     for i in range(len(input_list)):
 </span>.
When you’re finished with the implementation, look it over for any mistaken syntax or logical errors.

## **Testing with Inputs**
With a working implementation on the whiteboard, use the test inputs to walk through the evaluation of your code.
Write out any temporary <u>[variables](https://www.codecademy.com/resources/docs/general/julia/variables)</u> on the board and update them when they change during execution.
This is another opportunity to showcase your communication skills, and will help you catch any logical errors which you may not have noticed in earlier steps.
If you catch an error, don’t panic! Mistakes happen. Explain the issue and talk through what you can do to fix the bug.
Your interviewer may want to see you write the correction or they may be satisfied with the explanation.

## **Analyzing Time and Space Complexity**
Analyze the time and space complexity of the solution. With this step you are demonstrating that you care about the efficiency of your code.
Explain your code’s big O notation. If you can optimize to a more efficient <u>[runtime](https://www.codecademy.com/resources/docs/general/runtime)</u>, explain how that would work. If you can’t optimize, explain why it’s not possible.


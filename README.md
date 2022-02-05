# Cpu-Simulator
The purpose of this project is to familiarize you with the following concepts:

basic TypeScript development

using data structures in TypeScript

using command line parameters

reading data from files

dividing and processing strings

how a simple processor works

This is a very simple processor, which has one register, called R, and an infinite stack space, called STACK. The CPU performs all calculations using signed integers. It doesn't know how to handle floating point numbers


Instruction set

The instruction set is divided into five categories of instructions:

No action - these instructions do not perform any action

Memory - these instructions allow the CPU to interact with the stack (memory)

Math - these instructions allow the CPU to perform mathematical operations

Flow - these instructions allow the CPU to perform ifs and loops

Pseudo Debug - these instructions are used for debugging

nop -> It does nothing, being used only for comments

push -> It adds the parameter to the stack

pop -> It pops a number from the stack; in other words, it removes a number from the stack

load -> It pulls a number from the stack and stores it in R (the CPU register)

store -> It adds the number of R (the processor register) in the stack

add -> It pulls two numbers from the stack, does the addition, and adds the result to the stack

sub -> It pulls two numbers from the stack, does the subtraction, and adds the result to the stack

mul -> It pulls two numbers from the stack, does the multiplication, and adds the result to the stack

div -> It pulls two numbers from the stack, does the division using integer division and adds the result to the stack

mod -> It pulls two numbers from the stack, calculates the remainder of their division and adds the result to the stack

jump -> Instead of executing the next instruction, the CPU will take the instruction: a) at the line number specified as the parameter or b) from the label specified by the parameter

jumpz -> If the top value of the stack is zero, it works the same as jump, otherwise it does nothing

jumpnz -> If the top value of the stack is not zero, it works the same as jump, otherwise it does nothing

print -> Displays the number of the top of the stack

stack -> Show stack

To run the simulator, a user will type the command:

$ node index.js filename.asm



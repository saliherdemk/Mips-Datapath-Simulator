# Mips-Datapath-Simulator

This is demonstration of how the most of the basic instruction works in Mips Architecture. It's complete datapath for

| **Instruction** |        **Format**        |
| :-------------: | :----------------------: |
|       Add       |    add $rd, $rs, $rt     |
|       Sub       |    sub $rd, $rs, $rt     |
|       And       |    and $rd, $rs, $rt     |
|       Or        |     or $rd, $rs, $rt     |
|       JR        |          jr $rs          |
|  Add Immediate  | addi $rt, $rs, immediate |
|   Store Word    |   sw $rt, offset($rs)    |
|    Load Word    |   lw $rt, offset($rs)    |
|  Branch Equal   |   beq $rs, $rt, label    |
|        J        |         j label          |
|       Jal       |        jal label         |

# Live Demo

Available [Here](https://saliherdemk.github.io/Mips-Datapath-Simulator/)

# Demo

<img src="https://github.com/saliherdemk/Mips-Datapath-Simulator/blob/master/media/demo.gif" width="580" height="370">

# Resources

### Alu Control

Basic datapath needs to modification for some instructions. I didn't find any recources for combinational logic of alu control that can handle those instructions. I started with this design

https://www.comp.nus.edu.sg/~adi-yoga/CS2100/ch08c2/

then I modified to logic to cater for this.

https://electronics.stackexchange.com/questions/672873/alu-control-output-not-return-010-for-addi-instruction

### General

https://www.cs.princeton.edu/courses/archive/fall15/cos375/lectures/08-Control-3x1.pdf

https://stackoverflow.com/questions/76642388/how-does-the-control-unit-differentiate-between-jr-and-the-other-r-type-instruct

# Contributing

Contributions, issues and feature requests are welcome.

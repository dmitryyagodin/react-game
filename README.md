# 8 Puzzle game

## Goal
The goal of the game is to move the numbers to their original positions after they were mixed inside the board.
The board is a **3x3** square with smaller tiles numbered from **1 to 8** and and empty spot.
To move the numbers choose one that is horizontally or vertically adjacent to the empty spot and click it.
The clicked number will exchange places with the spot.

## Modes of play
There are two key ways to play this game:
- the **default mode** consists of 10 levels progressively more difficult to solve. These levels can also be checked with demo autoplay solution.
- the **random mode** allows reshuffling the numbers randomly into one of *181,440* solvable states and continue playing indefinitely

## Game stats
The game allows playing by monitoring the number of moves made. Note that *any random state* in 8 Puzzle game can be solved in *max 31 moves*. Read more about that on [Wikipedia](https://en.wikipedia.org/wiki/15_puzzle#Solvability)  

## Issues
- Fix timer: runs in seconds only
- Fix timer: doesn't stop properly
- Fix sound settings (no volume adjusting)
- Add local storage

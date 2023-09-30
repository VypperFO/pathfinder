# Pathfinder Visualizer
This is a web application built with Angular that allows you to visualize various pathfinding algorithms. The supported algorithms include A* (A-star), Breadth-First Search (BFS), Depth-First Search (DFS), and Dijkstra's algorithm.

![Screenshot 2023-09-30 115049](https://github.com/VypperFO/pathfinder/assets/30783599/fc96ff7d-bd33-4b89-8648-92d5a709fd85)

## Getting Started
To get started with the Pathfinder Visualizer, follow the steps below:

1. Clone this repository to your local machine or download the source code.
2. Make sure you have Node.js and Angular CLI installed on your system.
3. Open a terminal or command prompt and navigate to the project directory.
4. Run npm install to install the project dependencies.
5. Run ng serve to start the development server.
6. Open your web browser and visit http://localhost:4200 to access the application.

## Usage
Once the application is running, you can use it to visualize different pathfinding algorithms. Here's how to use it:

1. Select the algorithm you want to visualize from the dropdown menu.
2. Click on the grid cells to create obstacles or walls. You can toggle between empty cells and obstacle cells by clicking on them.
3. Click on the start cell and then on the end cell to set the start and end points for the pathfinding algorithm.
4. Click the "Visualize" button to start the visualization process.
5. The algorithm will start finding the shortest path from the start cell to the end cell, and you can watch it in real-time.
6. You can reset the grid and start over by clicking the "Clear board" button.

## Supported Algorithms
### A* (A-star)
A* is a popular pathfinding algorithm that uses a heuristic function to estimate the cost of reaching the goal from each cell. It combines the cost of reaching a cell (the path cost) with the estimated cost of reaching the goal (the heuristic cost) to determine the best path.

### Breadth-First Search (BFS)
BFS is an algorithm that explores all the neighboring cells of the current cell before moving on to the next level of cells. It guarantees finding the shortest path, but it may not be the most efficient algorithm for large grids.

### Depth-First Search (DFS)
DFS is an algorithm that explores as far as possible along each branch before backtracking. It does not guarantee finding the shortest path, but it can be more efficient than BFS for certain types of grids.

### Dijkstra's Algorithm
Dijkstra's algorithm is similar to A*, but it does not use a heuristic function. Instead, it considers the cost of reaching each cell from the start cell and updates the cost as it explores the grid. It guarantees finding the shortest path.

License
This project is licensed under the MIT License.

Acknowledgments
This project was inspired by the pathfinding algorithms and visualization techniques found in various resources and tutorials. Special thanks to the open-source community for providing valuable libraries and tools.

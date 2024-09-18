function main() {
   putBeeperOdd();
   uTurnLeft();
   putBeeperEven();
   uTurnRight();
   putBeeperOdd();
   uTurnLeft();
   putBeeperEven();
   uTurnRight();
   putBeeperOdd();
}

function putBeeperOdd() {
   putBeeper();
   while(frontIsClear()) {
      move();
      move();
      putBeeper();
   }
}

function putBeeperEven() {
   while (frontIsClear()) {
      move();
      putBeeper();
      move();
   }
}

function uTurnLeft() {
   turnLeft();
   move();
   turnLeft();
}

function uTurnRight() {
   repeat(3) { turnLeft(); }
   move();
   repeat(3) { turnLeft(); }
}

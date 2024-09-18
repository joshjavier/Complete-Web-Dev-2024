function main() {
   putBeeper();
   while (frontIsClear()) {
      moveNE();
      putBeeper();
   }
}

function moveNE() {
   move();
   turnLeft();
   move();
   turnRight();
}

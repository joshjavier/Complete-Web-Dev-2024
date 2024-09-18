function main() {
   while (frontIsClear()) {
      move();
   }

   turnLeft();

   while (frontIsClear()) {
      move();
   }
}

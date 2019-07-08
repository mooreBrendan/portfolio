#include "main.h"



bool isDrive = true;

static int timeOutCount = 0;



void autonReset() {

  timeOutCount = 0;

}


void autonCheckMogo(){

  if(analogRead(CLAW_POT) < CLAW_MIN_POS + 50){

    timeOutCount = TIME_OUT_LIMIT;

  }

}



void autonInit() { // runs all of the pids individually so that they all start with confidence

  // blockUntil(driveGetDriveFBC(), 0, false);
  // printf("Drive completed.\n");

  fbcReset(driveGetDriveFBC());


  // setIsDrive(false);

  // blockUntil(driveGetTurnFBC(), 0, false);

  // printf("turn completed\n");

  // setIsDrive(true);

  fbcReset(driveGetTurnFBC());


  // clawSetPos(clawGetPos());

  // blockUntil(clawGetFBC(),0,false);

  // printf("claw Completed\n");


  liftSetPos(liftGetPos());

  blockUntil(liftGetFBC(), 0, true);

  printf("Lift completed\n");

}



void autonEnd() {
 // sets all of the pids to have a goal of their current position

  driveGetDriveFBC()->move(0);

  liftGetFBC()->move(0);

  // clawGetFBC()->move(0);

}



void setIsDrive(bool foo) { // sets whether the drive or turn pids will run

  isDrive = foo;

}



void autonDriveSet(int ticks) { // calls the drive function and updates which pid runs

  driveSetStraightGoal(ticks);

  isDrive = true;

}



void autonTurnSet(int ticks) { // calls the turn function and updates which pid runs

  driveSetTurnGoal(ticks);

  isDrive = false;

}



int blockUntil(fbc_t* fbc, unsigned int timeLimit, bool liftContrl) {

  int start = millis();         // creates the timeframe

  bool timeoutOverride = false; // initializes the timeout section

  if (timeLimit <= 0) {         // prevents the time out from running

    timeoutOverride = true;

  }

  // printf("timeout init\n");

  while (!fbcIsConfident(fbc) && (millis() - start < timeLimit || timeoutOverride) &&  timeOutCount < TIME_OUT_LIMIT) { // run the fbcs within the time limit as long as script hasn't timed out too often

    if (liftContrl) { // run the lift only if desired in order to prevent the lift from losing confidence during motion

      fbcRunContinuous(liftGetFBC());

    }

    else {

      // liftGetFBC()->move(0);

      // printf("set lift to 0\n");

    }

    // printf("running claw\n");

    // fbcRunContinuous(clawGetFBC());

    // printf("running drive\n");

    if (isDrive) { // condition makes sure that only one of the driving pids runs at a time

      fbcRunContinuous(driveGetDriveFBC());

      // printf("run drive cont\n");

    }

    else {

      fbcRunContinuous(driveGetTurnFBC());

      // printf("run turn const\n");

    }

    delay(20);

  }


  if (timeOutCount >= TIME_OUT_LIMIT) {

    printf("Time Out limit exceeded\n");

    fbc->move(0);

    fbcReset(fbc);

  }

  else if (!fbcIsConfident(fbc) && (millis() - start >= timeLimit &&
 !timeoutOverride)) { // if the timelimit has ended and the motion has not completed

    // increment the timeOutCount to prevent multimple errors from
 compounding
    timeOutCount++;

    fbc->move(0);

    fbcReset(fbc);

    printf("time out: %d\n", timeOutCount); // moving the robot into a position where it will break itself

  }

  else if (fbcIsConfident(fbc) &&
 (millis() - start < timeLimit && !timeoutOverride)) { // if the fbc is confident reset the count

    timeOutCount = 0;

    printf("time out count reset\n");

  }

  return fbcIsConfident(fbc);

}



#define TIMEOUT 3000

void autonIntakeMove(int drive, int lift, int timeout) {

  int now = millis();

  autonDriveSet(drive);

  liftSetPos(lift);

  while (driveGetDriveFBC()->sense() < driveGetDriveFBC()->goal && millis() - now < timeout) {

    fbcRunContinuous(driveGetDriveFBC());

    fbcRunContinuous(liftGetFBC());

    delay(20);

  }

  fbcReset(driveGetDriveFBC());

}

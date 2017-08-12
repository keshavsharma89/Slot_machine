A slot machine simulation web-app running under Google Chrome.

Detailed description

Slot machine page has following interface elements:
1. reels
2. pay-table
3. balance indicator (text-box)
4. SPIN button.
5. Debug area

Reels
Slot machine has 3 reels, each having following 5 symbols in order:
3xBAR, BAR, 2xBAR, 7, CHERRY

Only part of the reel is visible to user. There are horizontal win-lines on visible part of reel: top, center, bottom.

A reel can stop only in fixed positions. A stopped reel has either:
1. a symbol on center win line
2. symbols on top and bottom win-line positions

Note, that if center win-line has a symbol, bottom/top parts of peer symbols must be still visible (partly) as shown on figure (the rightmost reel).




























Pay-table
Pay-table must indicate winning combinations and payouts as:
3 CHERRY symbols on top line 2000
3 CHERRY symbols on center line 1000
3 CHERRY symbols on bottom line 4000
3 7 symbols on any line 150

Any combination of CHERRY and 7 on any line 75 3 3xBAR symbols on any line 50 3 2xBAR symbols on any line 20

3 BAR symbols on any line 10
Combination of any BAR symbols on any line 5

When a particular win happens the winning sum on pay-table must start blinking.
Also, the win-line on reels must be marked (for example a red line).

Balance area

Players current balance is shown on balance text-box. For debugging purposes, it is permitted player enter integer to balance box in range 1...5000.

Spin button

Press on SPIN button start spinning of all three reels. Each spin costs player 1 coin. During the reel spinning player can not do anything else than wait. The spinning must last 2 seconds, after that reels start to sop one by one (starting from left) having 0.5 sec delay between landings.

Debug area

It must be possible use the slot machine in two modes: random and fixed. In case of random mode, the reels must land random positions. For fixed mode, the player must able enter two parameters for each reel. These input parameters are:

1. a symbol from set {BAR, 2xBAR, 3xBAR, 7, CHERRY}
2. landing position of the symbol from set {top, center, bottom}

If fixed mode is active, the reels must land as specified by tester.


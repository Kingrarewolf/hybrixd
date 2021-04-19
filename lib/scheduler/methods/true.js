const math = require('../math');
/**
   * Test truth of a math condition and choose to jump. The condition is evaluatated mathematically and jumped accordingly.
   * @category Flow
   * @param {Boolean} condition - Mathematical condition to analyse. (Example: $A>5)
   * @param {Integer} [onTrue=1] - Amount of instructions lines to jump when condition matches true. (1 = jump forward 1 instruction, -2 = jump backward two instructions)
   * @param {Integer} [onFalse=1] - Amount of instructions lines to jump when condition matches false. (1 = jump forward 1 instruction, -2 = jump backward two instructions)
   * @example
   * true >3 1 -3              // test if data>3, if true jump to the next instruction, if false jump back three instructions
   * true <=1 -4 1             // test if data<=1, if true jump back four instructions, if false jump to the next instruction
   * true >3 -5                // test if data>3, if true jump back five instructions, else default jump to the next instruction
   * true ==3 -5               // test if data=3, if true jump back five instructions, else default jump to the next instruction
   * true $myVar==3 3          // test if $myVar=3, if true jump three instructions, else default jump to the next instruction
   * true '$b<=100 and $b>1' 2 // test if $b<=100 and $b>1, if true jump two instructions, else default jump to the next instruction
   */
exports.true = data => function (p, condition, onTrue, onFalse) {
  // TODO check if onTrue and onFalse are valid jump numbers

  if (typeof condition === 'string') { // prepend data to equation that starts with a binary operator
    if (condition.startsWith('=') || condition.startsWith('!=') || condition.startsWith('<') || condition.startsWith('>')) condition = data + condition;
  } else return p.fail('true error: expected condition to be a string.');

  const result = math.calc(condition, p);

  if (result.error) return p.fail(result.error);
  else if (result.data === 'true' || (!isNaN(result.data) && result.data > 0)) return p.jump(onTrue || 1, data);
  else return p.jump(onFalse || 1, data);
};

exports.tests = {
  true1: [
    'data 2',
    "true '<1' 1 2",
    'fail',
    "done '$OK'"
  ],
  true2: [
    "true '2>1' 2 1",
    'fail',
    "done '$OK'"
  ]

};

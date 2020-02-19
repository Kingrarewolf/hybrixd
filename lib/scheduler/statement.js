const qrtzExecute = require('./quartz').execute;
const QrtzParameter = require('./parameter').QrtzParameter;
const parse = require('./parse');

function logAndError (processStep, errorStr) {
  console.log(` [!] (${processStep.getProcessID()}) ${errorStr}`);
  if (processStep.getSessionID() === 1) { // extensive errors for root
    processStep.fail(errorStr);
  } else {
    processStep.fail('Proc error.'); // simple error for non root
  }
}

function execute (head, parameters, processStep, qrtzStatement) {
  try {
    qrtzExecute(head, processStep, parameters);
  } catch (result) {
    logAndError(processStep, `proc error: \n    ${qrtzStatement.toString()}\n     ${result || 'UNKNOWN ERROR!'}`);
  }
}

function stringify (arg) {
  if (typeof arg === 'string') {
    return arg;
  } else {
    return JSON.stringify(arg);
  }
}

function QrtzStatement (statement, labels, step) {
  let head;
  let parameters;
  if (statement instanceof Array) { // statement = ['head',param1,param2,...]  instead of parsing the statement string use the given values directly
    head = statement[0];
    parameters = statement.slice(1).map(parameter => new QrtzParameter(parameter, true));
    statement = statement.map(stringify).join(' '); // ['head',param1,param2,...] => 'head param1 param2 ...'  stringify for debug purposes
  } else { // statement = 'head param1 param2 ...'
    const splitResult = parse.splitStatement(statement, labels, step); // 'head param1 param2 ...' -> {head:'head',parameters:['param1','param2',...]}
    if (splitResult.error) {
      throw splitResult.error;
    }
    head = splitResult.head;
    parameters = splitResult.parameters.map(parameter => new QrtzParameter(parameter));
  }

  this.getSyncFunctionName = (qrtzProcessStep) => {
    // if this step is 'sync functionName' then return 'functionName'
    if (head !== 'sync') return null;
    if (parameters.length !== 1) { return null; }
    const functionName = parameters[0].getRunTime(qrtzProcessStep);
    if (typeof functionName === 'string') {
      return functionName;
    } else {
      return null;
    }
  };

  this.toString = () => statement;

  this.execute = processStep => {
    const runTimeParameters = parameters.map(parameter => parameter.getRunTime(processStep));
    execute(head, runTimeParameters, processStep, this);
  };
}

exports.QrtzStatement = QrtzStatement;
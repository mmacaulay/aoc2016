import unittest
import re

testdata = [
  'value 5 goes to bot 2',
  'bot 2 gives low to bot 1 and high to bot 0',
  'value 3 goes to bot 1',
  'bot 1 gives low to output 1 and high to bot 0',
  'bot 0 gives low to output 2 and high to output 0',
  'value 2 goes to bot 2'
]

class TestDay10(unittest.TestCase):
  def test_parsevaluecmd(self):
    instruction = testdata[0]
    factory = Factory()
    tokens = factory.parsevaluecmd(instruction)
    self.assertEqual(tokens, { 'value': 5, 'bot': '2' })

    instruction = testdata[2]
    tokens = factory.parsevaluecmd(instruction)
    self.assertEqual(tokens, { 'value': 3, 'bot':'1' })

  def test_execvaluecmd(self):
    instruction = testdata[0]
    factory = Factory()
    factory.interpret(instruction)
    self.assertEqual(factory.bots, { '2': [5] })
    self.assertEqual(factory.bins, {})

    instruction = testdata[5]
    factory.interpret(instruction)
    self.assertEqual(factory.bots, { '2': [5, 2] })
    self.assertEqual(factory.bins, {})

  def test_parsebotcmd(self):
    instruction = testdata[1]
    factory = Factory()
    tokens = factory.parsebotcmd(instruction)
    self.assertEqual(tokens, { 'bot': '2', 'low': { 'bot': '1' }, 'high': { 'bot': '0' } })

    instruction = testdata[3]
    tokens = factory.parsebotcmd(instruction)
    self.assertEqual(tokens, { 'bot': '1', 'low': { 'output': '1' }, 'high': { 'bot': '0' } })

  def test_execbotcmd(self):
    factory = Factory()
    factory.bots = { '2': [5, 2], '1': [3] }
    tokens = { 'bot': '2', 'low': { 'bot': '1' }, 'high': { 'bot': '0' } }
    factory.execbotcmd(tokens)
    self.assertEqual(factory.bots, { '2': [], '1': [3, 2], '0': [5] })
    tokens = { 'bot': '1', 'low': { 'output': '1' }, 'high': { 'bot': '0' } }
    factory.execbotcmd(tokens)
    self.assertEqual(factory.bots, { '2': [], '1': [], '0': [5, 3] })
    self.assertEqual(factory.bins, { '1': [2] })

class Factory():
  def __init__(self):
    self.bots = {}
    self.bins = {}
    self.botcmds = {}

  def interpret(self, instruction):
    if (instruction.startswith('value')):
      tokens = self.parsevaluecmd(instruction)
      self.execvaluecmd(tokens)
    elif (instruction.startswith('bot')):
      tokens = self.parsebotcmd(instruction)
      self.execbotcmd(tokens)
    else:
      pass
    return None

  def parsevaluecmd(self, instruction):
    m = re.search(r"value (\d+) goes to bot (\d+)", instruction)
    return { "value": int(m.group(1)), "bot": m.group(2) }

  def execvaluecmd(self, tokens):
    self.bots.setdefault(tokens['bot'], [])
    self.bots[tokens['bot']].append(tokens['value'])
    self.tryexeccmd(tokens['bot'])

  def parsebotcmd(self, instruction):
    m = re.search(r"bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)", instruction)
    return { "bot": m.group(1), "low": { m.group(2): m.group(3) }, "high": { m.group(4): m.group(5) } }

  def execbotcmd(self, tokens):
    ensurekey(self.bots, tokens['bot'], [])

    if len(self.bots[tokens['bot']]) != 2:
      self.botcmds[tokens['bot']] = tokens
      return

    values = self.bots[tokens['bot']]
    maxval = max(values)
    minval = min(values)
    high = tokens['high']
    low = tokens['low']

    print('high: ' + str(maxval) + ' low: ' + str(minval))
    if maxval == 61 and minval == 17:
      print('BOT: ' + tokens['bot'])

    groups = [ { 'receiver': high, 'val': maxval }, { 'receiver': low, 'val': minval } ]
    for group in groups:
      sender = self.bots[tokens['bot']]
      receiver = None
      if 'bot' in group['receiver']:
        ensurekey(self.bots, group['receiver']['bot'], [])
        receiver = self.bots[group['receiver']['bot']]
        self.transfervalue(sender, receiver, group['val'])
        self.tryexeccmd(group['receiver']['bot'])
      else:
        ensurekey(self.bins, group['receiver']['output'], [])
        receiver = self.bins[group['receiver']['output']]
        self.transfervalue(sender, receiver, group['val'])

  def tryexeccmd(self, bot):
    if len(self.bots[bot]) == 2 and bot in self.botcmds and self.botcmds[bot]:
      self.execbotcmd(self.botcmds[bot])
      self.botcmds[bot] = None

  def transfervalue(self, sender, receiver, value):
    sender.remove(value)
    receiver.append(value)

def runmain():
  factory = Factory()
  with open('day10.txt', 'r') as f:
    for line in f:
      factory.interpret(line)
  print(str(factory.bins['0'][0] * factory.bins['1'][0] * factory.bins['2'][0]))

def ensurekey(obj, key, default):
  if key not in obj:
    obj[key] = default

if __name__ == '__main__':
  # unittest.main()
  runmain()

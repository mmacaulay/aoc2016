import unittest

class TestDay9(unittest.TestCase):
    def test_same_output(self):
        compressed = 'ADVENT'
        self.assertEqual(decompress(compressed), compressed)

    def test_single_repeated_char(self):
        compressed = 'A(1x5)BC'
        decompressed = 'ABBBBBC'
        self.assertEqual(decompress(compressed), decompressed)

    def test_multiple_repeated_char(self):
        compressed = '(3x3)XYZ'
        decompressed = 'XYZXYZXYZ'
        self.assertEqual(decompress(compressed), decompressed)

    def test_multiple_markers(self):
        compressed = 'A(2x2)BCD(2x2)EFG'
        decompressed = 'ABCBCDEFEFG'
        self.assertEqual(decompress(compressed), decompressed)

    def test_marker_within_data_section(self):
        compressed = '(6x1)(1x3)A'
        decompressed = '(1x3)A'
        self.assertEqual(decompress(compressed), decompressed)

    def test_skip_decompressed(self):
        compressed = 'X(8x2)(3x3)ABCY'
        decompressed = 'X(3x3)ABC(3x3)ABCY'
        self.assertEqual(decompress(compressed), decompressed)

class TestDay9v2(unittest.TestCase):
    def test_no_embedded(self):
        compressed = '(3x3)XYZ'
        decompressed = 'XYZXYZXYZ'
        self.assertEqual(decompress(compressed, version = '2'), decompressed)

    def test_embedded_marker(self):
        compressed = 'X(8x2)(3x3)ABCY'
        decompressed = 'XABCABCABCABCABCABCY'
        self.assertEqual(decompress(compressed, version = '2'), decompressed)

    def test_multiple_level_embeds(self):
        compressed = '(27x12)(20x12)(13x14)(7x10)(1x12)A'
        decompressed = 'A' * 241920
        self.assertEqual(decompress(compressed, version = '2'), decompressed)

    def test_more_multi_level_embeds(self):
        compressed = '(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN'
        decompressed = decompress(compressed, version = '2')
        self.assertEqual(len(decompressed), 445)

def runmain(version):
    f = open('day9.txt', 'r')
    text = f.read()
    print('Compressed length: ' + str(len(text) - 1))
    res = decompress(text, version)
    print('Decompressed length: ' + str(len(res.replace(' ', '')) - 1))

def decompress(text, version = '1'):
    res = ''
    in_marker_context = False
    marker_context = ''
    cursor = None
    chars = list(text)
    cursor = 0

    while cursor < len(chars):
        char = chars[cursor]
        cursor += 1

        if (in_marker_context):
            if (char == ')'):
                repeat_chars, repeat_count = [int(x) for x in marker_context.split('x')]
                repeat_slice = chars[cursor:cursor + repeat_chars]
                if (version == '2'):
                    repeat_slice = decompress(repeat_slice, version)
                res += ''.join(repeat_slice) * repeat_count
                cursor += repeat_chars

                # reset marker context
                in_marker_context = False
                marker_context = ''
                continue
            else:
                marker_context += char
        elif(char == '('):
            in_marker_context = True
        else:
            res += char

    return res

if __name__ == '__main__':
    # unittest.main()
    runmain('2')
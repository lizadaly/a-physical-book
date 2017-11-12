import json

LINES_PER_CHAPTER = 20

book = []

for i in range(0, 2):
    with open('data/sandwich.txt') as f:
        i = 0
        lines = []
        for line in f:
            if i == LINES_PER_CHAPTER:
                lines.append(line.strip())
                book.append(lines)
                lines = []
                i = 0
            else:
                lines.append(line.strip())
                i += 1

with open('data/book.json', 'w') as f:
    print("Dumping {} chapters".format(len(book)))
    json.dump(book, f, indent=4)

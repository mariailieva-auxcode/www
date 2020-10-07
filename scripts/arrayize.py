x = input()

regions = x.split(',')
res = '['

size = len(regions)
for i in range(size):
    res += "'%s'" % regions[i].strip()
    if i < size - 1:
        res += ','

res += ']'

print(res)
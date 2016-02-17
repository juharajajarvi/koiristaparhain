h(x) = a/(x+b) + c

fit h(x) 'saka_narttu.txt' using 1:2 via a, b, c

plot 'saka_narttu.txt', h(x)
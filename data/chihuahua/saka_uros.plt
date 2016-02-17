h(x) = a/(x+b) + c

fit h(x) 'saka_uros.txt' using 1:2 via a, b, c

plot 'saka_uros.txt', h(x)
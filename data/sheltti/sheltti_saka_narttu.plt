h(x) = a/(x+b) + c

fit h(x) 'sheltti_saka_narttu.txt' using 1:2 via a, b, c

#set xrange [0:70]
#set yrange [0:20]
plot 'sheltti_saka_narttu.txt', h(x)
h(x) = a*x**4 + b*x**2 + c*x

fit h(x) 'pituus_paino.txt' using 1:2 via a, b, c

set xrange [0:70]
set yrange [0:20]
plot 'pituus_paino.txt', h(x)
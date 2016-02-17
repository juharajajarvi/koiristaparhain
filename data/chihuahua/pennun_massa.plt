#h(x) = abs(a)*x**2 + b*x + c
h(x) = a*x**2 + b*x + c

a=5
b=2
c=-1
fit h(x) 'pennun_massa.txt' using 1:2 via a, b, c

#set xrange [0:70]
#set yrange [0:20]
plot 'pennun_massa.txt', h(x)
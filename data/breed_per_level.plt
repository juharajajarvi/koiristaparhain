f(x) = 1 + (8.0/10.0)*x

f_low(x) = f(x) - 3 
f_high(x) = f(x) + 3

set xrange[0:10]
plot f(x), f_low(x), f_high(x)
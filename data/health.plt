f(initial_health, x) = initial_health - 10.0*(x/(7.0+initial_health))**5 - (1.0 - sqrt(initial_health/10.0))*x

set xrange [0:30]
set yrange [0:11]

plot f(10.0, x), f(9.0, x), f(8.0, x), f(7.0, x), f(6.0, x), f(5.0, x), f(4.0, x), f(3.0, x), f(2.0, x), f(1.0, x)
#set xrange [0:70]
#set yrange [0:20]
set yrange [0:13]

set xdata time
set timefmt "%d.%m.%y"
set format x "%d.%m.%y"

plot 'simpu.txt' using 1:2 title "Vetäminen" w lines lw 2,\
'simpu.txt' using 1:3 title "Autoille haukkuminen" w lines lw 2,\
'simpu.txt' using 1:4 title "Kävelijöille haukkuminen" w lines lw 2,\
'simpu.txt' using 1:5 title "Koirille haukkuminen" w lines lw 2
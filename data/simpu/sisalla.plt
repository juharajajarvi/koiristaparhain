set terminal pngcairo size 700,450 enhanced font "Helvetica, 14"
set output 'sisalla.png'

#set xrange [0:70]
#set yrange [0:20]
set yrange [0:13]

set xdata time
set timefmt "%d.%m.%y"
set format x "%d.%m.%y"

set xtics format "%d.%m.%y"
set xtics 2*60*60*24*31*2

plot 'sisalla_ovikello.txt' using 1:2 title "Ovikello" w lines lw 2,\
'sisalla_rappukaytava.txt' using 1:2 title "Rappukäytävän äänet" w lines lw 2
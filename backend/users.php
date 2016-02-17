<?php
require 'model.php';

$conn = connect_to_db();
$total = get_total($conn);
$result = get_users($conn);
$conn->close();
?>

<h2 class="">Rekisteröityneitä käyttäjiä: <span class="bold"><?php echo $total;?></span></h2>
<?php /*<br>
<h2 class="">TOP 10 pelaajat</h2>
<table>
<tr><td class="bold" style="width:100px;">Kennel</td><td class="bold">Arvosana</td></tr> <?php
foreach($result as $row) { ?>
    <tr>
    <td><?php echo $row['kennel']; ?></td>
    <td><?php echo $row['star_level']; ?></td></tr><?php
}
?>
</table> */?>
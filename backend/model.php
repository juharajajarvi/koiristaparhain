<?php
function register($conn, $username, $password, $kennel_name)
{

    if (is_username_taken($conn, $username)) {
        return false;
    }

    $sql = "
    INSERT INTO Entries
    (
      UserName,
      Password,
      KennelName
    ) VALUES (
     '$username',
     '$password',
     '$kennel_name'
    );
";

    if ($conn->query($sql) === TRUE) {
        return true;
    } else {
        echo "Error: " . $conn->error;
        return false;
    }
}

function save($conn, $username, $password, $date, $star_level, $bank_account, $dogs, $puppies, $puppies_parents, $dead_dogs, $achievements, $happenings, $hints)
{

    $sql = "
        UPDATE Entries
        SET
        LastUpdated = NOW(),
        Date='$date',
        StarLevel='$star_level',
        BankAccount='$bank_account',
        Dogs='$dogs',
        Puppies='$puppies',
        PuppiesParents='$puppies_parents',
        DeadDogs= '$dead_dogs',
        Achievements= '$achievements',
        Happenings= '$happenings',
        Hints='$hints'
        WHERE UserName='$username'
        AND Password='$password';
    ";

    if ($conn->query($sql) === TRUE) {
        return true;
    } else {
        echo $conn->error;
        return false;
    }
}

function signup($conn, $username, $dog_name, $dog_rating, $code)
{

    $date = date("Y-m-d H:i:s");

    $sql = "
        INSERT INTO Signup (Date, UserName, DogName, Rating) VALUES ('".$date."', '".$username."', '".$dog_name."', '".$dog_rating."');
    ";

    if ($conn->query($sql) === TRUE) {
        return true;
    } else {
        echo $conn->error;
        return false;
    }
}

function get_results($conn)
{

    $date = date("Y-m-d H:i:s");

    $sql = "
        SELECT UserName, DogName, Rating FROM Signup ORDER BY Rating DESC;
    ";

    $rows = [];

    if ($stmt = $conn->prepare($sql)) {

        /* execute statement */
        $stmt->execute();

        /* bind result variables */
        $stmt->bind_result($username, $dogname, $rating);

        /* fetch values */
        while ($stmt->fetch()) {
            $row = [];
            $row['username'] = $username;
            $row['dogname'] = $dogname;
            $row['rating'] = $rating;

            $rows[] = $row;
        }

        /* close statement */
        $stmt->close();
    } else {
        echo("Errormessage: " . $conn->error);
        $row['status'] = 'failed';
        return $row;
    }

    return $rows;
}

function load($conn, $username, $password)
{

    $sql = "SELECT KennelName,
            BankAccount,
            Date,
            StarLevel,
            Dogs,
            Puppies,
            PuppiesParents,
            DeadDogs,
            Achievements,
            Happenings,
            Hints
            FROM Entries
            WHERE UserName='$username'
            AND Password='$password';
";

    $row = [];
    $row['status'] = 'failed';

    if ($stmt = $conn->prepare($sql)) {

        /* execute statement */
        $stmt->execute();

        /* bind result variables */
        $stmt->bind_result($kennel_name, $bank_account, $date, $star_level, $dogs, $puppies, $puppies_parents, $dead_dogs, $achievements, $happenings, $hints);

        /* fetch values */
        while ($stmt->fetch()) {
            $row = [];
            $row['kennel_name'] = $kennel_name;
            $row['bank_account'] = $bank_account;
            $row['date'] = $date;
            $row['star_level'] = $star_level;
            $row['dogs'] = $dogs;
            $row['puppies'] = $puppies;
            $row['puppies_parents'] = $puppies_parents;
            $row['dead_dogs'] = $dead_dogs;
            $row['achievements'] = $achievements;
            $row['happenings'] = $happenings;
            $row['hints'] = $hints;
            $row['status'] = "success";
        }

        /* close statement */
        $stmt->close();
    } else {
        echo("Errormessage: " . $conn->error);
        $row['status'] = 'failed';
        return $row;
    }

    return $row;
}

function get_total($conn)
{

    $sql = "SELECT COUNT(*) AS Total FROM Entries;
";

    $row = [];
    $row['status'] = 'failed';

    if ($stmt = $conn->prepare($sql)) {

        /* execute statement */
        $stmt->execute();

        /* bind result variables */
        $stmt->bind_result($total);

        /* fetch values */
        while ($stmt->fetch()) {
            $row = [];
            return $total;
        }

        /* close statement */
        $stmt->close();
    } else {
        echo("Errormessage: " . $conn->error);
        return 0;
    }

}

function get_users($conn)
{

    $sql = "SELECT KennelName, StarLevel FROM Entries ORDER BY StarLevel DESC LIMIT 10;";

    $rows = [];

    if ($stmt = $conn->prepare($sql)) {

        /* execute statement */
        $stmt->execute();

        /* bind result variables */
        $stmt->bind_result($kennel, $star_level);

        /* fetch values */
        while ($stmt->fetch()) {
            $row = [];
            $row['kennel'] = $kennel;
            $row['star_level'] = $star_level;
            $rows[] = $row;
        }

        /* close statement */
        $stmt->close();
    } else {
        echo("Errormessage: " . $conn->error);
        $row['status'] = 'failed';
        return $row;
    }

    return $rows;
}

function is_username_taken($conn, $username)
{
    $is_username_taken = true;

    $sql = "SELECT COUNT(*) AS FoundEntries
            FROM Entries
            WHERE
            UserName='" . $username . "';
    ";


    if ($stmt = $conn->prepare($sql)) {

        /* execute statement */
        $stmt->execute();

        /* bind result variables */
        $stmt->bind_result($found_entries);

        /* fetch values */
        while ($stmt->fetch()) {
            if ($found_entries == 0) {
                $is_username_taken = false;
            }
        }

        /* close statement */
        $stmt->close();
    } else {
        echo("Errormessage: " . $conn->error);
    }

    return $is_username_taken;
}

function is_correct_username_password($conn, $username, $password)
{
    $is_correct = false;

    $sql = "SELECT COUNT(*) AS FoundEntries
            FROM Entries
            WHERE
            UserName='" . $username . "' AND Password='".$password."';
    ";


    if ($stmt = $conn->prepare($sql)) {

        /* execute statement */
        $stmt->execute();

        /* bind result variables */
        $stmt->bind_result($found_entries);

        /* fetch values */
        while ($stmt->fetch()) {
            if ($found_entries == 1) {
                $is_correct = true;
            }
        }

        /* close statement */
        $stmt->close();
    } else {
        echo("Errormessage: " . $conn->error);
    }

    return $is_correct;
}

function connect_to_db()
{
    $db_servername = "localhost";
    $db_username = "juharajajarvi";
    $db_password = "I5hUkJ59";

    // Create connection
    $conn = new mysqli($db_servername, $db_username, $db_password);
    $conn->select_db('juharajajarvi');

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    return $conn;
}

function save_feedback($conn, $email, $feedback)
{

    $sql = "
        INSERT INTO Feedback
        (
        Email,
        Feedback
        )
        VALUES
        (
        '$email',
        '$feedback'
        );
    ";

    if ($conn->query($sql) === TRUE) {
        return true;
    } else {
        echo $conn->error;
        return false;
    }
}
import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Scanner;
import java.util.Random;

public class Main {
    public static Squad[] squads = new Squad[32];

    public static void main(String[] args){
        readManagers();
        readPlayers();
        runTournament();
    }

    private static void readManagers () {
        try (Scanner scanner = new Scanner(new File("Managers.csv"))) {
            // Ignore header row
            scanner.nextLine();
            // variable used to traverse squads array
            int i = 0;

            while (scanner.hasNextLine()) {
                // details go separately into a string array
                String[] data = scanner.nextLine().split(",");

                // elements passes as arguments for constructor
                Manager manager = new Manager(data[0].trim(), data[1].trim(), data[2].trim(), data[3].trim(), Double.parseDouble(data[4]),
                        Double.parseDouble(data[5]), Double.parseDouble(data[6]), Double.parseDouble(data[7]));
                // newly created Manager added to managers arraylist
                squads[i] = new Squad (data[2].trim(), manager);
                if (i < 31) { ++i; }
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }

    private static void readPlayers () {
        try (Scanner scanner = new Scanner(new File("Players.csv"))) {
            // Ignore header row
            scanner.nextLine();

            while (scanner.hasNextLine()) {
                // details go separately into a string array
                String[] data = scanner.nextLine().split(",");

                // elements passes as arguments for constructor
                Player player = new Player(data[0].trim(), data[1].trim(), data[2].trim(), data[3].trim(), Double.parseDouble(data[4]),
                        Double.parseDouble(data[5]), Double.parseDouble(data[6]), Double.parseDouble(data[7]),
                        Double.parseDouble(data[8]), Double.parseDouble(data[9]), Double.parseDouble(data[10]),
                        Double.parseDouble(data[11]), Double.parseDouble(data[12]), Double.parseDouble(data[13]));
                // adding players based on their team name
                for (Squad s : squads) {
                    if (s.getTeamName().equals(player.getTeam())) {
                        s.addPlayer(player);
                    }
                }
            }
        } catch(FileNotFoundException e){
            e.printStackTrace();
        }

    }

    public static Team getTeam(Squad s){
        Team t = new Team(s.getTeamName(), s.getManager());
        // get formation details from Manager and parse them as integers
        String[] xyz = t.getManager().getFavouredFormation().split("-");
        ArrayList<Integer> favouredFormation = new ArrayList<Integer>();
        for (int i = 0; i < xyz.length; i++) {
            favouredFormation.add(Integer.parseInt(xyz[i]));
        }
        favouredFormation.addLast(1);
        // create AL to sort players into based on averages; top players will naturally be popped from the top
        for (int i = 0; i < favouredFormation.size(); i++) {
            ArrayList<Player> teamPlayers = new ArrayList<>();
            int formationCount = favouredFormation.get(i);
            String position = switch (i) {
                case 0 -> "Defender";
                case 1 -> "Midfielder";
                case 2 -> "Forward";
                case 3 -> "Goal Keeper";
                default -> throw new IllegalStateException("Unexpected value: " + i);
            };
            //
            for (int j = 0; j < 26; j++) {
                if (s.getPlayer(j).getPosition().equals(position)) {
                    teamPlayers.add(s.getPlayer(j));
                }
            }
            Comparator<Player> averageComparator = Comparator.comparingDouble(Player::getTotalAvg).reversed();
            teamPlayers.sort(averageComparator);
            for (int j = 0; j < formationCount; j++) {
                t.addPlayer(teamPlayers.getFirst());
                teamPlayers.removeFirst();
            }
        }
        return t;
    }

    public static void runTournament(){
        Random random = new Random();
        ArrayList<Integer> numbers = new ArrayList<>();
        // get random numbers without overlap
        int x = 0;
        while (numbers.size() < 32) {
            numbers.add(x);
            x++;
        }
        System.out.println("Tournament roster:");
        ArrayList<Team> teams = new ArrayList<>();
        for (int i = 0; i < 8; i++) {
            int y = random.nextInt(numbers.size());
            Team team = getTeam(squads[y]);
            System.out.println(" - " + squads[y].getTeamName());
            teams.add(team);
            numbers.remove(y);
        }
        for (int i = 0; i < 3; i++) {
            int round = i;
            round++;
            System.out.println("Round " + round);
            for (int t = 0; t < teams.size(); t += 2) {
                System.out.println(teams.get(t).getTeamName() + " vs " + teams.get(t + 1).getTeamName());
                int coinflip = random.nextInt(1);
                switch (coinflip) {
                    case 0:
                        System.out.println("winner is " + teams.get(t).getTeamName() + "!");
                        teams.remove(t + 1);
                        break;
                    case 1:
                        System.out.println("winner is " + teams.get(t + 1).getTeamName());
                        teams.remove(t);
                        break;
                }
            }
        }
        System.out.println("Final winner is " + teams.get(0).getTeamName());
    }
}
public class Person {
    private String firstName;
    private String surname;
    private String team;

    // Person constructor for use in child classes
    public Person(String firstName, String surname, String team) {
        this.firstName = firstName;
        this.surname = surname;
        this.team = team;
    }

    // Getter and setter methods for firstName
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    // Getter and setter methods for surname
    public String getSurname() {
        return surname;
    }
    public void setSurname(String surname) {
        this.surname = surname;
    }

    // Getter and setter methods for team
    public String getTeam() {
        return team;
    }
    public void setTeam(String team) {
        this.team = team;
    }
}

public class Manager extends Person {
    private String favouredFormation;
    private double respect;
    private double ability;
    private double knowledge;
    private double belief;

    // Manager constructor
    public Manager(String firstName, String surname, String team, String favouredFormation,
                   double respect, double ability, double knowledge, double belief) {
        super(firstName, surname, team);
        this.favouredFormation = favouredFormation;
        this.respect = respect;
        this.ability = ability;
        this.knowledge = knowledge;
        this.belief = belief;
    }

    // Getter and setter methods for favouredFormation
    public String getFavouredFormation() {
        return favouredFormation;
    }
    public void setFavouredFormation(String favouredFormation) {
        this.favouredFormation = favouredFormation;
    }

    // Getter and setter methods for respect
    public double getRespect() {
        return respect;
    }
    public void setRespect(double respect) {
        this.respect = respect;
    }

    // Getter and setter methods for ability
    public double getAbility() {
        return ability;
    }
    public void setAbility(double ability) {
        this.ability = ability;
    }

    // Getter and setter methods for knowledge
    public double getKnowledge() {
        return knowledge;
    }
    public void setKnowledge(double knowledge) {
        this.knowledge = knowledge;
    }

    // Getter and setter methods for belief
    public double getBelief() {
        return belief;
    }
    public void setBelief(double belief) {
        this.belief = belief;
    }
}
